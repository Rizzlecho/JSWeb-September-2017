const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_ryz1ZR6yM';
const appSecret = '0a07671399c145cda81ccb52424cb8c3';

async function register(username, password, subscriptions) {
    const res = await fetch(`${baseUrl}/user/${appKey}`, {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            subscriptions: subscriptions
        })
    });
    return await res.json();
}

async function login(username, password) {
    const res = await fetch(`${baseUrl}/user/${appKey}/login`, {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    return await res.json();
}

async function getAllChirps() {
    const subscriptions = localStorage.getItem('subscriptions');
    let subsArray = [];
    subscriptions.split(',').forEach(s => subsArray.push(s));
    const endpoint = `chirps?query={"author":{"$in": [${subsArray.map(e => `"${e}"`)}]}}&sort={"_kmd.ect": 1}`;

    const res = await fetch(`${baseUrl}/appdata/${appKey}/${endpoint}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function createChirp(text) {
    const res = await fetch(`${baseUrl}/appdata/${appKey}/chirps`, {
        method: 'POST',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: text,
            author: localStorage.getItem('username')
        })
    });
    return await res.json();
}

async function listMyChirps() {
    const endpoint = `chirps?query={"author":"${localStorage.getItem('username')}"}&sort={"_kmd.ect": 1}`;

    const res = await fetch(`${baseUrl}/appdata/${appKey}/${endpoint}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function countChirps() {
    const endpoint = `chirps?query={"author":"${localStorage.getItem('username')}"}`;
    const res = await fetch(`${baseUrl}/appdata/${appKey}/${endpoint}`,{
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}
async function countFollowing() {
    const endpoint = `?query={"username":"${localStorage.getItem('username')}"}`;
    const res = await fetch(`${baseUrl}/user/${appKey}/${endpoint}`,{
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function countFollowers() {
    const endpoint = `?query={"subscriptions":"${localStorage.getItem('username')}"}`;
    const res = await fetch(`${baseUrl}/user/${appKey}/${endpoint}`,{
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function deleteChirp(id) {
    const res = await fetch(`${baseUrl}/appdata/${appKey}/chirps/${id}`,{
        method: 'DELETE',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await window.location.reload();
}

async function listAllUsers() {
    const res = await fetch(`${baseUrl}/user/${appKey}`,{
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function listUserChirps(username) {
    const endpoint = `chirps?query={"author":"${username}"}&sort={"_kmd.ect": 1}`;

    const res = await fetch(`${baseUrl}/appdata/${appKey}/${endpoint}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}
async function countUserChirps(username) {
    const endpoint = `chirps?query={"author":"${username}"}`;
    const res = await fetch(`${baseUrl}/appdata/${appKey}/${endpoint}`,{
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}
async function countUserFollowing(username) {
    const endpoint = `?query={"username":"${username}"}`;
    const res = await fetch(`${baseUrl}/user/${appKey}/${endpoint}`,{
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function countUserFollowers(username) {
    const endpoint = `?query={"subscriptions":"${username}"}`;
    const res = await fetch(`${baseUrl}/user/${appKey}/${endpoint}`,{
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function followUser(username){
    const currentUser = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const subscriptions = localStorage.getItem('subscriptions');
    let subsArray = [];

    subscriptions.split(',').forEach(s => subsArray.push(s));
    subsArray.push(username);
    localStorage.setItem('subscriptions', subsArray.join(','));
    const res = await fetch(`${baseUrl}/user/${appKey}/${userId}`, {
        method: 'PUT',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subscriptions:subsArray
        })
    });
    return res.json();

}

async function unfollowUser(username) {
    console.log('unfollowing');
    console.log(username);
    const currentUser = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const subscriptions = localStorage.getItem('subscriptions');
    let subsArray = [];

    subscriptions.split(',').forEach(s => subsArray.push(s));
    subsArray = [...subsArray.slice(0, subsArray.indexOf(username) ), ...subsArray.slice(subsArray.indexOf(username) + 1)];
    console.log(subsArray);
    localStorage.setItem('subscriptions', subsArray.join(','));

    const res = await fetch(`${baseUrl}/user/${appKey}/${userId}`, {
        method: 'PUT',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subscriptions:subsArray
        })
    });
    return res.json();
}

export {register, login, getAllChirps, createChirp, listMyChirps, countChirps, countFollowing, countFollowers, deleteChirp, listAllUsers, listUserChirps, countUserChirps, countUserFollowers, countUserFollowing, followUser, unfollowUser}