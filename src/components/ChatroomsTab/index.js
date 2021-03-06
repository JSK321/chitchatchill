// React
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// API
import API from '../../utils/API';
// Bootstrap
import { Card, ButtonGroup, ListGroup } from 'react-bootstrap'
// Components
import CreateChatModal from '../../components/CreateChatModal'
// Contexts
import { useTheme } from '../../contexts/ThemeContext'
import { useProfile, useProfileData } from '../../contexts/ProfileContext'
// CSS
import "./styles.css"

export default function ChatroomsTab() {
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
        <Card
            className="chatRoomsTabCard rounded-0"
            style={themeStyles}
        >
            <CreateChatModal
                roomName={createChatRoomState.roomName}
                handleInputChange={handleInputChange}
                handleCreateChatRoom={handleCreateChatRoom}
            />
            <ListGroup>
                {!chatRoomState.chatRooms || chatRoomState.chatRooms < 1 ?
                    <ListGroup.Item
                        className="chatroomsTab"
                        style={themeStyles}
                    >
                        No Rooms available
                    </ListGroup.Item>
                    :
                    chatRoomState.chatRooms.map(data => (
                        <ListGroup.Item
                            key={data.id}
                            style={themeStyles}
                            className="chatroomsTab"
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
        </Card>
    );
};
