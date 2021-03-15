import React, { useState, useRef, useEffect } from 'react'
import SignUpForm from '../../components/SignUpForm'
import API from '../../utils/API';

export default function SignUpPage() {
    const [signUpState, setSignUpState] = useState({
        name: "",
        email: "",
        accountName: "",
        password: "",
        profileImage: ""
    });

    function userSignIn() {
        API.signIn(signUpState).then(newToken => {
            localStorage.setItem('token', newToken.token)
            API.getProfile(newToken.token).then(res => {
                window.location.href="/"
            })
        })
    }

    async function userCreateAndSignIn() {
        const createUser = await API.createNewUser(signUpState)
        await userSignIn(createUser)
    }

    const handleInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setSignUpState({
            ...signUpState,
            [name]: value
        });
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        userCreateAndSignIn()
    };

    return (
        <SignUpForm
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
        />
    );
};
