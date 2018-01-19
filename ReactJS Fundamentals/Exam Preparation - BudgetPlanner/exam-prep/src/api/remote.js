const host = 'http://localhost:5000';

async function register(name, email, password) {
    const res = await fetch(host + '/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    return await res.json();
}

async function login(email, password) {
    const res = await fetch(`${host}/auth/login`, {
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
    const res = await fetch(`${host}/plan/${year}`, {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function getMonthlyBalance(year ,month) {
    const res = await fetch(`${host}/plan/${year}/${month}`, {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function updateMonthlyIncomeBudget(year ,month, income, budget) {
    const res = await fetch(`${host}/plan/${year}/${month}`, {
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
    return await res.json();
}

async function addExpensePost(year ,month, date, name, category, amount) {
    const res = await fetch(`${host}/plan/${year}/${month}/expense`, {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: date,
            name: name,
            category: category,
            amount: amount,
        })
    });
    return await res.json();
}

async function deleteExpense(expense) {
    const res = await fetch(`${host}/plan/expense/${expense}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}

export { register, login, getYearBalance, getMonthlyBalance, updateMonthlyIncomeBudget, addExpensePost, deleteExpense };