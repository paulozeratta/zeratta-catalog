#!/usr/bin/env python3
"""Atualiza o catalogo cifrado, preservando preços, descontos, fretes e sincronizacao permanente.

Uso:
  python -m pip install cryptography
  export ZERATTA_CATALOG_PASSWORD='chave atual'
  python scripts/encrypt_catalog.py /caminho/novo-painel.html

O HTML original nunca deve ser enviado ao repositorio publico.
"""
from pathlib import Path
from base64 import b64decode, b64encode
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import json, os, re, secrets, sys

AAD = b"zeratta-catalog-v1"
PATTERN = r'(<script type="application/json" id="encrypted-data">)(.*?)(</script>)'

def key(password, salt, iterations=600000):
    return PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=iterations).derive(password.encode())

def get_match(pattern, text, label):
    result = re.search(pattern, text, re.S)
    if not result:
        raise ValueError("Estrutura ausente: " + label + ". Nenhuma alteracao foi salva.")
    return result.group(1)

def replace_once(text, old, new, label):
    if text.count(old) != 1:
        raise ValueError("Estrutura inesperada: " + label + ". Publicacao abortada.")
    return text.replace(old, new, 1)

def inject_cloud(new_html, old_html):
    if 'const CLOUD_REPO=' in new_html:
        return new_html
    css = get_match(r'(/\* GitHub encrypted freight synchronization \*/.*?)(?=</style>)', old_html, 'CSS')
    ui = get_match(r'(\s*<section class="cloud-sync".*?</section>\s*)(?=\s*<section class="bar")', old_html, 'UI')
    js = get_match(r'(// As alterações financeiras são privadas; os fretes sincronizados ficam cifrados\..*?)(?=const \$=id=>)', old_html, 'JS')
    new_html = replace_once(new_html, '</style>', css+'</style>', 'style')
    anchor = '  <section class="bar" aria-label="Ferramentas do catálogo">'
    new_html = replace_once(new_html, anchor, ui+anchor, 'filters')
    anchor = 'const byId=new Map(PRODUCTS.map(p=>[p.id,p]));'
    new_html = replace_once(new_html, anchor, anchor+'\n'+js, 'product map')
    anchor = "function save(id,field,val){(state.saved[id]||= {})[field]=val;persist();updateTotals();}"
    new_html = replace_once(new_html, anchor, "function save(id,field,val){(state.saved[id]||= {})[field]=val;persist();updateTotals();if(field==='freight')cloudMarkDirty(id);}", 'save')
    anchor = "$('items').addEventListener('input',e=>{const t=e.target;if(!t.matches('[data-edit]'))return;save(t.dataset.id,t.dataset.edit,t.value)});"
    add = """\n$('items').addEventListener('change',e=>{const t=e.target;if(t.matches('[data-edit="freight"]')&&cloud.token)cloudQueueSave(250)});"""
    new_html = replace_once(new_html, anchor, anchor+add, 'change')
    new_html = replace_once(new_html, 'load();render();', 'load();render();cloudInit();', 'init')
    new_html = new_html.replace('<span id="save-status">Alterações locais, sem sincronização automática</span>', '<span id="save-status">Demais campos: alterações locais; fretes: sincronização GitHub disponível</span>')
    new_html = new_html.replace(". Edição somente local.</p></aside></article>'", ". Frete: salvo no GitHub quando conectado.</p></aside></article>'")
    return new_html


def replace_products(old_html, new_html):
    """Importa apenas PRODUCTS e preserva todo CSS/JS, precificação e integração."""
    def extract(text):
        m = re.search(r'\\bconst\\s+PRODUCTS\\s*=\\s*', text)
        if not m:
            raise ValueError('Bloco PRODUCTS não encontrado; abortando.')
        arr, consumed = json.JSONDecoder().raw_decode(text[m.end():])
        ids = [str(x.get('id', '')) for x in arr]
        if not isinstance(arr, list) or not arr or len(ids) != len(set(ids)) or not all(ids):
            raise ValueError('Produtos vazios, inválidos ou duplicados; abortando.')
        return arr, (m.start(), m.end() + consumed)
    products, _ = extract(new_html)
    old_products, old_range = extract(old_html)
    if len(products) < max(1, int(len(old_products) * .6)):
        raise ValueError('Catálogo importado é menor que 60% do atual; importação bloqueada.')
    original = {str(x['id']): x for x in old_products}
    for item in products:
        if not item.get('sourceUrl') and str(item['id']) in original:
            item['sourceUrl'] = original[str(item['id'])].get('sourceUrl') or ''
    return old_html[:old_range[0]] + 'const PRODUCTS=' + json.dumps(products, separators=(',', ':'), ensure_ascii=False) + old_html[old_range[1]:]

def main():
    if len(sys.argv)!=2:
        raise SystemExit('Uso: python scripts/encrypt_catalog.py catalogo-original.html')
    password=os.getenv('ZERATTA_CATALOG_PASSWORD','')
    if not password:
        raise SystemExit('Configure ZERATTA_CATALOG_PASSWORD no seu computador, nunca no GitHub.')
    source=Path(sys.argv[1])
    if not source.is_file():
        raise SystemExit('Arquivo original nao encontrado: '+str(source))
    index=Path(__file__).resolve().parent.parent/'index.html'
    current=index.read_text(encoding='utf-8')
    match=re.search(PATTERN,current,re.S)
    if not match:
        raise SystemExit('Painel protegido atual nao encontrado.')
    prior=json.loads(match.group(2))
    old_plain=AESGCM(key(password,b64decode(prior['salt']),prior['iterations'])).decrypt(b64decode(prior['iv']),b64decode(prior['ciphertext']),AAD).decode('utf-8')
    fresh=replace_products(old_plain,source.read_text(encoding='utf-8'))
    if not all(x in fresh for x in ('cloudInit();', 'function priceModel(p)', 'function refreshProductFinance(id)', 'id="bulk-discount"')):
        raise SystemExit('Precificacao e sincronizacao ausentes; publicacao abortada.')
    salt=secrets.token_bytes(32)
    iv=secrets.token_bytes(12)
    ct=AESGCM(key(password,salt)).encrypt(iv,fresh.encode('utf-8'),AAD)
    payload={'format':'zeratta-catalog-aes256gcm-pbkdf2-v1','salt':b64encode(salt).decode(),'iv':b64encode(iv).decode(),'iterations':600000,'ciphertext':b64encode(ct).decode()}
    updated,n=re.subn(PATTERN,lambda m:m.group(1)+json.dumps(payload,separators=(',',':'))+m.group(3),current,flags=re.S)
    if n!=1:
        raise SystemExit('Falha ao atualizar o payload; arquivo nao foi alterado.')
    index.write_text(updated,encoding='utf-8')
    print('Catálogo protegido atualizado. Fretes e precos sincronizados permanecem no arquivo separado.')
    print('Faça commit/push apenas de index.html para a branch main.')

if __name__=='__main__':
    main()
