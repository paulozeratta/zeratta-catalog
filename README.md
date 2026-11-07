# Zeratta Catalog

Catálogo financeiro da Zeratta, publicado por GitHub Pages a partir da branch **main**.

**Site:** https://paulozeratta.github.io/zeratta-catalog/

## Estrutura atual

- `index.html`: interface do catálogo com preço normal, desconto e preço promocional, simulação financeira, senha visual de entrada e sincronização.
- `data/products.js`: cadastro dos **100 produtos** (não criptografado). Mantém a constante `window.ZERATTA_PRODUCTS`.
- `data/freights.json`: fretes individuais e links EPROLO, com suas datas de atualização (não criptografado).
- `data/pricing.json`: preço normal de referência, desconto percentual e preço final por Shopify Product ID, com 100 registros. Formato por item: `{ "regularPrice": 149.90, "discountPct": 40.03, "salePrice": 89.90, "pricingUpdatedAt": 1794095764612 }` (não criptografado). Os valores de referência de simulação não comprovam descontos reais ou preços históricos de venda.
- `.github/workflows/pages.yml`: publica os quatro arquivos acima no GitHub Pages após commits na `main`.
- `data/freights.enc.json`: **arquivo histórico criptografado**, preservado apenas para recuperação; a aplicação atual não o utiliza.
- `scripts/encrypt_catalog.py`: utilitário histórico, **não utilizar** nesta versão. Não existe mais payload criptografado no `index.html`.

## Atualizações rápidas

Para alterar preços finais, preços de referência ou percentuais de desconto, edite `data/pricing.json`. Para alterar somente fretes e links EPROLO, edite `data/freights.json`. Para alterar a lista de produtos ou títulos sincronizados, edite `data/products.js`. Não precisa reconstruir o catálogo nem realizar etapas de criptografia. Um commit em `main` inicia a publicação. Os preços de referência (`compare-at`) do snapshot Shopify são preservados em `data/products.js`. O catálogo mostra descontos de simulação, sem que isso implique promoções publicadas na Shopify.

O formulário **Ativar salvamento permanente** também pode salvar edições feitas nos cards com um token fine-grained autorizado, limitado ao repositório e à permissão **Contents: Read and write**. O token fica somente na memória do navegador e nunca deve ser publicado no repositório. Sem token, as edições ficam locais no navegador.

Os campos de preços são **simulações financeiras**; eles não alteram automaticamente os valores na Shopify.

## Preços únicos definidos em 7 de novembro de 2026

- 100 produtos preservados com preço de venda único, sem desconto exibido nem preço riscado.
- Os valores anteriores de venda foram mantidos: 90 registros previamente precificados migrados para `price` e 10 valores originais de venda da captura Shopify adicionados ao cadastro.
- 92 fretes individuais preservados; 8 continuam sem frete cadastrado e sem contribuição calculável.
- Para os 92 produtos com custos e frete, o cenário padrão mantém CPA de US$ 40, processamento estimado de 6,1% + US$ 0,30 e contribuição média estimada de US$ 12,53. Impostos efetivos e outros custos não confirmados não estão incluídos por padrão.
- Nenhum preço da Shopify é alterado automaticamente pelo catálogo. A remoção da estratégia de desconto afeta somente os dados e a interface deste painel.

## Aviso de segurança

O GitHub Pages é público. A tela de senha é somente uma **barreira visual no navegador**, não uma autenticação do servidor; os arquivos JSON e JS são acessíveis diretamente pelo endereço público. O hash da senha está no HTML e pode sofrer ataques de tentativa offline, principalmente com uma senha curta. Não publique segredos, credenciais, chaves, tokens nem dados pessoais sensíveis.

## Manutenção e recuperação

Use o histórico de commits da branch `main` para reverter uma mudança. A publicação é atômica para os arquivos do pacote do GitHub Pages, mas gravações realizadas pelo navegador em `pricing.json` e `freights.json` geram commits separados. Faça backup antes de mudanças em lote e valide o resultado no site após a publicação.

Uma eventual atualização de custos da Shopify/EPROLO não é automática: para atualizar os dados dos produtos, importe um novo snapshot confiável em `data/products.js`, preservando os Shopify Product IDs.
