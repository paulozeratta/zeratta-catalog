# Zeratta Catalog

Catálogo financeiro da Zeratta, publicado por GitHub Pages a partir da branch **main**.

**Site:** https://paulozeratta.github.io/zeratta-catalog/

## Calculadora independente de precificação (09/11/2026)

- **Entrada:** informe produto e frete em **USD (US$)**, ou apenas o **custo total em USD (US$)**. Digitar o total o torna prioritário para não somar o custo duas vezes; voltar a editar produto/frete ativa o modo detalhado.
- **Página independente:** `precificacao/index.html` publicada em https://paulozeratta.github.io/zeratta-catalog/precificacao/ , com link "Calculadora de precificação" no cabeçalho de `index.html`. O acesso segue a barreira visual existente na página do catálogo e não constitui autenticação de servidor.
- **Câmbio:** a página consulta diariamente uma taxa referencial **1 GBP = X USD e Y BRL** em `https://open.er-api.com/v6/latest/GBP` e permite edição manual. Exibe fonte e momento da última atualização; quando não há câmbio válido, não calcula usando uma taxa inventada. A fonte exige atribuição, presente na página.
- **Preço de venda manual:** o campo **Preço de venda Zeratta · GBP (£)** é editável. A edição ativa modo manual e recalcula VAT, Stripe, Simples, lucro GBP e margem percentual com o preço digitado. O preço recomendado pela meta continua visível, e **Usar preço sugerido** restaura a precificação automática. Os valores não são enviados à Shopify.
- **Premissas ajustáveis:** CPA em **USD/pedido** (padrão US$35), Stripe variável (% do preço bruto GBP, padrão 4,58%) e taxa fixa opcional em USD (padrão US$0), Simples (**4% do faturamento convertido em BRL**) e margem-alvo (**20,69% sobre o preço bruto em GBP**). Os ajustes são guardados localmente no navegador.
- **VAT:** 20% incluso no preço final em GBP, reservado como **preço bruto/6** (e não 20% do bruto). Reservas tributárias são estimativas, não apuração efetiva.
- **Fórmula do preço bruto GBP:** `P = ((custoTotalUSD + CPA_USD + StripeFixaUSD) / USD_por_GBP) / (1 - 20/120 - Stripe% - Simples% - MargemAlvo%)`. Exibe a primeira terminação **.90** igual ou acima do valor calculado. O relatório detalha custos, CPA, VAT, Stripe e Simples nas respectivas moedas e lucro/margem finais em GBP.
- **Limites:** não altera Shopify, não grava custos no catálogo, nem inclui automaticamente tarifas de importação, devoluções, spread cambial ou encargos adicionais. A alíquota efetiva do Simples e a incidência de VAT dependem da operação e precisam ser verificadas.
- **Deploy:** `.github/workflows/pages.yml` copia também `precificacao/index.html` para `public/precificacao/index.html`.

## Estrutura atual

- `index.html`: interface do catálogo com preço normal, desconto e preço promocional, simulação financeira, senha visual de entrada e sincronização.
- `data/products.js`: cadastro dos **122 produtos** (não criptografado). Mantém a constante `window.ZERATTA_PRODUCTS`.
- `data/freights.json`: fretes individuais e links EPROLO, com suas datas de atualização (não criptografado).
- `data/pricing.json`: preços de referência, percentuais de desconto e preços finais de venda por Shopify Product ID, com 122 registros. Formato por item: `{ "regularPrice": 149.90, "discountPct": 40.03, "salePrice": 89.90, "pricingUpdatedAt": 1794095764612 }` (não criptografado). Preços normais de simulação não comprovam histórico real de vendas.
- `.github/workflows/pages.yml`: publica os quatro arquivos acima no GitHub Pages após commits na `main`.
- `data/freights.enc.json`: **arquivo histórico criptografado**, preservado apenas para recuperação; a aplicação atual não o utiliza.
- `scripts/encrypt_catalog.py`: utilitário histórico, **não utilizar** nesta versão. Não existe mais payload criptografado no `index.html`.


## Conferência dos links EPROLO | 09/11/2026

- **127 de 137 produtos com link EPROLO vinculado** (92,70%); 10 sem URL confirmada. Não há links EPROLO duplicados ou Shopify Product IDs duplicados.
- **Cinco URLs verificadas nesta retomada**: Little Chanel White Hooded Waist-Cinching Puffer, Men's Plush Cotton Fabric Jacket, Women's Style Short Stand Collar Quilted Puffer, Women's Short Warm Puffer with Fur Collar e Women's Cropped Hooded Puffer (nome editorial Zeratta). As correspondências foram confirmadas por descrição, tamanhos, cores, custos e/ou medidas.
- **10 vínculos pendentes**: 8 da importação de 09/11 e 2 produtos anteriores. Busca pública na EPROLO, variantes Shopify e arquivos históricos no Google Drive foram consultados, mas as URLs candidatas restantes não conferiram em descrição, cores ou tamanhos. Não inventar URLs a partir de nomes/handles da Shopify, que em geral redirecionam para login na EPROLO.
- **URL válida enviada pelo lojista mas sem vínculo seguro**: `https://eprolo.com/app/product/womens-mid-length-padded-puffer-jacket-loose-fit-thickened-winter-quilted-coat-plus-size`. Seus detalhes não correspondem inequivocamente a nenhum produto ainda pendente.
- **Próximo passo para conclusão**: exportar `My Products`/`Imported Products` da conta EPROLO com Product ID e link real, ou abrir EPROLO autenticada em ChatGPT Work. A navegação automatizada pública via TinyFish ficou bloqueada por saldo insuficiente do serviço; pesquisas públicas adicionais não trouxeram correspondência confiável para os 10.
- Preços, fretes e produtos da Shopify não foram alterados nesta conferência de fornecedores.

### Produtos que ainda precisam de URL EPROLO

| Shopify Product ID | Produto | Origem |
| --- | --- | --- |
| [15589739594016](https://admin.shopify.com/store/testezeratta/products/15589739594016) | Autumn and winter cotton jacket, unisex cotton jacket, leather jacket, bread jacket, high-quality thickened cotton jacket | Importação 09/11 |
| [15589739528480](https://admin.shopify.com/store/testezeratta/products/15589739528480) | Knitted cotton jacket versatile jacket | Importação 09/11 |
| [15589736579360](https://admin.shopify.com/store/testezeratta/products/15589736579360) | Winter New Thickened Casual Down Coat For Women Winter Women's Coat Women's Puffer Warm Clothes For Women Hot Clothes For Women | Importação 09/11 |
| [15589731500320](https://admin.shopify.com/store/testezeratta/products/15589731500320) | Wool collar jacket short cotton jacket | Importação 09/11 |
| [15589731402016](https://admin.shopify.com/store/testezeratta/products/15589731402016) | Short jacket | Importação 09/11 |
| [15589731107104](https://admin.shopify.com/store/testezeratta/products/15589731107104) | Korean Plaid Down Jacket For Women Jacquard Thick Duck Down Zip Up Hooded Jacket For Winter Puffer Outwear | Importação 09/11 |
| [15589729042720](https://admin.shopify.com/store/testezeratta/products/15589729042720) | Stand Collar Thickened Cotton Coat Unisex Oversized Short Puffer Jacket | Importação 09/11 |
| [15589728420128](https://admin.shopify.com/store/testezeratta/products/15589728420128) | Mountain Style Outdoor Puffer Jacket Trendy Loose Stand Collar Warm Thick Cotton Coat for Couples, Versatile Design | Importação 09/11 |
| [15578320437536](https://admin.shopify.com/store/testezeratta/products/15578320437536) | Men's Hooded Faux Leather Winter Jacket with Padded Details | Anterior |

## Reconciliação Shopify → catálogo | 09/11/2026, 16h33 BRT

- **Shopify ao vivo:** 138 produtos `ACTIVE` encontrados; 100 já estavam no HTML e 38 foram adicionados à Shopify depois da captura anterior. Nenhum dos 100 desapareceu.
- **Prevenção rigorosa de duplicidade:** os produtos ID `15589744378144` e `15589744443680` compartilham exatamente o mesmo título, a mesma imagem principal e os mesmos 12 SKUs, portanto são cópias do mesmo puffer masculino. **Somente o mais antigo, `15589744378144`, foi incluído no HTML**; o outro continua na Shopify, pois esta operação não recebeu autorização para excluir ou arquivar produtos da loja. Não foi encontrado outro par com SKU repetido entre os itens recém-importados e o catálogo anterior.
- **Catálogo novo:** 100 produtos antigos + **37 novos únicos** = **137 produtos**, com **2.155 variantes**. Todos os produtos listados são `ACTIVE` no snapshot. Os novos registros estão no início do arquivo `data/products.js`, classificados por tipo de casaco, com IDs, títulos, fotos, URL da Zeratta, URL administrativa, custo, quantidade de variantes e preços mínimo/máximo observados na Shopify. O filtro 'Novos de 09/11' seleciona esses 37 itens.
- **Preço:** os preços atuais de todas as 37 novas importações foram copiados da Shopify em GBP e adicionados ao `data/pricing.json`, totalizando **137 preços sincronizados**. **Nenhum preço da Shopify foi modificado nessa reconciliação**. A reprecificação de 20,69% foi aplicada anteriormente apenas nos 100 produtos existentes. Dos 37 novos, 27 têm preço acima de £99,90 e 10 acima de £135; a média de margem de simulação usando as premissas atuais não significa margem comprovada.
- **EPROLO:** 4 links dos 37 novos tiveram correspondência pública identificável por nome e descrição, e foram confirmados. Assim, o catálogo tem **96 URLs de fornecedor**, enquanto **41 produtos permanecem sem link EPROLO confirmado** (33 novos, 8 antigos). Links desconhecidos são `null`, nunca adivinhados. Os registros `data/freights.json` foram preservados: **92 custos históricos cadastrados, 45 valores ausentes**. O frete UK hipotético de £8,10 é usado somente na simulação, não escrito nos registros de frete do fornecedor.
- **Arquivos envolvidos:** `data/products.js`, `data/pricing.json`, `index.html` e este `README.md`. A página `precificacao/index.html` permanece inalterada, assim como a Shopify.
- **Auditoria no site:** https://paulozeratta.github.io/zeratta-catalog/ . GitHub Pages pode ter cache de publicação após os commits; em caso de dúvida verificar a branch `main` e abrir a URL com parâmetro de consulta.
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
