# Zeratta / CJ bulk pricing (development)
Server-side Node.js 22+ module. This branch does not modify GitHub Pages, the existing calculator, the mining sheet, or Shopify.

## Current status
- Pricing formula ported from `precificacao/index.html` (blob 110c08fc0b680af00d0529b63c372a7ace4be51d); .99 rounding, accessory CPA 20 and single-item US shipping policy are explicit overrides.
- Original defaults: processing 5.99%, tax 0%, fixed 0, reserve 0, profit target 12. These are simulation assumptions, not verified business costs. Browser localStorage overrides are not readable by this backend.
- Direct sheet access uses a runtime Google OAuth access token; alternatively the connected sheet may be exported privately as a JSON matrix. Never commit the matrix or report to the public repository.
- No live API test yet. Validate five actual CJ listings against the manual listing screen, including total freight, duties, stock and tracking. The simple freight endpoint does not guarantee tracking; only add verified tracked carrier names to approvedCarriers. The empty list deliberately blocks quotes until verified. maxDays 11 is an inclusive upper bound, not a guarantee of delivered-in-11-days.
- The total freight uses the larger of totalPostageFee or base + explicitly returned taxes and clearance fees; verify semantics with real responses.
- The preview command is read-only against CJ and Google Sheets. It saves a private local file; no Shopify writes. Prices above 49.99 require review, not forced reductions. A quote models one item per order, not multi-item bundles.
- The publishApproved adapter is present but is not exposed as a CLI command until credentials, actual Shopify mappings, copy, quote checks and pilot are verified. Poll listingStatus until final success; do not retry uncertain writes without reconciling CJ records.
- No hosted backend, persistent credential vault, scheduled runs, or live UI has been deployed yet.

## Private runner
Keep secrets in a private runtime secret store, never JS, URLs, logs, GitHub commits or public Actions artifacts. Set CJ_API_KEY or CJ_ACCESS_TOKEN in the runtime only. GitHub Pages is not a backend. For permanent deployment choose a private runner/service with authenticated UI or private workflow; do not expose costs or tokens publicly.
```sh
node automation/cj/batch.mjs shops
node automation/cj/batch.mjs preview /private/config.json /private/rows.json /private/report.json 5
# direct Sheet read instead of JSON: GOOGLE_ACCESS_TOKEN and GOOGLE_SHEET_ID must be configured
node automation/cj/batch.mjs preview /private/config.json - /private/report.json 5
```
Copy the example config to a private path; validate all financial inputs and shipping names before using. Replace 5 by all only after pilot. Output refuses to overwrite an existing report.

## API reference
- https://developers.cjdropshipping.com/en/api/api2/api/auth.html
- https://developers.cjdropshipping.com/en/api/api2/api/product.html
- https://developers.cjdropshipping.com/en/api/api2/api/logistic.html
- https://developers.cjdropshipping.com/en/api/api2/api/listed.html
- https://developers.cjdropshipping.com/en/api/api2/api/shop.html
