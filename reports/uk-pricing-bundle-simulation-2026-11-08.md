# Zeratta UK | Reprecificação por margem, 19% a 26% | 08/11/2026

**Nova regra solicitada: margem de contribuição entre 19% e 26% depois de VAT provisionado, Stripe estimada, Google Ads e produto+frete. Substitui a simulação anterior de US$15 fixos.**

**Status: SIMULAÇÃO PROVISÓRIA. NENHUM PREÇO FOI ALTERADO NA SHOPIFY.** Este relatório contém estimativas e não constitui recomendação para publicação sem cotação logística para o Reino Unido.

## Decisões e modelo
- Meta por pedido: 19%-26% de margem de contribuição sobre **receita líquida de VAT**. Alvo central: **22% na venda de 1 peça**. Piso de **19%** para todos os descontos de cesta.
- Descontos automáticos confirmados na Shopify Admin em 08/11/2026: 1 peça 0%; 2 peças 10%; 3 peças 20%; 4+ peças 30%. Término atual: 01/12/2026 07:59:59 UTC, salvo alteração. Não alterados.
- CPA Google Ads **US$35 por pedido**, não por unidade. Custo de fornecedor e frete repetem por unidade; CPA e tarifa fixa Stripe 1x por checkout.
- Câmbio de referência **US$1 = £0.75**, acrescido de **3% de folga nos custos** (taxa efetiva **US$1 = £0.7725**). É referência indicativa; atualizar antes de publicar.
- VAT: reserva prudencial de **20% sobre preços VAT-exclusive** (equivale a deduzir 1/6 do preço VAT-inclusive). A incidência correta varia conforme origem, valor de remessa, papel do importador e responsabilidade fiscal.
- Stripe: **6.1% sobre valor bruto** + reserva **US$0.30 por pedido**, hipótese de custo ainda não confirmada contratualmente. A página Stripe Brasil informa **3,99% + R$0,39 para cartões domésticos e +2 pontos percentuais para cartões internacionais**; o contrato e condições de conversão da Zeratta precisam de verificação.
- Arredondamento para preços comerciais de **£...4.90 ou £...9.90**, sempre para cima.
- **Definição da margem**: (venda líquida de VAT − taxas de processamento sobre o bruto − custo produto − frete − CPA − tarifa fixa) / venda líquida de VAT. É margem de contribuição operacional, não lucro líquido contábil (faltam devoluções, tributação empresarial, overhead etc.).

## Fórmula auditável
Para um produto com custo **C = produto+frete (USD)**, n unidades, desconto d, preço listado P (GBP), FX = £0.7725/USD, VAT = 20%, Stripe percentual s = 6.1%, CPA=US$35 e taxa fixa=US$0.30:

`faturamento_liquido_GBP = n * P * (1-d) / 1.20`

`lucro_contribuicao_GBP = faturamento_liquido_GBP - n*P*(1-d)*0.061 - (n*C + 35 + 0.30)*0.7725`

`margem = lucro_contribuicao_GBP / faturamento_liquido_GBP`

`preco_minimo(P) = FX * [C + (CPA+taxa_fixa)/n] / [(1-d)*((1-margem)/1.20 - taxa_stripe)]`

`P_proposto = arredondar_para_cima(max(P[1 peça, margem22%], P[1,2,3,4 peças, margem19%]))`

Para 5+ peças com desconto constante de 30%, a parcela de CPA por item diminui. Usar n=4 é o caso de maior custo fixo por item nessa faixa.

## Resultado de 122 produtos do snapshot do catálogo
- Total: **122 SKUs de produto** (uma linha por Shopify Product ID); **92** com frete histórico numérico dos **EUA**, **30** sem qualquer frete numérico.
- **0 fretes britânicos confirmados** nesse snapshot. **Nenhum preço é definitivo.**
- 17 propostas provisórias de produtos ACTIVE; demais produtos com frete são DRAFT.
- Faixa nominal proposta (92 calculáveis): **£64.90 a £209.90**.
- Margem média *não ponderada por produto*, para cestas homogêneas de 1/2/3/4 unidades: **23.90% / 35.57% / 35.68% / 31.67%**. NÃO é a margem média real da loja, pois faltam distribuição dos pedidos por quantidade, taxas realizadas e mix de SKUs.
- Margem mínima modelada por cesta homogênea de 1/2/3/4 unidades: **22.04% / 28.85% / 25.92% / 19.27%**. Condicional à validade dos fretes/tributos/Stripe adotados.
- 3 produtos cujo preço é governado por proteção de bundle; 3 têm margem modelada de 1 peça acima de 26% (sobretudo por restrição de bundle ou arredondamento de preços).
- O teto de 26% é uma **faixa média desejada**, não um teto estrito por pedido. Não se pode assegurar média final 19%-26% sem conhecer a proporção de pedidos com 1/2/3/4+ itens e o mix de produtos.

## Exemplos em libras (PROVISÓRIOS)
| Produto ID | Produto | Custo produto+frete EUA (US$) | Preço UK sugerido | Margem 1 peça | Margem 4 peças -30% |
|---|---|---:|---:|---:|---:|
| 15578346193184 | Unisex Fleece-Lined Winter Jacket with Turn-Down Collar | 31.66 | £89.90 | 23.63% | 33.04% |
| 15578342981920 | Men's Lightweight Padded Winter Jacket with Stand Collar | 23.41 | £79.90 | 24.56% | 39.25% |
| 15551052054816 | Hooded Utility Puffer Jacket with White Duck Down Filling | 106.15 | £209.90 | 30.21% | 20.14% |
| 15578329153824 | Padded Faux Leather Winter Jacket with Lapel Collar for Men | 68.60 | £139.90 | 23.83% | 19.39% |
| 15551027937568 | Men's Long Sleeve Pullover Hoodie with Relaxed Fit | 18.29 | £74.90 | 26.35% | 44.74% |

**Alerta relevante:** A *Hooded Utility Puffer Jacket with White Duck Down Filling* (ID 15551052054816) está publicada na Shopify por **£129.00** conforme consulta Admin em 08/11/2026; o modelo aponta **£209.90** usando custo+frete histórico EUA de US$106.15 para garantir 19% no bundle de 4 peças. Essa diferença não justifica aumento automático: revisar frete UK, custos, competitividade e eventual elegibilidade para o bundle.

## Importação e riscos
O limite de **£135** é calculado com base no **valor total da remessa**, não em cada item individual. Em remessas acima desse limite, aplicam-se regras normais de VAT de importação e alfândega; nem encargos de desembaraço, nem duty, nem definição de importer of record/DDP foram confirmados e **não estão quantificados** nesta simulação. Fonte: https://www.gov.uk/guidance/charging-vat-on-goods-sold-direct-to-customers-in-the-uk

As taxas oficiais de referência para Stripe Brasil foram consultadas em https://stripe.com/br/pricing, mas **a taxa efetiva do contrato Zeratta não foi verificada**.

Permanecem fora do cálculo: devoluções/reembolsos, custos de suporte, overhead, imposto sobre lucro, tributos no Brasil, sazonalidade real do CPA, duty/desembaraço, custo efetivo da remessa britânica e tarifas adicionais de FX além da proteção de 3%. Não chamar isso de lucro líquido contábil.

## Etapas para publicar
1. Cotar fretes britânicos EPROLO por SKU/variante e verificar se o fornecedor oferece DDP para pedidos acima de £135.
2. Determinar quem recolhe VAT e encargos de importação em cestas de 1, 2, 3, 4+ itens.
3. Confirmar processamento Stripe efetivo da loja em GBP e taxas de conversão/liquidação.
4. Recalcular todos os 122 produtos, avaliar competitividade, e simular mix real de pedidos; a meta 19%-26% é **margem média realizada**, não apenas preço por SKU.
5. Validar política e operação dos descontos progressivos e só então atualizar Shopify mediante autorização apropriada.

**Tabela detalhada**: [CSV com 122 produtos](./uk-pricing-bundle-simulation-2026-11-08.csv).

**Esta versão revoga/substitui o objetivo anterior de US$15 de contribuição fixa; o histórico de commits preserva o original.**
