# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
## Cireng Cangkeling Management Information System

**Document Type:** Software Requirements Specification (SRS)  
**Project Name:** Cireng Cangkeling Management Information System  
**Document Version:** 1.0  
**Document Status:** Initial Draft  
**Language:** English  
**Website Interface Language:** Bahasa Indonesia

---

# 1. INTRODUCTION

## 1.1 Purpose

This Software Requirements Specification (SRS) document defines the functional and non-functional requirements of the Cireng Cangkeling Management Information System.

The purpose of this document is to provide a detailed technical description of the system's expected behavior, system interfaces, business rules, data requirements, and operational constraints.

This document serves as a reference for the development team, including UI/UX designers, frontend developers, backend developers, and software testers, to ensure that the developed system meets the business requirements of Cireng Cangkeling.

## 1.2 Scope

The Cireng Cangkeling Management Information System is a web-based application designed to support and manage the operational activities of the business.

The system provides features for managing products, raw materials, finished goods inventory, suppliers, purchases, recipes, production, sales transactions, cashier shifts, financial records, and business reports.

The system also provides a manual sales report import feature for external marketplace platforms, including GoFood, GrabFood, ShopeeFood, and Shopee.

The system has two main user roles:

1. **Owner:** Has access to all management modules and can operate the cashier module when no other cashier session is active.
2. **Kasir (Cashier):** Has limited access to sales transactions, cashier operations, and personal shift history.

The system is intended to improve operational efficiency, data accuracy, inventory monitoring, and business reporting.

## 1.3 Definitions and Abbreviations

| Term | Definition |
|---|---|
| SRS | Software Requirements Specification |
| Owner | Business owner with full system access |
| Kasir | Cashier responsible for sales transactions |
| Cashier Session | An active cashier operating period |
| Owner Cashier Mode | Cashier operation performed by the Owner |
| Raw Material | Materials used in production |
| Finished Goods | Products ready for sale |
| HPP | Harga Pokok Produksi (Cost of Goods Manufactured) |
| RBAC | Role-Based Access Control |
| Marketplace | External sales platforms such as GoFood and ShopeeFood |
| Import Batch | A group of marketplace records uploaded in one import process |
| Audit Trail | A record of important system activities and changes |
| QRIS | Quick Response Code Indonesian Standard |

## 1.4 Intended Audience

This document is intended for:

- Project stakeholders and business owners.
- System analysts.
- UI/UX designers.
- Frontend developers.
- Backend developers.
- Database developers.
- Quality assurance and software testing teams.

## 1.5 Document Overview

This document is organized into the following sections:

1. Introduction
2. Overall Description
3. System Features and Functional Requirements
4. External Interface Requirements
5. Non-Functional Requirements
6. Data Requirements
7. Business Rules
8. System Constraints and Assumptions
9. Acceptance Criteria
10. Open Issues and Future Considerations

---

# 2. OVERALL DESCRIPTION

## 2.1 Product Perspective

The Cireng Cangkeling Management Information System is a centralized web-based application that integrates several business activities into one system.

The system replaces fragmented manual records and spreadsheet-based processes with structured digital records.

The system consists of the following main components:

- Authentication and user access management.
- Dashboard and operational monitoring.
- Product and inventory management.
- Raw material management.
- Supplier and procurement management.
- Recipe and production management.
- Sales and cashier management.
- Cashier shift management.
- Marketplace sales report import.
- Financial management.
- HPP calculation and estimated profit.
- Business reporting and monitoring.

## 2.2 Product Functions

The system shall provide the following main functions:

| No. | Function | Description |
|---|---|---|
| 1 | Authentication | Manage user login and logout |
| 2 | Dashboard | Display business and operational summaries |
| 3 | Product Management | Manage product information |
| 4 | Raw Material Management | Manage raw material data and stock |
| 5 | Inventory Management | Monitor finished goods and stock changes |
| 6 | Supplier Management | Manage supplier information |
| 7 | Procurement Management | Record raw material purchases |
| 8 | Recipe Management | Define product ingredients and quantities |
| 9 | Production Management | Record production activities |
| 10 | Sales Management | Process and record internal sales |
| 11 | Cashier Management | Manage cashier operations |
| 12 | Shift Management | Manage cashier opening and closing sessions |
| 13 | Marketplace Import | Import external marketplace sales reports |
| 14 | Financial Management | Record and monitor business finances |
| 15 | HPP Calculation | Calculate estimated production costs |
| 16 | Reporting | Generate operational and financial reports |
| 17 | Business Profile | Manage business information |

## 2.3 User Classes and Characteristics

### 2.3.1 Owner

The Owner is the primary administrator of the system.

The Owner has full access to business management features, including:

- Dashboard.
- Product management.
- Raw material management.
- Finished goods inventory.
- Supplier management.
- Procurement.
- Recipe management.
- Production.
- Stock adjustments.
- Sales management.
- Cashier management.
- Cashier shift monitoring.
- Financial management.
- HPP calculation.
- Marketplace report imports.
- Business reports.
- Business profile settings.

The Owner may also perform cashier operations through Owner Cashier Mode when no cashier session is active.

### 2.3.2 Kasir (Cashier)

The Kasir is responsible for processing sales transactions.

The Kasir has access to:

- Cashier dashboard.
- Product selection.
- Shopping cart.
- Sales transactions.
- Payment method selection.
- Receipt generation.
- Personal transaction history.
- Shift opening.
- Shift closing.
- Personal shift recap.

The Kasir cannot access business administration, inventory management, procurement, financial management, or Owner-only reports.

## 2.4 Operating Environment

The system shall operate in a web-based environment.

The expected operating environment includes:

- Desktop and laptop computers.
- Modern web browsers.
- Internet or local network connectivity as required by the deployment environment.
- A web server for application execution.
- A database server for data storage.

The system interface shall be responsive to different screen sizes, particularly desktop, laptop, and tablet devices.

## 2.5 Website Language

The system website shall use **Bahasa Indonesia** as its primary and default interface language.

All user-facing components must use Bahasa Indonesia, including:

- Navigation menus and sidebar.
- Dashboard information.
- Buttons and form labels.
- Input placeholders.
- Notifications and confirmation messages.
- Error and validation messages.
- Transaction and payment information.
- Inventory and production information.
- Reports and summaries.
- Receipts and downloadable reports where applicable.

The language used in the website must be consistent, clear, and understandable for Indonesian business users.

## 2.6 User Access and Permissions

The system shall implement Role-Based Access Control (RBAC).

| Module | Owner | Kasir |
|---|---|---|
| Dashboard | Full Access | Cashier Dashboard Only |
| Product Management | Full Access | View Products |
| Raw Material Management | Full Access | No Access |
| Finished Goods Inventory | Full Access | No Access |
| Supplier Management | Full Access | No Access |
| Procurement | Full Access | No Access |
| Recipe Management | Full Access | No Access |
| Production | Full Access | No Access |
| Stock Adjustment | Full Access | No Access |
| Sales Transactions | Conditional Access | Full Cashier Access |
| Cashier Shift Management | Full Access | Own Shift Only |
| Marketplace Import | Full Access | No Access |
| Financial Management | Full Access | No Access |
| HPP Calculation | Full Access | No Access |
| Reports | Full Access | Own Transaction History |
| Business Profile | Full Access | No Access |

**Important Access Rule:**

Only one cashier session may be active globally at any given time.

- When a Kasir session is active, the Owner's cashier module must be locked.
- When the Owner starts Owner Cashier Mode, the Kasir cannot start another cashier session.
- The Owner may access the cashier module when no active cashier session exists.
- The Owner retains access to all other Owner modules regardless of the active cashier session.
- Access restrictions must be enforced on both the user interface and backend authorization layers.

---

# 3. SYSTEM FEATURES AND FUNCTIONAL REQUIREMENTS

## 3.1 Authentication and Authorization

**Feature ID:** SYS-AUTH

The system shall provide authentication and authorization mechanisms to control access to system features.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-AUTH-01 | The system shall allow registered users to log in using valid credentials. | Must Have |
| FR-AUTH-02 | The system shall validate the user's credentials before granting access. | Must Have |
| FR-AUTH-03 | The system shall identify the user's role as Owner or Kasir. | Must Have |
| FR-AUTH-04 | The system shall restrict access based on the user's assigned role. | Must Have |
| FR-AUTH-05 | The system shall allow users to log out securely. | Must Have |
| FR-AUTH-06 | The system shall prevent unauthorized users from accessing protected pages. | Must Have |
| FR-AUTH-07 | The system shall maintain an authenticated session according to the configured session policy. | Must Have |

## 3.2 Dashboard Management

**Feature ID:** SYS-DASH

The dashboard shall display operational information based on the authenticated user's role.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-DASH-01 | The Owner dashboard shall display a summary of business operations. | Must Have |
| FR-DASH-02 | The Owner dashboard shall display total sales within a selected period. | Must Have |
| FR-DASH-03 | The Owner dashboard shall display available finished goods stock. | Must Have |
| FR-DASH-04 | The Owner dashboard shall display raw material stock information. | Must Have |
| FR-DASH-05 | The Owner dashboard shall display purchase and production summaries. | Should Have |
| FR-DASH-06 | The Owner dashboard shall display estimated business profit based on available data. | Must Have |
| FR-DASH-07 | The Kasir dashboard shall display cashier-related information. | Must Have |
| FR-DASH-08 | The dashboard shall display information according to the user's access permissions. | Must Have |

## 3.3 Product Management

**Feature ID:** SYS-PROD

The system shall allow the Owner to manage products available for sale.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-PROD-01 | The system shall allow the Owner to add new products. | Must Have |
| FR-PROD-02 | The system shall allow the Owner to view product information. | Must Have |
| FR-PROD-03 | The system shall allow the Owner to update product information. | Must Have |
| FR-PROD-04 | The system shall allow the Owner to deactivate products that are no longer sold. | Must Have |
| FR-PROD-05 | The system shall store product name, code, category, selling price, and status. | Must Have |
| FR-PROD-06 | The system shall allow the Owner to manage product categories. | Should Have |
| FR-PROD-07 | The system shall prevent inactive products from being selected for new sales transactions. | Must Have |

## 3.4 Raw Material Management

**Feature ID:** SYS-RAW

The system shall provide raw material inventory management.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-RAW-01 | The system shall allow the Owner to add raw material records. | Must Have |
| FR-RAW-02 | The system shall allow the Owner to view raw material information. | Must Have |
| FR-RAW-03 | The system shall allow the Owner to update raw material information. | Must Have |
| FR-RAW-04 | The system shall allow the Owner to deactivate unused raw materials. | Must Have |
| FR-RAW-05 | The system shall store material name, unit, stock quantity, and minimum stock level. | Must Have |
| FR-RAW-06 | The system shall display current raw material stock. | Must Have |
| FR-RAW-07 | The system shall notify the Owner when raw material stock reaches or falls below the minimum stock level. | Should Have |
| FR-RAW-08 | The system shall record stock changes caused by purchases, production, and adjustments. | Must Have |

## 3.5 Finished Goods Inventory Management

**Feature ID:** SYS-STOCK

The system shall manage the inventory of finished products.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-STOCK-01 | The system shall display the available stock of each finished product. | Must Have |
| FR-STOCK-02 | The system shall increase finished goods stock after production is successfully recorded. | Must Have |
| FR-STOCK-03 | The system shall automatically reduce finished goods stock after a successful internal sales transaction. | Must Have |
| FR-STOCK-04 | The system shall allow the Owner to perform stock adjustments. | Must Have |
| FR-STOCK-05 | The system shall require a reason for manual stock adjustments. | Must Have |
| FR-STOCK-06 | The system shall maintain stock movement history. | Must Have |
| FR-STOCK-07 | The system shall prevent sales quantities from exceeding available stock. | Must Have |

## 3.6 Supplier Management

**Feature ID:** SYS-SUP

The system shall allow the Owner to manage supplier information.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-SUP-01 | The system shall allow the Owner to add supplier information. | Must Have |
| FR-SUP-02 | The system shall display supplier records. | Must Have |
| FR-SUP-03 | The system shall allow the Owner to update supplier information. | Must Have |
| FR-SUP-04 | The system shall allow the Owner to deactivate supplier records. | Must Have |
| FR-SUP-05 | The system shall store supplier name and relevant contact information. | Must Have |

## 3.7 Procurement Management

**Feature ID:** SYS-PUR

The system shall support the recording of raw material purchases.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-PUR-01 | The system shall allow the Owner to record raw material purchases. | Must Have |
| FR-PUR-02 | The system shall allow the Owner to select one or more purchased materials. | Must Have |
| FR-PUR-03 | The system shall store purchase quantity, unit price, and total cost. | Must Have |
| FR-PUR-04 | The system shall allow supplier information to be associated with a purchase. | Must Have |
| FR-PUR-05 | The system shall allow purchases to be recorded without selecting a supplier. | Must Have |
| FR-PUR-06 | The system shall increase raw material stock after a purchase is successfully recorded. | Must Have |
| FR-PUR-07 | The system shall maintain purchase history. | Must Have |
| FR-PUR-08 | The system shall allow the Owner to view and filter purchase records. | Should Have |

## 3.8 Recipe Management

**Feature ID:** SYS-RECIPE

The system shall provide recipe management to define the raw materials required for each product.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-RECIPE-01 | The system shall allow the Owner to create a recipe for a product. | Must Have |
| FR-RECIPE-02 | The system shall allow the Owner to select raw materials used in a recipe. | Must Have |
| FR-RECIPE-03 | The system shall store the quantity of each raw material required. | Must Have |
| FR-RECIPE-04 | The system shall allow the Owner to update existing recipes. | Must Have |
| FR-RECIPE-05 | The system shall calculate estimated raw material requirements based on production quantity. | Must Have |
| FR-RECIPE-06 | The system shall allow the Owner to adjust actual material usage during production recording. | Must Have |

## 3.9 Production Management

**Feature ID:** SYS-PRODUCTION

The system shall support the recording and monitoring of production activities.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-PRODUCTION-01 | The system shall allow the Owner to create production records. | Must Have |
| FR-PRODUCTION-02 | The system shall allow the Owner to select the product to be produced. | Must Have |
| FR-PRODUCTION-03 | The system shall allow the Owner to enter the production quantity. | Must Have |
| FR-PRODUCTION-04 | The system shall calculate estimated raw material requirements using the product recipe. | Must Have |
| FR-PRODUCTION-05 | The system shall allow the Owner to adjust estimated material usage to match actual usage. | Must Have |
| FR-PRODUCTION-06 | The system shall reduce raw material stock based on the confirmed actual usage. | Must Have |
| FR-PRODUCTION-07 | The system shall increase finished goods stock based on successfully recorded production output. | Must Have |
| FR-PRODUCTION-08 | The system shall maintain production history. | Must Have |
| FR-PRODUCTION-09 | The system shall prevent production from being completed when required material stock is insufficient. | Must Have |

## 3.10 Sales Transaction Management

**Feature ID:** SYS-SALES

The system shall provide internal sales transaction functionality.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-SALES-01 | The system shall allow authorized users to view available products. | Must Have |
| FR-SALES-02 | The system shall allow the Kasir to add products to the shopping cart. | Must Have |
| FR-SALES-03 | The system shall allow the Kasir to update product quantities in the cart. | Must Have |
| FR-SALES-04 | The system shall allow the Kasir to remove products from the cart before transaction completion. | Must Have |
| FR-SALES-05 | The system shall calculate the transaction subtotal. | Must Have |
| FR-SALES-06 | The system shall calculate the total transaction amount. | Must Have |
| FR-SALES-07 | The system shall support cash, bank transfer, QRIS, and other payment methods. | Must Have |
| FR-SALES-08 | The system shall record the selected payment method. | Must Have |
| FR-SALES-09 | The system shall allow a transaction to be completed after payment information is confirmed. | Must Have |
| FR-SALES-10 | The system shall reduce finished goods stock after a successful internal sales transaction. | Must Have |
| FR-SALES-11 | The system shall generate a transaction number. | Must Have |
| FR-SALES-12 | The system shall store transaction date, items, quantities, prices, payment method, and transaction total. | Must Have |
| FR-SALES-13 | The system shall provide receipt printing or downloading functionality. | Should Have |
| FR-SALES-14 | The system shall allow the Kasir to view personal transaction history. | Must Have |
| FR-SALES-15 | The system shall require a reason for authorized transaction corrections, cancellations, or refunds. | Must Have |
| FR-SALES-16 | The system shall maintain an audit record for transaction corrections, cancellations, and refunds. | Must Have |

## 3.11 Owner Cashier Mode

**Feature ID:** SYS-OCM

The system shall allow the Owner to perform cashier operations when no cashier session is active.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-OCM-01 | The system shall provide Owner Cashier Mode when no active cashier session exists. | Must Have |
| FR-OCM-02 | The system shall require the Owner to enter opening cash before starting a cashier session. | Must Have |
| FR-OCM-03 | The system shall create a cashier session associated with the Owner's account. | Must Have |
| FR-OCM-04 | The system shall use the same sales process as the Kasir module. | Must Have |
| FR-OCM-05 | The system shall prevent the Kasir from starting a session while Owner Cashier Mode is active. | Must Have |
| FR-OCM-06 | The system shall allow the Owner to close the cashier session. | Must Have |
| FR-OCM-07 | The system shall require actual cash information during session closing. | Must Have |
| FR-OCM-08 | The system shall generate a cashier session recap. | Must Have |

## 3.12 Cashier Shift Management

**Feature ID:** SYS-SHIFT

The system shall manage cashier shift opening, monitoring, and closing.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-SHIFT-01 | The system shall allow the Kasir to start a shift. | Must Have |
| FR-SHIFT-02 | The system shall require opening cash before a shift can be started. | Must Have |
| FR-SHIFT-03 | The system shall prevent sales transactions before a shift is started. | Must Have |
| FR-SHIFT-04 | The system shall allow only one active cashier session globally. | Must Have |
| FR-SHIFT-05 | The system shall prevent the Owner and Kasir from operating separate cashier sessions simultaneously. | Must Have |
| FR-SHIFT-06 | The system shall record all transactions associated with the active session. | Must Have |
| FR-SHIFT-07 | The system shall calculate expected cash at shift closing. | Must Have |
| FR-SHIFT-08 | The system shall require actual cash information when closing a shift. | Must Have |
| FR-SHIFT-09 | The system shall calculate the difference between actual cash and expected cash. | Must Have |
| FR-SHIFT-10 | The system shall generate a shift recap. | Must Have |
| FR-SHIFT-11 | The Owner shall be able to monitor active and historical cashier sessions. | Must Have |
| FR-SHIFT-12 | The Owner shall be able to force-close an active session when necessary. | Should Have |
| FR-SHIFT-13 | The system shall require confirmation and a reason for force-closing a session. | Must Have |
| FR-SHIFT-14 | The system shall record force-close activities in the audit trail. | Must Have |

## 3.13 Marketplace Sales Report Import

**Feature ID:** SYS-IMPORT

The system shall allow the Owner to import sales reports obtained manually from external platforms.

Supported platforms:

- GoFood.
- GrabFood.
- ShopeeFood.
- Shopee.

Supported file formats:

- XLSX.
- XLS.
- CSV.
- PDF.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-IMPORT-01 | The system shall allow the Owner to select an external sales platform. | Must Have |
| FR-IMPORT-02 | The system shall allow the Owner to upload a sales report file. | Must Have |
| FR-IMPORT-03 | The system shall validate the uploaded file format. | Must Have |
| FR-IMPORT-04 | The system shall process supported report structures and extract available sales data. | Must Have |
| FR-IMPORT-05 | The system shall provide a preview of extracted records before import confirmation. | Must Have |
| FR-IMPORT-06 | The system shall allow column mapping when the uploaded report structure differs from the expected structure. | Should Have |
| FR-IMPORT-07 | The system shall allow the Owner to map external product names to internal products when product-level data is available. | Must Have |
| FR-IMPORT-08 | The system shall detect duplicate transactions using the original platform transaction ID when available. | Must Have |
| FR-IMPORT-09 | The system shall identify records that cannot be processed. | Must Have |
| FR-IMPORT-10 | The system shall display the number of valid, duplicate, and failed records before confirmation. | Must Have |
| FR-IMPORT-11 | The system shall import valid records after Owner confirmation. | Must Have |
| FR-IMPORT-12 | The system shall maintain import batch history. | Must Have |
| FR-IMPORT-13 | The system shall store the platform name, file name, report period, import timestamp, and importing user. | Must Have |
| FR-IMPORT-14 | The system shall provide filters for imported sales history. | Must Have |
| FR-IMPORT-15 | The system shall provide consolidated sales reports across internal cashier and supported marketplace platforms. | Must Have |
| FR-IMPORT-16 | The system shall distinguish gross sales from estimated net proceeds when the required source data is available. | Must Have |
| FR-IMPORT-17 | The system shall not automatically reduce current inventory when historical marketplace reports are imported. | Must Have |
| FR-IMPORT-18 | The system shall provide a record of successful, duplicate, and failed import rows. | Must Have |

**Import Limitations:**

1. Marketplace reports are imported manually by the Owner.
2. The system does not provide direct API integration or real-time order synchronization.
3. PDF text extraction and scanned PDF OCR are subject to technical validation.
4. Platform fees, discounts, and net settlement values can only be calculated when the source report provides the required information.
5. Product-level analysis is only available when the imported report contains item-level details.
6. Imported historical marketplace transactions must not automatically deduct current inventory.

## 3.14 Master Sales Report

**Feature ID:** SYS-MSR

The system shall provide a consolidated report of sales from internal transactions and imported marketplace records.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-MSR-01 | The system shall display sales records from internal cashier transactions. | Must Have |
| FR-MSR-02 | The system shall display imported marketplace sales records. | Must Have |
| FR-MSR-03 | The system shall allow filtering by transaction date or report period. | Must Have |
| FR-MSR-04 | The system shall allow filtering by sales platform. | Must Have |
| FR-MSR-05 | The system shall allow filtering by transaction status. | Must Have |
| FR-MSR-06 | The system shall display transaction count. | Must Have |
| FR-MSR-07 | The system shall display gross sales when the source data supports the calculation. | Must Have |
| FR-MSR-08 | The system shall display discounts and platform fees when available. | Must Have |
| FR-MSR-09 | The system shall display estimated net proceeds when sufficient source data is available. | Must Have |
| FR-MSR-10 | The system shall display product sales summaries when item-level data is available. | Should Have |
| FR-MSR-11 | The system shall provide daily, weekly, and monthly sales summaries. | Must Have |
| FR-MSR-12 | The system shall distinguish completed, cancelled, and refunded transactions. | Must Have |

## 3.15 Financial Management

**Feature ID:** SYS-FIN

The system shall support basic business financial monitoring.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-FIN-01 | The system shall allow the Owner to view recorded purchase costs. | Must Have |
| FR-FIN-02 | The system shall allow the Owner to record relevant business expenses. | Must Have |
| FR-FIN-03 | The system shall display income and expenses within a selected period. | Must Have |
| FR-FIN-04 | The system shall provide a financial summary based on recorded data. | Must Have |
| FR-FIN-05 | The system shall distinguish cash and non-cash payment methods. | Must Have |
| FR-FIN-06 | The system shall display estimated profit when sufficient cost and sales data is available. | Must Have |
| FR-FIN-07 | The system shall indicate when financial calculations are based on incomplete cost data. | Must Have |

## 3.16 HPP Calculation

**Feature ID:** SYS-HPP

The system shall calculate estimated production costs based on available recipe and cost information.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-HPP-01 | The system shall calculate estimated raw material costs based on product recipes. | Must Have |
| FR-HPP-02 | The system shall use recorded raw material prices in the calculation when available. | Must Have |
| FR-HPP-03 | The system shall calculate estimated HPP per production unit. | Must Have |
| FR-HPP-04 | The system shall allow the Owner to view the cost components used in the calculation. | Must Have |
| FR-HPP-05 | The system shall identify incomplete or unavailable cost components. | Must Have |
| FR-HPP-06 | The system shall label HPP and profit values as estimates when cost data is incomplete. | Must Have |

## 3.17 Reporting Management

**Feature ID:** SYS-REPORT

The system shall provide reports to support business monitoring and decision-making.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-REPORT-01 | The system shall provide sales reports. | Must Have |
| FR-REPORT-02 | The system shall provide purchase reports. | Must Have |
| FR-REPORT-03 | The system shall provide raw material inventory reports. | Must Have |
| FR-REPORT-04 | The system shall provide finished goods inventory reports. | Must Have |
| FR-REPORT-05 | The system shall provide production reports. | Must Have |
| FR-REPORT-06 | The system shall provide financial reports. | Must Have |
| FR-REPORT-07 | The system shall allow the Owner to filter reports by date range. | Must Have |
| FR-REPORT-08 | The system shall provide report export functionality. | Should Have |
| FR-REPORT-09 | The system shall maintain historical report data. | Must Have |

## 3.18 Business Profile Management

**Feature ID:** SYS-SETTING

The system shall allow the Owner to manage business profile information.

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| FR-SETTING-01 | The system shall allow the Owner to view business profile information. | Must Have |
| FR-SETTING-02 | The system shall allow the Owner to update business name and relevant business information. | Must Have |
| FR-SETTING-03 | The system shall allow the Owner to manage information displayed on business receipts where applicable. | Should Have |
| FR-SETTING-04 | The system shall restrict business profile management to the Owner. | Must Have |

---

# 4. EXTERNAL INTERFACE REQUIREMENTS

## 4.1 User Interface Requirements

The system shall provide a user interface that is easy to understand and operate.

The user interface shall follow these requirements:

- All user-facing interface text must use Bahasa Indonesia.
- Navigation menus must be organized according to user roles.
- Forms must provide clear labels and validation messages.
- Tables must provide readable information and relevant actions.
- Dashboard components must present important operational information.
- Destructive actions must require confirmation.
- The interface must provide feedback after important operations.
- The interface must be responsive across supported screen sizes.

## 4.2 Software Interface Requirements

The system shall interact with the following software components:

| Component | Purpose |
|---|---|
| Web Browser | Access the application |
| Web Server | Process application requests |
| Application Backend | Execute business logic and authorization |
| Database Management System | Store and retrieve system data |
| Spreadsheet Parser | Process XLSX, XLS, and CSV files |
| PDF Processing Component | Extract supported PDF report data |
| PDF/Spreadsheet Export Component | Generate downloadable reports where supported |

Specific technologies and versions shall be determined during the technical design and development stages.

## 4.3 Hardware Interface Requirements

The system is expected to operate on standard computers and laptops used for business operations.

Supported hardware may include:

- Desktop computers.
- Laptop computers.
- Tablets with compatible web browsers.
- Printers for physical transaction receipts, where required.

## 4.4 Communication Interface Requirements

The system shall communicate through standard web communication protocols.

- The application shall support HTTPS in production deployment.
- The system shall communicate with its backend through application endpoints.
- The system shall validate incoming requests before processing them.
- The system shall protect authenticated operations from unauthorized access.

---

# 5. NON-FUNCTIONAL REQUIREMENTS

## 5.1 Performance Requirements

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| NFR-PERF-01 | Standard pages should load within 3 seconds under normal operating conditions. | Should Have |
| NFR-PERF-02 | Standard filtering operations should complete within 3 seconds under normal operating conditions. | Should Have |
| NFR-PERF-03 | Report generation should complete within 5 seconds for normal data volumes. | Should Have |
| NFR-PERF-04 | The system shall process transaction and inventory updates without inconsistent intermediate results. | Must Have |

The numerical performance targets are initial targets and must be validated against the actual deployment environment and expected data volume.

## 5.2 Security Requirements

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| NFR-SEC-01 | The system shall require authentication before accessing protected modules. | Must Have |
| NFR-SEC-02 | The system shall implement role-based access control. | Must Have |
| NFR-SEC-03 | Passwords shall be stored using secure password hashing. | Must Have |
| NFR-SEC-04 | The system shall validate and sanitize user input. | Must Have |
| NFR-SEC-05 | The system shall protect restricted pages and backend endpoints from unauthorized access. | Must Have |
| NFR-SEC-06 | The system shall use HTTPS in production deployment. | Must Have |
| NFR-SEC-07 | The system shall restrict uploaded files to supported formats and validate their contents. | Must Have |
| NFR-SEC-08 | Sensitive business activities shall be recorded in the audit trail. | Must Have |

## 5.3 Usability Requirements

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| NFR-USE-01 | The system shall provide a simple and consistent user interface. | Must Have |
| NFR-USE-02 | The website shall use Bahasa Indonesia as its primary interface language. | Must Have |
| NFR-USE-03 | The system shall provide clear navigation based on user roles. | Must Have |
| NFR-USE-04 | The system shall provide understandable validation and error messages. | Must Have |
| NFR-USE-05 | Common business operations shall be accessible through clear navigation and forms. | Must Have |
| NFR-USE-06 | The system shall provide confirmation before critical actions are executed. | Must Have |

## 5.4 Reliability and Data Integrity Requirements

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| NFR-REL-01 | The system shall maintain data consistency during sales and inventory updates. | Must Have |
| NFR-REL-02 | A successful transaction shall not cause duplicate inventory deductions. | Must Have |
| NFR-REL-03 | Stock changes shall be recorded in transaction history. | Must Have |
| NFR-REL-04 | The system shall prevent unauthorized modifications to completed transactions. | Must Have |
| NFR-REL-05 | The system shall preserve historical records of completed operations. | Must Have |
| NFR-REL-06 | Critical transaction and inventory operations shall be processed atomically where applicable. | Must Have |

## 5.5 Localization Requirements

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| NFR-LANG-01 | The website interface shall use Bahasa Indonesia by default. | Must Have |
| NFR-LANG-02 | Menus, forms, buttons, and notifications shall use consistent Indonesian terminology. | Must Have |
| NFR-LANG-03 | Monetary values shall use Indonesian Rupiah (Rp) formatting. | Must Have |
| NFR-LANG-04 | Number formats shall follow Indonesian conventions where applicable. | Must Have |
| NFR-LANG-05 | Dates shall use DD/MM/YYYY or an equivalent clear Indonesian format. | Must Have |
| NFR-LANG-06 | Time shall use the 24-hour format. | Should Have |
| NFR-LANG-07 | Technical terms shall be translated or explained when necessary. | Must Have |

## 5.6 Maintainability Requirements

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| NFR-MAIN-01 | The application shall use a structured and maintainable codebase. | Should Have |
| NFR-MAIN-02 | The application shall separate presentation, business logic, and data access responsibilities. | Should Have |
| NFR-MAIN-03 | The system shall provide understandable error logging for troubleshooting. | Should Have |
| NFR-MAIN-04 | The system shall support future feature improvements without requiring a complete redesign. | Should Have |

## 5.7 Auditability Requirements

| Requirement ID | Requirement Description | Priority |
|---|---|---|
| NFR-AUD-01 | The system shall record important changes to business data. | Must Have |
| NFR-AUD-02 | The audit record shall include the responsible user and activity timestamp. | Must Have |
| NFR-AUD-03 | Corrections, cancellations, refunds, and force-closed cashier sessions shall be recorded. | Must Have |
| NFR-AUD-04 | The system shall retain historical records required for business monitoring. | Must Have |

---

# 6. DATA REQUIREMENTS

## 6.1 Main Data Entities

The system shall manage the following conceptual data entities:

| No. | Entity | Description |
|---|---|---|
| 1 | User | Stores Owner and Kasir account information |
| 2 | Role | Defines user access roles |
| 3 | Product | Stores product information |
| 4 | Product Category | Stores product categories |
| 5 | Raw Material | Stores raw material information |
| 6 | Inventory Movement | Records stock changes |
| 7 | Supplier | Stores supplier information |
| 8 | Purchase | Stores procurement transactions |
| 9 | Purchase Detail | Stores purchased material details |
| 10 | Recipe | Defines product composition |
| 11 | Recipe Detail | Stores raw material requirements |
| 12 | Production | Stores production records |
| 13 | Production Detail | Stores actual material usage and production details |
| 14 | Sales Transaction | Stores internal sales transactions |
| 15 | Sales Detail | Stores products and quantities sold |
| 16 | Payment | Stores payment information |
| 17 | Cashier Session | Stores cashier shift information |
| 18 | Cashier Session Recap | Stores closing and cash reconciliation information |
| 19 | Marketplace Import Batch | Stores uploaded report information |
| 20 | Marketplace Sales | Stores imported external sales records |
| 21 | Marketplace Sales Detail | Stores product-level marketplace sales when available |
| 22 | Financial Record | Stores relevant business income and expenses |
| 23 | Audit Log | Stores important system activities |
| 24 | Business Profile | Stores business information |

This section identifies conceptual data entities only. Detailed database tables, attributes, relationships, and constraints shall be specified during database design.

## 6.2 Data Validation Requirements

The system shall validate data before storing it.

Examples include:

- Required fields must not be empty.
- Numeric quantities must contain valid numeric values.
- Monetary values must not contain invalid negative amounts unless explicitly permitted by the business process.
- Product and material references must point to valid records.
- Transaction quantities must not exceed available stock.
- Uploaded files must use supported formats.
- Duplicate marketplace records must be identified before import confirmation.
- Dates must follow valid date formats.

## 6.3 Data Retention and Historical Records

The system shall preserve historical records for important business operations, including:

- Sales transactions.
- Purchase transactions.
- Production records.
- Inventory movements.
- Cashier sessions.
- Marketplace import batches.
- Financial records.
- Audit logs.

Completed sales and historical records shall not be permanently deleted through ordinary operational workflows.

Corrections and cancellations must be recorded with the relevant reason and audit information.

---

# 7. BUSINESS RULES

## 7.1 User Access Rules

1. The system has exactly two primary roles: Owner and Kasir.
2. The Owner has full access to all management modules.
3. The Kasir only has access to cashier-related functionality and personal transaction and shift history.
4. The Owner can access cashier functionality only when no other cashier session is active.
5. Only one cashier session may be active globally at a time.
6. Being logged in as a Kasir without an active shift does not prevent the Owner from starting Owner Cashier Mode.

## 7.2 Cashier Session Rules

1. A cashier must enter opening cash before starting a shift.
2. Sales transactions cannot be performed without an active cashier session.
3. Every transaction must be associated with an active cashier session.
4. The Owner and Kasir cannot operate separate active cashier sessions simultaneously.
5. The Owner may force-close a session only through an authorized process requiring confirmation and a reason.

## 7.3 Cash Reconciliation Rules

The system shall calculate expected cash using the following formula:

**Expected Cash = Opening Cash + Cash Sales - Cash Expenses - Cash Refunds**

The system shall calculate the cash difference using:

**Cash Difference = Actual Cash - Expected Cash**

Additional rules:

- Only physical cash transactions are included in cash reconciliation.
- Bank transfers and QRIS payments are excluded from physical cash calculations.
- The system shall display the expected cash, actual cash, and difference during shift closing.
- The system shall store the final reconciliation results.

## 7.4 Inventory Rules

1. Raw material stock increases after a successful purchase record.
2. Raw material stock decreases after production is confirmed.
3. Recipe quantities are used to calculate estimated material requirements.
4. Actual material usage can be adjusted by the Owner.
5. Finished goods stock increases after production is successfully recorded.
6. Finished goods stock decreases after a successful internal sales transaction.
7. Historical marketplace sales imports do not automatically reduce current inventory.
8. Manual stock adjustments must include a reason.

## 7.5 Procurement Rules

1. A purchase must contain at least one purchased item.
2. Supplier information is optional.
3. Purchase quantities and unit prices must be recorded.
4. Raw material stock is updated after a purchase is successfully saved.

## 7.6 Marketplace Import Rules

1. Marketplace reports are uploaded manually by the Owner.
2. The system supports GoFood, GrabFood, ShopeeFood, and Shopee as import sources.
3. Duplicate detection shall use the original platform transaction ID when available.
4. If the original transaction ID is unavailable, alternative matching criteria may be used, but duplicate detection cannot be guaranteed.
5. Cancelled transactions must not be counted as completed sales.
6. Refunds and returned transactions must be accounted for separately.
7. Gross sales, discounts, platform fees, and estimated net proceeds must be distinguished when the source data supports the calculation.
8. Imported historical transactions must not automatically deduct current stock.

## 7.7 Financial Calculation Rules

1. HPP calculations shall use available recipe and raw material cost data.
2. Estimated profit shall use available sales and cost information.
3. Incomplete cost components must be clearly identified.
4. The system must label HPP and profit as estimates when cost information is incomplete.
5. Marketplace gross sales and net settlement values must not be treated as equivalent.

---

# 8. SYSTEM PROCESS FLOWS

## 8.1 Authentication Flow

1. The user opens the website.
2. The system displays the login page.
3. The user enters their credentials.
4. The system validates the credentials.
5. The system identifies the user's role.
6. The system redirects the user to the appropriate dashboard.
7. The system provides access according to the user's role.

## 8.2 Procurement Flow

1. The Owner opens the procurement module.
2. The Owner selects the raw materials being purchased.
3. The Owner enters purchase quantities and prices.
4. The Owner optionally selects a supplier.
5. The system calculates the total purchase cost.
6. The Owner confirms the purchase.
7. The system stores the purchase record.
8. The system updates raw material stock.
9. The system records the inventory movement.

## 8.3 Production Flow

1. The Owner opens the production module.
2. The Owner selects a product.
3. The Owner enters the production quantity.
4. The system calculates estimated material requirements based on the recipe.
5. The system checks available raw material stock.
6. The Owner reviews and adjusts actual material usage.
7. The Owner confirms the production record.
8. The system deducts actual raw material usage.
9. The system increases finished goods stock.
10. The system stores the production history.

## 8.4 Cashier Transaction Flow

1. The Kasir logs into the system.
2. The Kasir starts a shift by entering opening cash.
3. The system verifies that no other cashier session is active.
4. The Kasir selects products.
5. The Kasir adds products to the cart.
6. The system calculates the transaction total.
7. The Kasir selects a payment method.
8. The Kasir confirms the transaction.
9. The system records the transaction.
10. The system deducts finished goods stock.
11. The system generates a transaction receipt.

## 8.5 Owner Cashier Mode Flow

1. The Owner logs into the system.
2. The Owner accesses the cashier module.
3. The system checks whether another cashier session is active.
4. If no session is active, the system allows Owner Cashier Mode.
5. The Owner enters opening cash.
6. The system creates a cashier session associated with the Owner.
7. The Owner processes sales using the standard cashier workflow.
8. The Owner closes the session and enters actual cash.
9. The system generates a shift recap and cash difference.

## 8.6 Marketplace Import Flow

1. The Owner opens the marketplace import module.
2. The Owner selects the marketplace platform.
3. The Owner uploads a report file.
4. The system validates the file.
5. The system extracts available records.
6. The system displays a preview.
7. The Owner maps columns or products when necessary.
8. The system checks for duplicate records.
9. The system displays valid, duplicate, and failed records.
10. The Owner confirms the import.
11. The system saves valid records and import batch information.
12. The imported records become available in the master sales report.
13. The system does not automatically reduce current inventory.

## 8.7 Cashier Shift Closing Flow

1. The Kasir or Owner opens the shift closing page.
2. The system retrieves the session's opening cash and transaction records.
3. The system calculates expected cash.
4. The user enters actual cash.
5. The system calculates the cash difference.
6. The user reviews the shift recap.
7. The user confirms the shift closing.
8. The system changes the session status to closed.
9. The system stores the closing information.

---

# 9. ACCEPTANCE CRITERIA

The system shall be considered acceptable when the following conditions are fulfilled.

| No. | Acceptance Criteria |
|---|---|
| 1 | Users can log in and access modules according to their roles. |
| 2 | The Owner can access all management modules. |
| 3 | The Kasir cannot access Owner-only modules. |
| 4 | Only one cashier session can be active globally. |
| 5 | The Owner can use Owner Cashier Mode when no other cashier session is active. |
| 6 | The Kasir must enter opening cash before starting a shift. |
| 7 | The system can record sales and update finished goods stock correctly. |
| 8 | The system can record purchases and increase raw material stock. |
| 9 | The system can calculate estimated material requirements based on recipes. |
| 10 | The system can record actual material usage during production. |
| 11 | The system can update raw material and finished goods stock after production. |
| 12 | The system can calculate expected cash and cash differences during shift closing. |
| 13 | The Owner can upload supported marketplace report files. |
| 14 | The system can preview, validate, and identify duplicate import records. |
| 15 | The system can display consolidated sales reports. |
| 16 | Imported historical marketplace transactions do not automatically reduce current inventory. |
| 17 | The system can display estimated HPP and profit based on available data. |
| 18 | The system records important changes and corrections in the audit trail. |
| 19 | The website interface uses Bahasa Indonesia as its default language. |
| 20 | The system provides reports and summaries based on stored business data. |

---

# 10. SYSTEM CONSTRAINTS AND ASSUMPTIONS

## 10.1 Constraints

1. The system is designed as a web-based application.
2. The system has two primary user roles: Owner and Kasir.
3. The system supports only one active cashier session globally.
4. Marketplace sales reports are imported manually.
5. Direct marketplace API integration is outside the current project scope.
6. Real-time marketplace order synchronization is outside the current project scope.
7. Marketplace report processing depends on the structure and completeness of the uploaded files.
8. HPP and profit calculations depend on available cost information.
9. Historical marketplace imports do not automatically modify current inventory.

## 10.2 Assumptions

1. The Owner and Kasir have valid system accounts.
2. The Owner is responsible for maintaining accurate product, material, recipe, and cost information.
3. The Owner provides marketplace report files in supported formats.
4. Uploaded marketplace reports contain sufficient information for the intended reporting process.
5. Users have access to a compatible web browser.
6. The business has defined the units used for raw materials and finished products.

---

# 11. OPEN ISSUES AND ITEMS REQUIRING CONFIRMATION

The following items require further confirmation before final implementation.

| No. | Open Issue | Description | Impact |
|---|---|---|---|
| 1 | Marketplace Report Structure | Whether platform reports contain individual order details or only period summaries. | Determines import capabilities and reporting detail. |
| 2 | PDF Processing | Whether scanned PDF reports must support OCR or only text-based PDF extraction. | Affects technical complexity and import accuracy. |
| 3 | Marketplace Fees | Whether all platforms provide discount, commission, and fee information in their reports. | Affects net proceeds calculations. |
| 4 | Multi-Period Import | Whether one uploaded file can contain multiple reporting periods. | Affects import validation and filtering. |
| 5 | HPP Components | Whether HPP includes only raw materials or also labor, packaging, utilities, and overhead. | Affects cost calculation accuracy. |
| 6 | Stock Reconciliation | Whether marketplace sales should eventually be reconciled with current stock through a separate process. | Affects inventory accuracy and future development. |
| 7 | Report Export | Which report formats are required, such as PDF or Excel. | Affects reporting implementation. |
| 8 | Performance Targets | Whether the initial response-time targets are appropriate for the actual deployment environment. | Affects performance testing. |

---

# 12. FUTURE DEVELOPMENT CONSIDERATIONS

The following features are not included in the current implementation scope but may be considered for future development:

1. Direct API integration with marketplace platforms.
2. Automatic marketplace order synchronization.
3. Automatic marketplace inventory synchronization.
4. Advanced sales forecasting.
5. Demand prediction based on historical sales.
6. Advanced business analytics.
7. Automated notifications through external messaging services.
8. More advanced financial analysis and profitability reporting.

---

# 13. CONCLUSION

This Software Requirements Specification defines the functional and non-functional requirements of the Cireng Cangkeling Management Information System.

The system is designed to integrate business operations, including product management, inventory control, procurement, production, sales, cashier operations, financial monitoring, marketplace sales imports, and reporting.

The requirements in this document serve as the technical foundation for system design, implementation, integration, and testing.

Any changes to the requirements must be reviewed and documented to ensure consistency between the system implementation and the business needs of Cireng Cangkeling.
