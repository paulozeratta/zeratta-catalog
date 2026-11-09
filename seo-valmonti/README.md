# Zeratta - SEO migration (Valmonti first, Richard & Clarke second)

Date: 2026-11-09

## State
- Shopify live: 138 ACTIVE product records.
- Financial/catalog source: 137 unique product records; one additional Shopify duplicate has same title and SKUs.
- 132 links with EPROLO /app/product/ format in financial catalog, 127 returned substantial supplier specifications, 5 other records had legacy/blank URLs.
- Evidence records saved in supplier-evidence-2026-11-09.json.
- Exact original live titles and full descriptions backed up in shopify-before-2026-11-09.json.
- SEO proposals in seo-proposals-v2-qa.json: 114 editorial drafts, 10 source-review cases, 13 insufficient-source cases, 1 duplicate excluded from bulk publication.

## Publishing gate - IMPORTANT
NO LIVE SHOPIFY TITLE OR DESCRIPTION UPDATE HAS BEEN PERFORMED.

Why:
1. Product material and collar information conflicts in supplier descriptions on several items; only verified attributes may appear.
2. Drafts require human-level editorial and SEO QA; mechanically generated phrasing is not publish-ready.
3. Google Merchant Center requires AI-generated copy in structured_title / structured_description with digital_source_type = trained_algorithmic_media. It is not established that the current Shopify Google & YouTube feed passes these correctly. Default automatic title/description sync could introduce compliance risk.
4. Full product image galleries have not been validated against brand studio standards. This audit does not approve any product imagery.
5. The exact 138-item scope must be reconciled with the duplicate while preserving product IDs.

## Next technical checkpoint
Verify Merchant Center data source and support for structured_title and structured_description; only after that, finalize one-by-one text and publish with per-ID read-back and rollback from the backup. Do not touch prices, discounts, variants, inventory, handles, URLs, or product imagery.

## SEO standard
Titles: front-load precise product type, style, real material and construction with gender used where useful, no gratuitous keyword repeats. Descriptions: unique editorial opening, truthful bullet benefits/features, styling close, technical attributes and supplier size chart where reliable. UK English, no fabricated fibres, delivery time, warming ratings, or review metrics.
