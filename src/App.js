import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import API from './utils/API'
import 'bootstrap/dist/css/bootstrap.min.css';
// Components
import NavBar from './components/NavBar'
import ChatBox from './components/ChatBox'
// Pages
import SignInPage from './pages/SignInPage'
import HomePage from './pages/HomePage'

function App() {

  const [profileState, setProfileState] = useState({
    firstName: "",
    lastName: "",
    accountName: "",
    email: "",
    password: "",
    profileImage: "",
    token: "",
    id: "",
    isLoggedIn: false
  });

  useEffect(() => {
    fetchUserData()
  }, []);

  function fetchUserData() {
    const token = localStorage.getItem("token");
    if (localStorage.getItem('token') !== null) {
      API.getProfile(token).then(profileData => {
        if (profileData) {
          setProfileState({
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            accountName: profileData.accountName,
            email: profileData.email,
            profileImage: profileData.profileImage,
            token: token,
            id: profileData.id,
            isLoggedIn: true
          });
        } else {
          setProfileState({
            firstName: "",
            lastName: "",
            accountName: "",
            email: "",
            password: "",
            profileImage: "",
            token: "",
            id: "",
            isLoggedIn: false
          })
        }
      });
    };
  };

  return (
    <Router>
      <NavBar />

      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/chatbox">
          <ChatBox />
        </Route>
        <Route exact path="/signin">
          <SignInPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
