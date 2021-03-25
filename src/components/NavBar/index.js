import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme, useThemeUpdate } from '../../contexts/ThemeContext'
import { Navbar, Nav, Dropdown, InputGroup } from 'react-bootstrap'
// import "./styles.css"

export default function NavBar() {
    const darkTheme = useTheme()
    const toggleTheme = useThemeUpdate()

    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#CCC',
        color: darkTheme ? '#CCC' : '#333',
    }

    return (
        <Navbar expand="lg-md-sm">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Item>
                        <Link to="/">Home</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="signin">Sign In</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/signup">Sign Up</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <p style={{ cursor: "pointer" }} onClick={toggleTheme}>Toggle Theme</p>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
