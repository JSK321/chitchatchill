// React
import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// Bootstrap
import { Card, ListGroup, Tab, Row, Col } from 'react-bootstrap'
// Components
import ContactsTab from '../../components/ContactsTab'
import ChatroomsTab from '../../components/ChatroomsTab'
import SearchFriends from '../../components/SearchFriends'
// Contexts
import { useTheme } from '../../contexts/ThemeContext'
import { useProfile, useProfileData } from '../../contexts/ProfileContext'
// CSS
import "./styles.css"

export default function HomePage() {
    // Tab Title State
    const [tabState, setTabState] = useState('Friends')
    // Profile Context
    const profileState = useProfile()
    const profileData = useProfileData()
    // Theme Context
    const darkTheme = useTheme()
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#CCC',
        color: darkTheme ? '#CCC' : '#333',
    }

    useEffect(() => {
        profileData()
    }, [])

    const handleTabSelect = event => {
        event.preventDefault();
        setTabState(event.target.name)
    }

    return (
        <Card
            className="homeCard rounded-0"
            style={themeStyles}
        >
            <Card.Header style={{ textAlign: "center" }}>
                {tabState}
            </Card.Header>
            <Tab.Container defaultActiveKey="#link1">
                <Row>
                    <Col>
                        <Tab.Content>
                            <Tab.Pane eventKey="#link1">
                                <ContactsTab />
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link2">
                                <ChatroomsTab />
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link3">
                                <SearchFriends />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
                <ListGroup horizontal className="homeTabs">
                    <ListGroup.Item
                        action href="#link1"
                        className="rounded-0"
                        style={themeStyles}
                        name="Friends"
                        onClick={handleTabSelect}
                    >
                        Friends
                    </ListGroup.Item>

                    <ListGroup.Item
                        action href="#link2"
                        className="rounded-0"
                        style={themeStyles}
                        name="Messages"
                        onClick={handleTabSelect}
                    >
                        Messages
                     </ListGroup.Item>

                    <ListGroup.Item
                        action href="#link3"
                        className="rounded-0"
                        style={themeStyles}
                        name="Add Friend"
                        onClick={handleTabSelect}
                    >
                        Add Friend
                     </ListGroup.Item>
                </ListGroup>
            </Tab.Container>
        </Card>
    )
}

