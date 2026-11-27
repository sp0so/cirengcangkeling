# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Owner (Pemilik)**: Business owner managing raw material inventory, procurement from suppliers, recipes and production costing (COGM/HPP), pricing, overall financial tracking, and consolidated multi-channel sales reports. Also acts as an emergency cashier when no cashier shift is active.
- **Cashier (Kasir)**: Front-of-house staff operating point-of-sale (POS), handling walk-in / offline transactions, starting and closing shifts, and conducting cash drawer reconciliation.

## Product Purpose

Centralize and streamline the operational, production, POS, and financial tracking for Cireng Cangkeling, an F&B / Snack MSME. It eliminates fragmented spreadsheets and manual stock checks, prevents procurement delays, and automates consolidated multi-channel sales reporting.

## Positioning

An integrated culinary MSME management system designed specifically for food production and hybrid sales (offline store + food delivery aggregators like GoFood, GrabFood, ShopeeFood, and Shopee marketplace) featuring recipe-driven stock deduction, automated COGM calculations, and low-friction file-based sales imports without costly API subscriptions.

## Operating Context

- **Environments**: Kitchen/production area, offline cashier counter, and Owner's back-office or mobile browser.
- **Devices**: Desktop computers, tablets, and mobile smartphones (responsive web).
- **Documents & Files**: Supplier receipts/invoices, physical cash drawer totals, and exported sales reports (Excel `.xlsx`, CSV, PDF) from GoFood, GrabFood, ShopeeFood, and Shopee.
- **Rituals**: Opening/closing cashier shifts with cash count, daily/weekly production batches based on recipes, raw material stock alerts, and periodic financial consolidations.

## Capabilities and Constraints

- **Core Capabilities**:
  - Raw material and finished goods inventory tracking with minimum stock alerts.
  - Recipe management and batch production recording with automatic stock deduction and COGM (HPP) calculation.
  - Supplier and purchase order tracking.
  - POS cashier interface with dual-mode (Cashier shift session + Owner Cashier fallback mode).
  - Shift management and cash reconciliation preventing overlapping cashier sessions.
  - External sales report file import (Excel, CSV, PDF) and consolidated Master Sales Report.
  - Granular role-based access control (Owner vs Cashier) and comprehensive audit logs.
- **Technical Constraints**:
  - Web-based application built with Next.js, React 19, TypeScript, Tailwind CSS v4, and Supabase.
  - Responsive layout for desktop and smartphone usage.
  - External platforms integrated via document parsing/importing rather than direct third-party REST APIs.

## Brand Commitments

- **Brand Name**: Cireng Cangkeling
- **Tone & Voice**: Practical, clear, dependable, straightforward for operational workers, professional and insight-driven for the business owner.
- **Identity Constraints**: Clean, high-legibility interface suitable for busy kitchen/retail counters and quick cashier inputs.

## Evidence on Hand

- `PRD-MainSistem.md`: Detailed product requirement document specifying background, problem statements, user stories, and acceptance criteria.
- `SRS-MainSistem.md`: Comprehensive software requirements specification detailing data models, state machines, business logic, shift flows, and validation rules.

## Product Principles

1. **Operational Speed & Simplicity**: Fast cashier interactions and uncluttered flows to prevent counter bottlenecks during rush hours.
2. **Accurate Stock & Cost Transparency**: Every production run updates ingredient stock according to verified recipes and calculates true production costs.
3. **Consolidation Without Friction**: Allow seamless aggregation of multi-platform sales via simple file imports without complex API dependencies.
4. **Data Integrity & Shift Accountability**: Strict session locking and audit trails ensure cash and inventory reconciliations are trustworthy.
5. **Role-Tailored Density**: Clear, scanable interfaces on mobile for the Owner on the move, and efficient high-density touch/keyboard interactions for the Cashier.

## Accessibility & Inclusion

- High contrast and high-legibility typography for counter lighting and kitchen environments.
- Large touch targets for mobile and tablet POS use.
- Clear error states and feedback for invalid file imports or stock discrepancies.

