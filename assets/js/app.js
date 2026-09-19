// FinTrack - Personal Finance Management Dashboard
// Student Project JavaScript

// Default sample transactions if localStorage is empty
const defaultTransactions = [
  { id: 'TXN-101', date: '2026-09-18', description: 'Monthly Salary Credit', category: 'Salary', type: 'Income', amount: 30000, status: 'Completed', method: 'Bank Transfer' },
  { id: 'TXN-102', date: '2026-09-17', description: 'D-Mart Grocery Store', category: 'Food', type: 'Expense', amount: 2500, status: 'Completed', method: 'UPI' },
  { id: 'TXN-103', date: '2026-09-15', description: 'Electricity Bill Payment', category: 'Utilities', type: 'Expense', amount: 1800, status: 'Completed', method: 'Credit Card' },
  { id: 'TXN-104', date: '2026-09-12', description: 'Clothes & Shopping', category: 'Shopping', type: 'Expense', amount: 3200, status: 'Completed', method: 'Debit Card' },
  { id: 'TXN-105', date: '2026-09-08', description: 'Room Rent & Maintenance', category: 'Rent', type: 'Expense', amount: 4500, status: 'Completed', method: 'Bank Transfer' }
];

// Helper to get transactions from localStorage
function getTransactions() {
  const data = localStorage.getItem('fintrack_transactions');
  if (!data) {
    localStorage.setItem('fintrack_transactions', JSON.stringify(defaultTransactions));
    return defaultTransactions;
  }
  return JSON.parse(data);
}

// Helper to get users from localStorage
function getUsers() {
  const data = localStorage.getItem('fintrack_users');
  if (!data) {
    const defaultUser = [{ name: 'Rahul Sharma', email: 'rahul.sharma@example.com', password: 'demo1234' }];
    localStorage.setItem('fintrack_users', JSON.stringify(defaultUser));
    return defaultUser;
  }
  return JSON.parse(data);
}

// Helper to get currently logged in user
function getLoggedInUser() {
  const user = localStorage.getItem('fintrack_currentUser');
  return user ? JSON.parse(user) : null;
}

// Simple Auth Check (Redirect to login if not signed in)
function checkAuth() {
  const path = window.location.pathname.toLowerCase();
  const isLoginPage = path.includes('index.html') || path.endsWith('/') || path.endsWith('/fintrack') || path.endsWith('/fintrack/');
  const currentUser = getLoggedInUser();

  if (!isLoginPage && !currentUser) {
    window.location.href = 'index.html';
  }
}

// Run auth check on script load
checkAuth();

// Initialize UI Handlers after DOM loads
document.addEventListener('DOMContentLoaded', function() {
  const currentUser = getLoggedInUser();

  // Display Logged-in User Name in Header/Navbar
  if (currentUser) {
    const nameElements = document.querySelectorAll('.user-name, .user-display-name');
    nameElements.forEach(el => el.textContent = currentUser.name);

    const emailElements = document.querySelectorAll('.user-email, .user-display-email');
    emailElements.forEach(el => el.textContent = currentUser.email);
  }

  // Handle Login Form Submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = document.getElementById('emailInput') || document.getElementById('email');
      const passwordInput = document.getElementById('passwordInput') || document.getElementById('password');

      if (!emailInput || !passwordInput) return;

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      const users = getUsers();
      const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

      if (matchedUser) {
        localStorage.setItem('fintrack_currentUser', JSON.stringify(matchedUser));
        alert('Login Successful! Welcome ' + matchedUser.name);
        window.location.href = 'dashboard.html';
      } else {
        alert('Invalid email or password! Please check your details.');
      }
    });
  }

  // Handle Register Form Submission
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const password = document.getElementById('regPassword').value;

      const users = getUsers();
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (existingUser) {
        alert('This email is already registered! Please login.');
        return;
      }

      const newUser = { name: name, email: email, password: password };
      users.push(newUser);
      localStorage.setItem('fintrack_users', JSON.stringify(users));
      localStorage.setItem('fintrack_currentUser', JSON.stringify(newUser));

      alert('Account Created Successfully!');
      window.location.href = 'dashboard.html';
    });
  }

  // Handle Password Visibility Toggle
  const toggleBtn = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('passwordInput') || document.getElementById('password');
  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-eye');
        icon.classList.toggle('bi-eye-slash');
      }
    });
  }

  // Load Dashboard Page Data
  if (window.location.pathname.includes('dashboard.html')) {
    loadDashboardData();
  }

  // Load Transactions Page Table
  if (window.location.pathname.includes('transactions.html')) {
    loadTransactionsTable();
  }

  // Handle Add Transaction Form
  const addForm = document.getElementById('addTransactionForm');
  if (addForm) {
    // Set today's date
    const dateInput = document.getElementById('txnDateInput') || document.getElementById('date');
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    addForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const typeRadio = document.querySelector('input[name="txnTypeRadio"]:checked') || document.querySelector('input[name="type"]:checked');
      const type = typeRadio ? typeRadio.value : 'Expense';
      
      const amount = parseFloat(document.getElementById('txnAmountInput').value || document.getElementById('amount').value);
      const category = document.getElementById('txnCategoryInput').value || document.getElementById('category').value;
      const date = dateInput.value;
      const desc = document.getElementById('txnDescInput').value || document.getElementById('description').value;
      const method = document.getElementById('txnMethodInput').value || document.getElementById('method').value;

      const newTxn = {
        id: 'TXN-' + Math.floor(100 + Math.random() * 900),
        date: date,
        description: desc,
        category: category,
        type: type,
        amount: amount,
        status: 'Completed',
        method: method
      };

      const transactions = getTransactions();
      transactions.unshift(newTxn);
      localStorage.setItem('fintrack_transactions', JSON.stringify(transactions));

      alert('Transaction Saved Successfully!');
      window.location.href = 'transactions.html';
    });
  }
});

// Logout User
function handleLogout(e) {
  if (e) e.preventDefault();
  localStorage.removeItem('fintrack_currentUser');
  alert('Logged out successfully!');
  window.location.href = 'index.html';
}

// Load Dashboard Cards and Table
function loadDashboardData() {
  const transactions = getTransactions();
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach(t => {
    if (t.type === 'Income') totalIncome += parseFloat(t.amount);
    if (t.type === 'Expense') totalExpenses += parseFloat(t.amount);
  });

  const totalBalance = totalIncome - totalExpenses;
  const totalSavings = Math.max(0, totalIncome - totalExpenses);

  const balanceEl = document.getElementById('dashTotalBalance') || document.getElementById('totalBalance');
  const incomeEl = document.getElementById('dashTotalIncome') || document.getElementById('totalIncome');
  const expenseEl = document.getElementById('dashTotalExpenses') || document.getElementById('totalExpenses');
  const savingsEl = document.getElementById('dashTotalSavings') || document.getElementById('totalSavings');

  if (balanceEl) balanceEl.textContent = '₹' + totalBalance.toLocaleString('en-IN');
  if (incomeEl) incomeEl.textContent = '₹' + totalIncome.toLocaleString('en-IN');
  if (expenseEl) expenseEl.textContent = '₹' + totalExpenses.toLocaleString('en-IN');
  if (savingsEl) savingsEl.textContent = '₹' + totalSavings.toLocaleString('en-IN');

  // Render Recent Transactions (5 records)
  const recentTable = document.getElementById('recentTransactionsBody') || document.getElementById('recentTransactionsTable');
  if (recentTable) {
    recentTable.innerHTML = '';
    const recent = transactions.slice(0, 5);

    recent.forEach(t => {
      const isIncome = t.type === 'Income';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${t.date}</td>
        <td class="fw-semibold">${t.description}</td>
        <td><span class="badge bg-light text-dark border">${t.category}</span></td>
        <td><span class="badge ${isIncome ? 'bg-success' : 'bg-danger'}">${t.type}</span></td>
        <td class="${isIncome ? 'text-success fw-bold' : 'text-danger fw-bold'}">${isIncome ? '+' : '-'}₹${t.amount}</td>
        <td><span class="badge bg-success-subtle text-success border border-success">Completed</span></td>
      `;
      recentTable.appendChild(tr);
    });
  }
}

// Load All Transactions Table with Filter
function loadTransactionsTable() {
  const tableBody = document.getElementById('allTransactionsBody') || document.getElementById('transactionsTable');
  if (!tableBody) return;

  const searchInput = document.getElementById('txnSearchInput') || document.getElementById('searchInput');
  const categoryFilter = document.getElementById('txnCategoryFilter') || document.getElementById('categoryFilter');
  const typeFilter = document.getElementById('txnTypeFilter') || document.getElementById('typeFilter');

  function renderTable() {
    let transactions = getTransactions();

    const search = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const category = categoryFilter ? categoryFilter.value : 'All';
    const type = typeFilter ? typeFilter.value : 'All';

    if (search) {
      transactions = transactions.filter(t => 
        t.description.toLowerCase().includes(search) || 
        t.category.toLowerCase().includes(search)
      );
    }

    if (category !== 'All') {
      transactions = transactions.filter(t => t.category === category);
    }

    if (type !== 'All') {
      transactions = transactions.filter(t => t.type === type);
    }

    const countBadge = document.getElementById('txnResultCount');
    if (countBadge) countBadge.textContent = `${transactions.length} Transactions Found`;

    tableBody.innerHTML = '';

    if (transactions.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-muted">No transactions found matching criteria.</td></tr>`;
      return;
    }

    transactions.forEach(t => {
      const isIncome = t.type === 'Income';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><small class="text-muted">${t.id}</small></td>
        <td>${t.date}</td>
        <td class="fw-semibold">${t.description}</td>
        <td><span class="badge bg-light text-dark border">${t.category}</span></td>
        <td><span class="badge ${isIncome ? 'bg-success' : 'bg-danger'}">${t.type}</span></td>
        <td class="${isIncome ? 'text-success fw-bold' : 'text-danger fw-bold'}">${isIncome ? '+' : '-'}₹${t.amount}</td>
        <td><span class="badge bg-success-subtle text-success border border-success">Completed</span></td>
        <td>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteTxn('${t.id}')">
            <i class="bi bi-trash"></i> Delete
          </button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  if (searchInput) searchInput.addEventListener('input', renderTable);
  if (categoryFilter) categoryFilter.addEventListener('change', renderTable);
  if (typeFilter) typeFilter.addEventListener('change', renderTable);

  renderTable();
}

// Delete Transaction
function deleteTxn(id) {
  if (confirm('Are you sure you want to delete this transaction?')) {
    let transactions = getTransactions();
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem('fintrack_transactions', JSON.stringify(transactions));
    alert('Transaction deleted successfully!');
    loadTransactionsTable();
  }
}
