// React
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
// API
import API from '../../utils/API'
// Bootstrap
import { Card, ListGroup } from 'react-bootstrap'
// Components

// Contexts
import { useProfile } from '../../contexts/ProfileContext'
import { useTheme } from '../../contexts/ThemeContext'
// CSS
import "./styles.css"
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'

export default function ContactsTab() {
    const [contactState, setContactState] = useState({
        contacts: []
    })
    const contactRef = useRef()
    // Profile Context
    const profileState = useProfile()
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

    const handleDM = event => {
        event.preventDefault();
        let DM = contactRef.current.innerText
        API.getOneChatRoomByName(DM).then(data => {
            if (data) {
                window.location.href = `/${DM}/${data.id}`
            } else if (!data) {
                if (profileState.isLoggedIn === true) {
                    API.createChatRoom(profileState.token, {
                        roomName: DM,
                        isPrivate: true,
                        dmByUser: profileState.accountName,
                        dmByUserId: profileState.id
                    }).then(data => {
                        window.location.href = `/${DM}/${data.id}`
                    })
                }
            }
        })
    }

    return (
        <Card
            className="rounded-0"
            style={themeStyles}
        >
            <ListGroup>
                {!contactState.contacts || contactState.contacts < 1 ?
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
                            ref={contactRef}
                        >
                            {data.accountName}
                            <FontAwesomeIcon
                                icon={faComments}
                                className="dmIcon"
                                onClick={handleDM}
                            />
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </Card>
    )
}
