// React
import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// Bootstrap
import { Card, ListGroup } from 'react-bootstrap'
// Components

// Contexts
import { useTheme } from '../../contexts/ThemeContext'
// CSS
import "./styles.css"
import API from '../../utils/API'

export default function ContactsTab() {

    const [contactState, setContactState] = useState({
        contacts: []
    })

    // Theme Context
    const darkTheme = useTheme()
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#CCC',
        color: darkTheme ? '#CCC' : '#333',
    }

    useEffect(() => {
        getContacts()
    }, [])

    function getContacts() {
        const token = localStorage.getItem('token')
        if (token != null) {
            API.getAllContacts(token).then(res => {
                setContactState({
                    contacts: res
                })
            })
        }
    }

    return (
        <Card
            className="rounded-0"
            style={themeStyles}
        >
            <ListGroup>
                {!contactState.contacts|| contactState.contacts < 1 ?
                    <ListGroup.Item
                        className="contactsLI"
                        style={themeStyles}
                    >
                        Contacts unavailable
                    </ListGroup.Item>
                    :
                    contactState.contacts.map(data => (
                        <ListGroup.Item
                            key={data.id}
                            className="contactsLI"
                            style={themeStyles}
                        >
                            {data.accountName}
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </Card>
    )
}
