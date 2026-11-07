#!/usr/bin/env python3
"""Atualiza o payload criptografado do site sem publicar HTML confidencial.

Uso:
  export ZERATTA_CATALOG_PASSWORD='CHAVE_AQUI'
  python scripts/encrypt_catalog.py /caminho/painel-original.html

Dependência: pip install cryptography
"""
from pathlib import Path
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from base64 import b64encode
import json, os, re, secrets, sys
if len(sys.argv)!=2:
    raise SystemExit('Uso: python scripts/encrypt_catalog.py painel.html')
secret=os.environ.get('ZERATTA_CATALOG_PASSWORD','').strip()
if len(secret)<24:
    raise SystemExit('Defina ZERATTA_CATALOG_PASSWORD com ao menos 24 caracteres; nunca salve a senha no Git.')
source=Path(sys.argv[1])
if not source.is_file(): raise SystemExit(f'Arquivo nao encontrado: {source}')
base=Path(__file__).resolve().parent.parent
index=base/'index.html'
html=index.read_text(encoding='utf-8')
salt=secrets.token_bytes(32);iv=secrets.token_bytes(12)
kdf=PBKDF2HMAC(algorithm=hashes.SHA256(),length=32,salt=salt,iterations=600000)
key=kdf.derive(secret.encode())
ct=AESGCM(key).encrypt(iv,source.read_bytes(),b'zeratta-catalog-v1')
obj={'format':'zeratta-catalog-aes256gcm-pbkdf2-v1','salt':b64encode(salt).decode(),'iv':b64encode(iv).decode(),'iterations':600000,'ciphertext':b64encode(ct).decode()}
pattern=r'(<script type="application/json" id="encrypted-data">)(.*?)(</script>)'
html,n=re.subn(pattern,lambda m:m.group(1)+json.dumps(obj,separators=(',',':'))+m.group(3),html,flags=re.DOTALL)
if n!=1: raise SystemExit('Payload criptografado nao encontrado; nenhuma alteracao feita.')
index.write_text(html,encoding='utf-8')
print(f'Atualizado {index} com {len(ct)} bytes criptografados.')
