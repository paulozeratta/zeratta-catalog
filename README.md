# Zeratta Catalog

Catálogo financeiro da Zeratta, publicado por GitHub Pages a partir da branch **main**.

**Site:** https://paulozeratta.github.io/zeratta-catalog/

## Estrutura atual

- `index.html`: interface do catálogo com preço normal, desconto e preço promocional, simulação financeira, senha visual de entrada e sincronização.
- `data/products.js`: cadastro dos **122 produtos** (não criptografado). Mantém a constante `window.ZERATTA_PRODUCTS`.
- `data/freights.json`: fretes individuais e links EPROLO, com suas datas de atualização (não criptografado).
- `data/pricing.json`: preços de referência, percentuais de desconto e preços finais de venda por Shopify Product ID, com 122 registros. Formato por item: `{ "regularPrice": 149.90, "discountPct": 40.03, "salePrice": 89.90, "pricingUpdatedAt": 1794095764612 }` (não criptografado). Preços normais de simulação não comprovam histórico real de vendas.
- `.github/workflows/pages.yml`: publica os quatro arquivos acima no GitHub Pages após commits na `main`.
- `data/freights.enc.json`: **arquivo histórico criptografado**, preservado apenas para recuperação; a aplicação atual não o utiliza.
- `scripts/encrypt_catalog.py`: utilitário histórico, **não utilizar** nesta versão. Não existe mais payload criptografado no `index.html`.


## Catálogo UK em GBP | 09/11/2026

- **Remoção de sweaters concluída:** os 22 produtos da categoria foram permanentemente excluídos da Shopify e removidos do catálogo. A busca Shopify por "sweater" confirmou inicialmente os mesmos 22 IDs. O arquivo `data/products.js` agora contém 100 produtos, renumerados de 1 a 100. Nenhum produto de jaqueta ou hoodie foi removido.
- **Limpeza de dados auxiliares:** os 22 registros correspondentes também foram retirados de `data/pricing.json` e `data/freights.json`. Restam 100 registros de preço e 92 registros de frete; os 8 fretes pendentes continuam sem estimativa inventada.
- **Moeda financeira:** o custo original da EPROLO/Shopify permanece em USD na fonte, mas a análise UK converte os custos para GBP a **US$1 = £0,74775**. Todas as despesas, taxas e margens exibidas no simulador UK são apresentadas em libras.
- **Frete de simulação:** £12 por peça em todos os produtos restantes. Custo unitário: `(custo original USD × 0,74775) + £12`. Esta hipótese não substitui as cotações reais da EPROLO.
- **VAT:** reserva financeira de 20% no preço bruto, sujeita à validação fiscal. Em remessas acima de £135, regras de import VAT e Customs Duty podem diferir; duty e desembaraço não estão incluídos. A EPROLO informou que o envio padrão não é DDP.
- **Processamento:** provisão de 10% sobre o valor bruto em GBP + £0,05 por pedido. É hipótese de planejamento, não tarifa contratual confirmada. Conferir Shopify Basic, Stripe, cartão internacional e conversão, sem dupla contagem cambial.
- **Google Ads:** a conta de anúncios é faturada em USD. CPA base **US$40 = £29,91** e CPA de estresse **US$47 = £35,14** à taxa de planejamento. CPA deve ser contabilizado uma vez por pedido, não uma vez por item.
- **Bundles:** 2 itens 10% OFF; 3 itens 15% OFF; 4+ itens 25% OFF. O cenário de 4+ usa quatro unidades. O frete de £12 por unidade permanece hipótese conservadora até a EPROLO confirmar o custo consolidado por pacote.
- **Critério de precificação dos produtos restantes:** preços terminando em .90, mínimo £69,90; alvo de 10% de margem em venda individual com CPA base e piso de 18% nos bundles com CPA de estresse. Produtos de alto custo podem ser sinalizados acima de £99,90.
- **Preços são propostas do simulador**, não preços publicados na Shopify. A exportação CSV contém apenas os 100 produtos restantes. A chave de preços manuais UK é `ukSalePriceGBP_v2`.

## Atualizações rápidas

Para alterar preços, referências de simulação ou descontos, edite `data/pricing.json`. Para alterar somente fretes e links EPROLO, edite `data/freights.json`. Para alterar a lista de produtos ou títulos sincronizados, edite `data/products.js`. Não precisa reconstruir o catálogo nem realizar etapas de criptografia. Um commit em `main` inicia a publicação. Os preços de referência (`compare-at`) da Shopify permanecem em `data/products.js`. A estrutura de descontos restaurada é uma simulação interna, não a comprovação de uma promoção válida na Shopify.

O formulário **Ativar salvamento permanente** também pode salvar edições feitas nos cards com um token fine-grained autorizado, limitado ao repositório e à permissão **Contents: Read and write**. O token fica somente na memória do navegador e nunca deve ser publicado no repositório. Sem token, as edições ficam locais no navegador.

Os campos de preços são **simulações financeiras**; eles não alteram automaticamente os valores na Shopify.

## Preços e descontos de simulação restaurados

- Os 100 produtos anteriores foram preservados. Foram importados 22 novos suéteres por Shopify Product ID, totalizando 122 produtos. Os 98 descontos antigos foram mantidos; os 22 suéteres novos foram cadastrados com desconto 0%, pois não há preço de referência válido na Shopify.
- Os preços finais dos 100 produtos anteriores foram preservados. As referências e descontos de 90 produtos vieram da versão aprovada antes da remoção dos descontos; nos outros 10, foram utilizados os preços de referência da captura Shopify quando disponíveis.
- 92 fretes individuais preservados; 30 produtos estão sem cotação EPROLO cadastrada (8 anteriores e 22 suéteres novos). Os 22 suéteres também aguardam correspondência exata com links de produto da EPROLO.
- Para os 92 produtos com custos e frete, o cenário padrão mantém CPA de US$ 40, processamento estimado de 6,1% + US$ 0,30 e contribuição média estimada de US$ 12,53. Não é possível apurar a contribuição dos 22 suéteres sem frete confirmado. Impostos efetivos e outros custos não confirmados não estão incluídos por padrão.
- Nenhum preço da Shopify é alterado automaticamente pelo catálogo. A restauração dos descontos modifica somente os dados e a interface deste painel; não anunciar referências fictícias como promoções reais no Google Shopping.

## Importação de suéteres em 07/11/2026

- 22 suéteres foram importados diretamente da Shopify por Product ID, todos ACTIVE.
- Cada registro contém título Shopify atual, título de origem inferido do slug do produto EPROLO, imagem, URL pública da Shopify, link do Admin, preço por variante e custo unitário da Shopify consultado em **todas as variantes**.
- A categoria `Sweaters` aparece automaticamente no filtro do catálogo.
- Os 22 produtos foram associados às URLs exatas informadas pelo usuário e conferidos por título, cores e características nas páginas EPROLO e na Shopify. Os vínculos estão em `data/products.js` e `data/freights.json`. O frete EPROLO para EUA permanece em branco até cotação real.
- Não foram criados descontos fictícios nem alterados preços na Shopify. O catálogo continua sendo uma simulação financeira.
- O total ficou em **122 produtos**, com **44 ACTIVE**, **78 DRAFT**, **114 vínculos EPROLO preenchidos**, **8 vínculos pendentes**, **92 fretes cadastrados** e **30 fretes pendentes**.

- Dos 24 links EPROLO enviados, dois ainda não correspondem a nenhum produto identificado na Shopify: [suéter masculino color-block](https://eprolo.com/app/product/mens-casual-old-money-style-color-block-lapel-collar-sweater) e [suéter feminino com botões](https://eprolo.com/app/product/european-and-american-style-knit-button-sweater-women-solid-color-polo-collar-casual-fashionable-womens-clothing). Nenhum dos dois foi vinculado a outro produto por aproximação.

## Aviso de segurança

O GitHub Pages é público. A tela de senha é somente uma **barreira visual no navegador**, não uma autenticação do servidor; os arquivos JSON e JS são acessíveis diretamente pelo endereço público. O hash da senha está no HTML e pode sofrer ataques de tentativa offline, principalmente com uma senha curta. Não publique segredos, credenciais, chaves, tokens nem dados pessoais sensíveis.

## Manutenção e recuperação

Use o histórico de commits da branch `main` para reverter uma mudança. A publicação é atômica para os arquivos do pacote do GitHub Pages, mas gravações realizadas pelo navegador em `pricing.json` e `freights.json` geram commits separados. Faça backup antes de mudanças em lote e valide o resultado no site após a publicação.

Uma eventual atualização de custos da Shopify/EPROLO não é automática: para atualizar os dados dos produtos, importe um novo snapshot confiável em `data/products.js`, preservando os Shopify Product IDs.
