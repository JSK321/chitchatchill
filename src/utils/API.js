const URL_PREFIX = "http://localhost:8080"
// const URL_PREFIX = ""
// const socket = io(`${URL_PREFIX}`);

const API = {
    // Sign In Function
    signIn: function (userData) {
        return fetch(`${URL_PREFIX}/api/users/signin`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(res => res.json()).catch(err => console.log(err));
    },
    // Get Profile Function
    getProfile: function (token) {
        return fetch(`${URL_PREFIX}/api/users/secretProfile`, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => res.json()).catch(err => console.log(err))
    },
    // Get All Profile Function
    getAllProfile: function () {
        return fetch(`${URL_PREFIX}/api/users`, {
        }).then(res => res.json()).catch(err => console.log(err))
    },
    // Get One Profile Function
    getOneProfile: function (accountName) {
        return fetch(`${URL_PREFIX}/api/users/${accountName}`, {
        }).then(res => res.json()).catch(err => console.log(err))
    },
    // Get One Chat Room by Id Function
    getOneChatRoom: function (id) {
        return fetch(`${URL_PREFIX}/api/chatrooms/${id}`, {
        }).then(res => res.json()).catch(err => console.log(err))
    },
    // Get All Chat Rooms Function
    getAllChatrooms: function () {
        return fetch(`${URL_PREFIX}/api/chatrooms`, {
        }).then(res => res.json()).catch(err => console.log(err))
    },
    // Get All Messages in Chat Function
    getAllMessages: function (id) {
        return fetch(`${URL_PREFIX}/api/chitchats/chatRoom/${id}`, {
        }).then(res => res.json()).catch(err => console.log(err))
    },
    // Get One Message in Chat Function
    getOneMessage: function (id) {
        return fetch(`${URL_PREFIX}/api/chitchats/message/${id}`, {
        }).then(res => res.json()).catch(err => console.log(err))
    },
    // Create New User Function
    createNewUser: function (data) {
        return fetch(`${URL_PREFIX}/api/users`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else if (res.status === 409) {
                alert("Account name/Email is already in use.")
            } else {
                alert("Account name/Email is already in use.")
                throw new Error("Something went wrong")
            }
        }).catch(err => null)
    },
    // Create Chat Room Function
    createChatRoom: function (token, data) {
        return fetch(`${URL_PREFIX}/api/chatrooms`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("Something went wrong")
            }
        }).catch(err => console.log(err))
    },
    // Create Message Function
    createMessage: function (token, data) {
        return fetch(`${URL_PREFIX}/api/chitchats`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("Something went wrong");
            }
        }).catch(err => console.log(err))
    },
    // Update Specific Message Function
    updateOneMessage: function (token, id, data) {
        return fetch(`${URL_PREFIX}/api/chitchats/message/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: data
            })
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("Something went wrong")
            }
        }).catch(err => console.log(err))
    },
    // Delete Specific Message Function
    deleteOneMessage: function (token, id) {
        return fetch(`${URL_PREFIX}/api/chitchats/message/${id}`, {
            method: "DELETE",
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                console.log(res.statusText);
            } else {
                throw new Error("Something went wrong");
            }
        }).catch(err => console.log(err));
    },
};

module.exports = API;