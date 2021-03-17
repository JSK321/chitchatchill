import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import API from './utils/API'
import 'bootstrap/dist/css/bootstrap.min.css';
// Components
import NavBar from './components/NavBar'
// Contexts
import ThemeProvider from './contexts/ThemeContext'
import { SocketProvider } from './contexts/SocketProvider'
// Pages
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  const [profileState, setProfileState] = useState({
    name: "",
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
            name: profileData.name,
            accountName: profileData.accountName,
            email: profileData.email,
            profileImage: profileData.profileImage,
            token: token,
            id: profileData.id,
            isLoggedIn: true
          });
        } else {
          setProfileState({
            name: "",
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
    <ThemeProvider>

      <SocketProvider id={profileState.token}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomePage
                profile={profileState}
              />
            </Route>
            <Route exact path="/:chatRoom/:id">
              <ChatPage

              />
            </Route>
            <Route exact path="/signin">
              <SignInPage

              />
            </Route>
            <Route exact path="/signup">
              <SignUpPage

              />
            </Route>
          </Switch>
        </Router>
      </SocketProvider>

    </ThemeProvider>
  );
}

export default App;
