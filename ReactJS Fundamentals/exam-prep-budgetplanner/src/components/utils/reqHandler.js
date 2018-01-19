const baseUrl = 'http://localhost:5000';

async function register(name, email, password) {
    const res = await fetch(`${baseUrl}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    });

    return await res.json();
}

async function login(email, password) {
    const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    return await res.json()
}

async function getYearBalance(year) {
    const res = await fetch(`${baseUrl}/plan/${year}`, {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function getMonthBalance(year, month) {
    const res = await fetch(`${baseUrl}/plan/${year}/${month}`, {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function updateMonthlyBudgetAndIncome(year, month, income, budget) {
    const res = await fetch(`${baseUrl}/plan/${year}/${month}`, {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            income: income,
            budget: budget
        })
    });
    return res.json();
}

async function addNewExpense(year, month, date, name, category, amount) {
    const res = await fetch(`${baseUrl}/plan/${year}/${month}/expense`, {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: date,
            name: name,
            category: category,
            amount: amount
        })
    });
    return res.json();
}

async function deleteExistingExpense(id) {
    const res = await fetch(`${baseUrl}/plan/expense/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    });
    return res.json();

}

export {login, register, getYearBalance, getMonthBalance, updateMonthlyBudgetAndIncome, addNewExpense, deleteExistingExpense};
