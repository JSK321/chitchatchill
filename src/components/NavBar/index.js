import React from 'react'
import {Navbar, Nav, NavDropdown } from 'react-bootstrap'
import "./styles.css"

export default function NavBar() {
    return (
            <Navbar expand="lg" className="NavBar">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Brand href="/login">Log In</Navbar.Brand>
                <Navbar.Brand href="/login">Sign In</Navbar.Brand>
            </Navbar>
    )
}


