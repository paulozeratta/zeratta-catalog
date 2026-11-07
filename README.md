# Zeratta Catalog

Central de produtos e custos Zeratta, publicada no endereço padrão do GitHub Pages:

**https://paulozeratta.github.io/zeratta-catalog/**

## Publicação automática

Configuração oficial deste repositório: **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root)**. Uma atualização enviada à branch `main` publica a página novamente. O endereço permanece o mesmo.

**Não usar domínio personalizado.** O campo `Custom domain` deve estar vazio. Não criar arquivo `CNAME`. O domínio `zeratta.com.br` não participa da hospedagem deste catálogo.

## Privacidade

Este repositório é público, e seu `index.html` contém apenas uma versão do catálogo **criptografada com AES-256-GCM**, desbloqueada no navegador com a chave pessoal mantida fora do GitHub. **Nunca** publique o HTML de origem, credenciais do Shopify ou EPROLO, ou a chave de acesso.

Essa proteção criptografa o conteúdo, mas não oferece autenticação corporativa, controle por pessoa ou revogação individual.

## Atualizar o catálogo

1. Obtenha a versão atualizada do HTML original de uma fonte segura, como o arquivo mantido no Google Drive.
2. Instale a dependência em seu computador: `python -m pip install cryptography`.
3. Configure a mesma chave em `ZERATTA_CATALOG_PASSWORD` (não faça commit de senhas).
4. Rode `python scripts/encrypt_catalog.py caminho/do/catalogo-atualizado.html` para gerar o novo `index.html` criptografado na **raiz** do repositório.
5. Faça commit e push apenas de `index.html` para a branch `main`. O GitHub Pages publicará automaticamente a nova versão.

## Limites

- Atualizações no **GitHub** provocam novo deploy do Pages, mas alterações no catálogo da Shopify ou EPROLO **não são buscadas automaticamente** por este projeto estático.
- Os campos editados pelo usuário no navegador usam `localStorage`: são locais ao navegador e não se sincronizam entre dispositivos nem fazem commit no Git.
- Frete e demais valores não verificados da EPROLO devem continuar marcados como pendentes.
- O Pages é hospedagem estática normalmente disponível continuamente, mas não garante disponibilidade absoluta 24/7.

## Arquivos

`index.html`: painel protegido com chave, servido pelo GitHub Pages.

`scripts/encrypt_catalog.py`: gera novas versões cifradas a partir do HTML original.

`.nojekyll`: desativa processamento Jekyll na publicação pela branch.

`.gitignore`: impede o commit acidental de credenciais e HTMLs privados.
