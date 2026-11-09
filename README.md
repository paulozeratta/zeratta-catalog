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


## Reprecificação da Shopify UK | 09/11/2026

- **Operação realizada:** 100 produtos e **1.606 variantes** tiveram preços atualizados em GBP diretamente no Admin Shopify. A leitura de volta confirmou os mesmos preços mínimos e máximos em todos os 100 produtos, sem erros. Todos estão `ACTIVE` e com `onlineStoreUrl` disponível.
- **Critério aprovado:** meta de contribuição de aproximadamente **20,69% do preço bruto pago pelo consumidor** em um pedido individual, depois de VAT incluído, custo do produto convertido, frete e CPA estimados, e taxas de pagamento estimadas. Não confundir com margem percentual sobre receita líquida sem VAT.
- **Fórmula:** `preço bruto mínimo = ((custo numérico do produto × 0,74775) + 8,10 + 25,00) / (1 - 1/6 - (3,66/79,90) - 0,2069)`. Preços são arredondados para cima e terminam em `.90`, com piso de £69,90.
- **Custos e moeda:** o campo `inventoryItem.unitCost` da Shopify é rotulado pela API como `GBP`, mas a Zeratta informou que os números de origem representam **custos cobrados em USD pela EPROLO**. O cálculo considera o valor numérico como USD e converte a `0,74775 GBP por USD`. Este conflito de rótulo é um risco que precisa ser reconciliado com faturas reais da EPROLO antes de considerar as margens garantidas.
- **Frete:** **£8,10 por peça**, assumido uniformemente para o cálculo por solicitação do comerciante após o exemplo de uma jaqueta. Não é o custo real confirmado de todas as jaquetas. O arquivo `data/freights.json` preserva 92 registros históricos; estes não foram substituídos nem usados como se fossem cotações UK.
- **Google Ads:** **£25 de CPA por pedido**, aproximadamente US$33,43 na taxa usada, embora a conta Google Ads seja faturada em USD. Não se cobra CPA fixo por produto; a despesa depende do investimento e da atribuição real. Stress test opcional: CPA £30.
- **Stripe:** taxa estimada proporcional de `3,66/79,90`, cerca de **4,58% do preço bruto**. Não considera confirmação de possíveis cobranças adicionais Shopify Basic, encargos reais de conversão, chargebacks ou devoluções.
- **VAT:** reserva de VAT incluído de **20%** calculada como `preço bruto / 6` para vendas sujeitas à alíquota padrão; regras de import VAT e duty acima de £135 por remessa exigem tratamento separado.
- **Preços publicados:** **94 produtos na faixa £69,90–£99,90**, **6 exceções acima de £99,90**. O preço médio é £81,81, com mediana de £79,90 e intervalo £69,90–£163,90.
- **Margem unitária estimada:** média simples por produto **21,34%** sobre o preço bruto, mínimo **20,69%**, máximo **27,54%**; quatro hoodies ficam acima da meta de 25% devido ao preço mínimo de £69,90. Ao elevar CPA de £25 para £30, a margem média unitária cai para 15,12%.
- **Bundles por produto idêntico:** descontos de 2 itens 10% OFF, 3 itens 15% OFF e 4+ itens 25% OFF permanecem. Margens médias simuladas com CPA £25 uma vez por pedido: 2 unidades **32,21%**, 3 unidades **35,56%**, 4 unidades **33,25%** sobre o bruto. Pedidos reais com SKUs mistos e consolidação de frete podem divergir.
- **Exceções de preços:** `Padded Faux Leather Winter Jacket with Lapel Collar for Men` £114,90; `Men's Hooded Faux Leather Winter Jacket with Zip Front` £111,90; `Women's Button-Front Winter Jacket with Plush Collar` £102,90; `Men's Hooded Faux Leather Winter Jacket with Padded Details` £102,90; `Hooded Utility Puffer Jacket with White Duck Down Filling` £163,90; `Deconstructed Faux Leather Zip Jacket with Relaxed Fit for Men` £103,90.
- **Arquivos sincronizados:** `data/products.js` contém os 100 preços reais atualizados, status, URLs e metadados da captura; `data/pricing.json` inclui `ukSalePriceGBP_v2` com o preço publicado de todos os 100 produtos, preservando os campos históricos legados de preços em USD; `index.html` mostra os valores UK reais no card e recalcula lucro, VAT, CPA e bundles com as novas premissas. O CSV UK reflete o modelo de £25 de CPA.
- **Atenção:** editar manualmente o preço GBP no catálogo altera a simulação e pode atualizar `data/pricing.json`, mas **não modifica a Shopify**. Os 100 preços iniciais desta revisão, sim, foram publicados via Shopify Admin API.
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
