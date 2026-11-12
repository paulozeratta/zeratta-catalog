# Zeratta: New-arrival Valmonti SEO migration, 12 November 2026

## Completed and verified

- **12 recently imported boots** (11 men, 1 women) had their Shopify titles, commercial descriptions, and short unique product handles updated. All 12 original URLs redirect directly to the new product URL. Shopify readback confirmed all 12 descriptions, normalized for HTML serialization.
- The **12 original EPROLO descriptions** were backed up in `seo-valmonti/new-arrivals-before-2026-11-12.json` and stored per-product in Shopify metafield `zeratta_ops.eprolo_description_backup_20261112`. Titles, URLs and customer-facing copy can be reversed from this archive. Seven pre-existing structured size charts were preserved. Four charts were corrected/added from supplier data, including size 40 and conversion of millimetres to centimetres.
- **Shopify has 187 products: 73 ACTIVE, 114 DRAFT.** No Shopify product status, inventory, price, discount, images, product category, option or variant was modified in this SEO work.
- Main GitHub catalog now matches all **187 Shopify IDs**, titles, handles, status, minimum/maximum advertised GBP price, compare-at price, variant count, and main image. Stored 12 SEO descriptions. Updated 105 stale status values, 144 stale published prices, 165 stale compare-at values, 54 stale featured images, 2 stale variant counts, and linked one previously missing verified EPROLO URL. Historic supplier costs, logistics estimates and pricing assumptions remain unchanged.
- Native Google Sheets `Zeratta | Campaign & Photoshot Queue | November 2026` synchronized: **11** existing new-product hyperlinks/titles, **110** product statuses, **1** new product record in `Mens`, no price changes needed. **187/187** products reconciled across sheet rows; all nine historical Shopify draft preview links preserved. No campaign priority or photoshoot status overwritten.
- HTML `index.html` static totals corrected to **187** products and data current as of 12 November 2026. The public GitHub Pages landing page and its deployed data/products.js were fetched fresh and both showed the refreshed content; two new product public pages and canonical URLs were also checked.
- **177** product-to-EPROLO links associated (including legacy EPROLO URLs); **10** products still have missing links. No source URL was invented.

## New boot titles and URLs

| Shopify product ID | New Shopify title | Canonical URL | Evidence status |
|---|---|---|---|
| `15599371321632` | Men's Cloth High-Top Lace-Up Boots with Rubber Sole | [Open product](https://zeratta.com/products/mens-cloth-high-top-lace-up-boots-rubber-sole) | Supplier/variant attributes documented |
| `15599371354400` | Men's Retro Mid-Top Lace-Up Boots with PVC Sole | [Open product](https://zeratta.com/products/mens-retro-mid-top-lace-up-boots-pvc-sole) | Supplier/variant attributes documented |
| `15599371387168` | Men's Mixed-Material Mid-Top Lace-Up Boots | [Open product](https://zeratta.com/products/mens-mixed-material-mid-top-lace-up-boots) | Supplier/variant attributes documented |
| `15599371419936` | Men's Faux Suede Lace-Up Snow Boots with EVA Sole | [Open product](https://zeratta.com/products/mens-faux-suede-lace-up-snow-boots-eva-sole) | Supplier/variant attributes documented |
| `15599371452704` | Men's Faux Leather High-Top Round-Toe Boots | [Open product](https://zeratta.com/products/mens-faux-leather-high-top-round-toe-boots) | Supplier/variant attributes documented |
| `15599371485472` | Men's Winter Work-Style Ankle Boots | [Open product](https://zeratta.com/products/mens-winter-work-style-ankle-boots) | Safety/material details require supplier validation |
| `15599371551008` | Men's Work-Inspired Winter Boots | [Open product](https://zeratta.com/products/mens-work-inspired-winter-boots) | Safety/material details require supplier validation |
| `15599371616544` | Men's Denim High-Top Lace-Up Boots with PVC Sole | [Open product](https://zeratta.com/products/mens-denim-high-top-lace-up-boots-pvc-sole) | Supplier/variant attributes documented |
| `15599371649312` | Men's Faux Leather High-Top Lace-Up Boots | [Open product](https://zeratta.com/products/mens-faux-leather-high-top-lace-up-boots) | Supplier/variant attributes documented |
| `15599371682080` | Men's Winter Work-Style Boots with Fur-Lined Options | [Open product](https://zeratta.com/products/mens-winter-work-style-boots-fur-lined-options) | Safety/material details require supplier validation |
| `15599371780384` | Women's Platform Ankle Boots with Fur-Lined Options | [Open product](https://zeratta.com/products/womens-platform-ankle-boots-fur-lined-options) | Safety/material details require supplier validation |
| `15599371845920` | Men's Combat-Style Casual Ankle Boots | [Open product](https://zeratta.com/products/mens-combat-style-casual-ankle-boots) | Safety/material details require supplier validation |

## Limits and supplier verification

- Multiple supplier product names make **steel-toe, waterproof, anti-puncture, indestructible, safety protection** claims without providing accessible technical certificates. Such unverified claims were deliberately excluded from the four affected SEO titles and descriptions. Before claiming protective performance, obtain compliant supplier documentation and certification.
- Some products did not have a structured size chart before the SEO update. Original EPROLO descriptions and supplier images have been preserved for subsequent size-guide transcription. The complete product-photo galleries have **not** been audited against the Zeratta studio photography standard as part of this task.
- Google Merchant Center feed synchronization, structured AI-generated title/description fields, listing status and Search Console reindexing were **not independently verified**. Google Shopping ranking/performance outcomes are not guaranteed.
- No advertising campaign, pricing.json or storefront theme was modified.

## Relevant files

- `seo-valmonti/new-arrivals-before-2026-11-12.json`: complete originals
- `seo-valmonti/new-arrivals-proposed-2026-11-12.json`: 12 title/description/slug editorial records
- `seo-valmonti/new-arrivals-shopify-execution-2026-11-12.json`: mutation outcomes
- `seo-valmonti/spreadsheet-sync-before-2026-11-12.json`: sheet row/source backup
- Main branch `data/products.js`: synchronized product catalog
- Main branch `index.html`: synchronized public catalog copy and counters
