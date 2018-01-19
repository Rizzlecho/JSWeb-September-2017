const host = 'http://localhost:5000/';

async function register(name, email, password) {
    const res = await fetch(host + 'auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password,
        })
    });
    return await res.json();
}

async function login(email, password) {
    const res = await fetch(host + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    return await res.json();
}

async function getYearBalance() {
    let year = new Date().getFullYear();
    console.log('Remote year = ' +year);

    const res = await fetch(host + `plan/${year}`, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        }
    });
    return await res.json();
}


async function detailsBudget(year, month) {
    const res = await fetch(host + `plan/${year}/${month}`, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken'),
        }
    });
    return await res.json();
}


async function updateIncomeBudget(income, budget,year, month) {
    const res = await fetch(host + `plan/${year}/${month}`, {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            income: Number(income),
            budget: Number(budget)
        })
    });
    return await res.json();
}

async function addExpense(name, category, cost, date, year, month) {
    const res = await fetch(host + `plan/${year}/${month}/expense`, {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            category,
            amount: Number(cost),
            date: Number(date)
        })
    });
    return await res.json();
}


async function deleteExpense(expense) {
    const res = await fetch(host + `plan/expense/${expense}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           expense
        })
    });
    return await res.json();
}



export {register, login, getYearBalance, detailsBudget, updateIncomeBudget, addExpense, deleteExpense};