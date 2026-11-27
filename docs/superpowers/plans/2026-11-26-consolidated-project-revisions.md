# Consolidated Project Revisions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved customer-page and dashboard revisions, standardize outlet/brand copy, and provide a clean PDF export without changing backend behavior.

**Architecture:** Keep the existing Next.js App Router and frontend data flow. Put the confirmed outlet identity, address, hours, and slogan in one small frontend constant module and reuse it on public pages and business-profile defaults. Keep the report export on the current browser print path; actual marketplace file parsing remains blocked until source samples are supplied.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4.

**Spec:** `docs/superpowers/specs/2026-11-26-consolidated-project-revisions-design.md`

## Global Constraints

- Preserve the existing brand design, typography, animations, responsive behavior, backend functionality, authentication, database integrity, and business logic outside the requested revisions.
- Use the confirmed single outlet: Cireng Cangkeling, Jalan Parangtritis 55188 Panggungharjo, Special Region of Yogyakarta.
- Display operating hours as every day, 10:00-21:00 WIB; use the slogan exactly: `YANG KAMU INGIN, KITA ADAIN!`
- Replace user-facing `Gerai` terminology with `OUTLET`; preserve internal IDs, enum values, and stored business data.
- Do not delete backend data, database columns, or existing business records.
- Do not implement or simulate CSV/XLSX marketplace parsing until real platform samples are supplied; do not add a parser dependency yet.
- Keep imported historical sales from deducting physical stock.
- Do not commit, push, merge, or deploy.

## Review Focus

- Old address/hour variants can remain in repeated public-page footers or profile defaults; verify no old public address or schedule remains.
- Display-copy changes can accidentally alter stored role/payment/outlet identifiers; keep values intact and change only rendered labels.
- Removing the supplier column can misalign empty-state `colSpan`; inspect the table header, row cells, and empty row together.
- Removing the duplicate production form must leave recipe-based production and its stock movements untouched; verify the existing workflow remains reachable.
- Printing can include dashboard navigation or controls; verify the report's print view contains the report and omits interactive chrome.

---

### Task 1: Standardize public brand and outlet information

**Files:**
- Create: `frontend/app/lib/businessInfo.ts`
- Modify: `frontend/app/page.tsx`
- Modify: `frontend/app/pesan/page.tsx`
- Modify: `frontend/app/menu-siap-makan/page.tsx`
- Modify: `frontend/app/menu-frozen/page.tsx`
- Modify: `frontend/app/pengaturan/profil/page.tsx`
- Modify: `frontend/app/components/Header.tsx`

**Interfaces:**
- Produces `businessInfo` with literal fields `name`, `outletName`, `address`, `hours`, and `slogan`; public pages consume these values instead of repeating outlet/address/hour/tagline literals.

- [ ] Create the shared constants with the exact values from Global Constraints.
- [ ] Update the customer header slogan and business-profile tagline to `YANG KAMU INGIN, KITA ADAIN!`.
- [ ] Remove the dotted radial overlay and the complete `KISAH RASA & KUALITAS` section from the home page.
- [ ] Replace public address and hours everywhere, showing one outlet only; remove duplicated outlet-address blocks from the order-page footer while retaining its dedicated visit section.
- [ ] Update the business-profile defaults to one outlet and the new hours; remove only the obsolete second hardcoded address input, which is local component state and not persisted backend data.
- [ ] Run `rg -n "Kaliurang KM|21\\.30|09\\.00|PELOPOR CIRENG RENYAH GURIH|KISAH RASA|radial-gradient" frontend/app`; expected: no matches in the public pages or profile.

### Task 2: Reduce customer menu and platform copy

**Files:**
- Modify: `frontend/app/menu-siap-makan/page.tsx`
- Modify: `frontend/app/menu-frozen/page.tsx`
- Modify: `frontend/app/pesan/page.tsx`

**Interfaces:**
- No new interfaces. Keep menu item records, order actions, search behavior, badges, prices, and portions.

- [ ] Remove rendered product descriptions and section subtitles from both menu pages without deleting data still used by search.
- [ ] Simplify the ready-to-eat section 02 heading to `CIRENG ISI` (the current source says `DAGING & VARIAN SPESIAL`; the request's `DARING` does not occur in the source).
- [ ] Set frozen section 03 to `MENU LAIN` and remove its `(FROZEN PACK)` suffix.
- [ ] Remove descriptions from the ShopeeFood, GoFood, GrabFood, and WhatsApp ordering-platform cards while retaining platform names and order links.
- [ ] Check the three customer routes at desktop and mobile widths; confirm menus, prices, search, and order links remain visible and usable.

### Task 3: Simplify cashier and owner screens

**Files:**
- Modify: `frontend/app/kasir/pos/page.tsx`
- Modify: `frontend/app/kasir/dashboard/page.tsx`
- Modify: `frontend/app/dashboard/page.tsx`
- Modify: `frontend/app/data-master/bahan-baku/page.tsx`
- Modify: `frontend/app/operasional/stok-produk/page.tsx`
- Modify: `frontend/app/operasional/penyesuaian-stok/page.tsx`
- Modify: `frontend/app/keuangan/pengeluaran/page.tsx`
- Modify: `frontend/app/pengaturan/user/page.tsx`
- Modify user-facing terminology only in: `frontend/app/login/page.tsx`, `frontend/app/data-master/produk/page.tsx`, `frontend/app/keuangan/catatan/page.tsx`, `frontend/app/laporan/produksi/page.tsx`, `frontend/app/laporan/persediaan/page.tsx`, `frontend/app/marketplace/master-penjualan/page.tsx`, `frontend/app/kasir/riwayat/page.tsx`, `frontend/app/kasir/shift/page.tsx`, `frontend/app/laporan/penjualan/page.tsx`, `frontend/app/operasional/produksi/page.tsx`, `frontend/app/marketplace/import/page.tsx`, `frontend/app/laporan/keuangan/page.tsx`, `frontend/app/penjualan/transaksi/page.tsx`

**Interfaces:**
- No new business interfaces. Keep existing role, payment, outlet, stock, and production identifiers unchanged; update only their display labels.

- [ ] Remove `Petunjuk Operasional Kasir` from the POS page.
- [ ] Preserve the cashier redirection detail view. The current table has one Detail action and no Cetak action, so do not add or retain a separate print action.
- [ ] Remove only the supplier header/cell from the raw-material table and update its empty-state column span.
- [ ] Remove the redundant finished-production form and its page-local state/handler from product stock; leave `addProductionOrder` and the recipe-based production route unchanged.
- [ ] Tighten cell padding and hierarchy in the stock-history table on the owner dashboard and full stock-history page, and in the expense table; retain existing columns, filters, and actions.
- [ ] Replace rendered `Gerai` labels/text with `OUTLET` consistently across the listed screens without changing stored values or backend-facing enums; show legacy outlet assignments with the single confirmed outlet name while retaining their stored values.
- [ ] Replace the cashier receipt tagline below `CIRENG CANGKELING` with `YANG KAMU INGIN, KITA ADAIN!`.
- [ ] Confirm `Proporsi Pengeluaran` is absent from the source; make no unrelated substitute section.

### Task 4: Make the business report export a clean PDF

**Files:**
- Modify: `frontend/app/laporan/keuangan/page.tsx`
- Modify: `frontend/app/components/AppShell.tsx`
- Modify: `frontend/app/globals.css`

**Interfaces:**
- Keep the existing `window.print()` action; expose one `Ekspor PDF` action and do not add a PDF dependency.

- [ ] Remove the simulated Excel-success alert button and label the existing print action `Ekspor PDF`.
- [ ] Add report-only print styling that hides the app header/sidebar and interactive controls, removes excess page padding, and keeps report headings/totals readable on paper.
- [ ] Verify `Proporsi Pengeluaran` remains absent and that the report totals continue using existing POS and expense records only; do not count seeded marketplace sample rows as real sales.
- [ ] Verify browser print preview at desktop and narrow viewport widths; expected: one report, no navigation/actions, and no clipped totals.

### Task 5: Validate the approved scope

**Files:**
- No additional files.

- [ ] Run `npm run lint`; expected: no lint errors in `frontend`.
- [ ] Run `npm run build`; expected: successful Next.js production build.
- [ ] Search for obsolete public addresses/hours, dotted backgrounds, the removed home section, and rendered `Gerai` copy; inspect any remaining matches to ensure they are internal identifiers rather than visible labels.
- [ ] Confirm no database migrations, backend/auth changes, or Git mutations occurred.

## Deferred until report samples arrive

Do not implement the CSV/XLSX import adapters, preview mappings, duplicate detection, or marketplace consolidation from real exports yet. The user has no samples available; resume that work only after receiving representative GoFood, GrabFood, and ShopeeFood reports with personal data redacted but column structure preserved.
