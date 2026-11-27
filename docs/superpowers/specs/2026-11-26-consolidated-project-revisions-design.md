# Consolidated Project Revisions - Design

## Intent

Reduce clutter across customer pages and owner/cashier screens while keeping the existing Cireng Cangkeling brand and business workflows. Consolidate sales from the cashier and delivery platforms into one owner report, with PDF as the final export.

## Goals

- Use one customer-facing outlet identity and address: Cireng Cangkeling, Jalan Parangtritis 55188 Panggungharjo, Special Region of Yogyakarta. Show daily hours as 10:00-21:00 WIB and the slogan "YANG KAMU INGIN, KITA ADAIN!"
- Remove only the specified customer-page copy and dashboard sections/columns; keep data, authentication, business rules, styling, motion, and responsive behavior otherwise intact.
- Keep finished-product production on the existing production workflow, which deducts recipe ingredients, increases finished-product stock, and records stock movements.
- Import real CSV/Excel reports from GoFood, GrabFood, and ShopeeFood, normalize them into the existing frontend data flow, and expose one consolidated business report with PDF export.

## Non-goals and constraints

- No schema changes, backend/authentication redesign, marketplace API integration, or automatic inventory deduction for historical imports.
- Removing a UI column/section must not delete its underlying data or records.
- Preserve the existing visual system; no general redesign.
- The user selected the existing frontend/local-storage approach and approved adding an XLSX parser if needed. The current marketplace import is simulated and its records are not persisted like the other business records.
- Existing seeded marketplace rows are sample data. Keep those records intact, but do not count them as real imported sales in the consolidated business report.
- Actual platform report samples are not available yet. Do not invent column mappings, preview rows, revenue formulas, or duplicate keys. The importer remains blocked until representative samples are supplied; unrelated UI revisions can proceed.
- Keep existing Shopee support if already used; the requested real import adapters are specifically for GoFood, GrabFood, and ShopeeFood.

## Approaches

1. **Use the existing frontend data flow (selected).** Parse actual platform files in the existing import flow, validate and preview normalized rows, persist imported batches alongside the current browser-stored data, combine them with POS/expense records in Laporan Usaha, and use the browser print dialog for PDF output. This avoids introducing a backend that the current UI does not use.
2. **Add backend persistence and import endpoints.** Better for sharing records across devices, but requires integrating authentication and database persistence beyond the selected scope and current UI architecture.

## Scope and implementation decisions

- Customer pages: update all displayed outlet details/hours and the brand slogan consistently; remove the named home story section and menu/platform descriptions; keep menu names, prices, and order actions.
- Cashier pages: remove the operational-instructions panel. The current order-redirection table has one Detail action and no separate Cetak action; preserve the detail view and do not add a print action.
- Owner pages: hide the supplier column without changing supplier data; remove the duplicate finished-production form only after keeping the existing recipe-based production workflow; compact stock-history and expense tables; remove Proporsi Pengeluaran only if present (none was found in the current frontend source).
- Reports: replace simulated import/preview behavior with real parsing only after samples establish each format's columns. Imported historical sales must not affect stock. Do not claim a final importer implementation while samples are unavailable. Keep one PDF export action; the current Excel button is only a success alert, while the existing print facility can produce a PDF with print-specific styling and no extra export dependency.
- Add focused tests for parsing/normalization and the key affected business behavior when the sample-driven importer is implemented; run lint and build for the overall UI changes.

## Remaining for the builder

- Apply the explicit content removals and copy updates without broad layout changes.
- Confirm every public address and operating-hours occurrence is consistent with the single provided outlet.
- Keep the unresolved importer visibly unimplemented until real samples are available; after receipt, add only the mappings supported by those files and report any unsupported fields.
