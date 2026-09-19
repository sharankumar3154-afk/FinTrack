# FinTrack – Personal Finance Management Dashboard

> **“Track your money. Control your future.”**

FinTrack is a responsive, web application built using **HTML5, Bootstrap 5 (CDN), Bootstrap Icons, and Vanilla JavaScript**. It provides individuals with an intuitive, clean ERP-grade dashboard to manage daily income, track category expenses, set monthly spending limits, and review financial growth reports.

---

## 🚀 Features & LocalStorage Authentication

- **Authentication & LocalStorage Auth Guard (`index.html`)**:
  - Full registration & login flow storing credentials in `localStorage.getItem('fintrack_users')`.
  - Auth Guard protection on all inner pages (`dashboard.html`, `transactions.html`, `budget.html`, `reports.html`, `profile.html`) preventing unauthenticated access.
  - Password visibility toggle, floating validation feedback, and logout handling.
- **Main Dashboard (`dashboard.html`)**: Real-time summary cards for Total Balance, Income, Expenses, and Savings. Visual financial overview with progress bars, budget alert banners, quick action shortcuts, and recent transactions table.
- **Transactions Management (`transactions.html`)**: Searchable and filterable transaction ledger with category, type, and date filters. Supports itemized receipt view modal, deletion confirmation modal, and custom pagination.
- **Add Transaction (`add-transaction.html`)**: Form with Bootstrap `needs-validation` validation, segmented type toggles (Income/Expense), dynamic category dropdowns, payment method selection, receipt file attachment, and success alerts.
- **Monthly Budget Tracker (`budget.html`)**: Category spending tracker with real-time progress bars, budget warning alerts (`alert-danger`), stacked budget utilization overview, and budget limit setting modal.
- **Financial Reports & Analytics (`reports.html`)**: YTD income and savings summary, category spending breakdown with progress bars, financial health score indicator (92/100), and historical 4-month comparison table.
- **User Profile & Settings (`profile.html`)**: User profile avatar card, edit profile modal, notification toggles with Bootstrap form switches (`form-switch`), and security password change card.

---

## 🎨 Bootstrap 5 Features & Components Demonstrated

1. **Navbar**: Fixed top responsive navbar with brand icon, notifications dropdown, and user profile menu.
2. **Responsive Grid System**: `container`, `container-fluid`, `row`, `col-12`, `col-md-6`, `col-lg-3`, `g-3`, `g-4`.
3. **Cards**: `card`, `card-header`, `card-body`, `card-footer`, `shadow-sm`, `rounded-3`.
4. **Buttons & Button Groups**: `btn-primary`, `btn-outline-secondary`, `btn-danger`, `btn-group`, radio segmented toggle buttons (`btn-check`).
5. **Form Controls & Floating Labels**: `form-control`, `form-select`, `form-check`, `form-switch`, `textarea`.
6. **Form Validation**: Native HTML5 & Bootstrap `needs-validation` with `invalid-feedback` and `valid-feedback`.
7. **Tables**: `table`, `table-responsive`, `table-hover`, `table-striped`, `align-middle`.
8. **Badges**: `badge`, `bg-success-subtle`, `text-success-emphasis`, `bg-warning-subtle`, `rounded-pill`.
9. **Alerts**: Dismissible alerts (`alert`, `alert-warning`, `alert-danger`, `alert-success`, `alert-dismissible`).
10. **Progress Bars**: Individual & stacked progress bars (`progress`, `progress-bar-striped`, `progress-bar-animated`).
11. **Dropdowns**: Dropdown menus with dividers and headers (`dropdown`, `dropdown-menu`, `dropdown-item`).
12. **Modals**: Centered interactive dialogs (`modal`, `modal-dialog-centered`).
13. **Offcanvas**: Responsive mobile drawer menu (`offcanvas`, `offcanvas-start`).
14. **Pagination**: Page numbers & navigation controls (`pagination`, `page-item`, `page-link`).
15. **Breadcrumbs**: Page hierarchy navigation (`breadcrumb`, `breadcrumb-item`).
16. **Input Groups**: Icon addons and currency prefixes (`input-group`, `input-group-text`).
17. **Bootstrap Icons CDN**: Vector icons (`bi bi-*`).
18. **Responsive Display Utilities**: `d-none`, `d-md-block`, `d-lg-flex`, `d-md-none`.
19. **Spacing Utilities**: Margin & padding (`m-0`, `mb-4`, `p-3`, `px-4`, `g-4`, `gy-3`).
20. **Typography Utilities**: Text sizing (`fs-4`, `fw-bold`, `text-muted`, `text-uppercase`).

---

## 🛠️ Project Structure

```text
FinTrack/
│
├── index.html            # Login & Registration Page (LocalStorage Auth)
├── dashboard.html        # Main Financial Dashboard
├── transactions.html     # Transaction Ledger & Filter
├── add-transaction.html # Add Transaction Form with Validation
├── budget.html           # Monthly Budget Goal Tracker
├── reports.html          # Financial Summary & Comparison Reports
├── profile.html          # Profile Management & Settings
│
├── assets/
│   ├── css/
│   │   └── style.css     # Minimal custom layout CSS adjustments
│   └── js/
│       └── app.js        # Shared Vanilla JS (auth guard, data store, filters, validation, toast alerts)
│
└── README.md             # Documentation
```

---

## 💻 How to Run

1. Open the project folder `FinTrack` in **VS Code**.
2. Right-click on `index.html` and select **"Open with Live Server"**.
3. Use the demo credentials:
   - **Email**: `rahul.sharma@example.com`
   - **Password**: `demo1234`
4. Or register a new account via the **Create an Account** modal link.
