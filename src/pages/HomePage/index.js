// React
import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
// Bootstrap
import { Card, ListGroup, Tab, Row, Col } from 'react-bootstrap'
// Components
import ChatroomsTab from '../../components/ChatroomsTab'
import SearchFriends from '../../components/SearchFriends'
// Contexts
import { useTheme } from '../../contexts/ThemeContext'
import { useProfile, useProfileData } from '../../contexts/ProfileContext'
// CSS
import "./styles.css"

export default function ContactsTab() {
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

    return (
        <Card
            className="homeCard rounded-0"
            style={themeStyles}
        >
            <Card.Header style={{ textAlign: "center" }}>
                Title
            </Card.Header>
            <Tab.Container defaultActiveKey="#link1">
                <Row>
                    <Col>
                        <Tab.Content>
                            <Tab.Pane eventKey="#link1">
                                <ListGroup.Item>
                                    Hello
                                </ListGroup.Item>
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
                    <ListGroup.Item action href="#link1" className="rounded-0" style={themeStyles}>
                        Friends
                    </ListGroup.Item>
                    <ListGroup.Item action href="#link2" className="rounded-0" style={themeStyles}>
                        Chatrooms
                     </ListGroup.Item>
                    <ListGroup.Item action href="#link3" className="rounded-0" style={themeStyles}>
                        Add Friend
                     </ListGroup.Item>
                </ListGroup>
            </Tab.Container>
        </Card>
    )
}

