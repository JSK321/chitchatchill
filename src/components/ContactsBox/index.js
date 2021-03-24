// React
import React, { } from 'react'
// import { Link } from 'react-router-dom'
// Bootstrap
import { Dropdown } from 'react-bootstrap'
// CSS
import "./styles.css"

export default function ContactsBox() {
    return (
        <Dropdown className="contactsBox">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
            </Dropdown.Toggle>
            <Dropdown.Menu>
                Hello
            </Dropdown.Menu>
        </Dropdown>
    )
}
