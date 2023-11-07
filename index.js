const incomeForm = document.getElementById("income-form");
const incomesList = document.getElementById("incomes-list");
const totalIncomes = document.getElementById("total-incomes");
const expenseForm = document.getElementById("expense-form");
const expensesList = document.getElementById("expenses-list");
const totalExpenses = document.getElementById("total-expenses");
const remainingBudget = document.getElementById("remaining-budget");

const incomes = [];
const expenses = [];

function updateIncomes() {
  incomesList.innerHTML = "";
  incomes.forEach((income) => {
    const item = document.createElement("li");
    item.textContent = `${income.title}: ${income.amount} zł `;
    item.classList.add("added-item");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Usuń";
    removeButton.classList.add("button");
    const editButton = document.createElement("button");
    editButton.textContent = "Edytuj";
    editButton.classList.add("edit");
    item.appendChild(removeButton);
    item.appendChild(editButton);
    removeButton.addEventListener("click", () => {
      removeIncome(income);
    });
    incomesList.appendChild(item);
    editButton.addEventListener("click", () => {
      editIncome(income, item);
    });
  });
  const total = incomes.reduce((a, b) => a + Number(b.amount), 0).toFixed(2);
  totalIncomes.textContent = `Wszystkie przychody: ${total} zł`;
  updateRemainingBudget();
}

function editIncome(income, item) {
  item.innerHTML = "";
  const titleInput = document.createElement("input");
  titleInput.value = income.title;
  titleInput.classList.add("bracket");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.value = income.amount;
  amountInput.classList.add("second-bracket");
  const saveButton = document.createElement("button");
  saveButton.textContent = "Zapisz";
  saveButton.classList.add("button");
  saveButton.addEventListener("click", () => {
    const incomeToEdit = incomes.find((item) => item.id === income.id);
    if (titleInput.value.trim() !== "" && amountInput.value >= 0.01) {
      incomeToEdit.title = titleInput.value;
      incomeToEdit.amount = Number(amountInput.value).toFixed(2);
      updateIncomes();
    } else alert("Żadne z pól nie może pozostać puste");
  });
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Anuluj";
  cancelButton.classList.add("cancel");
  cancelButton.addEventListener("click", () => {
    updateIncomes();
  });
  item.appendChild(titleInput);
  item.appendChild(amountInput);
  item.appendChild(saveButton);
  item.appendChild(cancelButton);
}

function removeIncome(income) {
  const indexToDelete = incomes.findIndex((item) => item.id === income.id);
  incomes.splice(indexToDelete, 1);
  updateIncomes();
}

//

function updateExpenses() {
  expensesList.innerHTML = "";
  expenses.forEach((expense) => {
    const item = document.createElement("li");
    item.textContent = `${expense.title}: ${expense.amount} zł `;
    item.classList.add("added-item");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Usuń";
    removeButton.classList.add("button");
    const editButton = document.createElement("button");
    editButton.textContent = "Edytuj";
    editButton.classList.add("edit");
    item.appendChild(removeButton);
    item.appendChild(editButton);
    removeButton.addEventListener("click", () => {
      removeExpense(expense);
    });
    expensesList.appendChild(item);
    editButton.addEventListener("click", () => {
      editExpense(expense, item);
    });
  });
  const total = expenses.reduce((a, b) => a + Number(b.amount), 0).toFixed(2);
  totalExpenses.textContent = `Wszystkie wydatki: ${total} zł`;
  updateRemainingBudget();
}

function editExpense(expense, item) {
  item.innerHTML = "";
  const titleInput = document.createElement("input");
  titleInput.value = expense.title;
  titleInput.classList.add("bracket");
  const amountInput = document.createElement("input");
  amountInput.value = expense.amount;
  amountInput.classList.add("second-bracket");
  const saveButton = document.createElement("button");
  saveButton.textContent = "Zapisz";
  saveButton.classList.add("button");
  saveButton.addEventListener("click", () => {
    const expenseToEdit = expenses.find((item) => item.id === expense.id);
    if (titleInput.value.trim() !== "" && amountInput.value >= 0.01) {
      expenseToEdit.title = titleInput.value;
      expenseToEdit.amount = Number(amountInput.value).toFixed(2);
      updateExpenses();
    } else alert("Żadne z pól nie może pozostać puste");
  });
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Anuluj";
  cancelButton.classList.add("cancel");
  cancelButton.addEventListener("click", () => {
    updateExpenses();
  });
  item.appendChild(titleInput);
  item.appendChild(amountInput);
  item.appendChild(saveButton);
  item.appendChild(cancelButton);
}

function removeExpense(expense) {
  const indexToDelete = expenses.findIndex((item) => item.id === expense.id);
  expenses.splice(indexToDelete, 1);
  updateExpenses();
}

function updateRemainingBudget() {
  const incomeTotal = incomes.reduce((a, b) => a + Number(b.amount), 0);
  const expenseTotal = expenses.reduce((a, b) => a + Number(b.amount), 0);
  const remainingBudgetValue = (incomeTotal - expenseTotal).toFixed(2);
  remainingBudget.textContent = `: ${remainingBudgetValue} zł`;

  if (remainingBudgetValue > 0) {
    remainingBudget.textContent = remainingBudgetValue + " - Gratuluję";
  } else if (remainingBudgetValue === 0) {
    remainingBudget.textContent = remainingBudgetValue + " - Mogło być lepiej";
  } else if (remainingBudgetValue < 0) {
    remainingBudget.textContent = remainingBudgetValue + " - Weź pożyczkę";
  }
}

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleInput = event.target.querySelector('[name="incomeTitle"]');
  const amountInput = event.target.querySelector('[name="incomeAmount"]');
  const title = titleInput.value;
  const amount = parseFloat(amountInput.value).toFixed(2);
  if (amount >= 0.01 && title.length >= 1) {
    incomes.push({ title, amount, id: new Date().valueOf() });
    updateIncomes();
    titleInput.value = "";
    amountInput.value = "";
  } else {
    alert("Przychód musi wynosić więcej niż 0.01 zł.");
  }
});

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleInput = event.target.querySelector('[name="expenseTitle"]');
  const amountInput = event.target.querySelector('[name="expenseAmount"]');
  const title = titleInput.value;
  const amount = parseFloat(amountInput.value);
  if (amount >= 0.01 && title.length >= 1) {
    expenses.push({ title, amount, id: new Date().valueOf() });
    updateExpenses();
    titleInput.value = "";
    amountInput.value = "";
  } else {
    alert("Wydatek musi wynosić więcej niż 0.01 zł.");
  }
});
