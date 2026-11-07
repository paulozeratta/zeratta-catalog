# Zeratta Catalog

Painel de produtos e custos Zeratta preparado para **GitHub Pages**, com publicação automática a cada push para `main`.

## Privacidade

O HTML original contém custos de produto, margens, títulos internos e links administrativos. **GitHub Pages é público mesmo quando o repositório é privado.** Por isso, `site/index.html` inclui apenas o painel criptografado com AES-256-GCM; o conteúdo é desbloqueado no navegador usando uma chave de acesso longa, mantida **fora do repositório**. Não há senha, chave privada nem texto do catálogo em claro no Git.

Este método protege a confidencialidade do conteúdo criptografado contra acesso sem a chave, mas não equivale a autenticação corporativa, controle de usuários, revogação individual ou proteção de metadados. Não coloque segredos reais de API nas páginas.

## Publicação inicial

1. Crie um repositório chamado `zeratta-catalog` na conta `paulozeratta`, preferencialmente **privado** se o seu plano permitir usar Pages em repositórios privados. Se o plano não permitir, o repositório pode ser público porque contém apenas a versão criptografada e os arquivos de infraestrutura.
2. Faça upload **do conteúdo desta pasta** para a branch `main`, incluindo os diretórios ocultos `.github` e `.nojekyll`.
3. Em **Settings → Pages → Build and deployment → Source**, escolha **GitHub Actions**.
4. A workflow `.github/workflows/pages.yml` publica o diretório `site/` automaticamente quando ocorrer push em `main`. Aguarde a execução verde em **Actions** antes de usar o endereço.
5. O endereço esperado, após habilitação e publicação, é `https://paulozeratta.github.io/zeratta-catalog/`; valide o link real em **Settings → Pages**. O endereço não é garantido antes do deploy.

## Atualização sem expor dados financeiros

1. Obtenha uma nova versão HTML do painel a partir do arquivo-fonte seguro (atualmente no Google Drive). **Não** inclua esse HTML bruto no Git nem nos arquivos publicados.
2. No computador com Python: `python -m pip install cryptography`.
3. Configure a mesma senha original em `ZERATTA_CATALOG_PASSWORD`, por exemplo `export ZERATTA_CATALOG_PASSWORD='...';` em sistemas Unix, ou `$env:ZERATTA_CATALOG_PASSWORD='...'` no PowerShell. Nunca comite a senha e não a inclua em Actions logs.
4. Execute `python scripts/encrypt_catalog.py /caminho/arquivo_original.html`.
5. Revise o resultado, faça `git add site/index.html && git commit -m 'Atualiza catálogo' && git push origin main`.
6. O GitHub Actions publicará automaticamente a versão nova; o mesmo link e a mesma chave de acesso continuam válidos.

## Atualizações e limites

- Mudanças enviadas ao GitHub em `main` são publicadas automaticamente. **Alterações feitas nos campos do site** (frete, notas, preços simulados) usam `localStorage` e ficam **apenas naquele navegador**, não sincronizam com o Git nem entre aparelhos.
- A página é um **snapshot** dos produtos da Shopify; não recebe alterações novas da Shopify/EPROLO sozinha.
- O painel indica fretes da EPROLO como pendentes quando não verificados; não converter valores faltantes em zero.
- GitHub Pages não tem SLA de disponibilidade 24/7, mas é hospedagem estática projetada para disponibilidade contínua, sujeita a manutenção, indisponibilidades e políticas do serviço.
- Perder a senha significa não conseguir abrir a versão criptografada. Guarde o arquivo de chave em local seguro, fora do repositório. Para trocar senha, use o script com uma nova senha e republicação.

## Estrutura

```
site/index.html                     Página criptografada e tela de acesso
site/.nojekyll                     Evita processamento Jekyll
.github/workflows/pages.yml        GitHub Actions: publicação a cada push em main
scripts/encrypt_catalog.py         Utilitário de atualização do HTML cifrado
README.md                          Instruções e restrições
.gitignore                         Impede commits acidentais de chaves/senhas
```

O repositório **não contém** tokens Shopify ou EPROLO nem chaves de acesso.
