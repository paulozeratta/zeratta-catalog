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


## Modelo UK em GBP e sweaters orgânicos | 09/11/2026

- **Moeda financeira:** o custo cadastrado da EPROLO/Shopify continua em USD na fonte, mas todos os cálculos UK exibem o valor convertido para GBP. Taxa de planejamento: **US$1 = £0,74775**. Exemplo: US$8,77 = £6,56.
- **Frete de simulação:** £12 por peça em todos os produtos. O custo unitário no simulador é `(custo original USD × 0,74775) + £12`. Esta hipótese não substitui as cotações EPROLO individuais nem altera `data/freights.json`.
- **VAT:** reserva financeira de 20% incluída no preço bruto, exigindo validação da operação fiscal. Em remessas acima de £135, as regras de import VAT e duties podem diferir; custos adicionais de importação e clearance não estão no modelo. EPROLO Standard não é DDP.
- **Processamento:** provisão financeira de 10% do valor bruto em GBP mais £0,05 por pedido. É um cenário, não tarifa efetiva confirmada; checar Shopify Basic, Stripe, cartão internacional e conversão, sem dupla contagem de câmbio.
- **Google Ads:** conta de anúncios em USD. Para produtos anunciados, CPA base **US$40 = £29,91** e estresse **US$47 = £35,14** à taxa de planejamento. CPA aplicado **uma vez por pedido** e não por item.
- **Sweaters:** 22 produtos fora do Google Shopping. A simulação de venda puramente orgânica usa **CPA direto de £0**, mas um sweater adquirido após clique pago em anúncio de jaqueta participa de um pedido com CPA; atribuir o custo de aquisição **uma única vez à compra total**. O catálogo não reproduz ainda um simulador de cesto misto por combinação de SKUs.
- **Bundles:** 2 itens 10% OFF; 3 itens 15% OFF; 4+ itens 25% OFF. Simulação do último nível usa 4 unidades. Frete hipotético £12 por unidade, mesmo em bundles, até EPROLO confirmar consolidação.
- **Critério de precificação de itens anunciados:** preços terminando em .90, mínimo £69,90; alvo de 10% de margem em venda individual com CPA base e piso de 18% no bundle em estresse. Itens de alto custo podem ser sinalizados acima de £99,90 sem sacrificar as premissas.
- **Critério dos sweaters orgânicos:** preços terminando em .90, piso de £39,90, com pelo menos 18% de margem simulada no bundle de quatro peças e CPA direto zero. Para proteger os 25% de desconto nesse bundle, a margem de venda individual pode exceder 25%; não é possível garantir a faixa de 18–25% em toda quantidade simultaneamente mantendo esse desconto.
- **Resultado atualizado:** Sweaters £42,90 a £83,90 (22 produtos; preço médio £64,81); 100 produtos anunciáveis não-sweater com sugestões £69,90 a £188,90 (94 dentro de £69–99,90; 6 exceções). Esses preços são propostas do simulador, **não** preços aplicados na Shopify.
- **Exemplo:** High neck sweater loose knit sweater for women: custo original US$8,77 → £6,56 + £12 frete = £18,56; venda sugerida £42,90; VAT reservado £7,15 e provisão de taxas aproximada £4,34; contribuição por venda individual orgânica aproximadamente £12,85.
- **Fonte e edição:** despesas e contribuições UK exibidas em GBP, com valores originais USD preservados e editáveis. Preço final UK é editável e usa a chave de overrides `ukSalePriceGBP_v2`, agora lida corretamente; preços manuais e exportação CSV permanecem no catálogo. Este commit **não altera preços da Shopify** nem regrava `data/pricing.json`.

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
