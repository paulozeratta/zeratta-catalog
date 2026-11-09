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


## Modelo de precificação UK | 08/11/2026

- O simulador UK usa os **122 produtos** do catálogo. O custo por produto é o maior `Shopify inventoryItem.unitCost` entre as variantes cadastradas; esse valor está em USD e **não é uma cotação EPROLO confirmada**.
- Conversão de planejamento: **US$ 1 = £0,74775**. Custo unitário simulado: `(custo USD × 0,74775) + £12`. O frete de **£12 por peça** é uma hipótese uniforme solicitada para a simulação; não altera os 92 fretes históricos cadastrados nem preenche os 30 fretes EPROLO pendentes.
- VAT: reserva financeira de **20%** retirada do preço bruto em todos os cenários. Para remessas acima de £135, a aplicação real das regras de import VAT e Customs Duty depende do importador e da documentação; esta reserva não substitui a validação fiscal.
- Pagamentos: provisão de **10% sobre o valor bruto + £0,05 por pedido**. É um colchão de planejamento para Stripe internacional, possível conversão cambial e taxa de transação de terceiro Shopify Basic; não é tarifa contratual confirmada. Conferir o extrato Stripe e a fatura de taxas Shopify antes de publicar preços.
- Aquisição: **CPA de £30 por pedido** no cenário base e **£35 por pedido** no cenário conservador. O CPA é cobrado por pedido, não por peça.
- Bundles atuais: **2 peças = 10% OFF; 3 peças = 15% OFF; 4+ peças = 25% OFF**.
- Regra de sugestão: preço mínimo de **£69,90**, arredondado para cima terminando em **.90**; o modelo busca pelo menos **10% de margem em pedido de 1 peça com CPA £30** e pelo menos **18% nos bundles de 2, 3 e 4 peças com CPA £35**. Produtos que exigem mais de £99,90 são sinalizados, sem reduzir silenciosamente a margem para caber na faixa.
- Resultado atual: **115 de 122 produtos** ficam entre £69,90 e £99,90; **7 exigem preço acima de £99,90** para cumprir as premissas. Exceções: Half zip sweater for men (£103,90); Padded Faux Leather Winter Jacket with Lapel Collar for Men (£124,90); Men's Hooded Faux Leather Winter Jacket with Zip Front (£119,90); Women's Button-Front Winter Jacket with Plush Collar (£108,90); Men's Hooded Faux Leather Winter Jacket with Padded Details (£108,90); Hooded Utility Puffer Jacket with White Duck Down Filling (£188,90); Deconstructed Faux Leather Zip Jacket with Relaxed Fit for Men (£109,90).
- Margem média simples dos produtos no CPA £35: **1 peça 3,7%; 2 peças 21,4%; 3 peças 27,1%; 4 peças 24,4%**. Com um mix hipotético de pedidos de 20% com 1 peça, 40% com 2, 25% com 3 e 15% com 4+, a margem média ponderada fica em **19,7% no CPA £35** e **23,7% no CPA £30**. Esse mix é uma hipótese de planejamento, não histórico de vendas; validar com a distribuição real de pedidos.
- Limite de £135: com os preços sugeridos, **39 produtos** ultrapassam o limite já no bundle de 2 peças; 83 ficam abaixo. Todos os bundles de 3 e 4+ peças ultrapassam £135 no valor intrínseco estimado (mercadorias após desconto, sem VAT). A HMRC aplica o limite ao valor da remessa, não a cada peça individualmente.
- A EPROLO informou que o envio padrão China–UK **não é DDP** e que, acima de £135, o destinatário normalmente responde por import VAT, Customs Duty e desembaraço. O modelo de margem não inclui duty nem taxa de desembaraço e não garante entrega sem cobranças adicionais. Não anunciar esses pedidos como impostos pagos sem uma solução DDP/prepaid confirmada.
- O cenário de 4+ é calculado com 4 peças, como mínimo conservador; pedidos de 5 ou mais diluem ainda mais o CPA por unidade, mas continuam sujeitos às regras de importação.
- Os preços são calculados dinamicamente nos cartões UK e incluídos no CSV de exportação. Este commit **não altera os preços publicados na Shopify nem os valores de referência de `data/pricing.json`**. O painel antigo em USD continua apenas como histórico.

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
