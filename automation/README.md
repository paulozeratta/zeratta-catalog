# Zeratta — CJ bulk pricing pilot

Read-only pilot for accessories. No Shopify publication, ordering, or store changes.

- Source formula: `precificacao/index.html` on main; existing financial formula reproduced without changing the live calculator.
- Pilot parameters: USD, CPA 20, processing 5.99%, fixed fee 0, tax reserve 0, other reserves 0, target profit 12, customer shipping 6.99 below 119, price ending .99. These are configurable assumptions, not verified actual fees or CPA. Pricing assumes one unit per order.
- Quotes: each CJ variant individually, China to USA, max quoted transit 11 days, prefer eligible YunExpress; otherwise cheapest eligible option. Tracking and processing time require verification. Compare postal-code variations and check stock before listing.
- Input: local UTF-8 text/CSV of CJ product links (do not commit the private sourcing list or reports to this public repo). The script deduplicates product IDs, defaults to five products, and reports per-variant errors rather than inventing prices.
- Node 20+: `node automation/cj-bulk-pricing.mjs --self-test`.
- In a secure execution environment, supply CJ_API_KEY or CJ_ACCESS_TOKEN as an environment secret, then run `node automation/cj-bulk-pricing.mjs /private/links.txt 5`. Optionally set CJ_US_ZIP. Redirect output only to a private location.
- Never add tokens, credentials, or quotation reports to source files or public CI logs.
- Remaining before production: authenticated pilot, compare CJ manual quotes against API, verify tracking and stock, connect authorized Sheet read, preserve CJ fulfillment mapping via listing API, verify Shopify collection/vendor/delivery profiles, product content and variant mappings, prevent duplicates, and confirm published results. No publication enabled by this pilot.

Official documentation: https://developers.cjdropshipping.com/en/api/api2/
