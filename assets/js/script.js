// Function to initialize balance (reset if first visit)
function initializeBalance() {
    if (!localStorage.getItem("balance")) {
        localStorage.setItem("balance", "5000"); // Set default balance
    }
    balance = parseFloat(localStorage.getItem("balance"));
    updateBalance();
}

// Update balance display and save to localStorage
function updateBalance() {
    document.getElementById("balance").textContent = `$${balance.toFixed(2)}`;
    localStorage.setItem("balance", balance);
}

// Log in to the account
function login() {
    const password = document.getElementById("password").value;
    if (password === "123") {
        document.getElementById("login-page").classList.add("hidden");
        document.getElementById("account-page").classList.remove("hidden");
        initializeBalance(); // Load or reset balance
        loadStoredTransactions(); // Load stored transactions
    } else {
        alert("Incorrect password!");
    }
}

// Deposit function
function deposit() {
    const amountInput = document.getElementById("amount");
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid deposit amount.");
        return;
    }

    balance += amount;
    updateBalance();
    addTransaction("Deposit", amount);
    amountInput.value = ""; // Clear input
}

// Withdraw function
function withdraw() {
    const amountInput = document.getElementById("amount");
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid withdrawal amount.");
        return;
    }

    if (amount > balance) {
        alert("Insufficient funds!");
        return;
    }

    balance -= amount;
    updateBalance();
    addTransaction("Withdrawal", amount);
    amountInput.value = ""; // Clear input
}

// Add transaction to history and save to localStorage
function addTransaction(type, amount) {
    const historyList = document.getElementById("history-list");
    const transactionDate = new Date().toLocaleString();
    const transactionItem = document.createElement("li");

    transactionItem.textContent = `${transactionDate} - ${type}: $${amount.toFixed(2)}`;
    historyList.prepend(transactionItem);

    // Store transactions in localStorage
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.unshift({ date: transactionDate, type, amount: amount.toFixed(2) });
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Load stored transactions on login
function loadStoredTransactions() {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = ""; // Clear existing history

    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    storedTransactions.forEach((tx) => {
        const transactionItem = document.createElement("li");
        transactionItem.textContent = `${tx.date} - ${tx.type}: $${tx.amount}`;
        historyList.appendChild(transactionItem);
    });
}

// Toggle transaction history visibility
function toggleHistory() {
    document.getElementById("history-list").classList.toggle("hidden");
}

// Log out and reset balance if user chooses
function logout() {
    const resetChoice = confirm("Do you want to reset your balance to $5000?");
    if (resetChoice) {
        localStorage.removeItem("balance");
        localStorage.removeItem("transactions");
    }

    document.getElementById("account-page").classList.add("hidden");
    document.getElementById("login-page").classList.remove("hidden");
    document.getElementById("password").value = ""; // Clear password field
}
