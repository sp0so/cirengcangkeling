# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# CIRENG CANGKELING MSME MANAGEMENT INFORMATION SYSTEM

**Version:** 1.0  
**Status:** Development Requirements Draft  
**Platform:** Responsive Web Application  
**Users:** Owner and Cashier  
**System Name:** Cireng Cangkeling Information System

---

# 1. INTRODUCTION

## 1.1 Background

Cireng Cangkeling MSME carries out operational activities that include raw material procurement, inventory management, production processes, and product sales to customers.

Previously, raw material inventory records were not maintained systematically. Inventory checks were still conducted manually, and raw materials were usually purchased when stock was considered insufficient.

Business records were also maintained using several different applications. Sales reports were prepared using Microsoft Excel, resulting in operational data that was not fully centralized. These conditions could lead to recording errors, delayed procurement, and difficulties in monitoring business performance.

In addition to sales through the internal cashier system, the business also uses several external sales platforms, namely GoFood, GrabFood, ShopeeFood, and Shopee. Sales data from these platforms needs to be consolidated so that the Owner can access integrated sales reports.

Based on these needs, the Cireng Cangkeling Information System is developed as a web-based application to manage products, raw materials, inventory, purchases, production, sales transactions, finances, and business reports.

The system also provides a sales report import mechanism for external platforms using Excel, CSV, and PDF files without direct API integration.

## 1.2 Problem Statements

The problems identified as the basis for system development are:

1. Raw material inventory records are not yet structured.
2. Inventory monitoring still relies on manual stock checking.
3. Raw material purchases are not supported by centralized minimum stock information.
4. Product, purchase, production, and sales data are not yet stored in one integrated system.
5. Sales report preparation still requires manual processing.
6. Data entry errors may cause inconsistencies in business records.
7. Changes in raw material prices affect production cost calculations.
8. There is no centralized mechanism for consolidating sales reports from multiple platforms.
9. Cashier shift management is not yet integrated with transaction records.
10. The Owner needs the ability to perform cashier operations when the Cashier is unavailable or does not have an active shift.

## 1.3 Product Objectives

The system is developed to:

1. Centralize business operational data management.
2. Simplify raw material inventory recording and monitoring.
3. Simplify finished goods inventory management.
4. Manage raw material purchases and usage.
5. Record production activities based on product recipes.
6. Provide internal sales transactions through the cashier system.
7. Provide Owner Cashier Mode as an alternative when no Cashier shift is active.
8. Manage cashier shifts and cash reconciliation.
9. Import sales reports from GoFood, GrabFood, ShopeeFood, and Shopee.
10. Consolidate internal and external sales into the Master Sales Report.
11. Provide business reports based on selected periods and categories.
12. Provide estimated COGM, capital, and profit calculations.
13. Reduce recording errors through data validation and audit logs.
14. Enable the Owner to monitor business operations through desktop computers and smartphones.

## 1.4 Success Indicators

| Indicator | Success Criteria |
|---|---|
| Inventory Management | Raw material and finished goods stock can be monitored through the system. |
| Stock History | Every stock change has a record of its source, timestamp, and user. |
| Internal Transactions | Successful transactions are saved and update inventory consistently. |
| Owner Cashier Mode | The Owner can process transactions when no cashier session is active. |
| Shift Management | Two cashier sessions cannot be active simultaneously. |
| Report Import | The system can read supported and properly mapped file formats. |
| Master Sales Report | Sales data from different sources can be displayed in one report. |
| Business Reports | Reports can be filtered and exported. |
| Access Control | Owner and Cashier can only access features according to their permissions. |
| Data Integrity | Transactions and inventory changes do not produce conflicting data. |

---

# 2. PRODUCT DESCRIPTION

## 2.1 Product Overview

The system is a web-based application accessible through desktop and smartphone browsers.

The system uses a centralized database to store product, raw material, purchase, production, transaction, cashier session, import report, and financial data.

## 2.2 User Roles

The system has exactly two user roles.

### A. Owner

The Owner is the business owner who has full access to all system modules.

Owner responsibilities:

- Manage product and raw material data.
- Manage suppliers and purchases.
- Manage recipes and production.
- Manage inventory.
- Perform transactions through Owner Cashier Mode.
- Monitor Cashier activities.
- Import external sales reports.
- View the Master Sales Report.
- Manage financial records and COGM calculations.
- View all business reports.
- Manage Cashier accounts and system settings.

### B. Cashier

The Cashier is responsible for internal sales activities.

Cashier responsibilities:

- Log in using an account provided by the Owner.
- Start and close shifts.
- Enter opening cash.
- Process sales transactions.
- Manage the transaction cart.
- Select payment methods.
- Print or download receipts.
- View personal transaction history.
- View personal shift summaries.

The Cashier does not have access to product management, raw material management, purchases, production, finance, external imports, or Owner reports.

## 2.3 Cashier Operating Modes

The system provides two operating modes:

**1. Cashier Mode**

Used when a Cashier starts a shift using their own account.

**2. Owner Cashier Mode**

Used when there is no active cashier shift. The Owner can open a cashier session and process transactions using the Owner account.

Both modes use the same transaction and inventory management mechanisms. The only difference is the user operating the session.

The system allows only one active cashier session at a time.

## 2.4 Website Language

The Cireng Cangkeling Information System website will use Bahasa Indonesia as its primary and default interface language.

All user-facing elements must be presented in Bahasa Indonesia, including:

1. Navigation menus and sidebar labels.

2. Dashboard titles and descriptions.

3. Buttons, forms, and input labels.

4. Notifications and confirmation messages.

5. Error messages and validation messages.

6. Transaction details and payment information.

7. Reports, tables, and data summaries.

8. Product, inventory, purchase, and production information.

9. User account and system settings.

10. Receipts and downloadable reports, where applicable.

The system is intended for Indonesian business users. Therefore, all interface terminology must be clear, consistent, and easy to understand.

---

# 3. PRODUCT SCOPE

## 3.1 In Scope

The following features are included in the development scope:

1. Authentication and account management.
2. Owner Dashboard.
3. Cashier Dashboard.
4. Product management.
5. Raw material management.
6. Finished goods inventory management.
7. Supplier management.
8. Purchase management.
9. Recipe management.
10. Production management.
11. Internal sales transactions.
12. Owner Cashier Mode.
13. Cashier shift management.
14. External sales report import.
15. Master Sales Report.
16. Sales history.
17. Financial management.
18. Estimated COGM and capital calculations.
19. Business reports.
20. System settings.
21. Audit logs and change history.
22. Responsive web design.

## 3.2 Out of Scope

The following features are not included in the current design:

1. Direct API integration with GoFood.
2. Direct API integration with GrabFood.
3. Direct API integration with ShopeeFood.
4. Direct API integration with Shopee.
5. Real-time synchronization of external orders.
6. Direct customer order processing from marketplaces.
7. Payment gateway or automated online payment processing.
8. Automatic inventory synchronization with marketplaces.
9. Native Android or iOS mobile applications.
10. Full accounting based on corporate accounting standards.

## 3.3 External Report Import Limitations

External report imports are performed manually.

The Owner must download reports from the relevant platform and then upload the files into the system.

Planned file formats:

- XLSX
- XLS
- CSV
- PDF

The system's ability to read files depends on the structure of the available reports.

Text-based PDFs can be processed through text or table extraction. Scanned PDFs require OCR and additional verification. OCR support must be tested before it can be declared an available system capability.

---

# 4. FUNCTIONAL REQUIREMENTS

## 4.1 Authentication and User Management

**Code: FR-AUTH**

| ID | Functional Requirement | Actor | Priority |
|---|---|---|---|
| FR-AUTH-01 | The system provides a login page. | Owner, Cashier | Must Have |
| FR-AUTH-02 | The system validates username/email and password. | Owner, Cashier | Must Have |
| FR-AUTH-03 | The system differentiates access based on user roles. | System | Must Have |
| FR-AUTH-04 | The system provides a logout feature. | Owner, Cashier | Must Have |
| FR-AUTH-05 | The Owner can create Cashier accounts. | Owner | Must Have |
| FR-AUTH-06 | The Owner can update Cashier account information. | Owner | Must Have |
| FR-AUTH-07 | The Owner can activate or deactivate Cashier accounts. | Owner | Must Have |
| FR-AUTH-08 | Users can change their own passwords. | Owner, Cashier | Should Have |
| FR-AUTH-09 | The system rejects login attempts from inactive accounts. | System | Must Have |
| FR-AUTH-10 | The system records login and logout timestamps for auditing purposes. | System | Should Have |

## 4.2 Owner Dashboard

**Code: FR-DASH**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-DASH-01 | The system displays total sales based on the selected period. | Must Have |
| FR-DASH-02 | The system displays the number of transactions. | Must Have |
| FR-DASH-03 | The system displays a finished goods inventory summary. | Must Have |
| FR-DASH-04 | The system displays a raw material inventory summary. | Must Have |
| FR-DASH-05 | The system displays raw materials that have reached their minimum stock level. | Must Have |
| FR-DASH-06 | The system displays a purchase summary. | Should Have |
| FR-DASH-07 | The system displays a production summary. | Should Have |
| FR-DASH-08 | The system displays income and expense summaries. | Must Have |
| FR-DASH-09 | The system displays estimated profit when sufficient cost data is available. | Should Have |
| FR-DASH-10 | The system displays daily, weekly, and monthly sales charts. | Must Have |
| FR-DASH-11 | The system displays best-selling products. | Should Have |
| FR-DASH-12 | The system displays the current cashier session status. | Must Have |
| FR-DASH-13 | The system displays recent activities. | Should Have |

## 4.3 Cashier Dashboard

**Code: FR-KDASH**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-KDASH-01 | The system displays the Cashier session status. | Must Have |
| FR-KDASH-02 | The system displays the opening cash amount. | Must Have |
| FR-KDASH-03 | The system displays the number of transactions in the current session. | Must Have |
| FR-KDASH-04 | The system displays total sales in the current session. | Must Have |
| FR-KDASH-05 | The system displays payment summaries by payment method. | Should Have |
| FR-KDASH-06 | The system displays available products and their stock quantities. | Must Have |

## 4.4 Product Management

**Code: FR-PROD**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-PROD-01 | The Owner can add products. | Must Have |
| FR-PROD-02 | The Owner can update product information. | Must Have |
| FR-PROD-03 | The Owner can deactivate products. | Must Have |
| FR-PROD-04 | The system stores unique product codes. | Must Have |
| FR-PROD-05 | The system stores product names and categories. | Must Have |
| FR-PROD-06 | The system stores product variants and units when applicable. | Should Have |
| FR-PROD-07 | The system stores product selling prices. | Must Have |
| FR-PROD-08 | The system can store product images. | Should Have |
| FR-PROD-09 | The system displays product availability status. | Must Have |
| FR-PROD-10 | The Owner can search and filter products. | Should Have |

## 4.5 Raw Material Management

**Code: FR-RAW**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-RAW-01 | The Owner can add raw materials. | Must Have |
| FR-RAW-02 | The Owner can update raw material information. | Must Have |
| FR-RAW-03 | The Owner can deactivate raw materials. | Must Have |
| FR-RAW-04 | The system stores raw material names. | Must Have |
| FR-RAW-05 | The system stores raw material units. | Must Have |
| FR-RAW-06 | The system stores raw material purchase prices. | Must Have |
| FR-RAW-07 | The system stores raw material stock quantities. | Must Have |
| FR-RAW-08 | The Owner can set minimum stock levels. | Must Have |
| FR-RAW-09 | The system displays stock change history. | Must Have |
| FR-RAW-10 | The system provides notifications when stock reaches the minimum level. | Must Have |
| FR-RAW-11 | The Owner can search and filter raw materials. | Should Have |

## 4.6 Finished Goods Inventory Management

**Code: FR-STOCK**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-STOCK-01 | The system displays finished goods stock quantities. | Must Have |
| FR-STOCK-02 | The system updates stock after production is successfully recorded. | Must Have |
| FR-STOCK-03 | The system decreases stock after a successful internal transaction. | Must Have |
| FR-STOCK-04 | The Owner can manually adjust stock. | Must Have |
| FR-STOCK-05 | Every manual stock adjustment must include a reason. | Must Have |
| FR-STOCK-06 | The system stores stock change history. | Must Have |
| FR-STOCK-07 | The Owner can set minimum stock levels for products. | Should Have |
| FR-STOCK-08 | The system provides notifications when product stock is low. | Should Have |
| FR-STOCK-09 | The system rejects stock deductions that exceed available quantities. | Must Have |

## 4.7 Supplier Management

**Code: FR-SUP**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-SUP-01 | The Owner can add suppliers. | Should Have |
| FR-SUP-02 | The Owner can update supplier information. | Should Have |
| FR-SUP-03 | The Owner can deactivate suppliers. | Should Have |
| FR-SUP-04 | The system stores supplier names, contact details, addresses, and other available information. | Should Have |
| FR-SUP-05 | The system displays purchase history by supplier. | Should Have |
| FR-SUP-06 | The Owner can search for suppliers. | Should Have |

## 4.8 Purchase Management

**Code: FR-PUR**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-PUR-01 | The Owner can record raw material purchases. | Must Have |
| FR-PUR-02 | The Owner can select a supplier or record a purchase without a supplier. | Must Have |
| FR-PUR-03 | A single purchase transaction can contain multiple raw materials. | Must Have |
| FR-PUR-04 | The system stores the purchase quantity and unit. | Must Have |
| FR-PUR-05 | The system stores the purchase price of each material. | Must Have |
| FR-PUR-06 | The system calculates purchase subtotals and totals. | Must Have |
| FR-PUR-07 | The system stores the purchase date. | Must Have |
| FR-PUR-08 | The system stores the payment method. | Should Have |
| FR-PUR-09 | The Owner can upload purchase receipts or supporting documents. | Should Have |
| FR-PUR-10 | Stock increases based on the actual quantity of materials received. | Must Have |
| FR-PUR-11 | The system displays purchase history. | Must Have |
| FR-PUR-12 | Purchase cancellation requires a reason and an audit record. | Must Have |

## 4.9 Recipe Management

**Code: FR-RECIPE**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-RECIPE-01 | The Owner can create product recipes. | Must Have |
| FR-RECIPE-02 | The Owner can select raw materials from the database. | Must Have |
| FR-RECIPE-03 | The Owner can specify the quantity of each ingredient. | Must Have |
| FR-RECIPE-04 | The system stores the unit used for each ingredient. | Must Have |
| FR-RECIPE-05 | The Owner can update recipes. | Must Have |
| FR-RECIPE-06 | The Owner can deactivate recipes. | Should Have |
| FR-RECIPE-07 | The system calculates estimated ingredient costs based on recipes. | Should Have |
| FR-RECIPE-08 | The system stores recipe change history. | Should Have |

## 4.10 Production Management

**Code: FR-PRODCT**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-PRODCT-01 | The Owner can record production activities. | Must Have |
| FR-PRODCT-02 | The Owner can select the product to be manufactured. | Must Have |
| FR-PRODCT-03 | The Owner can enter the production quantity. | Must Have |
| FR-PRODCT-04 | The system calculates material requirements based on the recipe. | Must Have |
| FR-PRODCT-05 | The Owner can adjust material quantities to reflect actual usage. | Must Have |
| FR-PRODCT-06 | The system displays material requirements before production is confirmed. | Must Have |
| FR-PRODCT-07 | The system reduces raw material stock according to actual usage. | Must Have |
| FR-PRODCT-08 | The system adds production output to finished goods inventory. | Must Have |
| FR-PRODCT-09 | The system stores the production date and the user who recorded it. | Must Have |
| FR-PRODCT-10 | The system displays production history. | Must Have |
| FR-PRODCT-11 | Production cancellation requires a reason and corresponding stock adjustments. | Must Have |

## 4.11 Internal Sales Transactions

**Code: FR-SALES**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-SALES-01 | The system displays a list of available products. | Must Have |
| FR-SALES-02 | The Cashier can search for products. | Must Have |
| FR-SALES-03 | The Cashier can add products to the cart. | Must Have |
| FR-SALES-04 | The Cashier can change product quantities in the cart. | Must Have |
| FR-SALES-05 | The Cashier can remove products from the cart. | Must Have |
| FR-SALES-06 | The system calculates transaction subtotals and totals. | Must Have |
| FR-SALES-07 | The system provides discount input according to user permissions. | Should Have |
| FR-SALES-08 | The system provides cash, bank transfer, QRIS, and other payment methods. | Must Have |
| FR-SALES-09 | The system accepts the payment amount. | Must Have |
| FR-SALES-10 | The system calculates change for cash payments. | Must Have |
| FR-SALES-11 | The system rechecks stock availability when a transaction is processed. | Must Have |
| FR-SALES-12 | The system stores transactions and their product details. | Must Have |
| FR-SALES-13 | The system reduces product stock after a successful transaction. | Must Have |
| FR-SALES-14 | The system generates unique transaction numbers. | Must Have |
| FR-SALES-15 | The system provides receipt printing and downloading. | Should Have |
| FR-SALES-16 | The system displays transaction history. | Must Have |
| FR-SALES-17 | Transaction cancellation requires a reason and an audit trail. | Must Have |
| FR-SALES-18 | The system stores the user identity and session associated with each transaction. | Must Have |

## 4.12 Owner Cashier Mode

**Code: FR-OCM**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-OCM-01 | The system checks whether an active cashier session exists. | Must Have |
| FR-OCM-02 | The system allows the Owner to open Cashier Mode when no active session exists. | Must Have |
| FR-OCM-03 | The Owner must enter opening cash before starting the session. | Must Have |
| FR-OCM-04 | The system creates a session ID specifically associated with the Owner. | Must Have |
| FR-OCM-05 | The Owner can use all cashier transaction functions. | Must Have |
| FR-OCM-06 | Owner transactions are stored with the Owner's identity as the operator. | Must Have |
| FR-OCM-07 | Owner transactions are included in internal sales reports. | Must Have |
| FR-OCM-08 | The Owner can close the cashier session. | Must Have |
| FR-OCM-09 | The Owner enters the actual cash amount when closing the session. | Must Have |
| FR-OCM-10 | The system calculates the Owner session's cash difference. | Must Have |
| FR-OCM-11 | The system stores Owner session history. | Must Have |
| FR-OCM-12 | The system rejects Owner session creation when a Cashier session is active. | Must Have |
| FR-OCM-13 | The system rejects Cashier shift creation when an Owner session is active. | Must Have |

## 4.13 Cashier Shift Management

**Code: FR-SHIFT**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-SHIFT-01 | The Cashier can start a shift. | Must Have |
| FR-SHIFT-02 | The Cashier must enter opening cash. | Must Have |
| FR-SHIFT-03 | The system creates a unique shift ID. | Must Have |
| FR-SHIFT-04 | Every Cashier transaction is linked to a shift ID. | Must Have |
| FR-SHIFT-05 | The system displays the active shift status. | Must Have |
| FR-SHIFT-06 | The Cashier can view their own shift history. | Must Have |
| FR-SHIFT-07 | The Cashier can close a shift. | Must Have |
| FR-SHIFT-08 | The Cashier must enter the actual cash amount. | Must Have |
| FR-SHIFT-09 | The system calculates the expected cash amount. | Must Have |
| FR-SHIFT-10 | The system calculates the cash difference. | Must Have |
| FR-SHIFT-11 | The system displays transaction summaries by payment method. | Must Have |
| FR-SHIFT-12 | The Owner can view all cashier shifts. | Must Have |
| FR-SHIFT-13 | The Owner can view shift details and summaries. | Must Have |
| FR-SHIFT-14 | The Owner can force-close a session with a recorded reason. | Should Have |
| FR-SHIFT-15 | The system records every force-close action in the audit log. | Must Have |
| FR-SHIFT-16 | The system handles recovery of interrupted sessions. | Should Have |

## 4.14 External Sales Report Import

**Code: FR-IMPORT**

Source platforms:

- GoFood
- GrabFood
- ShopeeFood
- Shopee

File formats:

- XLSX
- XLS
- CSV
- PDF

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-IMPORT-01 | The Owner can select the source platform of a report. | Must Have |
| FR-IMPORT-02 | The system accepts XLSX files. | Must Have |
| FR-IMPORT-03 | The system accepts XLS files. | Should Have |
| FR-IMPORT-04 | The system accepts CSV files. | Must Have |
| FR-IMPORT-05 | The system accepts PDF files. | Should Have |
| FR-IMPORT-06 | The system validates file extensions and file sizes. | Must Have |
| FR-IMPORT-07 | The system reads report structures according to the selected platform. | Must Have |
| FR-IMPORT-08 | The system provides column mapping when report structures change. | Must Have |
| FR-IMPORT-09 | The system displays an extraction preview. | Must Have |
| FR-IMPORT-10 | The system validates transaction dates and values. | Must Have |
| FR-IMPORT-11 | The system validates transaction numbers or IDs when available. | Must Have |
| FR-IMPORT-12 | The system detects duplicate transactions. | Must Have |
| FR-IMPORT-13 | The system provides mapping between external product names and internal products. | Must Have |
| FR-IMPORT-14 | The system displays valid, duplicate, and failed records. | Must Have |
| FR-IMPORT-15 | The Owner can confirm the import process. | Must Have |
| FR-IMPORT-16 | The system stores imported data in the database. | Must Have |
| FR-IMPORT-17 | The system stores an import batch identifier. | Must Have |
| FR-IMPORT-18 | The system stores the file name and report period. | Must Have |
| FR-IMPORT-19 | The system stores the user who performed the import. | Must Have |
| FR-IMPORT-20 | The system stores the import timestamp. | Must Have |
| FR-IMPORT-21 | The system displays details of records that failed to process. | Must Have |
| FR-IMPORT-22 | The Owner can download the import results. | Should Have |
| FR-IMPORT-23 | The Owner can cancel an import batch with a recorded reason. | Should Have |
| FR-IMPORT-24 | Batch cancellation corrects report contributions without deleting audit records. | Must Have |
| FR-IMPORT-25 | Imported data does not automatically reduce product stock. | Must Have |

## 4.15 Master Sales Report and Sales History

**Code: FR-MSR**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-MSR-01 | The system consolidates internal and external sales. | Must Have |
| FR-MSR-02 | The system displays the source platform of each transaction. | Must Have |
| FR-MSR-03 | The system displays transaction history from all platforms. | Must Have |
| FR-MSR-04 | The Owner can filter transactions by platform. | Must Have |
| FR-MSR-05 | The Owner can filter transactions by period. | Must Have |
| FR-MSR-06 | The Owner can filter transactions by product. | Should Have |
| FR-MSR-07 | The Owner can filter transactions by status. | Must Have |
| FR-MSR-08 | The Owner can filter transactions by import batch. | Should Have |
| FR-MSR-09 | The system calculates the number of transactions. | Must Have |
| FR-MSR-10 | The system calculates the number of products sold when item-level details are available. | Must Have |
| FR-MSR-11 | The system calculates gross sales. | Must Have |
| FR-MSR-12 | The system displays discounts when available. | Must Have |
| FR-MSR-13 | The system displays platform fees when available. | Should Have |
| FR-MSR-14 | The system displays net proceeds based on available data. | Should Have |
| FR-MSR-15 | The system displays sales charts by platform. | Must Have |
| FR-MSR-16 | The system displays best-selling products when item-level details are available. | Should Have |
| FR-MSR-17 | The system provides Excel, CSV, and PDF exports. | Must Have |
| FR-MSR-18 | The system separates completed, cancelled, and refunded transactions. | Must Have |

## 4.16 Financial Management

**Code: FR-FIN**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-FIN-01 | The Owner can record additional income outside sales. | Should Have |
| FR-FIN-02 | The Owner can record operational expenses. | Must Have |
| FR-FIN-03 | The Owner can define expense categories. | Must Have |
| FR-FIN-04 | The system stores financial transaction dates and amounts. | Must Have |
| FR-FIN-05 | The Owner can upload transaction evidence. | Should Have |
| FR-FIN-06 | The system displays income and expense history. | Must Have |
| FR-FIN-07 | The system calculates total income. | Must Have |
| FR-FIN-08 | The system calculates total expenses. | Must Have |
| FR-FIN-09 | The system displays cash flow summaries. | Must Have |
| FR-FIN-10 | The system provides period and category filters. | Must Have |
| FR-FIN-11 | The system distinguishes cashier-session cash expenses from other business expenses. | Must Have |

## 4.17 COGM and Capital Calculation

**Code: FR-HPP**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-HPP-01 | The system calculates raw material costs based on product recipes. | Must Have |
| FR-HPP-02 | The system retrieves raw material prices from purchase records. | Must Have |
| FR-HPP-03 | The Owner can record labor costs. | Should Have |
| FR-HPP-04 | The Owner can record production operating costs. | Should Have |
| FR-HPP-05 | The system calculates total production costs. | Must Have |
| FR-HPP-06 | The system calculates estimated COGM per unit. | Must Have |
| FR-HPP-07 | The system calculates estimated production capital. | Should Have |
| FR-HPP-08 | The system calculates estimated product margins. | Should Have |
| FR-HPP-09 | The system calculates estimated profit based on selling price and COGM. | Must Have |
| FR-HPP-10 | The system stores calculation history. | Should Have |
| FR-HPP-11 | The system labels results as estimates when cost components are incomplete. | Must Have |

## 4.18 System Reports

**Code: FR-REPORT**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-REPORT-01 | The system provides sales reports. | Must Have |
| FR-REPORT-02 | The system provides purchase reports. | Must Have |
| FR-REPORT-03 | The system provides inventory reports. | Must Have |
| FR-REPORT-04 | The system provides production reports. | Must Have |
| FR-REPORT-05 | The system provides financial reports. | Must Have |
| FR-REPORT-06 | The system provides COGM reports. | Should Have |
| FR-REPORT-07 | The system provides cashier shift reports. | Must Have |
| FR-REPORT-08 | The system provides sales reports by platform. | Must Have |
| FR-REPORT-09 | The system provides a Master Sales Report. | Must Have |
| FR-REPORT-10 | The Owner can filter reports by period. | Must Have |
| FR-REPORT-11 | The Owner can download reports. | Must Have |
| FR-REPORT-12 | The system displays an empty state when no data is available. | Must Have |

## 4.19 System Settings and Audit

**Code: FR-SETTING**

| ID | Functional Requirement | Priority |
|---|---|---|
| FR-SETTING-01 | The Owner can manage the business profile. | Should Have |
| FR-SETTING-02 | The Owner can manage the business logo. | Should Have |
| FR-SETTING-03 | The Owner can manage material and product units. | Must Have |
| FR-SETTING-04 | The Owner can configure minimum stock thresholds. | Must Have |
| FR-SETTING-05 | The Owner can configure payment methods. | Should Have |
| FR-SETTING-06 | The Owner can manage sales platform categories. | Should Have |
| FR-SETTING-07 | The Owner can manage external product mappings. | Must Have |
| FR-SETTING-08 | The system records important user activities. | Must Have |
| FR-SETTING-09 | The system stores data change history. | Must Have |
| FR-SETTING-10 | The system stores transaction cancellation and import history. | Must Have |

---

# 5. MAIN BUSINESS PROCESS FLOWS

## 5.1 Raw Material Procurement Flow

1. The Owner opens the Purchase menu.
2. The Owner selects a supplier or proceeds without selecting a supplier.
3. The Owner enters the raw material, quantity, unit, and purchase price.
4. The system calculates the purchase total.
5. The Owner saves the transaction.
6. The system records the purchase.
7. After the materials are received, stock is updated according to the actual quantity received.
8. The system records the stock movement.
9. The system updates the raw material inventory information.

## 5.2 Production Flow

1. The Owner opens the Production menu.
2. The Owner selects the product to be manufactured.
3. The Owner enters the production quantity.
4. The system retrieves the product recipe.
5. The system calculates the required raw materials.
6. The Owner reviews the material requirements.
7. The Owner adjusts the actual material usage if it differs from the calculated requirements.
8. The system validates material availability.
9. The Owner confirms the production process.
10. The system reduces raw material stock according to actual usage.
11. The system adds the production output to finished goods inventory.
12. The system stores production history and stock changes.

If raw material stock is insufficient, the system must reject the production process until the data is adjusted or sufficient inventory becomes available.

## 5.3 Cashier Transaction Flow

1. The Cashier logs in.
2. The Cashier enters the opening cash amount.
3. The Cashier starts a shift.
4. The system generates a shift ID.
5. The Cashier opens the transaction page.
6. The Cashier selects products.
7. The Cashier adjusts product quantities in the cart.
8. The system calculates the total amount.
9. The Cashier selects a payment method.
10. The system validates the payment and stock availability.
11. The Cashier completes the transaction.
12. The system saves the transaction.
13. The system reduces product stock.
14. The system generates a receipt.
15. The transaction is added to sales history and internal sales reports.

## 5.4 Owner Cashier Mode Flow

1. The Owner logs in.
2. The system checks for an active cashier session.
3. If no active session exists, the system provides access to Owner Cashier Mode.
4. The Owner enters the opening cash amount.
5. The Owner starts the cashier session.
6. The system creates a session ID associated with the Owner's identity.
7. The Owner processes transactions using the cashier features.
8. The system saves transactions and updates inventory.
9. The Owner closes the session.
10. The Owner enters the actual cash amount.
11. The system calculates expected cash and the cash difference.
12. The system stores the session summary.
13. The session status changes to closed.
14. The system makes cashier access available according to the latest session status.

## 5.5 Owner and Cashier Handover Flow

Main rules:

- If the Cashier has an active shift, the Owner cannot open Owner Cashier Mode.
- If the Owner has an active cashier session, the Cashier cannot start a shift.
- A Cashier who is logged in but has not started a shift is not considered to have an active session.
- After an active session is closed, another user can start a new session.
- These checks must be enforced by the backend and database, not merely by hiding menu items.

## 5.6 External Sales Report Import Flow

1. The Owner downloads a report from the relevant platform.
2. The Owner opens the Sales Report Import menu.
3. The Owner selects the platform.
4. The Owner selects the file type.
5. The Owner uploads the file.
6. The system checks the file extension and validity.
7. The system reads the data structure according to the selected platform.
8. The system performs column mapping.
9. The system displays a preview.
10. The system checks for incomplete transactions.
11. The system detects duplicate records.
12. The system matches external products with internal products when item-level details are available.
13. The system displays the number of valid, duplicate, and failed records.
14. The Owner reviews the results.
15. The Owner confirms the import.
16. The system stores transaction data and the import batch.
17. The system updates the Master Sales Report and Sales History.
18. The system stores the import process history.

Imported data does not automatically reduce product stock. Inventory adjustments resulting from external sales must be handled through a separate reconciliation or stock adjustment process.

## 5.7 Shift Closing Flow

1. The Cashier opens the Close Shift menu.
2. The system displays a transaction summary.
3. The system calculates the expected cash amount.
4. The Cashier counts the physical cash.
5. The Cashier enters the actual cash amount.
6. The system calculates the cash difference.
7. The Cashier confirms the shift closure.
8. The system changes the session status to closed.
9. The system stores the summary and audit record.
10. The system allows a new session to be started.

---

# 6. BUSINESS RULES

## 6.1 Access Control Rules

1. The system has only two user roles: Owner and Cashier.
2. The Owner has access to all modules.
3. The Cashier can only access transaction features and their own session information.
4. The Cashier cannot access Owner menus through direct URL navigation.
5. The Owner cannot access the cashier module while a Cashier session is active.
6. The Owner can use cashier functions when no active session exists.
7. The Cashier cannot start a shift while an Owner session is active.

## 6.2 Cashier Session Rules

1. Only one cashier session can be active at a time.
2. Every session must have a unique ID.
3. Every session must record the user and role.
4. Every session must have an opening cash amount.
5. Transactions must reference a cashier session.
6. A session cannot be closed without an actual cash amount.
7. Force-closing a session requires a reason.
8. A session interrupted by a system issue must not automatically be considered closed.

## 6.3 Inventory Rules

1. Stock quantities must never be negative.
2. Every stock change must be recorded.
3. Purchases increase stock based on the quantity of goods received.
4. Production reduces raw material stock based on actual usage.
5. Production increases finished goods stock.
6. Internal sales reduce finished goods stock.
7. Historical imports do not automatically reduce stock.
8. Manual stock adjustments must include a reason.
9. Transactions and stock changes must be stored consistently.

## 6.4 Sales Rules

1. Every transaction must have a unique transaction number.
2. Every transaction must contain product details.
3. Transaction prices must be stored as snapshots at the time of the transaction.
4. Completed transactions cannot be directly deleted.
5. Cancellations must include a reason.
6. Refunds must be recorded as separate sales and financial events.
7. Cash, bank transfer, QRIS, and other payment methods must be distinguished.
8. Non-cash payments are not counted as physical cash.

## 6.5 Import Rules

1. Every import must have a source platform.
2. Every import must have a batch ID.
3. Every external transaction must store its original transaction ID when available.
4. The same data must not be counted more than once.
5. Invalid data must be displayed as failed records.
6. Failed data must not be included in reports as valid transactions.
7. Records without product mappings must be flagged for review.
8. Batch cancellation must update report contributions without removing audit records.
9. The system must store the source file and import timestamp.
10. Summary reports and detailed transaction reports must be distinguished.

## 6.6 Reporting Rules

1. All reports must be based on stored system data.
2. Reports must follow the selected date range.
3. Cancelled transactions are not counted as completed sales.
4. Refunds must be accounted for separately.
5. Gross sales and net proceeds must not be combined.
6. Platform fees are only calculated when supporting data is available.
7. COGM and profit must be labeled as estimates when cost data is incomplete.
8. When data is unavailable, the system must display an empty state or zero value rather than fabricated figures.

---

# 7. BUSINESS CALCULATIONS AND LOGIC

## 7.1 Transaction Calculation

Product subtotal:

`Subtotal = Unit Price × Quantity`

Transaction total:

`Total = Sum of Subtotals - Discount`

Change:

`Change = Amount Paid - Transaction Total`

The system only allows a transaction to be completed when the payment amount is sufficient to cover the amount due.

## 7.2 Cashier Shift Calculation

Expected cash:

`Expected Cash = Opening Cash + Cash Sales - Cash Expenses - Cash Refunds`

Cash difference:

`Cash Difference = Actual Cash - Expected Cash`

Explanation:

- A positive difference means actual cash is greater than expected cash.
- A negative difference means actual cash is less than expected cash.
- A zero difference means actual cash matches the expected amount.

Bank transfers, QRIS, and other non-cash payments are excluded from physical cash calculations.

## 7.3 Production Material Requirement Calculation

`Required Material = Recipe Quantity per Unit × Production Quantity`

Example:

The required flour quantity for one production batch is 100 grams. If the Owner produces 10 batches, the theoretical requirement is 1,000 grams.

If actual material usage differs, the Owner can enter the actual quantity. Stock deduction uses the confirmed actual quantity.

## 7.4 COGM Calculation

Estimated raw material cost:

`Material Cost = Material Quantity × Unit Price`

Estimated total production cost:

`Total Production Cost = Material Cost + Labor Cost + Production Operating Cost`

Estimated COGM per unit:

`COGM per Unit = Total Production Cost / Number of Units Produced`

Estimated profit per unit:

`Profit = Selling Price - COGM per Unit`

The method for valuing raw material prices and allocating operating costs must be determined before final implementation. If cost components are incomplete, the results must be labeled as estimates.

## 7.5 Master Sales Report Calculation

Sales data must be distinguished into the following components:

- Gross Sales: total gross sales value.
- Discount: discount amount.
- Platform Fee: platform fees or commissions, when available.
- Refund: refund amount, when available.
- Net Proceeds: estimated proceeds after known deductions.

The system must not assume that all platform reports provide the same fee and payout information.

---

# 8. NON-FUNCTIONAL REQUIREMENTS

## 8.1 Usability

- The interface must be simple and easy to understand.
- Menus must be organized according to user activities.
- Forms must have clear labels and validation messages.
- Error messages must explain the cause of the error and the required action.

## 8.2 Responsiveness

- The system must be accessible on desktop, tablet, and smartphone devices.
- Sidebars and tables must adapt to different screen sizes.
- Transaction pages must remain easy to use on smaller screens.

## 8.3 Security

- Passwords must be stored using secure hashing.
- The system must require authentication for all internal modules.
- The system must enforce role-based authorization.
- Imported files must be validated before processing.
- Uploaded files must not be executed as code.
- Direct access to unauthorized pages must be rejected.
- Important activities must be recorded in audit logs.

## 8.4 Data Validation

- Required numeric inputs must not be left empty.
- Prices and quantities must not be negative.
- Stock deductions must not exceed available quantities.
- Product codes must be unique.
- Transaction numbers must be unique.
- Imported file formats must be validated.

## 8.5 Data Integrity

- Transaction storage and inventory updates must be performed within a single database transaction.
- A storage failure must roll back the entire related process.
- Stock changes must have a source reference.
- Cashier sessions must not be active simultaneously.
- Re-importing the same data must not create duplicate transactions.

## 8.6 Performance

Initial recommended targets for testing:

- General operational pages: maximum response time of 3 seconds under agreed test conditions.
- Search and filtering: maximum response time of 3 seconds for the test dataset.
- Reports: maximum response time of 5 seconds for the defined test period and dataset.
- File imports: processing time depends on file size and complexity; the system must display the processing status.

These targets are initial proposals and must be tested in the implementation environment.

## 8.7 Audit and Recovery

- The system records inventory changes.
- The system records transaction cancellations.
- The system records import activities and batch cancellations.
- The system records shift force-close actions.
- The system provides a database backup procedure.
- The system provides a data recovery procedure.

## 8.8 Language and Localization Requirements

| ID | Non-Functional Requirement | Description | Priority |
|---|---|---|---|
| NFR-LANG-01 | Primary Language | The website interface must use Bahasa Indonesia as its default and primary language. | Must Have |
| NFR-LANG-02 | Language Consistency | All menus, buttons, forms, notifications, and system messages must use consistent Bahasa Indonesia terminology. | Must Have |
| NFR-LANG-03 | Currency Format | Monetary values must use Indonesian Rupiah (Rp) formatting. | Must Have |
| NFR-LANG-04 | Number Format | Numbers must follow Indonesian formatting conventions where applicable. | Must Have |
| NFR-LANG-05 | Date Format | Dates must use the Indonesian date format (DD/MM/YYYY) or a clear Indonesian written format. | Must Have |
| NFR-LANG-06 | Time Format | Time information must use the 24-hour format appropriate for Indonesian users. | Should Have |
| NFR-LANG-07 | User-Friendly Terminology | Technical terms must be translated or explained using terminology that is understandable to the Owner and Cashier. | Must Have |

### Language Acceptance Criteria

The language requirements are considered fulfilled when:

1. The website displays Bahasa Indonesia by default.
2. All navigation menus and user interface elements use Bahasa Indonesia.
3. Error messages and notifications are displayed in Bahasa Indonesia.
4. Monetary values are displayed using Indonesian Rupiah formatting.
5. Dates and times follow the specified Indonesian localization format.
6. No unintended English text appears in the user-facing interface, except for technical terms, product names, or platform names that are intentionally retained.

---

# 9. MAIN DATA ENTITIES

This section represents an initial design to support system requirements. The final structure must be adjusted according to the ERD and database implementation.

| Entity | Purpose |
|---|---|
| users | Stores Owner and Cashier accounts. |
| products | Stores product information. |
| product_categories | Stores product categories. |
| raw_materials | Stores raw material information. |
| raw_material_categories | Stores raw material categories. |
| suppliers | Stores supplier information. |
| purchases | Stores purchase transactions. |
| purchase_details | Stores purchase item details. |
| recipes | Stores product recipes. |
| recipe_details | Stores raw material compositions. |
| productions | Stores production records. |
| production_details | Stores actual material usage. |
| stock_movements | Stores all inventory changes. |
| cashier_sessions | Stores Owner and Cashier sessions. |
| sales | Stores sales transactions. |
| sale_details | Stores sold product details. |
| payments | Stores payment methods and amounts. |
| sales_channels | Stores sales sources. |
| sales_imports | Stores import batches. |
| sales_import_errors | Stores failed import records. |
| external_sales | Stores external sales transactions. |
| external_sale_details | Stores external transaction details when available. |
| product_mappings | Maps external product names to internal products. |
| expenses | Stores business expenses. |
| other_incomes | Stores additional income. |
| business_profiles | Stores business information. |
| audit_logs | Stores important user activities. |

## 9.1 Main Relationships

1. One user can have multiple cashier sessions.
2. One cashier session can contain multiple transactions.
3. One sales transaction has one or more transaction details.
4. One product can appear in multiple transaction details.
5. One recipe can contain multiple raw materials.
6. One production activity can use multiple raw materials.
7. One purchase transaction can contain multiple purchase details.
8. One import batch can contain multiple external transactions.
9. One internal product can have multiple external product mappings.
10. Every stock change must have a source reference and user reference.

## 9.2 External Transaction Identity

External transaction identity should use the following combination:

`Platform + External Transaction ID`

If the report does not provide a transaction ID, the system must apply an alternative identification strategy and indicate the confidence level of the matching result. Perfect duplicate detection must not be guaranteed when source identifiers are unavailable.

## 9.3 Stock Movement

Every stock change must record at least the following information:

- Stock movement ID.
- Inventory type.
- Product or raw material ID.
- Movement type.
- Change quantity.
- Stock quantity before the change.
- Stock quantity after the change.
- Change source.
- Transaction reference ID.
- User responsible for the change.
- Change timestamp.
- Notes or reason.

---

# 10. MENU AND NAVIGATION STRUCTURE

## 10.1 Owner Navigation

1. Dashboard
2. Sales
   - Internal Transactions
   - Owner Cashier Mode
   - Sales History
   - Report Import
   - Import History
   - Master Sales Report
   - Reports by Platform
3. Products
   - Product List
   - Product Categories
   - Finished Goods Stock
4. Inventory
   - Raw Materials
   - Stock History
   - Stock Adjustments
   - Stock Notifications
5. Purchases
   - Suppliers
   - Purchase Transactions
   - Purchase History
6. Production
   - Product Recipes
   - Record Production
   - Production History
7. Cashier and Shifts
   - Session Monitoring
   - Shift History
   - Shift Summary
   - Session Recovery
8. Finance
   - Income
   - Expenses
   - Cash Flow
   - COGM and Capital
   - Estimated Profit
9. Reports
   - Sales
   - Purchases
   - Inventory
   - Production
   - Finance
   - COGM
   - Shifts
10. Users
11. Business Profile
12. Settings
13. Activity Logs

When a Cashier has an active session, Owner Cashier Mode must be disabled, and the backend must reject the Owner's access to cashier transactions.

## 10.2 Cashier Navigation

1. Cashier Dashboard
2. Sales Transactions
3. Sales History
4. My Shifts
   - Start Shift
   - Close Shift
   - Shift Summary
   - Shift History
5. Profile
6. Logout

---

# 11. ACCEPTANCE CRITERIA

A feature is considered to meet its requirements when it successfully passes the following tests.

## 11.1 Authentication

- The Owner can log in and is redirected to the Owner Dashboard.
- The Cashier can log in and is redirected to the Cashier Dashboard.
- The Cashier cannot access Owner pages.
- Inactive accounts cannot log in.

## 11.2 Inventory Management

- Adding stock updates the inventory quantity.
- Deducting stock updates the inventory quantity.
- The system rejects deductions that exceed available stock.
- Every change has a history record and reason.
- Notifications appear when stock reaches the minimum threshold.

## 11.3 Production

- The system calculates material requirements based on recipes.
- The Owner can enter actual material usage.
- Raw material stock decreases according to actual usage after confirmation.
- Finished goods stock increases according to production output.
- A failed process must not leave partial inventory changes.

## 11.4 Internal Transactions

- The Cashier cannot process transactions before starting a shift.
- The system checks stock when a transaction is saved.
- A successful transaction reduces stock.
- A failed transaction does not reduce stock.
- The receipt displays the transaction number, products, quantities, total amount, and payment method.

## 11.5 Owner Cashier Mode

- The Owner can start a session when no active session exists.
- The Owner cannot start a session while a Cashier shift is active.
- The Cashier cannot start a shift while an Owner session is active.
- Owner transactions are stored as internal transactions.
- Closing a session generates a cash summary.
- After a session is closed, the system allows a new session to be started.

## 11.6 Sales Import

- The Owner can select the source platform.
- Supported files can be uploaded.
- Invalid files are rejected with clear error messages.
- The system displays a preview before importing.
- Duplicate records can be identified.
- Failed records are excluded from valid reports.
- Successfully imported records appear in Sales History and the Master Sales Report.
- Re-importing does not duplicate the same transactions.
- Batch cancellation updates reports and preserves the audit trail.

## 11.7 Reports

- Period filters return data within the selected date range.
- Platform filters display only the selected sales sources.
- Cancelled transactions are not counted as completed transactions.
- Refunds are displayed separately.
- Gross sales and net proceeds are distinguished.
- Exports follow the selected filters.
- Periods without transactions display empty data or a zero total.

---

# 12. DEVELOPMENT PRIORITIES

Prioritization uses the MoSCoW method.

- Must Have: essential features required for the system to operate.
- Should Have: important features that can be implemented after the core functions.
- Could Have: additional features for future development.
- Won't Have: features excluded from the current scope.

## Phase 1 — System Foundation

- Authentication.
- Owner and Cashier roles.
- Product management.
- Raw material management.
- Product inventory management.
- Stock history.
- Basic dashboard.

## Phase 2 — Business Operations

- Suppliers.
- Purchases.
- Recipes.
- Production.
- Stock adjustments.
- Minimum stock notifications.

## Phase 3 — Cashier System

- Internal transactions.
- Shopping cart.
- Payments.
- Receipts.
- Owner Cashier Mode.
- Shift management.
- Cash reconciliation.
- Transaction history.

## Phase 4 — Import and Reporting

- Excel and CSV imports.
- PDF import subject to testing results.
- Column mapping.
- Product mapping.
- Duplicate detection.
- Import history.
- Master Sales Report.
- Reports by platform.
- Report exports.

## Phase 5 — Finance and Improvements

- Income and expense recording.
- COGM calculations.
- Estimated capital.
- Estimated profit.
- Audit logs.
- Backup and recovery.
- Security and performance testing.

---

# 13. RISKS AND MITIGATION

| Risk | Impact | Mitigation |
|---|---|---|
| Platform file formats change | Import process fails | Provide column mapping configuration and format validation. |
| Reports only contain summaries | Product-level details are unavailable | Separate summary reports from transaction-level reports. |
| Transaction IDs are unavailable | Duplicate detection becomes difficult | Use a combination of transaction attributes and indicate matching confidence. |
| PDF files are scanned documents | Data extraction may be inaccurate | Use OCR if approved and require manual preview verification. |
| External products do not match internal products | Product reports become inaccurate | Provide Product Mapping. |
| Owner and Cashier start sessions simultaneously | Transaction conflicts may occur | Enforce atomic validation and active session restrictions in the backend. |
| Stock changes occur simultaneously | Inventory inconsistencies may occur | Use database transactions and appropriate data locking. |
| Raw material prices change | COGM calculations become inaccurate | Store purchase price history and apply a defined costing method. |
| Transactions are cancelled | Reports and inventory may become inconsistent | Use transaction statuses, stock reversals, and audit logs. |
| Data loss occurs | Business operations may be disrupted | Provide backups and test recovery procedures. |

---

# 14. ASSUMPTIONS AND DEPENDENCIES

1. The Owner has access to download reports from external platforms.
2. The Owner uploads report files manually.
3. Each platform may use a different report structure.
4. The system must be tested using actual sample files before the import parser is finalized.
5. External sales data does not automatically update inventory.
6. Internal product data is available for the mapping process.
7. The system uses a centralized database.
8. All users access the system through accounts created by the Owner.
9. Only one cashier session can be active across the entire system.
10. The COGM calculation method will be adjusted according to the completeness of the business cost data.

---

# 15. OPEN QUESTIONS AND ITEMS REQUIRING CONFIRMATION

The following items must be resolved before final implementation of the related features.

| No. | Question | Reason |
|---|---|---|
| 1 | Do reports from each platform contain individual order details or only period summaries? | Determines the import structure and Master Sales Report capabilities. |
| 2 | Are sample XLSX, CSV, and PDF files available from each platform? | Determines the parser and column mapping requirements. |
| 3 | Must scanned PDF files be supported through OCR? | Determines the required document extraction technology. |
| 4 | Should external transactions display product-level details or only total sales? | Determines the level of reporting detail. |
| 5 | Can the Owner provide discounts without restrictions, or must discounts follow specific limits? | Determines transaction authorization rules. |
| 6 | Should refunds and cancellations be recorded directly in the system? | Determines the transaction correction workflow. |
| 7 | Will labor, electricity, gas, and other expenses be recorded for COGM calculations? | Determines COGM accuracy. |
| 8 | Which raw material price valuation method will be used for COGM calculations? | Determines the costing method. |
| 9 | Do external sales reports need to be reconciled with inventory manually? | Determines the inventory adjustment process. |
| 10 | Will customer-facing product information, such as a public catalogue, business location, operating hours, and WhatsApp contact, be included in the first system release? | The initial analysis document mentions customer-facing business information, but this module is not yet included in the final operational feature list. |

---

# 16. GLOSSARY

| Term | Definition |
|---|---|
| Owner | The business owner with full system access. |
| Cashier | A user responsible for processing sales transactions. |
| Owner Cashier Mode | A cashier mode operated by the Owner when no active session exists. |
| Shift | A cashier operating period with opening cash and a closing summary. |
| Session | A cashier session record that links a user to their transactions. |
| Master Sales Report | A consolidated sales report from all sources. |
| Sales History | A record of sales transactions. |
| Import Batch | A group of import operations originating from one file. |
| Product Mapping | The process of mapping external product names to internal products. |
| Stock Movement | A record of inventory quantity changes. |
| COGM | Cost of Goods Manufactured; the production cost of manufactured goods. |
| Gross Sales | The total gross sales value. |
| Net Proceeds | Revenue after known deductions. |
| Audit Log | A record of important user activities and data changes. |
| OCR | Optical Character Recognition technology used to recognize text from images or scanned documents. |

---

# 17. CLOSING

This PRD serves as the product requirements reference for the development of the Cireng Cangkeling Information System.

The system is designed to centralize business operations, starting from raw material procurement, inventory management, production, sales transactions, cashier session management, external sales report imports, and the provision of financial and sales reports.

The main design decisions are the use of two user roles, the implementation of a single active cashier session, the availability of Owner Cashier Mode, and the manual import of external sales reports without API integration.

Implementation must follow the functional requirements, business rules, non-functional requirements, and acceptance criteria specified in this document.

Any changes to the scope or additional features must undergo evaluation and approval to maintain system consistency.
