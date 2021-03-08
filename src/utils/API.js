const URL_PREFIX = "http://localhost:8080"
// const URL_PREFIX = ""

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
    // Get One Chat Room by Id Function
    getOneChatRoom: function(id) {
        return fetch(`${URL_PREFIX}/api/chatrooms/${id}`, {
        }).then(res => res.json()).catch(err => console.log(err))
    },
    // Get All Chat Rooms Function
    getAllChatrooms: function () {
        return fetch (`${URL_PREFIX}/api/chatrooms`, {
        }).then(res => res.json()).catch(err => console.log(err))
    },
    // Get All Messages in Chat Function
    getAllMessages: function(id) {
        return fetch(`${URL_PREFIX}/api/chitchats/${id}`, {
        }).then(res =>  res.json()).catch(err => console.log(err))
    },
    // Get One Message in Chat Function
    getOneMessage: function(id){
        return fetch(`${URL_PREFIX}/api/chitchats/message/${id}`, {
        }).then(res =>  res.json()).catch(err => console.log(err))
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
    createMessage: function(token, data) {
        return fetch(`${URL_PREFIX}/api/chitchats`, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then(res => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error("Something went wrong");
            }
        }).catch(err => console.log(err))
    },
};

module.exports = API;