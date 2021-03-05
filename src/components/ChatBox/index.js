import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Card, Form } from 'react-bootstrap'
import "./styles.css"
import API from '../../utils/API';

export default function ChatBox(props) {
    const [chatRoomState, setChatRoomState] = useState({
        roomName: "",
        id: ""
    })

    const [chatState, setChatState] = useState({
        message: "",
        id: "",
        ChatRoomId: "",
        UserId: ""
    })

    const [userState, setUserState] = useState({
        accountName: "",
        id: "",
        profileImage: ""
    })

    const { roomName } = useParams();
    const { id } = useParams();

    useEffect(() => {
        findChatRoom()
    }, [])

    function userData() {
        setUserState({
            accountName: props.profile.accountName,
            id: props.profile.id,
            profileImage: props.profile.profileImage
        })
    }

    function findChatRoom() {
        API.getOneChatRoom(id).then(data => {
            setChatRoomState({
                roomName: data.roomName,
                id: data.id
            })
            setChatState({
                ...chatState,
                ChatRoomId: data.id,
                UserId: ""
            })
        })
    }

    return (
        <Container className="chatBox">
            <Card>
                <Card.Header className="cardHeader">{chatRoomState.roomName}</Card.Header>
                <Form.Control
                    as="textarea"
                    className="chatDisplay"
                    rows={20}
                    readOnly
                >
                    Hello, this is read only.

                    </Form.Control>
                <Form>
                    <Form.Control 
                    type="text" 
                    placeholder="Message" 
                    name=""
                    />
                </Form>
            </Card>
        </Container>
    )
}
