# Zeratta | Simulação de reprecificação UK | 2026-11-10

**Status: SOMENTE SIMULAÇÃO. NENHUM PREÇO DA SHOPIFY FOI ALTERADO POR ESTE RELATÓRIO.**

Parâmetros: CPA US$35/pedido, custo de produto indicado no catálogo como número da EPROLO em USD (apesar do campo Shopify rotular GBP: requer validação), frete individual USD `data/freights.json`, câmbio 1 GBP = USD 1,336 conforme arquivo de fretes (06/11), lucro-alvo £11/pedido, 5,99% de processamento sobre o preço bruto e VAT UK incluído na venda a 20% (modelo simplificado). Não inclui tarifa fixa Stripe, câmbio/FX, devoluções, mudanças tributárias ou taxas de importação; modelo não é apropriado automaticamente para vendas >£135 ou pedidos com múltiplos itens.

**Fórmula:** `preco_gbp = (((custo_USD + frete_USD + 35) / 1.336) + 11) / ((1/1.20)-0.0599)`

**Atenção:** não criar desconto de 40% usando preço de referência artificial. `compareAtPrice` não foi definido. A confirmação da unidade monetária dos custos e o tratamento de tarifas são pré-requisitos da publicação.

Produtos no snapshot: 177; cotados UK: 159; sem cotação UK: 18.

## Produtos com estimativa

| Shopify ID | Produto | Status | Variantes | Custo hipotético USD | Frete USD | Preço atual GBP* | Projeção GBP | Transportadora |
|---|---|---|---:|---:|---:|---:|---:|---|
| 15589744378144 | Men's Casual Down Jacket Two-Way Zipper Hooded Puffer Coat | ACTIVE | 12 | 96.89 | 13.60 | 343.29 | 155.02 | YUN Standard |
| 15589744083232 | Hooded long sleeved jacket | ACTIVE | 15 | 18.42 | 13.38 | 108.30 | 78.87 | YUN Standard |
| 15589739594016 | Autumn and winter cotton jacket, unisex cotton jacket, leather jacket, bread jacket, high-quality thickened cotton jacket | ACTIVE | 15 | 18.75 | 18.33 | 130.35 | 83.98 | YUN Standard |
| 15589739528480 | Knitted cotton jacket versatile jacket | ACTIVE | 4 | 20.23 | 16.63 | 124.50 | 83.77 | YUN Standard |
| 15589738447136 | Detachable hat waist jacket | ACTIVE | 15 | 17.55 | 14.79 | 108.93 | 79.39 | YUN Standard |
| 15589738316064 | Men's jacket with plush cotton fabric, casual jacket, men's jacket | ACTIVE | 48 | 14.41 | 12.22 | 93.45 | 73.87 | YUN Standard |
| 15589737857312 | Women Winter PU Leather Short Stand Collar Puffer | ACTIVE | 12 | 14.04 | 15.35 | 100.71 | 76.54 | YUN Standard |
| 15589736579360 | Winter New Thickened Casual Down Coat For Women Winter Women's Coat Women's Puffer Warm Clothes For Women Hot Clothes For Women | ACTIVE | 6 | 23.65 | 9.04 | 107.31 | 79.73 | YUN Standard |
| 15589735563552 | Little Chanel White Hooded Waist-Cinching Thickened Puffer Coat for Women | ACTIVE | 25 | 12.94 | 15.35 | 97.41 | 75.47 | YUN Standard |
| 15589733368096 | Loose long sleeved jacket | ACTIVE | 15 | 19.07 | 13.60 | 111.18 | 79.71 | YUN Standard |
| 15589733302560 | Style Puffer Coat with Wave Design, Unisex Hooded Thickened Warm Cotton Jacket | ACTIVE | 8 | 35.57 | 14.04 | 161.22 | 96.11 | YUN Standard |
| 15589733073184 | Women's Style Down Cotton Puffer Jacket, Short Stand Collar Quilted Loose Fit Winter Coat | ACTIVE | 15 | 11.18 | 13.38 | 86.58 | 71.86 | YUN Standard |
| 15589732385056 | Men's Casual Thickened Hooded Quilted Long Sleeve Loose Cotton Puffer Jacket | ACTIVE | 20 | 19.30 | 13.07 | 109.56 | 79.42 | YUN Standard |
| 15589731500320 | Wool collar jacket short cotton jacket | ACTIVE | 6 | 37.70 | 18.33 | 182.79 | 102.32 | YUN Standard |
| 15589731402016 | Short jacket | ACTIVE | 8 | 23.86 | 13.88 | 126.75 | 84.62 | YUN Standard |
| 15589731107104 | Korean Plaid Down Jacket For Women Jacquard Thick Duck Down Zip Up Hooded Jacket For Winter Puffer Outwear | ACTIVE | 6 | 26.48 | 15.32 | 140.49 | 88.55 | YUN Standard |
| 15589729042720 | Stand Collar Thickened Cotton Coat Unisex Oversized Short Puffer Jacket | ACTIVE | 9 | 29.18 | 15.49 | 145.38 | 91.32 | YUN Standard |
| 15589728420128 | Mountain Style Outdoor Puffer Jacket Trendy Loose Stand Collar Warm Thick Cotton Coat for Couples, Versatile Design | ACTIVE | 6 | 31.53 | 14.04 | 149.10 | 92.20 | YUN Standard |
| 15589728059680 | Down Jacket Women Medium Length Dongdaemun Winter Puffer Coat Plus Size Outerwear Fashion | ACTIVE | 12 | 14.27 | 13.08 | 93.24 | 74.56 | YUN Standard |
| 15589727764768 | Long hooded cotton coat and outerwear | ACTIVE | 8 | 21.30 | 13.88 | 119.07 | 82.14 | YUN Standard |
| 15589727568160 | Women's Winter Mid-Length Puffer Coat Thickened Hooded Down Cotton Jacket | ACTIVE | 15 | 13.16 | 15.69 | 99.48 | 76.01 | YUN Standard |
| 15589725339936 | Fashionable Hooded Printed Long Cotton Coat for Women Classic and Versatile | ACTIVE | 12 | 23.43 | 13.19 | 122.40 | 83.53 | YUN Standard |
| 15589725176096 | Women's Short Thickened Warm Puffer Jacket with Large Fur Collar, Loose Fit Outerwear | ACTIVE | 16 | 15.13 | 15.35 | 103.98 | 77.59 | YUN Standard |
| 15589723636000 | Winter Fashion Short Length Warm Casual Cotton Coat for Women, Loose Thick Puffer Jacket | ACTIVE | 16 | 10.01 | 12.33 | 78.42 | 69.71 | YUN Standard |
| 15589722751264 | Leather Belted Long Coat with Fur Lining | ACTIVE | 3 | 27.48 | 17.42 | 149.52 | 91.55 | YUN Standard |
| 15589722259744 | Men Leather Jacket Autumn Zipper Long Sleeve High Quality Motorcycle Jacket Coat Winter Turn Down Collar Plus Size Male Coat | ACTIVE | 12 | 21.89 | 20.19 | 142.65 | 88.82 | YUN Standard |
| 15589720523040 | Cotton Coat Women Winter New Long Over-the-Knee Cotton Jacket Women Large Fur Collar Slim Fit Thickened Cotton Coat Women | ACTIVE | 30 | 14.48 | 16.29 | 105.84 | 77.87 | YUN Standard |
| 15589719277856 | Winter simple cotton jacket plus size men's Korean version casual fashion versatile warm cotton jacket medium long men's | ACTIVE | 30 | 18.53 | 28.55 | 162.12 | 93.66 | YUN Standard |
| 15589718360352 | Women's Fashionable Classic Long Cotton Coat with Hand-Inserted Cotton | ACTIVE | 6 | 30.89 | 14.15 | 149.01 | 91.68 | YUN Standard |
| 15589718262048 | Long sleeved lapel zipper side pocket casual trench coat for women | ACTIVE | 8 | 17.04 | 12.12 | 97.08 | 76.31 | YUN Standard |
| 15589716558112 | Texture Zip Up Long Sleeve Hooded Coat | ACTIVE | 20 | 15.34 | 11.05 | 88.77 | 73.63 | YUN Standard |
| 15589716001056 | Collar long sleeved single breasted solid color trench coat for women | ACTIVE | 4 | 24.92 | 15.24 | 132.87 | 86.96 | YUN Standard |
| 15589715968288 | Stand up collar pocket long sleeved Coat | ACTIVE | 4 | 17.32 | 12.11 | 99.45 | 76.58 | YUN Standard |
| 15589714854176 | Women's Cotton Coat with Turn-Down Collar and Long Sleeves | ACTIVE | 4 | 18.53 | 12.44 | 104.43 | 78.07 | YUN Standard |
| 15589713314080 | Thin down cotton jacket with fashionable and thick fur and fur integrated jacket | ACTIVE | 20 | 15.94 | 15.94 | 108.48 | 78.95 | YUN Standard |
| 15589713281312 | Long Sleeve Fleece Jacket for Men Winter Denim Cotton Coat Lamb Wool Korean Style Thickened Jacket Long Sleeve Cotton Coat Loose Fit | ACTIVE | 36 | 17.68 | 16.92 | 118.35 | 81.58 | YUN Standard |
| 15578346193184 | Unisex Fleece-Lined Winter Jacket with Turn-Down Collar | ACTIVE | 4 | 17.46 | 11.37 | 79.90 | 75.99 | YUN Standard |
| 15578345865504 | Men's Corduroy-Style Winter Jacket with Lapel Collar | ACTIVE | 49 | 20.03 | 10.10 | 82.90 | 77.25 | YUN Standard |
| 15578345439520 | Plush-Lined Denim Jacket with Button Front for Men | ACTIVE | 15 | 20.67 | 17.94 | 83.90 | 85.46 | YUN Standard |
| 15578344653088 | Relaxed Fit Zip-Up Jacket with Turn-Down Collar for Women | ACTIVE | 4 | 14.70 | 9.76 | 76.90 | 71.77 | YUN Standard |
| 15578342981920 | Men's Lightweight Padded Winter Jacket with Stand Collar | ACTIVE | 24 | 10.01 | 10.83 | 69.90 | 68.26 | YUN Standard |
| 15578342883616 | Women's Quilted Padded Jacket with Round Neck and Relaxed Fit | ACTIVE | 8 | 12.14 | 11.05 | 72.90 | 70.54 | YUN Standard |
| 15578342326560 | Padded Stand Collar Winter Jacket with Relaxed Fit for Men | ACTIVE | 42 | 21.30 | 10.42 | 84.90 | 78.79 | YUN Standard |
| 15578341310752 | Fleece-Lined Cotton Workwear Jacket for Men | ACTIVE | 14 | 20.47 | 15.80 | 83.90 | 83.20 | YUN Standard |
| 15578341277984 | Women's Leather-Effect Zip-Up Jacket with Fold-Down Collar | ACTIVE | 3 | 23.65 | 16.06 | 87.90 | 86.52 | YUN Standard |
| 15578341245216 | Women's Short Padded Winter Jacket with Button Front | ACTIVE | 16 | 12.78 | 9.28 | 73.90 | 69.44 | YUN Standard |
| 15578341081376 | Short Faux Leather Jacket with Plush Collar for Women | ACTIVE | 9 | 24.92 | 16.63 | 89.90 | 88.30 | YUN Standard |
| 15578339279136 | Suede-Effect Jacket with Faux Fur Collar for Women | ACTIVE | 4 | 19.59 | 12.33 | 82.90 | 78.99 | YUN Standard |
| 15578339213600 | Men's Relaxed Fit Faux Leather Jacket with Lapel Collar | ACTIVE | 4 | 14.27 | 10.51 | 75.90 | 72.08 | YUN Standard |
| 15578338820384 | Women's Woven Zip-Up Jacket with Polo Collar | ACTIVE | 9 | 15.97 | 13.72 | 77.90 | 76.83 | YUN Standard |
| 15578337935648 | Hooded Winter Zip-Up Jacket with Side Pockets for Women | ACTIVE | 20 | 14.27 | 15.91 | 75.90 | 77.30 | YUN Standard |
| 15578337181984 | Men's Faux Leather Motorcycle Jacket with Zip Front | ACTIVE | 5 | 17.47 | 12.12 | 79.90 | 76.73 | YUN Standard |
| 15578334560544 | Oversized Faux Leather Zip Jacket with Lapel Collar | ACTIVE | 15 | 23.47 | 17.38 | 87.90 | 87.63 | YUN Standard |
| 15578334003488 | Faux Leather Aviator Jacket with Zip Front for Women | ACTIVE | 8 | 15.97 | 12.12 | 77.90 | 75.28 | YUN Standard |
| 15578333020448 | Longline Hooded Winter Zip Jacket with Printed Detail | ACTIVE | 24 | 16.40 | 13.08 | 78.90 | 76.62 | YUN Standard |
| 15578331775264 | Men's Washed Faux Leather Jacket with Fold-Down Collar | ACTIVE | 18 | 16.83 | 17.19 | 78.90 | 81.02 | YUN Standard |
| 15578331152672 | Women's Faux Fur Aviator Jacket with Zip Front | ACTIVE | 3 | 17.25 | 11.26 | 79.90 | 75.69 | YUN Standard |
| 15578330890528 | Fitted Suede-Effect Jacket with Faux Fur Lining for Women | ACTIVE | 10 | 19.59 | 12.01 | 82.90 | 78.68 | YUN Standard |
| 15578329809184 | Women's Button-Front Jacket with Turn-Down Collar | ACTIVE | 12 | 15.12 | 16.29 | 76.90 | 78.49 | YUN Standard |
| 15578329153824 | Padded Faux Leather Winter Jacket with Lapel Collar for Men | ACTIVE | 8 | 44.80 | 18.73 | 114.90 | 109.58 | YUN Standard |
| 15578327712032 | Men's Hooded Faux Leather Winter Jacket with Zip Front | ACTIVE | 8 | 42.15 | 18.73 | 111.90 | 107.01 | YUN Standard |
| 15578326925600 | Men's Distressed Denim Jacket with Contrast Collar | ACTIVE | 5 | 17.04 | 10.51 | 79.90 | 74.76 | YUN Standard |
| 15578326106400 | Fleece-Lined Faux Leather Barn Jacket for Men | ACTIVE | 12 | 22.58 | 11.58 | 86.90 | 81.15 | YUN Standard |
| 15578324435232 | Vintage Color-Block Varsity Jacket with Zip Front | ACTIVE | 14 | 11.40 | 17.38 | 71.90 | 75.95 | YUN Standard |
| 15578323550496 | Men's Workwear Jacket with Stand Collar and Button Front | ACTIVE | 10 | 11.38 | 12.33 | 71.90 | 71.04 | YUN Standard |
| 15578323190048 | Women's Padded Faux Leather Jacket with Lapel Collar | ACTIVE | 9 | 15.79 | 15.13 | 77.90 | 78.02 | YUN Standard |
| 15578323026208 | Unisex Fleece-Lined Winter Jacket with Side Pockets | ACTIVE | 10 | 21.28 | 12.54 | 84.90 | 80.82 | YUN Standard |
| 15578322338080 | Faux Leather Utility Jacket with Multiple Pockets for Men | ACTIVE | 10 | 23.86 | 9.76 | 87.90 | 80.63 | YUN Standard |
| 15578321912096 | Unisex Relaxed Faux Leather Jacket with Turn-Down Collar | ACTIVE | 12 | 19.80 | 10.19 | 82.90 | 77.12 | YUN Standard |
| 15578320863520 | Fleece-Lined Faux Leather Jacket with Lapel Collar | ACTIVE | 10 | 18.96 | 12.65 | 81.90 | 78.69 | YUN Standard |
| 15578320797984 | Women's Button-Front Winter Jacket with Plush Collar | ACTIVE | 9 | 35.57 | 16.06 | 102.90 | 98.06 | YUN Standard |
| 15578320437536 | Men's Hooded Faux Leather Winter Jacket with Padded Details | ACTIVE | 5 | 35.57 | 12.65 | 102.90 | 94.76 | YUN Standard |
| 15578320404768 | Men's Faux Leather Winter Jacket with Contrast Collar | ACTIVE | 10 | 9.59 | 17.19 | 69.90 | 74.01 | YUN Standard |
| 15578320109856 | Unisex Faux Leather Varsity Jacket with Stand Collar | ACTIVE | 10 | 17.46 | 10.51 | 79.90 | 75.16 | YUN Standard |
| 15578320044320 | Oversized Faux Leather Jacket with Stand Collar for Men | ACTIVE | 10 | 12.56 | 9.44 | 73.90 | 69.38 | YUN Standard |
| 15578319159584 | Women's Short Faux Leather Shearling-Style Jacket | ACTIVE | 4 | 18.96 | 13.60 | 81.90 | 79.60 | YUN Standard |
| 15578319094048 | Women's Short Faux Suede-Effect Zip Jacket | ACTIVE | 4 | 27.06 | 13.07 | 91.90 | 86.93 | YUN Standard |
| 15578319028512 | Women's Shearling-Style Winter Jacket with Lapel Collar | ACTIVE | 4 | 26.04 | 15.32 | 90.90 | 88.12 | YUN Standard |
| 15578318962976 | Fleece-Lined Faux Leather Workwear Jacket with Pockets for Men | ACTIVE | 12 | 22.58 | 11.37 | 86.90 | 80.95 | YUN Standard |
| 15556037181728 | Women's Cropped Hooded Puffer Jacket with Relaxed Fit | ACTIVE | 20 | 9.65 | 9.68 | 69.90 | 66.80 | YUN Standard |
| 15552748585248 | Cropped Faux Fur-Effect Zip Jacket with High Collar for Women | ACTIVE | 16 | 8.11 | 10.74 | 69.90 | 66.34 | YUN Standard |
| 15551055233312 | Women's Relaxed Faux Fur Jacket with Collared Neckline | ACTIVE | 3 | 18.53 | 14.92 | 80.90 | 80.47 | YUN Standard |
| 15551054184736 | Women's Utility Pocket Faux Leather Jacket with Zip Front | ACTIVE | 4 | 18.53 | 13.51 | 80.90 | 79.10 | YUN Standard |
| 15551053463840 | Women's Washed Faux Leather Zip Jacket with Turn-Down Collar | ACTIVE | 12 | 24.92 | 16.06 | 89.90 | 87.75 | YUN Standard |
| 15551052546336 | Women's Plush Fleece Half-Zip Top with Stand Collar | DRAFT | 20 | 19.17 | 13.19 | 81.90 | 79.41 | YUN Standard |
| 15551052054816 | Hooded Utility Puffer Jacket with White Duck Down Filling | ACTIVE | 10 | 82.23 | 18.56 | 163.90 | 145.64 | YUN Standard |
| 15551050940704 | Men's Slim-Fit Faux Leather Zip Jacket with Side Pockets | ACTIVE | 12 | 26.54 | 13.38 | 91.90 | 86.73 | YUN Standard |
| 15551050547488 | Oversized Suede-Effect Lapel Jacket with Zip Front for Women | ACTIVE | 6 | 22.81 | 16.15 | 86.90 | 85.80 | YUN Standard |
| 15551050252576 | Women's Relaxed Faux Leather Jacket with Adjustable Waist | ACTIVE | 4 | 22.79 | 15.83 | 86.90 | 85.47 | YUN Standard |
| 15551049072928 | Women's Hooded Padded Zip-Up Jacket with Minimal Finish | ACTIVE | 16 | 22.79 | 18.96 | 86.90 | 88.50 | YUN Standard |
| 15551048417568 | Women's Fleece Running Jacket with Stand Collar | ACTIVE | 24 | 17.90 | 10.51 | 80.90 | 75.59 | YUN Standard |
| 15551048089888 | Men's Double-Sided Fleece Jacket with Stand Collar | ACTIVE | 24 | 10.01 | 11.05 | 69.90 | 68.48 | YUN Standard |
| 15551046353184 | Women's Faux Leather Jacket with Structured Padded Shoulders | ACTIVE | 4 | 15.35 | 9.57 | 76.90 | 72.21 | YUN Standard |
| 15551046254880 | Cropped Quilted Color-Block Jacket with Button Front | ACTIVE | 12 | 9.65 | 13.38 | 69.90 | 70.38 | YUN Standard |
| 15551046189344 | Women's Polo Collar Faux Leather Jacket with Zip Front | ACTIVE | 8 | 19.59 | 12.76 | 82.90 | 79.40 | YUN Standard |
| 15551045304608 | Faux Leather Zip Jacket with Lapel Collar for Women | ACTIVE | 18 | 15.57 | 12.64 | 77.90 | 75.39 | YUN Standard |
| 15551044550944 | Women's Relaxed Bomber Jacket with Turn-Down Collar | ACTIVE | 3 | 21.73 | 13.83 | 85.90 | 82.51 | YUN Standard |
| 15551042978080 | Women's Cropped Puffer Jacket with Detachable Faux Fur Collar | ACTIVE | 15 | 12.50 | 15.35 | 73.90 | 75.05 | YUN Standard |
| 15551042322720 | Women's Mid-Length Hooded Puffer Parka with Relaxed Fit | ACTIVE | 15 | 13.16 | 16.25 | 74.90 | 76.56 | YUN Standard |
| 15551042158880 | Men's Oversized Hooded Winter Jacket with Side Pockets | ACTIVE | 28 | 13.21 | 12.65 | 74.90 | 73.12 | YUN Standard |
| 15551041274144 | Women's Padded Hooded Jacket with Zip Front | ACTIVE | 3 | 21.94 | 10.51 | 85.90 | 79.50 | YUN Standard |
| 15551039308064 | Men's Heavyweight Hooded Puffer Jacket with Relaxed Fit | ACTIVE | 28 | 10.97 | 19.63 | 71.90 | 77.71 | YUN Standard |
| 15551038587168 | Women's Faux Shearling Jacket with Stand Collar | ACTIVE | 12 | 25.99 | 12.97 | 90.90 | 85.80 | YUN Standard |
| 15551038390560 | Men's Quilted Stand Collar Jacket with Relaxed Fit | ACTIVE | 4 | 29.18 | 13.72 | 94.90 | 89.61 | YUN Standard |
| 15551035769120 | Relaxed Stand Collar Fleece Jacket for Everyday Layering | ACTIVE | 8 | 13.84 | 12.97 | 74.90 | 74.04 | YUN Standard |
| 15551034884384 | Women's Hooded Knit Jacket with Double-Zip Front | ACTIVE | 5 | 21.94 | 15.01 | 85.90 | 83.85 | YUN Standard |
| 15551034589472 | Women's Relaxed Padded Jacket with Zip Front and Collar | ACTIVE | 12 | 11.40 | 11.48 | 71.90 | 70.24 | YUN Standard |
| 15551033934112 | Women's Hooded Padded Jacket with Side Pockets | ACTIVE | 12 | 18.32 | 9.02 | 80.90 | 74.55 | YUN Standard |
| 15551033868576 | Women's Classic Lapel Collar Zip-Up Jacket | ACTIVE | 8 | 15.79 | 11.69 | 77.90 | 74.69 | YUN Standard |
| 15551032590624 | Oversized Blanket Hoodie with Kangaroo Pockets | DRAFT | 6 | 9.28 | 15.94 | 69.90 | 72.50 | YUN Standard |
| 15551027937568 | Men's Long Sleeve Pullover Hoodie with Relaxed Fit | DRAFT | 42 | 7.26 | 7.80 | 69.90 | 62.67 | YUN Standard |
| 15551026364704 | Vintage Faux Leather Bomber Jacket with Stand Collar for Men | ACTIVE | 15 | 21.94 | 11.05 | 85.90 | 80.02 | YUN Standard |
| 15551026266400 | Women's Padded Winter Jacket with Detachable Faux Fur Collar | ACTIVE | 4 | 20.23 | 8.91 | 83.90 | 76.29 | YUN Standard |
| 15551023251744 | Women's Velvet-Effect Jacket with Stand Collar and Zip Front | ACTIVE | 16 | 21.51 | 15.83 | 84.90 | 84.23 | YUN Standard |
| 15551022498080 | Women's Round Neck Quilted Jacket with Button Front | ACTIVE | 8 | 13.84 | 8.27 | 74.90 | 69.49 | YUN Standard |
| 15551021973792 | Women's Cropped Padded Jacket with Relaxed Fit | ACTIVE | 30 | 16.40 | 14.79 | 78.90 | 78.28 | YUN Standard |
| 15551020335392 | Men's Relaxed Workwear Jacket with Pleated Stand Collar | ACTIVE | 8 | 25.99 | 12.65 | 90.90 | 85.49 | YUN Standard |
| 15551019385120 | Women's Faux Leather Jacket with Turn-Down Collar and Zip Front | ACTIVE | 8 | 19.38 | 13.40 | 82.90 | 79.82 | YUN Standard |
| 15551019188512 | Belted Faux Leather Zip Jacket with Stand Collar for Women | ACTIVE | 4 | 15.33 | 11.47 | 76.90 | 74.03 | YUN Standard |
| 15551017779488 | Women's Button-Front Jacket with Fold-Down Collar | ACTIVE | 3 | 19.59 | 12.17 | 82.90 | 78.83 | YUN Standard |
| 15551016173856 | Women's Everyday Zip-Up Jacket with Turn-Down Collar | ACTIVE | 12 | 14.27 | 11.47 | 75.90 | 73.00 | YUN Standard |
| 15551015059744 | Women's Cropped Faux Leather Zip-Up Jacket with Long Sleeves | ACTIVE | 55 | 14.98 | 15.69 | 76.90 | 77.78 | YUN Standard |
| 15551014994208 | Oversized Faux Leather Lapel Jacket with Zip Front for Women | ACTIVE | 15 | 15.57 | 15.13 | 77.90 | 77.80 | YUN Standard |
| 15548489433376 | Deconstructed Faux Leather Zip Jacket with Relaxed Fit for Men | ACTIVE | 4 | 36.00 | 16.06 | 103.90 | 98.48 | YUN Standard |
| 15534366687520 | Women's Cropped Puffer Jacket with Stand Collar and Zip Front | ACTIVE | 16 | 8.77 | 12.33 | 69.90 | 68.51 | YUN Standard |
| 15533044007200 | Women's Quilted Hooded Puffer Jacket with Zip Front | ACTIVE | 8 | 14.04 | 15.35 | 75.90 | 76.54 | YUN Standard |
| 15533039452448 | Ashford Men's Leather Bomber Jacket with Turn-Down Collar | ACTIVE | 10 | 25.99 | 9.23 | 90.90 | 82.18 | YUN Standard |
| 15533033488672 | Women's Fleece Zip-Up Hoodie with Relaxed Fit | DRAFT | 24 | 5.75 | 9.02 | 69.90 | 62.39 | YUN Standard |
| 15591445332256 | Women's thick -soled boots fashion ladies ankle boots Women's leather round head -lap combat boots black thick solid shoes | ACTIVE | 14 | 7.03 | 9.24 | 73.59 | 63.84 | 4PX Standard |
| 15591445365024 | Work Safety Boots Men's Boots Chelsea Boots Steel Toe Safey Shoes | ACTIVE | 33 | 14.60 | 17.00 | 109.23 | 78.68 | YUN Standard |
| 15591445397792 | Men Shoes Autumn Winter Boots Retro Style Ankle Boots Lace Up  Casual  Boots High-top Shoes For Men Wear-resistant Zapatos Boots | ACTIVE | 20 | 13.51 | 13.07 | 89.55 | 73.82 | YUN Standard |
| 15591445430560 | New Chunky Heel Thick Sole Riding Boots Cow Suede Comfort Lace Up Ankle Boots Autumn Women Handsome Punk Style Short Boot Unisex | ACTIVE | 6 | 23.10 | 23.13 | 155.67 | 92.83 | 4PX Express |
| 15591446642976 | New Men's And Women's Boots Motorcycle Boots Knight Short Boots Retro Lace Up Roman Boots Large Size Martin Boots | ACTIVE | 20 | 13.58 | 8.56 | 70.86 | 69.52 | YUN Standard |
| 15591448019232 | Winter Men Safety Work Boots Warm Plush Fur Mens Labor Insurance Puncture Proof Snow Boot Man Steel Toe Cap Shoes Male | ACTIVE | 30 | 10.77 | 14.92 | 89.04 | 72.96 | YUN Standard |
| 15591449723168 | High top Martin boots for outdoor men anti slip wear-resistant thick soled versatile workwear trendy shoes | ACTIVE | 12 | 4.85 | 9.64 | 69.81 | 62.12 | 4PX Standard |
| 15591449821472 | Men Retro Work Ankle Boots Autumn Winter Thick Bottom High Top Casual Boots Leather Boots Chelsea Desert Waterproof  Boots Male | ACTIVE | 12 | 7.53 | 12.62 | 69.90 | 67.59 | YUN Standard |
| 15591450575136 | Winter new low heel side zipper 34-43 suede high leg women's boots boots | ACTIVE | 30 | 11.55 | 10.00 | 92.13 | 68.95 | 4PX Standard |
| 15591453327648 | Fashionable high top Martin boots for men casual Baotou workwear shoes autumn and winter men's boots | ACTIVE | 31 | 10.88 | 27.65 | 108.78 | 85.38 | 4PX Standard |
| 15591453720864 | full cow suede over the knee-high boots lady | ACTIVE | 50 | 54.14 | 25.56 | 258.42 | 125.23 | 4PX Express |
| 15591454179616 | High Heel Over-the-Knee Boots for Women, Faux Suede Punk Style Chunky Heel Autumn/Winter Fashion | ACTIVE | 18 | 23.42 | 18.32 | 136.74 | 88.49 | YUN Standard |
| 15591456637216 | Round Toe Suede Low Heel Boots | ACTIVE | 16 | 6.36 | 7.63 | 64.23 | 61.63 | 4PX Standard |
| 15591458046240 | Zipper low heeled long leg boots high leg women's boots | ACTIVE | 27 | 9.02 | 28.68 | 146.61 | 84.58 | YUN Standard |
| 15591458177312 | Long Boots Children's Thick Heel High Heel Elastic Knight Boots Round Head Over Knee Long Sleeve Women's Boots Winter | ACTIVE | 12 | 17.16 | 15.38 | 110.13 | 79.59 | YUN Standard |
| 15591458242848 | Height increasing short boots with plush chimney single boots | ACTIVE | 28 | 18.57 | 18.79 | 129.78 | 84.25 | YUN Standard |
| 15591461323040 | Martin Boots Women's Spring and Autumn Single Boots New British Style Thick Sole Round Toe Medium Boots Chimney Chelsea Boots | ACTIVE | 6 | 16.41 | 12.15 | 94.38 | 75.73 | YUN Standard |
| 15591461945632 | New Style Outdoor Long Boots Winter&#27431;&#32654;&#22806;&#36152; Flat Heel Wide Size Women's Leather Boots | ACTIVE | 45 | 10.50 | 11.45 | 79.14 | 69.34 | YUN Standard |
| 15591462207776 | Autumn And Winter New Boots Round Head Flat Bottom Women's Large Smoke Pipe Boots Motorcycle Boots | ACTIVE | 18 | 15.28 | 13.53 | 96.78 | 75.98 | YUN Standard |
| 15591463813408 | Lace up round toe buckle with thick sole short tube women's fashionable Martin boots | ACTIVE | 7 | 5.69 | 10.36 | 56.91 | 63.63 | YUN Standard |
| 15591466434848 | Vintage Brown Suede Coat for Men, Long Autumn/Winter Jacket | ACTIVE | 6 | 29.18 | 19.69 | 162.93 | 95.39 | YUN Standard |
| 15591466893600 | AIYUQI Women's Chelsea Boots Genuine Leather New Autumn Winter Fashion Women's Ankle Boots Retro Martin Boots Ladies | ACTIVE | 32 | 21.13 | 28.04 | 175.74 | 95.68 | YUN Standard |
| 15591470956832 | Collar long sleeved single breasted solid color trench coat for women | ACTIVE | 4 | 22.58 | 21.17 | 150.27 | 90.43 | YUN Standard |
| 15591471448352 | Winter Wool Jacket Men's Coat Warm Solid Jacket Double Breasted Business Casual Overcoat long cotton collar trench coat | ACTIVE | 15 | 10.47 | 18.37 | 105.36 | 76.00 | YUN Standard |
| 15591474135328 | Autumn and Winter British Style New Knight Martin Boots Women's Over Knee Thick Bottom Zipper Mid length Boots Single Boots Women's | ACTIVE | 18 | 7.42 | 18.34 | 77.01 | 73.02 | 4PX Standard |
| 15591475544352 | Thick Soled Strap Thick Soled Short Boots Women's Round Head New Women's Shoes British Style Martin Boots | ACTIVE | 20 | 17.16 | 13.07 | 100.50 | 77.35 | YUN Standard |
| 15591475904800 | Autumn Winter Overcoat Women  Solid Color Belted Faux Leather Long Trench coat Female Outerwear | ACTIVE | 4 | 22.60 | 14.71 | 127.41 | 84.20 | YUN Standard |
| 15591479247136 | Simple Suede-Like Effect Mid-Length Trench Coat for Women | ACTIVE | 4 | 17.46 | 15.72 | 112.44 | 80.20 | YUN Standard |
| 15591479705888 | Autumn and Winter New Style Export Overcoat Large Size Woolen Overcoat England Coat | ACTIVE | 24 | 25.69 | 18.37 | 151.02 | 90.73 | YUN Standard |
| 15591479968032 | Fashion Solid Women Casual Thicker Winter Slim Coat Overcoat Abrigos Mujer Invierno | ACTIVE | 40 | 25.45 | 18.97 | 152.88 | 91.08 | YUN Standard |

\*Preços atuais conforme snapshot do catálogo, não necessariamente leitura ao vivo da Shopify.

## Sem cotação UK

| Shopify ID | Produto | Status | Variantes |
|---|---|---|---:|
| 15589713379616 | Winter Fashion Long Coat Net Color Long Sleeve Tweed Women's Jacket | ACTIVE | 48 |
| 15551047074080 | Men's Hooded Faux Leather Zip-Up Jacket with Ribbed Hem | ACTIVE | 12 |
| 15551032688928 | Men's Plush Fleece Hoodie with Relaxed Fit | DRAFT | 108 |
| 15551029510432 | Men's Classic Full-Zip Hoodie with Solid Color Finish | DRAFT | 30 |
| 15551024431392 | Unisex Streetwear Pullover Hoodie with Relaxed Fit | DRAFT | 48 |
| 15551020269856 | Men's Classic Fleece Pullover Hoodie with Long Sleeves | DRAFT | 112 |
| 15551015092512 | Women's Slim-Fit Cropped Faux Leather Jacket | ACTIVE | 84 |
| 15528499446048 | Men's Relaxed Pullover Hoodie with Ribbed Hem and Side Pockets | DRAFT | 41 |
| 15591451558176 | Men's thick soled workwear, big yellow Martin boots, autumn new high top leather patchwork outdoor sports boots | ACTIVE | 18 |
| 15591463485728 | Comfortable low heeled oversized low cut women's boots | ACTIVE | 120 |
| 15591466402080 | Slim-Fitting Waist-Cinching Street-Style Long Leather Trench Coat for Women | ACTIVE | 16 |
| 15591467122976 | Collar long sleeved single breasted solid color trench coat for women | ACTIVE | 3 |
| 15591470825760 | Nomadic style faux fur lapel double breasted trench coat jacket | ACTIVE | 3 |
| 15591471546656 | Woolen Coat for Women Thick Korean Version Slim Elegant Mid-Length Tweed Overcoat | ACTIVE | 24 |
| 15591476855072 | Collar long sleeved single breasted solid color trench coat for women | ACTIVE | 3 |
| 15591479738656 | Women's Trench Coat Bright Lines Decoration Long Sleeve Belt Waist Navy Windbreak Autumn Winter New Fashion | ACTIVE | 6 |
| 15591480328480 | Long sleeved single breasted solid color trench coat for women | ACTIVE | 4 |
