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
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faUserPlus, faCommentAlt, faCog } from '@fortawesome/free-solid-svg-icons'

export default function HomePage() {
    // Tab Title State
    const [tabState, setTabState] = useState('Messages')
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
        setTabState(event.currentTarget.name)
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
                                <ChatroomsTab />
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link2">
                                <ContactsTab />
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link3">
                                <SearchFriends />
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link4">
                                Settings
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
                <ListGroup horizontal className="homeTabs">
                    <ListGroup.Item
                        action href="#link1"
                        className="homeTabIcons rounded-0"
                        style={themeStyles}
                        name="Messages"
                        onClick={handleTabSelect}
                    >
                        <FontAwesomeIcon icon={faCommentAlt} name="Messages"/>
                    </ListGroup.Item>

                    <ListGroup.Item
                        action href="#link2"
                        className="homeTabIcons rounded-0"
                        style={themeStyles}
                        name="Friends"
                        onClick={handleTabSelect}
                    >
                        <FontAwesomeIcon icon={faUserFriends} name="Friends"/>
                    </ListGroup.Item>

                    <ListGroup.Item
                        action href="#link3"
                        className="homeTabIcons rounded-0"
                        style={themeStyles}
                        name="Add Friend"
                        onClick={handleTabSelect}
                    >
                        <FontAwesomeIcon icon={faUserPlus} name="Add Friend"/>
                    </ListGroup.Item>
                    <ListGroup.Item
                        action href="#link4"
                        className="homeTabIcons rounded-0"
                        style={themeStyles}
                        name="Settings"
                        onClick={handleTabSelect}
                    >
                        <FontAwesomeIcon icon={faCog} name="Settings"/>
                    </ListGroup.Item>
                </ListGroup>
            </Tab.Container>
        </Card>
    )
}

