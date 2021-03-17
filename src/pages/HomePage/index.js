// React
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// API
import API from '../../utils/API';
// Bootstrap
import { Card, Container, ButtonGroup, ListGroup } from 'react-bootstrap'
// Components
import CreateChatModal from '../../components/CreateChatModal'
// Contexts
import { useTheme } from '../../contexts/ThemeContext'
import { useProfile, useProfileData } from '../../contexts/ProfileContext'
// CSS
import "./styles.css"


export default function HomePage(props) {
    const [createChatRoomState, setCreateChatRoomState] = useState({
        roomName: ""
    });

    const [chatRoomState, setChatRoomState] = useState({
        chatRooms: []
    })
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
        getAllChatRooms()
    }, [])

    function getAllChatRooms() {
        API.getAllChatrooms().then(data => {
            setChatRoomState({
                chatRooms: data
            })
        })
    }
    const handleInputChange = event => {
        const { name, value } = event.target;
        setCreateChatRoomState({
            ...chatRoomState,
            [name]: value
        });
    };

    const handleCreateChatRoom = event => {
        event.preventDefault();
        if (profileState.isLoggedIn === true) {
            if (!createChatRoomState.roomName) {
                alert("Chatroom must have a name, please try again.")
            } else {
                API.createChatRoom(profileState.token, {
                    ...createChatRoomState
                }).then(afterCreate => {
                    getAllChatRooms()
                })
            }
        } else {
            alert("Log in to create chat room.")
        };
    };

    return (
        <Container className="homeContainer">
            <Card
                className="homeCard"
                style={themeStyles}
            >
                <Card.Header>
                    Chat Rooms
                </Card.Header>
                <ListGroup>
                    {!chatRoomState.chatRooms || chatRoomState.chatRooms < 1 ?
                        <ListGroup.Item
                            className="chatrooms"
                            style={themeStyles}
                        >
                            No Rooms available
                        </ListGroup.Item>
                        :
                        chatRoomState.chatRooms.map(data => (
                            <ListGroup.Item
                                key={data.id}
                                style={themeStyles}
                                className="chatrooms"
                            >
                                <Link
                                    to={`/${data.roomName}/${data.id}`}
                                >
                                    {data.roomName}
                                </Link>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
                <ButtonGroup vertical className="homeButtons">
                    <CreateChatModal
                        roomName={createChatRoomState.roomName}
                        handleInputChange={handleInputChange}
                        handleCreateChatRoom={handleCreateChatRoom}
                    />
                </ButtonGroup>
            </Card>
        </Container>
    );
};
