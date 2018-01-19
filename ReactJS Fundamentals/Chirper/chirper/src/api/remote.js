const host = 'https://baas.kinvey.com';
const appKey = 'kid_ryz1ZR6yM';
const appSecret = '0a07671399c145cda81ccb52424cb8c3';

async function register(username, password, subscriptions) {
    const res = await fetch(host + '/user/' + appKey, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`${appKey}:${appSecret}`),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            subscriptions
        })
    });
    return await res.json();
}

async function login(username, password) {
    const res = await fetch(host + `/user/${appKey}/login`, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`${appKey}:${appSecret}`),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });
    return await res.json();
}


async function listMyChirps() {
    const endpoint = `chirps?query={"author":"${localStorage.getItem('username')}"}&sort={"_kmd.ect": 1}`;

    const res = await fetch(`${host}/appdata/${appKey}/${endpoint}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('authToken')
        }
    });
    return await res.json();
}

async function createChirp(author,text) {
    const res = await fetch(host + `/appdata/${appKey}/chirps`, {
        method: 'POST',
        headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('authToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: author,
            text:text
        })
    });
    return await res.json();
}

async function listAllChirpsFromSubscriptions() {
    const subscriptions = localStorage.getItem('subscriptions');
    
    let subsArray = [];
    subscriptions.split(',').forEach(s => subsArray.push(s));
    const endpoint = `chirps?query={"author":{"$in": [${subsArray.map(e => `"${e}"`)}]}}&sort={"_kmd.ect": 1}`;

    const res = await fetch(`${host}/appdata/${appKey}/${endpoint}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('authToken')
        }
    });
    return await res.json();
}


function calcTime(dateIsoFormat) {
    let diff = new Date - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);
    function pluralize(value) {
        if (value !== 1) return 's';
        else return '';
    }
}


export { register, login, listAllChirpsFromSubscriptions, createChirp, listMyChirps, calcTime };