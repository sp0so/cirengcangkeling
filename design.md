# Design Specification — Cireng Cangkeling

**Project:** Cireng Cangkeling Management Information System  
**Document:** `design.md`  
**Version:** 1.3  
**Status:** Design-to-Development Reference  
**Design Tool:** Figma  
**Design Mode:** Figma Dev Mode  
**Interface Language:** Bahasa Indonesia

**Primary Design Reference:**  
[Cireng Cangkeling — Figma Dev Mode](https://www.figma.com/design/QDYkYs4vJMh6f2j62MZqer/Cireng-cangkeling--Copy-?node-id=0-1&m=dev)

---

# 1. Design Overview

## 1.1 Purpose

This document defines the visual design system, navigation hierarchy, page structure, reusable UI components, micro-interactions, motion behavior, and frontend implementation guidelines for the Cireng Cangkeling Management Information System.

It serves as the primary design-to-development reference for UI/UX designers and frontend developers.

The application must follow the approved Figma design while maintaining the functional requirements and business processes defined in the PRD and SRS.

## 1.2 Design Source of Truth

The latest Figma copy is the authoritative source for visual implementation.

| Property | Value |
|---|---|
| File Name | Cireng-cangkeling--Copy- |
| File Key | `QDYkYs4vJMh6f2j62MZqer` |
| Main Page | 00–01 — Fondasi & Arsitektur |
| Design Mode | Figma Dev Mode |
| Interface Language | Bahasa Indonesia |

The following properties must be inspected directly in Figma:

- Font family and typography.
- Color palette.
- Component dimensions.
- Spacing and layout.
- Border radius and shadow.
- Icons and image assets.
- Component variants.
- Interaction states.
- Responsive behavior.

The PRD determines the system modules and business scope. The SRS determines system behavior and access permissions. Figma determines visual appearance and existing design properties. This document additionally defines the motion behavior required to make the application feel responsive and polished.

## 1.3 Design Principles

| Principle | Description |
|---|---|
| Consistency | Maintain consistent typography, colors, spacing, and components. |
| Simplicity | Present information through clear and understandable layouts. |
| Efficiency | Make daily business operations easy to access. |
| Visibility | Highlight important stock, sales, and financial information. |
| Reliability | Present inventory and transaction data accurately. |
| Traceability | Make important business activities easy to monitor. |
| Responsiveness | Adapt the interface to supported screen sizes. |
| Motion Clarity | Use animation to communicate state changes and system feedback. |
| Performance | Keep all animations lightweight and responsive. |

## 1.4 Overall Experience Direction

The website should feel like a modern business application with a clear visual identity and subtle interactive feedback.

The interface must not feel static. Small interactions should communicate that an action has been recognized, a process is running, or information has changed.

Motion should serve three purposes:

1. **Feedback:** Communicate that the system has received an interaction.
2. **Continuity:** Help users understand where elements come from and where they go.
3. **Orientation:** Make navigation, state changes, and information hierarchy easier to understand.

Animations must never take priority over usability, data readability, or task completion.

---

# 2. Brand Identity and Visual Direction

## 2.1 Brand Identity

**Brand Name:** Cireng Cangkeling

The application must use the existing logo and brand assets available in the Figma file.

Brand assets must retain their original proportions, colors, and visual characteristics.

## 2.2 Visual Direction

The current Figma design establishes the following visual characteristics:

- Purple and magenta brand identity.
- Warm cream application background.
- White content cards.
- Dark navy primary text.
- Muted brown secondary text.
- Rounded cards and input elements.
- Subtle shadows.
- Structured tables and data visualization.
- Clear stock and transaction status indicators.

These characteristics must remain consistent throughout the application.

## 2.3 Motion Direction

The motion design should complement the warm, modern, and business-oriented appearance.

Recommended motion characteristics:

- Smooth and controlled transitions.
- Subtle hover responses.
- Quick button feedback.
- Gentle card elevation.
- Soft page transitions.
- Natural dropdown and modal entrances.
- Animated loading indicators.
- Smooth chart updates.
- Clear success and error feedback.
- Subtle icon movement for meaningful actions.

Avoid excessive bouncing, aggressive zooming, long transitions, or decorative animations that do not communicate useful information.

---

# 3. Typography System

Typography must follow the actual font family and text styles defined in the corresponding Figma frames.

## 3.1 Dashboard Typography

**Figma Frame:** Dashboard → Proses (`6:164`)

**Font Family:** Plus Jakarta Sans

| Font Style | Usage |
|---|---|
| Bold | KPI values, alert headings, card titles |
| SemiBold | Section labels and supporting headings |
| Medium | Secondary labels and descriptions |
| Regular | Body text and supporting descriptions |

Verified typography values:

| Text Role | Font Style | Size | Line Height |
|---|---|---:|---:|
| Alert Heading | Bold | 16px | 24px |
| Alert Description | Regular | 14px | 22.75px |
| Alert Badge | Bold | 11px | 14px |
| Action Button | Bold | 14px | 20px |
| Operational Context | SemiBold | 12px | 16px |
| Supporting Label | Medium | 11px | 14px |
| KPI Label | Bold | 11px | 14px |
| KPI Value | Bold | 32px | 40px |
| KPI Supporting Text | Medium | 12px | 16px |

## 3.2 Login Typography

**Figma Frame:** Html → Body (`140:251`)

The Login screen uses:

- Montserrat for the header and brand identity.
- Nimbus Sans for the feature panel and authentication form.

| Component | Font Style | Size | Line Height |
|---|---|---:|---:|
| Brand Name | Montserrat SemiBold | 18px | 24px |
| Brand Tagline | Montserrat ExtraBold | 10px | 14px |
| Main Heading | Nimbus Sans Bold | 36px | 40px |
| Supporting Description | Nimbus Sans Regular | 16px | 24px |
| Form Heading | Nimbus Sans Bold | 30px | 36px |
| Form Description | Nimbus Sans Regular | 14px | 20px |
| Form Label | Nimbus Sans Bold | 12px | 16px |
| Input Text | Nimbus Sans Regular | 14px | Normal |
| Button Text | Nimbus Sans Bold | 14px | 20px |

## 3.3 Typography Rules

1. Dashboard components must use Plus Jakarta Sans where specified.
2. Login header components must use Montserrat where specified.
3. Login feature and form components must use Nimbus Sans where specified.
4. Preserve exact font weights and dimensions.
5. Avoid arbitrary font substitutions.
6. Do not force one global font family across components that use different Figma styles.

---

# 4. Color Palette

The following values were obtained from the inspected Figma Dev Mode properties.

## 4.1 Dashboard Colors

| Color Name | HEX | Usage |
|---|---|---|
| Warm Cream | `#FFF7ED` | Dashboard background |
| Primary Magenta | `#A24F9D` | Primary actions and brand accents |
| Dark Navy | `#0B1C30` | Primary text |
| Muted Brown | `#5B403D` | Secondary text |
| Warm Brown | `#833E17` | Operational accent |
| Information Blue | `#E5EEFF` | Informational surfaces |
| Critical Background | `#FFDAD6` | Critical alert surface |
| Critical Red | `#BA1A1A` | Critical indicators |
| Critical Text | `#93000A` | Critical alert text |
| Success Green | `#16A34A` | Success indicators |
| Success Text | `#15803D` | Success labels |
| Success Background | `#DCFCE7` | Success badges |
| Warning Amber | `#F59E0B` | Warning indicators |
| Warning Background | `#FEF3C7` | Warning badges |
| Warning Text | `#92400E` | Warning labels |
| Light Peach | `#FFDBCC` | Supporting surfaces |
| Light Blue | `#EFF4FF` | Supporting information |
| Pale Blue | `#D3E4FE` | Supporting surfaces |
| Border Gray | `#CBD5E1` | Neutral borders |
| Brown Accent | `#A1552D` | Supporting visual elements |

Use the corresponding Figma properties for other screen-specific colors.

## 4.2 Login Colors

### Header and Branding

| Property | HEX |
|---|---|
| Brand Title | `#5F030A` |
| Brand Tagline | `#904D00` |
| Header Background | `#FFFFFF` |
| Header Border | `#E2E8F0` |

### Login Card

| Property | Value |
|---|---|
| Card Background | `#FFFFFF` |
| Card Border | `#F1F5F9` |
| Border Radius | `24px` |
| Maximum Width | `1120px` |
| Left Panel Width | `514.27px` |
| Right Panel Width | `603.72px` |

### Feature Panel

```css
background: linear-gradient(
  127.45deg,
  rgb(91, 55, 101) 0%,
  rgb(162, 79, 157) 50%,
  rgb(92, 54, 101) 100%
);
```

### Login Form

| Property | HEX |
|---|---|
| Form Heading | `#0F172A` |
| Supporting Description | `#64748B` |
| Form Label | `#334155` |
| Required Indicator | `#F43F5E` |
| Inactive Role Background | `#F8FAFC` |
| Inactive Role Border | `#E2E8F0` |
| Inactive Role Text | `#475569` |
| Selected Role Background | `#FBF4F9` |
| Selected Role Border | `#732662` |
| Selected Role Text | `#5E1E4F` |
| Input Border | `#CBD5E1` |
| Input Placeholder | `#94A3B8` |
| Primary Login Button | `#732662` |

## 4.3 Color Rules

- Use the exact Figma colors for the relevant screen and component.
- Preserve gradients and transparency.
- Reuse semantic colors consistently.
- Do not apply Dashboard colors indiscriminately to other screens.
- Do not use color as the only way to communicate a status.
- Animation colors must remain consistent with the component's semantic color.

---

# 5. Spacing, Radius, and Shadow

## 5.1 Spacing

Use Figma Auto Layout and component spacing properties as the primary reference.

Observed values include:

| Value | Usage |
|---|---|
| 4px | Compact spacing |
| 6px | Small component gaps |
| 8px | Input and form grouping |
| 12px | Card and form spacing |
| 16px | Card padding |
| 20px | Form and panel grouping |
| 24px | Main section spacing |
| 40px | Header horizontal padding |
| 56px | Login panel padding |

## 5.2 Border Radius

| Radius | Usage |
|---|---|
| 4px | Compact badges |
| 6px | Information labels |
| 8px | Supporting components |
| 11px | Brand logo container |
| 12px | Buttons, cards, and inputs |
| 16px | Feature cards and callouts |
| 24px | Main Login card |
| 9999px | Circular indicators and pill badges |

## 5.3 Shadow

Dashboard card:

```css
box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
```

Dashboard alert and action surfaces:

```css
box-shadow:
  0px 4px 6px -1px rgba(0, 0, 0, 0.1),
  0px 2px 4px -2px rgba(0, 0, 0, 0.1);
```

Login card:

```css
box-shadow:
  0px 20px 25px -5px rgba(226, 232, 240, 0.8),
  0px 8px 10px -6px rgba(226, 232, 240, 0.8);
```

Use the shadow defined for each corresponding Figma component.

---

# 6. System Navigation Hierarchy

The navigation hierarchy follows the modules and functional scope defined in the PRD.

The application has two primary roles:

1. Owner.
2. Kasir.

The navigation structure is separated by user role. Owner has access to all business management modules, while Kasir has access only to cashier operations and personal transaction and shift information.

## 6.1 Owner Navigation Hierarchy

```text
OWNER
│
├── 1. Dashboard
│
├── 2. Data Master
│   ├── Data Produk
│   ├── Data Bahan Baku
│   ├── Data Supplier
│   └── Manajemen Resep
│
├── 3. Operasional
│   ├── Stok Produk Jadi
│   ├── Pembelian / Pengadaan
│   ├── Produksi
│   └── Penyesuaian Stok
│
├── 4. Penjualan & Kasir
│   ├── Transaksi Penjualan
│   ├── Manajemen Kasir
│   ├── Manajemen Shift
│   └── Mode Kasir Owner
│
├── 5. Marketplace
│   ├── Import Laporan Marketplace
│   ├── Riwayat Import
│   └── Master Laporan Penjualan
│
├── 6. Keuangan
│   ├── Pengeluaran Usaha
│   ├── Catatan Keuangan
│   ├── Perhitungan HPP
│   └── Estimasi Laba
│
├── 7. Laporan
│   ├── Laporan Penjualan
│   ├── Laporan Pembelian
│   ├── Laporan Persediaan
│   ├── Laporan Produksi
│   └── Laporan Keuangan
│
└── 8. Pengaturan
    └── Profil Usaha
```

### 6.1.1 Dashboard

Displays business and operational summaries.

Contains:
- Total finished goods.
- Total raw materials.
- Low-stock and critical-stock indicators.
- Today's sales.
- Monthly expenses.
- Sales and expense trends.
- Recent inventory movements.
- Best-selling products.

### 6.1.2 Data Master

Contains:
- Data Produk.
- Data Bahan Baku.
- Data Supplier.
- Manajemen Resep.

### 6.1.3 Operasional

Contains:
- Stok Produk Jadi.
- Pembelian / Pengadaan.
- Produksi.
- Penyesuaian Stok.

### 6.1.4 Penjualan & Kasir

Contains:
- Transaksi Penjualan.
- Manajemen Kasir.
- Manajemen Shift.
- Mode Kasir Owner.

### 6.1.5 Marketplace

Contains:
- Import Laporan Marketplace.
- Riwayat Import.
- Master Laporan Penjualan.

Marketplace import is a manual report import feature, not direct API integration or real-time synchronization.

Historical marketplace imports must not automatically deduct current inventory.

### 6.1.6 Keuangan

Contains:
- Pengeluaran Usaha.
- Catatan Keuangan.
- Perhitungan HPP.
- Estimasi Laba.

HPP and profit must be labeled as estimates when cost information is incomplete.

### 6.1.7 Laporan

Contains:
- Laporan Penjualan.
- Laporan Pembelian.
- Laporan Persediaan.
- Laporan Produksi.
- Laporan Keuangan.

### 6.1.8 Pengaturan

Contains:
- Profil Usaha.

## 6.2 Kasir Navigation Hierarchy

```text
KASIR
│
├── 1. Dashboard Kasir
│
├── 2. Transaksi Penjualan
│   ├── Katalog Produk
│   ├── Keranjang Belanja
│   ├── Pemilihan Metode Pembayaran
│   ├── Penyelesaian Transaksi
│   └── Cetak / Unduh Struk
│
├── 3. Riwayat Transaksi
│   └── Riwayat Transaksi Pribadi
│
└── 4. Shift Kasir
    ├── Buka Shift
    ├── Tutup Shift
    ├── Rekap Shift
    └── Riwayat Shift Pribadi
```

### 6.2.1 Dashboard Kasir

Displays current shift status, opening cash, transaction summary, and relevant cashier information.

### 6.2.2 Transaksi Penjualan

Contains:
- Product catalog.
- Shopping cart.
- Quantity adjustment.
- Subtotal.
- Transaction total.
- Payment method.
- Transaction confirmation.
- Receipt generation.

### 6.2.3 Riwayat Transaksi

Displays the Kasir's own transaction history.

### 6.2.4 Shift Kasir

Contains:
- Shift opening.
- Opening cash input.
- Shift closing.
- Actual cash input.
- Cash reconciliation.
- Shift recap.
- Personal shift history.

Sales transactions cannot be processed before the Kasir starts a shift.

## 6.3 Role-Based Access Summary

| Module | Owner | Kasir |
|---|---|---|
| Dashboard | Full Access | Cashier Dashboard |
| Data Produk | Full Access | View Products |
| Data Bahan Baku | Full Access | No Access |
| Data Supplier | Full Access | No Access |
| Manajemen Resep | Full Access | No Access |
| Stok Produk Jadi | Full Access | No Access |
| Pembelian / Pengadaan | Full Access | No Access |
| Produksi | Full Access | No Access |
| Penyesuaian Stok | Full Access | No Access |
| Transaksi Penjualan | Conditional Access | Full Cashier Access |
| Manajemen Kasir | Full Access | No Access |
| Manajemen Shift | Full Access | Own Shift Only |
| Mode Kasir Owner | Conditional Access | No Access |
| Marketplace | Full Access | No Access |
| Keuangan | Full Access | No Access |
| Perhitungan HPP | Full Access | No Access |
| Estimasi Laba | Full Access | No Access |
| Laporan | Full Access | Own Transaction History |
| Profil Usaha | Full Access | No Access |

### Access Restrictions

- Only two primary roles exist: Owner and Kasir.
- Only one active cashier session may exist globally.
- When a Kasir shift is active, the Owner's cashier access is locked.
- When Owner Cashier Mode is active, the Kasir cannot start another shift.
- Owner access to other management modules remains available.
- Being logged in as a Kasir without an active shift does not block Owner Cashier Mode.
- Permissions must be enforced by both frontend navigation and backend authorization.

---

# 7. Figma Screen Mapping

The current Figma copy contains the following primary screens.

| Figma Screen | Node ID | PRD Module |
|---|---|---|
| Dashboard | `6:164` | Dashboard |
| Stok Bahan Baku | `6:799` | Data Bahan Baku |
| Stok Produk Jadi | `6:1438` | Stok Produk Jadi |
| Data Produk | `6:2222` | Data Produk |
| Riwayat Perubahan Stok | `6:2873` | Inventory Reporting / Stock History |
| Penjualan & Kasir | `6:3562` | Transaksi Penjualan / Kasir |
| Pengeluaran Usaha | `6:4480` | Keuangan |
| Laporan Usaha | `6:5179` | Laporan |
| Manajemen Pengguna | `6:5938` | Requires PRD Scope Confirmation |
| Profil Usaha | `6:6641` | Profil Usaha |
| Login | `140:251` | Authentication |

Additional Figma frames:

| Screen | Node ID | Scope |
|---|---|---|
| Pemesanan Pelanggan | `79:2` | Requires scope confirmation |
| Home - Pelanggan | `82:997` | Requires scope confirmation |
| Menu Siap Makan | `82:1218` | Requires scope confirmation |
| Menu Frozen | `82:1862` | Requires scope confirmation |
| Profil Kasir | `127:33` | Cashier interface |
| Riwayat Transaksi Kasir | `127:485` | Cashier interface |
| Dashboard Kasir | `127:1661` | Cashier dashboard |
| Katalog & Pemesanan Online - Role Kasir | `127:2161` | Requires scope confirmation |

## 7.1 Screens Requiring Additional Design

The PRD includes functional modules that do not yet have a clearly identified standalone screen in the inspected Figma hierarchy.

| Required Screen | PRD Module |
|---|---|
| Data Supplier | Supplier Management |
| Pembelian / Pengadaan | Procurement Management |
| Manajemen Resep | Recipe Management |
| Produksi | Production Management |
| Penyesuaian Stok | Stock Adjustment |
| Manajemen Shift | Cashier Shift Management |
| Mode Kasir Owner | Owner Cashier Mode |
| Import Marketplace | Marketplace Sales Import |
| Riwayat Import | Marketplace Import History |
| Master Laporan Penjualan | Master Sales Report |
| Catatan Keuangan | Financial Management |
| Perhitungan HPP | HPP Calculation |
| Estimasi Laba | Estimated Profit |
| Laporan Pembelian | Purchase Reports |
| Laporan Persediaan | Inventory Reports |
| Laporan Produksi | Production Reports |
| Laporan Keuangan | Financial Reports |

New screens must follow the existing Figma design system.

## 7.2 Scope Alignment

The following Figma screens are not confirmed as independent modules in the current PRD:

- Manajemen Pengguna as a separate navigation module.
- Public customer ordering.
- Online customer checkout.
- Public catalog-specific workflows.

These screens must remain outside the confirmed current navigation scope until approved in the PRD.

---

# 8. Reusable UI Components

Use reusable components based on the existing Figma design.

## 8.1 Navigation Components

- Sidebar.
- Sidebar section heading.
- Navigation item.
- Active navigation item.
- Navigation badge.
- Top header.
- Notification indicator.
- User profile menu.

## 8.2 Dashboard Components

- KPI card.
- Critical alert banner.
- Status badge.
- Chart container.
- Summary card.
- Stock warning item.
- Inventory movement table.
- Best-selling product item.

## 8.3 Form Components

- Text input.
- Password input.
- Number input.
- Currency input.
- Select/dropdown.
- Date picker.
- Checkbox.
- Form label.
- Validation message.

## 8.4 Action Components

- Primary button.
- Secondary button.
- Destructive button.
- Icon button.
- Confirmation dialog.
- Toast notification.
- Loading indicator.

## 8.5 Business Components

- Raw material item.
- Finished goods item.
- Product item.
- Supplier item.
- Purchase detail item.
- Recipe ingredient item.
- Production record item.
- Cashier cart item.
- Payment method selector.
- Cashier session status.
- Shift recap.
- Marketplace import preview.
- Financial summary.
- HPP breakdown.

All components must use the corresponding Figma typography, colors, dimensions, and interaction states.

---

# 9. Micro-interactions and Motion Design

<badge color="success">Required design specification</badge>

## 9.1 Motion Design Objectives

The Cireng Cangkeling website must use micro-animations throughout the interface to create a responsive and polished user experience.

Animations must make the interface feel alive through small, meaningful movements.

The motion system must support:

1. User interaction feedback.
2. Navigation transitions.
3. Component state changes.
4. Loading and processing feedback.
5. Data visualization updates.
6. Success and error communication.
7. Progressive content appearance.
8. Contextual feedback for business operations.

The animation must feel natural, quick, and purposeful.

## 9.2 Global Motion Principles

### A. Purposeful Motion

Every animation must communicate at least one of the following:

- A component has been interacted with.
- A component has changed state.
- New content has appeared.
- Content has moved or been updated.
- An operation is running.
- An operation has completed.
- An action is currently unavailable.

Do not animate an element simply to decorate the interface.

### B. Subtle Movement

Use small movements for everyday interactions.

Examples:
- Buttons move upward by a very small distance on hover.
- Cards lift slightly when hovered.
- Icons rotate or shift slightly when activated.
- Dropdowns fade and move into position.
- Notifications enter from the edge of the screen.

### C. Fast Feedback

The interface must respond immediately when users interact with it.

Do not delay a button response until an asynchronous request completes. Show immediate visual feedback, then reflect the actual operation result.

### D. Consistency

Similar interactions must use similar animation duration, easing, and behavior throughout the application.

### E. No Motion Interference

Animations must not:

- Block a user's next action unnecessarily.
- Delay form submission.
- Hide important information.
- Cause layout instability.
- Make financial values difficult to read.
- Create accidental duplicate actions.

---

## 9.3 Motion Tokens

Create a centralized motion token system. These values are recommended motion specifications added to this document, not extracted Figma design values.

### Duration Tokens

| Token | Duration | Intended Usage |
|---|---:|---|
| `motion.instant` | 80ms | Tiny icon and pressed-state feedback |
| `motion.fast` | 120ms | Hover, focus, and simple color transitions |
| `motion.quick` | 160ms | Button and input interaction |
| `motion.normal` | 200ms | Dropdown, badge, and card transitions |
| `motion.medium` | 260ms | Modal, popover, and small panel entrances |
| `motion.slow` | 320ms | Page section and larger panel transitions |
| `motion.enter` | 400ms | Initial page content appearance |
| `motion.long` | 500ms | Complex data visualization transitions |

### Easing Tokens

| Token | CSS Value | Intended Usage |
|---|---|---|
| `ease.standard` | `cubic-bezier(0.2, 0, 0, 1)` | General UI transitions |
| `ease.enter` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering the screen |
| `ease.exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the screen |
| `ease.spring` | `cubic-bezier(0.22, 1, 0.36, 1)` | Gentle emphasis and card movement |
| `ease.linear` | `linear` | Progress and continuous rotation |

### Recommended Motion Distances

| Motion | Recommended Distance |
|---|---:|
| Button press | 1–2px |
| Button hover lift | 1–2px |
| Card hover lift | 2–4px |
| Dropdown entrance | 4–8px |
| Toast entrance | 12–20px |
| Modal entrance | 8–16px |
| Page content entrance | 6–12px |
| Icon nudge | 1–3px |

These are recommended implementation limits. Use the corresponding Figma component dimensions and avoid excessive movement.

## 9.4 Global Transition Rules

Use these rules for general component transitions:

- Animate `transform` and `opacity` whenever possible.
- Animate color, background, border, and shadow for component feedback.
- Avoid animating expensive layout properties such as `width`, `height`, `top`, and `left` when a transform-based alternative is possible.
- Keep motion durations consistent with the motion tokens.
- Avoid large scale transformations.
- Avoid unnecessary layout shifts.
- Use `will-change` only for elements that genuinely need it.
- Do not keep animations running when their components are not visible or active.

---

## 9.5 Page Load and Initial Appearance

When a user opens a page, its content should appear progressively rather than all elements suddenly appearing at once.

### Page Entrance

Recommended sequence:

1. The page background appears immediately.
2. The sidebar becomes visible.
3. The top header fades into view.
4. The page title and main action appear.
5. Important alerts appear.
6. KPI cards appear with a subtle stagger.
7. Charts, tables, and supporting panels appear afterward.

Recommended behavior:

| Element | Animation | Duration |
|---|---|---:|
| Page background | No animation or subtle fade | 120ms |
| Sidebar | Fade in with slight horizontal movement | 200ms |
| Header | Fade in | 160ms |
| Page title | Fade in and move upward 6px | 200ms |
| Alert banner | Fade in and move downward/upward slightly | 260ms |
| KPI cards | Fade in and move upward 8px | 260ms |
| Main chart | Fade in | 320ms |
| Data table | Fade in | 320ms |

### Staggered Entrance

For multiple cards:

- Use a stagger interval of approximately 40–60ms.
- Keep the total animation sequence short.
- Do not animate every table row individually on every page load.
- Prioritize the first visible viewport.
- Avoid repeatedly replaying entrance animation when users return to an already loaded page.

Use progressive rendering only when it improves orientation. Content must remain available even when animations are disabled.

---

## 9.6 Sidebar Micro-interactions

The sidebar is a frequently used element and must respond smoothly to pointer and keyboard interaction.

### Navigation Item Hover

When the pointer enters a navigation item:

- Change the background to the Figma-defined hover state.
- Transition the text and icon color smoothly.
- Apply a subtle background fade.
- Do not significantly change the item dimensions.

Recommended duration: `120–160ms`.

### Navigation Item Click

When a user selects an item:

- Provide immediate pressed feedback.
- Highlight the selected navigation item.
- Update the active indicator.
- Transition the icon and text to their active colors.
- Navigate to the destination page.
- Apply a subtle content transition.

Recommended duration: `160–200ms`.

### Active Navigation Indicator

When the active page changes:

- Animate the indicator to the newly selected item.
- Use a short slide or fade.
- Keep the movement contained inside the sidebar.
- Avoid indicators that jump abruptly between distant items.

### Sidebar Section Expansion

When a collapsible navigation group is opened:

1. Rotate the chevron icon smoothly.
2. Reveal the child links.
3. Fade the child labels.
4. Maintain consistent vertical spacing.

Recommended duration: `180–220ms`.

When closed:

- Reverse the chevron rotation.
- Collapse the child list smoothly.
- Preserve the active child state logically.

### Sidebar Badges

Notification badges, critical counts, and status badges must:

- Appear with a brief fade and scale-in.
- Update their text without large movement.
- Avoid repeated attention-grabbing pulses.
- Use a subtle emphasis only when a new critical state appears.

---

## 9.7 Header Micro-interactions

### Notification Button

On hover:
- Change icon or background according to the Figma hover state.
- Slightly elevate the icon button.

On click:
- Provide pressed feedback.
- Open the notification panel with a fade and small vertical movement.
- Position the panel without covering important primary actions unnecessarily.

### Notification Indicator

When a new notification arrives:

- Display the notification badge using a brief scale-in.
- Use one subtle icon movement to attract attention.
- Do not pulse continuously.
- Do not animate repeated notifications aggressively.

### User Profile Menu

On click:

- Open the profile dropdown with fade and vertical movement.
- Display account name and role.
- Support smooth dismissal.
- Animate the menu out before removal from the visible interface.

### Logout

When the user confirms logout:

- Disable repeated submission.
- Display a brief processing state.
- Clear the authenticated application state.
- Navigate to the login page.
- Do not expose private information during the transition.

---

## 9.8 Button Micro-interactions

All interactive buttons must have consistent feedback.

### Primary Button

**Default**
- Follows the Figma-defined background, text, radius, and shadow.

**Hover**
- Slightly increases elevation.
- Changes background or shadow according to the design system.
- Moves upward approximately 1–2px.

**Pressed**
- Moves down approximately 1px or reduces elevation.
- Changes the shadow subtly.
- Gives an immediate visual response.

**Focus**
- Displays a visible keyboard focus indicator.
- Does not rely only on a color change.

**Disabled**
- Uses the disabled visual style.
- Removes hover lift.
- Uses a non-interactive cursor.
- Prevents duplicate operations.

**Loading**
- Replaces or supplements button content with a small spinner.
- Keeps button width stable.
- Prevents repeated submission.
- Preserves an understandable label where space permits.

### Secondary Button

- Uses the same hover and press timing.
- Uses a subtler elevation response.
- Preserves the secondary visual hierarchy.

### Destructive Button

- Uses the danger color defined by the design system.
- Does not use aggressive shaking or flashing.
- Requires confirmation before destructive actions.
- Provides a clear disabled and loading state.

### Icon Button

- The icon may move or scale slightly.
- Do not enlarge the button's actual layout dimensions.
- Use a clear focus state.
- Provide an accessible label.

### Recommended Button Timing

| Event | Duration | Behavior |
|---|---:|---|
| Hover | 120ms | Color and shadow transition |
| Press | 80ms | Small press feedback |
| Release | 120ms | Return to normal |
| Loading start | 160ms | Spinner appears |
| Success feedback | 200ms | Success indicator transition |

---

## 9.9 Icon Micro-interactions

Small icons should have meaningful motion where it improves usability.

### Examples

| Icon | Interaction | Motion |
|---|---|---|
| Chevron Down | Dropdown opens | Rotate 180 degrees |
| Search | Search field focused | Subtle color transition |
| Bell | New notification | Single small nudge |
| Plus | Add item | Rotate slightly or scale in |
| Trash | Delete confirmation | Subtle color change |
| Edit | Hover | Small upward movement |
| Refresh | Refresh action | Rotate while processing |
| Cart | Item added | Small scale-up and return |
| Shopping Bag | Purchase completed | Short confirmation animation |
| Check | Successful operation | Draw or scale-in checkmark |
| Warning | New critical alert | Single short emphasis |
| Eye | Password visibility | Smooth icon state replacement |
| Calendar | Date picker opened | Fade and scale-in |
| Download | Export started | Short processing state |

Do not animate every icon permanently. Motion must be triggered by an actual event or user interaction.

---

## 9.10 Input and Form Micro-interactions

### Input Focus

When an input receives focus:

- Change border color to the Figma-defined focus color.
- Transition border and background smoothly.
- Display a subtle focus ring where appropriate.
- Keep the input dimension stable.
- Do not create layout shifts.

Recommended duration: `120–160ms`.

### Input Blur

When an input loses focus:

- Return to its normal border style.
- Preserve validation messages where needed.
- Keep entered values unchanged.

### Floating or Animated Labels

Only use animated floating labels when the approved Figma design includes that pattern.

Do not introduce a different input pattern purely for animation.

### Placeholder

- Preserve normal placeholder visibility.
- Do not make placeholder text flash or repeatedly animate.
- Keep placeholder and actual input values visually distinguishable.

### Valid Input

When validation succeeds:

- Use the designated success color.
- Display the success indicator when the design requires it.
- Reveal the indicator with a brief fade or scale-in.
- Do not animate the whole form.

### Invalid Input

When validation fails:

1. Highlight the corresponding field.
2. Display the validation message.
3. Fade the message into view.
4. Use a slight vertical movement.
5. Keep the message visible until the error is corrected or dismissed.

Do not use aggressive input shaking. A very small single horizontal nudge may be used only for a critical invalid submission, and must remain optional under reduced-motion settings.

### Password Visibility

When the password visibility button is activated:

- Change the icon smoothly.
- Switch the input type.
- Preserve the typed password.
- Avoid clearing or moving the input value.

### Checkbox

On click:

- Animate the checkmark into the checkbox.
- Transition the background and border.
- Provide immediate visual feedback.

### Select / Dropdown

When opened:

- Fade in the dropdown.
- Move it vertically by approximately 4–8px.
- Animate the selected item indicator.
- Highlight the hovered option.
- Close smoothly when a selection is made or the user clicks outside.

---

## 9.11 Card Micro-interactions

### Standard Card

On hover where the card is interactive:

- Lift slightly by approximately 2–4px.
- Increase shadow subtly.
- Keep card width and height unchanged.
- Transition smoothly.

On click:
- Provide brief pressed feedback.
- Do not make non-interactive information cards look clickable.

### KPI Card

When a KPI card appears:

- Fade in.
- Move upward slightly.
- Use a staggered sequence for multiple cards.

On hover:
- Apply a subtle elevation response.
- Preserve the top color indicator.
- Avoid excessive scaling.

On data update:
- Update the numerical value smoothly.
- Do not make the number continuously count on every rerender.
- Trigger a short emphasis only when the actual underlying value changes.
- Keep the final number accurate and readable.

### Stock Summary Card

When stock status changes:
- Update the badge color and label.
- Transition the status indicator.
- Provide one subtle emphasis for a newly critical state.

Do not keep critical cards flashing or pulsing.

### Best-Selling Product Card

On hover:
- Slightly increase elevation.
- Let the product image scale subtly within its image container if this matches the Figma component.
- Keep text and price positions stable.

---

## 9.12 Dashboard Micro-interactions

### Critical Stock Alert

When the Dashboard detects a newly critical stock condition:

1. Display the alert banner with a short fade and movement.
2. Reveal the alert icon.
3. Reveal the title and description.
4. Display the critical badge.
5. Make the procurement action button interactive.

The banner must not flash repeatedly.

When the stock condition changes from critical to normal:

- Update the status and message.
- Use a brief color and text transition.
- Remove the alert only after the condition is actually resolved.

### KPI Number Update

When new data arrives:

- Update the value using a controlled numeric transition if useful.
- Use a short duration, preferably 200–400ms.
- Avoid replaying count-up animations on every minor refresh.
- Keep currency values and stock values readable at all times.
- Do not animate from an arbitrary value that could misrepresent the current business result.

### Chart Updates

When a user changes the period filter:

- Fade or crossfade the chart series.
- Animate bar height or line position smoothly.
- Transition chart tooltips.
- Update the selected period button.
- Preserve the chart's axis and context when possible.

Recommended duration: `260–500ms`.

Chart animation must be disabled or reduced when the dataset is very large or rendering performance is affected.

### Urgent Material List

When stock information is refreshed:

- Transition updated quantity values.
- Highlight newly critical material rows briefly.
- Use a small status indicator transition.
- Do not move the entire list unnecessarily.

### Recent Inventory Movement

When a new record appears:

- Insert it at the correct chronological position.
- Reveal the row with a short fade.
- Avoid large vertical movement.
- Keep table columns aligned.
- Do not animate every historical row on each refresh.

### Best-Selling Product Ranking

When ranking data changes:

- Update ranking labels.
- Animate progress bars smoothly.
- Preserve product image and text layout.
- Use short emphasis for a genuine ranking change.

---

## 9.13 Table Micro-interactions

Tables are a major part of the management application and must use subtle feedback.

### Row Hover

- Transition row background.
- Maintain text contrast.
- Keep row height unchanged.

Recommended duration: `120ms`.

### Row Selection

- Transition selected background.
- Display the corresponding checkbox state.
- Keep the row aligned.

### Sorting

When a column is sorted:

- Rotate or replace the sort indicator.
- Transition the active column style.
- Update row ordering without excessive movement.

### Filtering

When a filter is applied:

- Display the selected filter state.
- Fade updated table results into view.
- Use a small loading indicator where required.
- Preserve pagination context when appropriate.

### Pagination

When moving between pages:

- Highlight the selected page.
- Transition pagination controls.
- Replace table content with a subtle fade.
- Do not animate each row with a large stagger.

### Empty State

When there are no records:

- Display the empty state with a short fade.
- Reveal the explanation text.
- Show the relevant next action where applicable.

### New Records

Newly inserted records may use a brief background highlight to draw attention to their insertion. The highlight must fade back to the normal row background.

---

## 9.14 Search and Filter Micro-interactions

### Search Field

- Focus transition when clicked.
- Search icon color changes on focus.
- Clear button appears when a search query exists.
- Clear button fades in.
- Clearing search returns the field to its normal state.

### Search Results

- Debounce search requests appropriately.
- Show loading feedback while fetching data.
- Fade in results after a successful response.
- Display a clear empty state for unmatched queries.
- Avoid animation that delays result selection.

### Filter Chips

- Animate selection background.
- Transition text and border colors.
- Display removal controls where relevant.
- Support smooth removal of active filters.

### Date Range Selector

- Dropdown opens with fade and slight movement.
- Selected date range is clearly highlighted.
- Calendar navigation receives visual feedback.
- Applying a date range updates dependent reports and charts.

---

## 9.15 Navigation and Page Transition

When moving between modules:

- Preserve the global sidebar and header when the application shell remains the same.
- Transition only the page content where possible.
- Use a short fade and slight vertical movement.
- Avoid reanimating the entire application shell for every navigation event.
- Avoid long transitions that make users wait.

Recommended page transition:

| Element | Motion | Duration |
|---|---|---:|
| Old page content | Fade out | 100–140ms |
| New page content | Fade in and move upward slightly | 160–220ms |
| Page heading | Fade in | 160ms |
| Main content cards | Short stagger | 200–300ms |

Use route-transition behavior that preserves focus management and does not create confusing browser navigation behavior.

---

## 9.16 Dropdown, Popover, and Context Menu

When an element is opened:

- Fade in.
- Move vertically by approximately 4–8px.
- Use the matching Figma radius and shadow.
- Keep the trigger and content visually connected.

When closed:

- Fade out.
- Reverse the entrance movement.
- Remove it after the exit transition finishes.

Additional requirements:

- Close on the appropriate outside click.
- Close with Escape where applicable.
- Maintain keyboard navigation.
- Avoid trapping focus unless the overlay requires modal behavior.

---

## 9.17 Modal and Confirmation Dialog

Modal entrances must be clear without feeling heavy.

### Opening Sequence

1. Display the backdrop using a subtle opacity transition.
2. Fade in the modal.
3. Move the modal upward slightly.
4. Reveal the modal content.
5. Keep the action buttons visible and stable.

### Closing Sequence

1. Fade out the modal.
2. Fade out the backdrop.
3. Return focus to the originating element.

Recommended duration: `200–260ms`.

For confirmation dialogs involving stock correction, sales cancellation, refunds, or force-closing a shift:

- Do not obscure the action description.
- Keep the user in control.
- Display consequences clearly.
- Do not use animation as a substitute for confirmation.

---

## 9.18 Toast and Notification Micro-interactions

### Toast Entrance

- Enter from the designated screen edge.
- Fade in.
- Move approximately 12–20px into position.
- Use the Figma notification surface and semantic color.

### Toast Types

| Type | Visual Feedback |
|---|---|
| Success | Green indicator and check icon |
| Error | Red indicator and error icon |
| Warning | Amber indicator and warning icon |
| Information | Neutral or blue information icon |

### Toast Dismissal

- Fade out.
- Move slightly toward its exit direction.
- Do not remove immediately if the user needs the message to remain readable.

### Notification Rules

- Keep messages concise.
- Do not display duplicate notifications for the same operation.
- Use appropriate persistence for critical errors.
- Allow users to dismiss non-critical messages.
- Never rely on a toast as the only record of an important business action.

---

## 9.19 Loading and Skeleton Animations

Loading feedback must be consistent across the application.

### Page Loading

When loading a page:

- Keep the global application shell visible where possible.
- Display skeleton placeholders matching the actual content geometry.
- Avoid a blank page for long-running requests.
- Remove skeletons when real data is ready.

### Skeleton Shimmer

Use a subtle shimmer effect.

Requirements:
- Use low-contrast colors.
- Keep movement slow and restrained.
- Avoid strong brightness changes.
- Do not run off-screen skeleton animations unnecessarily.
- Stop shimmer when content has loaded.

### Button Loading

When an action is processing:

- Display an inline spinner.
- Disable repeated submission.
- Preserve the button's size.
- Keep the action label understandable.

### Table Loading

- Use skeleton rows with similar column structure.
- Avoid sudden layout changes when actual records appear.
- Preserve the table header.

### Upload Loading

During marketplace report uploads:

- Display upload progress when measurable.
- Transition the progress indicator.
- Display file processing status.
- Distinguish uploading, validating, extracting, and importing.
- Do not present an arbitrary percentage as actual progress.

---

## 9.20 Sales Transaction Micro-interactions

The cashier module must feel fast and reliable.

### Add Product to Cart

When a product is selected:

1. Provide immediate button feedback.
2. Animate the cart count or quantity indicator.
3. Add the product to the cart.
4. Update subtotal and transaction total.
5. Display brief confirmation feedback.

### Cart Quantity Adjustment

When quantity is increased or decreased:

- Update the quantity immediately after validation.
- Transition the number smoothly.
- Recalculate subtotal and total.
- Keep the cart row stable.
- Do not allow invalid quantities.

### Remove Cart Item

When an item is removed:

- Ask for confirmation only when the interaction or business rules require it.
- Fade and collapse the cart row.
- Recalculate the total.
- Update the cart item count.

The animation must not imply that a transaction has been completed.

### Payment Method Selection

When payment method changes:

- Highlight the selected payment option.
- Transition the selected border and background.
- Display the relevant payment input if needed.
- Maintain the correct total.

### Complete Transaction

When the user confirms payment:

1. Show immediate pressed feedback.
2. Change the submit button to loading.
3. Prevent duplicate transaction submission.
4. Wait for the backend transaction result.
5. If successful, display a success state.
6. Display or open the receipt.
7. Update the cart and transaction summary according to the actual result.

**Critical rule:** Never show a completed transaction animation before the backend confirms transaction success.

### Receipt Display

After a successful transaction:

- Show the receipt in a clean transition.
- Use a subtle fade and vertical movement.
- Provide print or download actions.
- Do not animate the actual receipt content excessively.

---

## 9.21 Shift and Cash Reconciliation Micro-interactions

Cashier shift operations must prioritize accuracy and clarity.

### Open Shift

- Focus the opening cash field.
- Validate the entered amount.
- Display a confirmation state.
- Show processing feedback.
- Display the active shift state only after backend confirmation.

### Active Shift

- Display a clear active indicator.
- Update relevant cashier session information.
- Avoid continuous flashing or pulsing.

### Close Shift

When the closing process begins:

1. Display the expected cash amount.
2. Focus the actual cash input.
3. Transition the calculated difference when the input changes.
4. Display the reconciliation recap.
5. Request confirmation.
6. Show a loading state.
7. Mark the shift as closed only after the backend confirms success.

### Cash Difference

- Show surplus and shortage using clearly labeled semantic states.
- Transition the visual status when the difference changes.
- Keep numeric calculations accurate.
- Do not animate the amount in a way that hides the actual final value.

### Force-Close Session

- Display a confirmation dialog.
- Show the required reason field.
- Clearly communicate the consequence.
- Show loading feedback after confirmation.
- Update the session state only after successful backend processing.
- Preserve the audit record.

---

## 9.22 Inventory and Production Micro-interactions

### Stock Increase

After successful procurement:

- Update the raw material quantity.
- Briefly highlight the updated value.
- Display a success notification.
- Update dependent stock status indicators.

### Stock Reduction

After production or internal sales:

- Update the relevant stock quantity.
- Display the resulting value.
- Transition warning and critical status when thresholds are crossed.
- Provide a clear explanation of the movement source.

### Minimum Stock Warning

When an item's status changes:

- Transition the status badge.
- Reveal the warning message.
- Highlight the affected row or card once.
- Provide a relevant action link.

### Production Confirmation

During production:

- Show estimated material requirements.
- Reflect actual material adjustments.
- Display processing feedback.
- Update stock after successful completion.
- Reveal the production confirmation state.

The interface must not visually reduce stock before the backend confirms the production operation.

### Stock Adjustment

- Animate the updated quantity.
- Show the adjustment reason and activity status.
- Preserve the stock movement history.
- Do not make an adjustment appear successful before saving succeeds.

---

## 9.23 Marketplace Import Micro-interactions

Marketplace report import must provide clear progress feedback.

### File Selection

- Highlight the upload area on hover.
- Display a subtle border and background change.
- Animate the file icon when a valid file is selected.
- Display the selected file name and size.

### File Upload

- Show upload progress when measurable.
- Display file status.
- Prevent duplicate uploads when an operation is already running.

### Validation

Show the following processing states:

1. File diterima.
2. Memvalidasi format.
3. Membaca struktur laporan.
4. Mengekstrak data.
5. Memeriksa duplikasi.
6. Menyiapkan pratinjau.

Each status may reveal progressively with a subtle indicator transition.

### Preview

When the preview is ready:

- Fade in the data table.
- Display valid, duplicate, and failed record summaries.
- Highlight problematic rows using semantic states.
- Reveal column-mapping controls where necessary.

### Import Confirmation

After the Owner confirms import:

- Show the processing state.
- Prevent repeated submissions.
- Display the final import summary after backend confirmation.
- Provide a clear distinction between successful, duplicate, and failed records.

Do not use an animated progress indicator to imply real-time processing information that the backend does not provide.

---

## 9.24 Financial and HPP Micro-interactions

Financial interfaces must remain restrained and accurate.

### Financial Summary Cards

When new data is loaded:

- Fade in the card content.
- Transition the final numerical values where appropriate.
- Preserve the final exact monetary amount.
- Keep the visual hierarchy clear.

### HPP Calculation

When a product or production quantity changes:

- Update the cost breakdown.
- Transition the calculated totals.
- Highlight changed cost components briefly.
- Display incomplete cost information clearly.

### Estimated Profit

- Display the final estimate.
- Use appropriate status labels.
- Do not imply that estimated figures are finalized accounting records.
- Avoid distracting count-up animations on every filter change.

---

## 9.25 Chart and Data Visualization Motion

Charts must animate data changes without compromising readability.

### Bar Chart

- Animate bar height from the baseline.
- Use a smooth easing curve.
- Keep axis labels stable.
- Avoid repeating entrance animation unnecessarily.

### Line Chart

- Transition the line path smoothly.
- Animate points subtly where appropriate.
- Preserve tooltip behavior.
- Do not use exaggerated drawing effects.

### Progress Bars

- Animate from the previous valid value to the new value.
- Use a short transition.
- Keep the final percentage accurate.

### Donut or Pie Chart

- Use a restrained arc transition.
- Preserve labels and legends.
- Avoid rotating the entire chart continuously.

### Tooltip

When hovering over a chart point or bar:

- Fade in the tooltip.
- Move slightly into position.
- Highlight the corresponding data point.
- Dismiss smoothly when the pointer leaves.

---

## 9.26 Empty, Error, and Success States

### Empty State

When no data is available:

- Fade in the illustration or icon.
- Display a clear title.
- Reveal the supporting explanation.
- Display a relevant next action where permitted.

### Error State

When an operation fails:

- Display the error message.
- Transition the error border and icon.
- Keep the message visible.
- Allow the user to retry where appropriate.
- Do not use excessive movement.

### Success State

When an operation succeeds:

- Display the success icon.
- Reveal the success message.
- Transition the component to its completed state.
- Use a short, restrained emphasis.

The success animation must only occur after confirmed success from the application logic.

---

## 9.27 Public Catalog and Customer-Facing Motion

Where customer-facing pages are included in the approved project scope:

### Product Card

- Image may zoom subtly inside its container on hover.
- Card may lift slightly.
- Price and product information must remain stable.
- Add-to-cart buttons must respond immediately.

### Product Category Navigation

- Transition the selected category indicator.
- Smoothly display the corresponding product list.
- Preserve scroll context where appropriate.

### Cart

- Animate cart item count.
- Update subtotal and total.
- Display a brief confirmation when an item is added.
- Keep the cart accessible.

Customer-facing animations must remain consistent with the same brand system while preserving a separate information architecture.

---

## 9.28 Reduced Motion and Accessibility

The application must respect the user's operating system preference for reduced motion.

When `prefers-reduced-motion: reduce` is enabled:

- Remove non-essential entrance animations.
- Disable decorative motion.
- Remove large translations and scale effects.
- Disable continuous shimmer where it is not necessary.
- Use immediate state changes or short opacity transitions.
- Preserve essential loading and operation status feedback.
- Do not remove important feedback entirely.

Suggested CSS behavior:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

Essential status information must remain accessible without animation.

Keyboard focus and screen reader announcements must work independently from visual motion.

---

## 9.29 Motion Performance Requirements

Animations must not reduce overall application performance.

Requirements:

1. Prefer GPU-friendly `transform` and `opacity` animations.
2. Avoid repeated layout recalculation.
3. Avoid animating large shadows on many elements simultaneously.
4. Avoid continuous animations for inactive components.
5. Pause or avoid non-essential animations when components are off-screen.
6. Avoid animating hundreds of table rows simultaneously.
7. Do not block user input during visual transitions.
8. Avoid long animation chains for common actions.
9. Keep chart animation complexity proportional to the dataset.
10. Ensure that navigation remains responsive while transitions execute.

For data-heavy pages, prioritize stable rendering and immediate interaction feedback over decorative animation.

---

## 9.30 Motion Implementation Architecture

Motion values must be centralized and reusable.

Suggested motion token configuration:

```css
:root {
  --motion-instant: 80ms;
  --motion-fast: 120ms;
  --motion-quick: 160ms;
  --motion-normal: 200ms;
  --motion-medium: 260ms;
  --motion-slow: 320ms;
  --motion-enter: 400ms;
  --motion-long: 500ms;

  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-enter: cubic-bezier(0, 0, 0.2, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Example button interaction:

```css
.button {
  transition:
    transform var(--motion-quick) var(--ease-standard),
    background-color var(--motion-quick) var(--ease-standard),
    box-shadow var(--motion-quick) var(--ease-standard);
}

.button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.button:active:not(:disabled) {
  transform: translateY(1px);
}

.button:disabled {
  cursor: not-allowed;
  transform: none;
}
```

### Implementation Guidelines

- Use CSS transitions for simple hover, focus, and state feedback.
- Use CSS keyframes for simple loading and progress effects.
- Use the project's existing animation library for complex page or chart transitions where justified.
- Do not introduce another animation dependency when an existing solution already satisfies the requirements.
- Keep animation behavior separate from business logic.
- Do not treat animation completion as transaction or database confirmation.
- Ensure all essential UI states work even when motion is disabled.

---

# 10. Interaction and Component States

Interactive components must support the relevant visual states.

| State | Description |
|---|---|
| Default | Normal component appearance |
| Hover | Pointer is over the element |
| Focus | Element receives keyboard focus |
| Active | Element is selected or activated |
| Disabled | Action is unavailable |
| Loading | Operation is being processed |
| Success | Operation completed |
| Warning | User attention is required |
| Error | Validation or operation failed |

Interaction requirements:

- Buttons must provide visual feedback.
- Forms must display validation messages.
- Loading states must prevent duplicate submissions.
- Critical actions must require confirmation.
- Notifications must use consistent visual treatment.
- Disabled controls must communicate their reason where appropriate.
- Status information must not rely solely on color.
- Every essential interaction must remain functional without motion.

---

# 11. Design Assets and Icons

## 11.1 Asset Sources

All static visual assets must use the assets available in Figma.

Examples:

- Business logo.
- Product images.
- Illustrations.
- SVG icons.
- Background elements.
- Decorative elements.

## 11.2 Asset Rules

1. Reuse original Figma assets wherever available.
2. Preserve aspect ratios.
3. Do not distort images.
4. Do not replace logos with text or emoji.
5. Do not use unrelated substitute images.
6. Preserve intended asset positions and dimensions.
7. Store downloaded static assets in the appropriate project asset directory.
8. Avoid temporary Figma asset URLs in production code.

## 11.3 Icon Guidelines

- Follow the icon style used in Figma.
- Maintain consistent sizes and alignment.
- Avoid mixing unrelated icon libraries.
- Provide accessible labels for icon-only controls.
- Use semantically appropriate icons.
- Use animation only where it provides meaningful interaction feedback.

---

# 12. Localization and Content

The website must use Bahasa Indonesia as its primary and default interface language.

Localization applies to:

- Navigation.
- Page titles.
- Buttons.
- Forms.
- Notifications.
- Confirmation dialogs.
- Status labels.
- Tables.
- Reports.
- Transaction receipts.

## 12.1 Currency

Use Indonesian Rupiah formatting.

Example:

`Rp1.450.000`

## 12.2 Date and Time

- Date: Indonesian date conventions, preferably DD/MM/YYYY.
- Time: 24-hour format.
- Use a consistent timezone.

## 12.3 Terminology

| Concept | Interface Label |
|---|---|
| Raw Material | Bahan Baku |
| Finished Goods | Produk Jadi |
| Inventory | Persediaan / Stok |
| Procurement | Pembelian / Pengadaan |
| Production | Produksi |
| Sales | Penjualan |
| Cashier | Kasir |
| Expense | Pengeluaran |
| Stock Adjustment | Penyesuaian Stok |
| Recipe | Resep |
| Supplier | Pemasok |
| Cost of Goods Manufactured | Harga Pokok Produksi (HPP) |
| Transaction History | Riwayat Transaksi |

---

# 13. Responsive Design Requirements

The implementation must follow the responsive layout behavior defined by the Figma frames.

Requirements:

- Preserve the approved desktop layout.
- Adapt sidebar navigation for smaller screens.
- Reflow KPI cards.
- Stack multi-column content when necessary.
- Keep tables usable.
- Maintain readable form dimensions.
- Prevent unexpected horizontal overflow.
- Preserve component hierarchy and spacing.
- Reduce decorative motion on devices where it affects usability or performance.

Do not invent breakpoint values that are not defined in Figma.

Responsive interactions must retain their functionality and feedback across supported viewport sizes.

---

# 14. Frontend Implementation Guidelines

## 14.1 Design-to-Code Workflow

1. Open the target frame in Figma Dev Mode.
2. Inspect the frame and child components.
3. Review typography.
4. Review color and fill properties.
5. Inspect layout dimensions and spacing.
6. Identify reusable components.
7. Retrieve required assets.
8. Implement the visual design.
9. Implement the required component interaction states.
10. Implement motion tokens and micro-interactions.
11. Connect components to real business functionality.
12. Compare the rendered result with Figma.
13. Verify animation behavior and reduced-motion support.
14. Resolve visual and interaction differences before completing the screen.

## 14.2 Component Implementation

- Reuse existing components.
- Keep components separated by responsibility.
- Reuse component variants.
- Separate presentation from business logic.
- Avoid duplicate implementations.
- Maintain consistent naming conventions.
- Centralize design and motion tokens.

## 14.3 Business Logic Integration

- Dashboard metrics must use actual application data.
- Tables must use stored records.
- Charts must respond to selected filters.
- Forms must validate inputs.
- Navigation must follow role permissions.
- Inventory must reflect actual stock movements.
- Cashier actions must follow session restrictions.
- Marketplace import must follow the SRS.
- Estimated financial values must be labeled correctly.

## 14.4 Animation and Business Logic Separation

The animation layer must not determine whether a business operation is successful.

Examples:

- A success animation is triggered only after the backend confirms success.
- A loading animation represents an actual pending operation.
- A stock update animation runs only after the new stock value is confirmed.
- A completed shift state appears only after successful shift closing.
- An imported report is displayed as completed only after the import operation succeeds.

---

# 15. Design Constraints

1. Latest Figma copy is the visual source of truth.
2. PRD defines business scope and product modules.
3. SRS defines system behavior and business constraints.
4. Use the corresponding Figma font and color properties.
5. Do not replace verified design values without approval.
6. Preserve the existing brand assets.
7. Use Bahasa Indonesia for the website interface.
8. Enforce Owner and Kasir permissions in the backend.
9. Respect the global single-active-cashier-session rule.
10. Do not automatically deduct inventory when importing historical marketplace transactions.
11. Do not promote unconfirmed public ordering screens into the current system scope.
12. Do not add independent navigation modules that are not supported by the PRD.
13. Do not add unnecessary decorative animations.
14. Do not use animation to hide loading delays or backend errors.
15. Do not delay essential interactions for the sake of visual effects.
16. Respect reduced-motion preferences.
17. Keep motion consistent with the centralized motion system.

---

# 16. Design Quality Assurance Checklist

## 16.1 Visual Consistency

- [ ] Logo and brand assets match Figma.
- [ ] Dashboard typography matches Plus Jakarta Sans.
- [ ] Login typography matches the specified fonts.
- [ ] Font sizes and weights match Figma.
- [ ] Colors match Figma.
- [ ] Gradient and transparency match.
- [ ] Spacing and alignment match.
- [ ] Component radius and shadow match.
- [ ] Icons match the design.

## 16.2 Navigation and Hierarchy

- [ ] Owner navigation follows the PRD hierarchy.
- [ ] Kasir navigation is separated from Owner navigation.
- [ ] All PRD modules have a corresponding page or section.
- [ ] Owner-only navigation is hidden from Kasir.
- [ ] Unconfirmed features are not presented as active modules.
- [ ] Cashier access restrictions are clearly represented.

## 16.3 Responsive Layout

- [ ] Desktop layout matches Figma.
- [ ] Sidebar behavior is consistent.
- [ ] KPI cards reflow properly.
- [ ] Tables remain usable.
- [ ] Forms remain readable.
- [ ] No overlapping or clipped components.
- [ ] Responsive interactions remain usable.

## 16.4 Interaction

- [ ] Buttons support required states.
- [ ] Inputs display validation feedback.
- [ ] Loading and empty states are implemented.
- [ ] Critical actions require confirmation.
- [ ] Navigation works correctly.
- [ ] Role restrictions work correctly.

## 16.5 Micro-animation and Motion

### Global Motion
- [ ] Motion tokens are centralized.
- [ ] Similar components use consistent timing and easing.
- [ ] Animations are subtle and purposeful.
- [ ] Hover and pressed states provide immediate feedback.
- [ ] No essential interaction is delayed by animation.

### Navigation
- [ ] Sidebar items have hover and active feedback.
- [ ] Active indicators transition smoothly.
- [ ] Dropdown navigation expands and collapses smoothly.
- [ ] Page transitions do not reanimate the entire application shell unnecessarily.

### Components
- [ ] Cards have appropriate hover feedback.
- [ ] KPI cards have controlled entrance animation.
- [ ] Buttons provide pressed and loading feedback.
- [ ] Inputs have focus and validation transitions.
- [ ] Checkboxes and switches animate correctly.
- [ ] Dropdowns and popovers have entrance and exit transitions.

### Data and Operations
- [ ] Charts transition between data periods.
- [ ] Stock values update without misleading intermediate values.
- [ ] Inventory status changes are communicated clearly.
- [ ] Cart interactions provide immediate feedback.
- [ ] Transaction completion animation only occurs after backend success.
- [ ] Shift states only change after backend confirmation.
- [ ] Marketplace import states reflect actual processing.
- [ ] Financial values remain accurate and readable.

### Performance and Accessibility
- [ ] Motion uses efficient properties where possible.
- [ ] Unnecessary continuous animations are avoided.
- [ ] Off-screen non-essential animations are paused or avoided.
- [ ] Reduced-motion preferences are respected.
- [ ] Keyboard navigation remains functional.
- [ ] Screen reader feedback does not depend on visual animation.
- [ ] Animations do not introduce layout shifts.

## 16.6 Functional Consistency

- [ ] Dashboard uses actual data.
- [ ] Stock values match inventory records.
- [ ] Sales update finished goods stock.
- [ ] Production updates raw material and finished goods stock.
- [ ] Procurement updates raw material stock.
- [ ] Cashier sessions follow the business rules.
- [ ] Marketplace imports follow the defined process.
- [ ] Financial values are labeled appropriately.

## 16.7 Localization

- [ ] Default interface language is Bahasa Indonesia.
- [ ] Navigation labels use consistent terminology.
- [ ] Form labels and notifications use Bahasa Indonesia.
- [ ] Currency uses Rupiah formatting.
- [ ] Dates and times use Indonesian conventions.
- [ ] No unintended English interface text remains.

---

# 17. Source of Truth and Change Management

The project uses three primary references.

| Document | Responsibility |
|---|---|
| PRD | Business objectives, product scope, functional modules, and priorities |
| SRS | Detailed functional requirements, non-functional requirements, and business rules |
| Design.md / Figma Dev Mode | Navigation presentation, visual design, typography, colors, assets, UI components, and motion behavior |

When conflicts occur:

1. Use the PRD to determine the approved business scope.
2. Use the SRS to determine system behavior and access control.
3. Use Figma Dev Mode for visual appearance and existing component properties.
4. Use this document for the defined motion and micro-interaction specifications.
5. Do not silently change functional requirements to match a visual element.
6. Record unresolved conflicts and obtain approval before implementation.

Approved changes must be reflected in the relevant documentation and Figma file.

---

# 18. Final Design Implementation Rule

The Cireng Cangkeling website must follow the navigation hierarchy and functional modules specified in the PRD.

All Owner and Kasir screens must follow the role-based structure defined in this document.

The visual implementation must follow the latest Figma design, including its typography, colors, spacing, dimensions, and assets.

The motion implementation must follow the centralized motion tokens and micro-interaction specifications in this document.

**PRD determines what the system contains. SRS determines how the system behaves. Figma determines how the system looks. Design.md determines how the system responds to user interaction.**

The final result must feel responsive, refined, and alive without compromising business usability, data accuracy, accessibility, or performance.