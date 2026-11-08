# Zeratta UK pricing | Bundle-aware simulation | 8 November 2026

**Status: PRELIMINARY ONLY. No Shopify prices changed. This is NOT an approved landed-cost schedule.**

## Verified storefront discount rules
Shopify Admin read-only on 8 November 2026:
- 1 item: no automatic bundle discount.
- 2 items: 10% automatic discount (ACTIVE).
- 3 items: 20% automatic discount (ACTIVE).
- 4+ items: 30% automatic discount (ACTIVE).
- Each automatic promotion ends 2026-12-01T07:59:59Z, unless changed. Admin titles still include FALL SALE. This report does not change discounts.

## Financial model (USD costs and profit; GBP retail)
- Target **US$ 15 contribution per ORDER**, after supplier product cost, shipping cost per item, CPA US$ 35 per order, estimated processing 6.1% of gross retail and US$ 0.30 per order.
- Model VAT reserve is 20% of VAT-inclusive retail, equivalent to excluding a 1/6 VAT component. This is a conservative pricing reserve, NOT a determination of actual VAT liabilities for each consignment.
- FX reference is £0.7500 per US$1, with 3% cost-side buffer (effective cost rate £0.7725 per US$1). The reference is indicative and must be refreshed on execution.
- No returns, refunds, customs duty, brokerage, special UK delivery surcharges, FX settlement commissions beyond the assumed buffer, corporate taxes or other overhead included.
- A single rounded sticker price is chosen to meet the target in all modeled basket sizes (one, two, three, four items), for ANY product mix if the model assumptions apply. Costs and fees scale per item, CPA and fixed processing fees are incurred once per order. Orders with 4+ pieces use 30%; the 4-piece case is the binding threshold for that discount.
- Retail price steps are £...4.90 / £...9.90 (increments of £5). Calculated as the maximum of the following four minimums, then rounded upwards: P(n,d) = FXeff * (n * (productCostUSD + historicalUSFreightUSD) + CPA + targetProfit + fixedFeeUSD) / (n * (1-d) * (1/1.20 - processorRate)), using (n,d) of (1,0), (2,.10), (3,.20), (4,.30).
- **Do not assume VAT at point of sale is the correct tax treatment for all baskets**. HMRC applies different import VAT/customs arrangements when imported **consignment** value exceeds £135, including bundled orders; actual importer-of-record, DDP terms, customs duty and freight destination must be confirmed.

## Input quality
- 122 products in catalog snapshot; 44 ACTIVE and 78 DRAFT.
- 92 products have an old USD freight quote associated with the USA; **zero verified UK quotes** in source. 30 products have **no freight amount** and cannot be priced without an actual UK EPROLO quote.
- 92 provisional UK sticker prices generated from USA freight proxies, **NOT ready to publish**.
- Proposed UK sticker range for the 92 priced items: £64.90 to £169.90; 91 of these are ≤£135 as individual items, but bundles may be >£135.
- 1 item prices are constrained by the four-item 30% tier rather than the one-item or other tiers.
- Minimum modeled contributions by homogeneous 1/2/3/4-item order at each proposed price (across 92 SKUs): US$ 15.08 / 43.27 / 46.60 / 15.72. Actual UK freight and import costs can make these estimates incorrect.

## Example products
| Product ID | Product | Cost+US freight (US$) | Provisional UK price | Profit single (US$) | Profit 4 items after 30% (US$) |
|---|---|---:|---:|---:|---:|
| 15551052054816 | Hooded Utility Puffer Jacket with White Duck Down Filling | 106.15 | £169.90 | 28.41 | 15.72 |
| 15578346193184 | Unisex Fleece-Lined Winter Jacket with Turn-Down Collar | 31.66 | £84.90 | 17.92 | 75.73 |
| 15578342981920 | Men's Lightweight Padded Winter Jacket with Stand Collar | 23.41 | £74.90 | 16.17 | 80.73 |
| 15578341277984 | Women's Leather-Effect Zip-Up Jacket with Fold-Down Collar | 45.10 | £99.90 | 19.48 | 63.96 |
| 15551032688928 | Men's Plush Fleece Hoodie with Relaxed Fit | 16.84 | £69.90 | 17.74 | 93.02 |

## Next steps before any store changes
1. Obtain verified UK EPROLO shipping cost for all 122 products, ideally by size/variant and shipping method. Current 92 shipping amounts are historical USA amounts.
2. Establish DDP/importer-of-record position, applicable commodity codes, duty, clearance fees and correct VAT collection process for consignments >£135.
3. Confirm real processing fees and GBP/USD settlement costs, and whether the US$15 target is contribution per order (model) or per item.
4. Re-run the calculations with UK landed costs. Verify Shopify live variant prices and compare-at prices and keep the automatic 10%/20%/30% bundle working. Avoid unrelated changes to published theme or discounts.
5. Publish only after margin and import review. No Shopify mutation is performed in this exercise.

Source references: [catalog](https://paulozeratta.github.io/zeratta-catalog/), [source products](https://github.com/paulozeratta/zeratta-catalog/blob/main/data/products.js), [source freights](https://github.com/paulozeratta/zeratta-catalog/blob/main/data/freights.json), [source pricing](https://github.com/paulozeratta/zeratta-catalog/blob/main/data/pricing.json), [HMRC direct-to-UK guidance](https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk), [UK VAT standard rate](https://www.gov.uk/tax-on-shopping/vat-duties).

**CSV:** [122-product model](./uk-pricing-bundle-simulation-2026-11-08.csv).
