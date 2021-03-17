import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme, useThemeUpdate } from '../../contexts/ThemeContext'
import { Navbar, Nav, NavDropdown, Button, Form } from 'react-bootstrap'
import "./styles.css"

export default function NavBar(props) {
    const darkTheme = useTheme()
    const toggleTheme = useThemeUpdate()

    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#CCC',
        color: darkTheme ? '#CCC' : '#333',
    }

    return (
        <Navbar expand="lg" className="NavBar" style={themeStyles}>
            <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
            <Navbar.Brand><Link to="signin">Sign In</Link></Navbar.Brand>
            <Navbar.Brand><Link to="/signup">Sign Up</Link></Navbar.Brand>
            
            <Navbar.Text style={{color:"slateblue"}}>
                <Form.Check type="checkbox" label="Toggle" onClick={toggleTheme} />
            </Navbar.Text>

        </Navbar>
    )
}


