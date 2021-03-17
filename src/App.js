// React
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Components
import NavBar from './components/NavBar'
// Contexts
import { ThemeProvider } from './contexts/ThemeContext'
import { ProfileProvider } from './contexts/ProfileContext'
// import { SocketProvider } from './contexts/SocketProvider'
// Pages
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

function App() {

  return (
    <ProfileProvider>

      <ThemeProvider>

        {/* <SocketProvider id={profileState.token}> */}
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomePage

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
        {/* </SocketProvider> */}

      </ThemeProvider>

    </ProfileProvider>
  );
}

export default App;
