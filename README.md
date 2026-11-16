# ZERATTA · Catálogo USA / USD

Catálogo e simulador financeiro interno da Zeratta. Página publicada pela branch **main** do repositório GitHub Pages.

- Catálogo: https://paulozeratta.github.io/zeratta-catalog/
- Calculadora de precificação: https://paulozeratta.github.io/zeratta-catalog/precificacao/

## Mercado e moeda

O mercado principal é **Estados Unidos**. Toda a operação monetária apresentada neste painel é **USD (dólar americano)**. Os preços de varejo e os custos são obtidos da Shopify configurada em USD. Os valores numéricos de frete mantidos no arquivo \`data/freights.json\` estão denominados em USD, mas **não representam cotações verificadas para os Estados Unidos**. Confirmar rota e variante na EPROLO.

Não existe conversão de moedas nesta aplicação. Custos, preço, taxas, CPA e resultado financeiro são expressos diretamente em USD.

## Arquivos operacionais

- \`index.html\`: catálogo, edição local, importação e exportação, simulação por produto.
- \`precificacao/index.html\`: calculadora independente, com custo de produto e custo do frete (ou custo total direto), e frete cobrado do cliente como receita adicional.
- \`data/products.js\`: produtos e preços atuais, obtidos de Shopify em 16/11/2026.
- \`data/pricing.json\`: valores de preço normal, promocional e descontos em USD, sincronizados com o catálogo.
- \`data/freights.json\`: fretes individuais e links EPROLO; o status de destino precisa ser validado.
- \`.github/workflows/pages.yml\`: publica a aplicação no GitHub Pages.

## Cálculo da calculadora

Parâmetros iniciais editáveis: CPA **US$35 por pedido**, processamento **5,99%** da receita total, tarifa fixa **US$0**, reserva tributária **0%**, despesas adicionais **US$0**, lucro-alvo **US$12 por pedido** e **frete cobrado ao cliente US$0 por pedido** até ser informado. O frete cobrado representa **receita adicional**, não custo de origem.

```text
Receita total = preço do produto + frete cobrado do cliente
Preço teórico do produto = (custo do produto + custo de envio + CPA + tarifa fixa + outras despesas + lucro-alvo)
                           / (1 - % processamento - % reserva tributária) - frete cobrado do cliente
Lucro projetado = receita total - custo do produto - custo de envio - CPA
                 - processamento sobre receita total - reserva tributária sobre receita total
                 - outras despesas
```

A recomendação arredonda para cima para a próxima terminação **.90**. O preço pode ser digitado manualmente. Para frete grátis, informar **US$0** no campo de frete cobrado. Na calculadora independente, esse parâmetro é salvo no navegador junto dos demais. Não há alteração automática na Shopify.

## Catálogo financeiro

O catálogo utiliza preços atualmente registrados na Shopify em USD. Na simulação do catálogo, o cenário inicial é CPA de **US$35**, processamento de **5,99%**, reserva tributária **0%**, lucro-alvo de **US$12**, frete de origem substituto de **US$12** quando não existe valor individual e **frete cobrado do cliente de US$0** até alteração. O valor cobrado é editável no catálogo, salvo no navegador e considerado na receita, no preço sugerido, nas taxas percentuais, no lucro, na margem e no CSV. O frete substituto é **apenas um cenário**, não uma cotação confirmada.

As simulações não incorporam automaticamente direitos de importação, incidências fiscais específicas, chargebacks ou custos não informados. Conferir com fontes reais antes de definir preços.

## Edição e sincronização

O painel mantém ajustes locais em um namespace novo, específico da configuração USA/USD, para não reutilizar parâmetros desatualizados. É possível usar um token GitHub com permissão de escrita somente no repositório para gravar fretes, links e preços simulados. A edição local não muda os preços Shopify.

## Validações pendentes

- Cinco produtos possuem mais de 50 variantes: a captura consultou as primeiras 50 e o maior custo de todas as variantes precisa ser conferido.
- Fretes registrados historicamente em USD ainda não validam entrega nos Estados Unidos.
- Links EPROLO sem correspondência exata continuam pendentes, sem associações artificiais.
