# Auditoria de preços Zeratta | 7 de novembro de 2026

**Escopo:** 100 produtos, incluindo 90 jaquetas e 10 hoodies. Os hoodies foram auditados mas não propostos para alteração. Fonte: `data/products.js`, `data/freights.json`, `data/pricing.json` da branch `main`.

## Parâmetros pedidos

Contribuição simulada por pedido = preço de venda - custo do produto - frete do fornecedor - CPA - até US$ 6 de processamento. Usamos **CPA US$ 40** e processamento fixo conservador de **US$ 6**. O piso solicitado para esta análise é **US$ 5 de contribuição**, com margem de contribuição positiva. Não subtraímos imposto, devoluções, câmbio ou reservas adicionais nesta análise, mas despesas efetivas continuam existindo e precisam ser confirmadas. O CPA de US$ 40 é uma hipótese, não uma média observada: o usuário relatou uma única venda com CPA de US$ 36.

Para contribuir pelo menos US$ 5 a CPA US$ 40, o custo máximo de **produto + frete** é US$ 28,90 para preço US$ 79,90; US$ 38,90 para US$ 89,90; US$ 48,90 para US$ 99,90.

## Resultados

- 90 jaquetas catalogadas, 83 com custos e fretes preenchidos, **7 fretes pendentes**.
- Entre as 83 jaquetas calculáveis, **43 suportam redução de preço sem cair abaixo de US$ 5** no modelo; **35 estão atualmente abaixo de US$ 5** (essas não devem sofrer cortes adicionais); **5 já estão no menor degrau de preço definido**.
- Preço mínimo por degrau para atingir ao menos US$ 5 com CPA US$ 40, **se todas as 83 fossem reprecificadas**: 11 a US$ 79,90; 47 a US$ 89,90; 20 a US$ 99,90; 5 acima de US$ 99,90. Isso também exigiria **aumentar preços de 35 produtos**, o que não faz parte da proposta de redução.
- Cenário de CPA US$ 35, mesmo piso de US$ 5: 32 a US$ 79,90; 37 a US$ 89,90; 9 a US$ 99,90 e 5 acima.
- Proposta **sem aumentos**: reduzir 43, preservar 35 sob alerta de margem, manter 5, deixar 7 sem frete pendentes e manter os 10 hoodies inalterados. 
- Todos os preços calculados são simulações internas e **não foram aplicados à Shopify nem ao catálogo**.

## Exemplos de reduções viáveis

| Produto | Custo total | Preço atual | Preço proposto | Contribuição com CPA 40 e processamento 6 |
|---|---:|---:|---:|---:|
| Jaqueta acolchoada masculina de inverno (ID 15578342326560) | 35,46 | 109,90 | **89,90** | 8,44 |
| Jaqueta feminina de couro sintético com forro de pelo (15578330890528) | 34,76 | 109,90 | **89,90** | 9,14 |
| Jaqueta unissex Shearling Motorcycle (15578346193184) | 31,66 | 99,90 | **89,90** | 12,24 |
| Jaqueta curta feminina de algodão (15578341245216) | 26,02 | 99,90 | **79,90** | 7,88 |
| Jaqueta acolchoada masculina de gola alta (15578342981920) | 23,41 | 89,90 | **79,90** | 10,49 |
| Jaqueta masculina denim com forro (15578345439520) | 43,38 | 119,90 | **99,90** | 10,52 |
| Jaqueta de gola em pelo sintético (15578318962976) | 36,80 | 109,90 | **89,90** | 7,10 |

## Advertências

1. Os fretes e custos são os valores **registrados no catálogo**, não uma reconfirmação de cotação atual da EPROLO por tamanho/variante.
2. 78 produtos do catálogo estavam marcados como **DRAFT** quando a fonte foi consultada. Reprecificar um produto em rascunho não o torna vendável na Shopify.
3. Caso a promoção exiba preço regular e desconto de 40%, qualquer alteração de preços promocionais deve recalcular a porcentagem efetiva e utilizar preços de referência reais, não fictícios.
4. Os 35 itens com contribuição inferior a US$ 5 no cenário US$ 40 precisam de redução de custo, CPA menor ou revisão de preço; não baixar automaticamente.
5. A faixa US$ 79,90 a US$ 99,90 encontra referências em produtos de Zara e Uniqlo nos EUA, mas qualidade, tecidos, garantia, entrega e reputação devem ser comparados individualmente; esse levantamento financeiro não equivale a um benchmark de SKU.
 
**Arquivo completo:** [CSV detalhado dos 100 produtos](./proposta-precos-2026-11-07.csv).
