const baseUrl = 'https://baas.kinvey.com';
const appKey = "kid_ByvP9HaWG"; // APP KEY HERE;
const appSecret = "14baeedc0c084857bedcbe3ec8bbbf8d"; // APP SECRET HERE;

// AUTH URLs
const registerUrl = `${baseUrl}/user/${appKey}`;
const loginUrl = `${baseUrl}/user/${appKey}/login`;
// const logoutUrl = `${baseUrl}/user/${appKey}/_logout`;
const userDetails = `${baseUrl}/user/${appKey}?query={"username":"${localStorage.getItem('username')}"}`;

// POSTS URLs
const postsUrl = `${baseUrl}/appdata/${appKey}/posts`;
const listAllPostUrl = `${baseUrl}/appdata/${appKey}/posts?query={}&sort={"_kmd.ect": -1}`;
const listMostViewedUrl = `${baseUrl}/appdata/${appKey}/posts?query={}&sort={"counter": -1}&limit=6`;
const categoriesCollectionUrl = `${baseUrl}/appdata/${appKey}/categories`;
const postsByCategoryUrl = `${baseUrl}/appdata/${appKey}/posts?query=`;

// COMMENTS URLs
const postCommentUrl = `${baseUrl}/appdata/${appKey}/comments`;
const getAllCommentsUrl = `${baseUrl}/appdata/${appKey}/comments?query=`;


// AUTH REQUESTS
async function register(username, password, role, avatar) {
    const res = await fetch(`${registerUrl}`, {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            role: role,
            avatar: avatar
        })
    });
    return await res.json();
}

async function login(username, password) {

    const res = await fetch(`${loginUrl}`, {
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


// GET REQUESTS
async function getUserDetails() {
    const res = await fetch(`${userDetails}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function getCategories() {
    const res = await fetch(`${categoriesCollectionUrl}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function getAllPosts() {
    const res = await fetch(`${listAllPostUrl}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function getMostViewedPosts() {
    const res = await fetch(`${listMostViewedUrl}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function getPostDetails(id) {
    const res = await fetch(`${postsUrl}/${id}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function getCommentsOfPost(postId) {
    const res = await fetch(`${getAllCommentsUrl}{"postId":"${postId}"}&sort={"_kmd.ect": -1}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function getPostsByCategory(category) {
    const res = await fetch(`${postsByCategoryUrl}{"category": "${category}"}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}


// POST REQUESTS
async function postUpload(title, image, category, description, creator, counter) {
    const res = await fetch(`${postsUrl}`, {
        method: 'POST',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            image: image,
            category: category,
            description: description,
            creator: creator,
            counter: counter,
        })
    });
    return await res.json();
}

async function postComment(username, comment, postId, userAvatar) {
    const res = await fetch(`${postCommentUrl}`, {
        method: 'POST',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            comment: comment,
            postId: postId,
            userAvatar: userAvatar
        })
    });
    return await res.json();
}


// PUT REQUESTS
async function editProfile(id,avatar) {
    const res = await fetch(`${registerUrl}/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatar
        })
    });
    return await res.json();
}


// DELETE REQUESTS
async function deletePost(postId) {
    const res = await fetch(`${postsUrl}/${postId}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function deleteComment(postId) {
    const res = await fetch(`${postCommentUrl}/${postId}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}

async function deleteCommentsOfPost(postId) {
    const res = await fetch(`${postCommentUrl}/?query={"postId":"${postId}"}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
    });
    return await res.json();
}


export {
    register,
    login,
    getUserDetails,
    getCategories,
    getAllPosts,
    getMostViewedPosts,
    getPostsByCategory,
    postUpload,
    getPostDetails,
    getCommentsOfPost,
    postComment,
    deleteComment,
    deletePost,
    deleteCommentsOfPost,
    editProfile
};