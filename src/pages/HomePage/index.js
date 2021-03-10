import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Container, ButtonGroup, ListGroup } from 'react-bootstrap'
import CreateChatModal from '../../components/CreateChatModal'
import API from '../../utils/API';
import "./styles.css"

export default function HomePage(props) {
    const [chatRoomState, setChatRoomState] = useState({
        roomName: ""
    });

    const [roomState, setRoomState] = useState({
        chatRooms: []
    })

    useEffect(() => {
        getAllChatRooms()
    }, [])


    function getAllChatRooms() {
        API.getAllChatrooms().then(data => {
            setRoomState({
                chatRooms: data
            })
        })
    }
    const handleInputChange = event => {
        const { name, value } = event.target;
        setChatRoomState({
            ...chatRoomState,
            [name]: value
        });
    };

    const handleCreateChatRoom = event => {
        event.preventDefault();
        if (props.profile.isLoggedIn === true) {
            API.createChatRoom(props.profile.token, {
                ...chatRoomState
            }).then(afterCreate => {
                window.location.reload()
            })
        };
    };

    return (
        <Container className="homeContainer">
            <Card className="homeCard">
                <Card.Header>Chat Rooms</Card.Header>
                <ListGroup>
                    {!roomState.chatRooms || roomState.chatRooms < 1 ?
                        <ListGroup.Item>No Rooms available</ListGroup.Item>
                        :
                        roomState.chatRooms.map(data => (
                            <ListGroup.Item>
                                <Link
                                    to={`/${data.roomName}/${data.id}`}
                                    key={data.id}
                                >
                                    {data.roomName}
                                </Link>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
                <ButtonGroup vertical className="homeButtons">
                    <CreateChatModal
                        roomName={chatRoomState.roomName}
                        handleInputChange={handleInputChange}
                        handleCreateChatRoom={handleCreateChatRoom}
                    />
                </ButtonGroup>
            </Card>
        </Container>
    );
};
