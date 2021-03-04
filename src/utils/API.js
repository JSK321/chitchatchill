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
};

module.exports = API;