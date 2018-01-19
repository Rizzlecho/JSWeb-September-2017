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
    const res = await fetch(host + '/auth/login', {
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

async function getTrips() {
    const res = await fetch(host + '/trips', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}


async function searchResults(origin, destination, date) {
    const res = await fetch(host + `/search?origin=${origin}&destination=${destination}&date=${date}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}

async function getTripDetails(id) {
    const res = await fetch(host + `/trips/${id}`, {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}

async function AddToCart(tripId, date, classs, count) {
    const res = await fetch(host + `/cart`, {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tripId: tripId,
            date: date,
            class: classs,
            count: count,
        })
    });
    return await res.json();
}

async function getAllTickets() {
    const res = await fetch(host + `/cart`, {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
    });
    return await res.json();
}

async function removeTicketsFromCart(id) {
    const res = await fetch(host + `/cart/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
    });
    return await res.json();
}

async function getProfile() {
    const res = await fetch(host + `/cart/history`, {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
    });
    return await res.json();
}

export { register, login, getTrips, searchResults, getTripDetails, AddToCart, getAllTickets, removeTicketsFromCart,getProfile };