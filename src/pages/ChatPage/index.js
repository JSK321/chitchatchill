import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../utils/API';
import ChatBox from '../../components/ChatBox'

export default function ChatPage() {
    const [chatRoomState, setChatRoomState] = useState({
        roomName: "",
        id: ""
    })

    const [userState, setUserState] = useState({
        accountName: "",
        id: "",
        profileImage: ""
    })

    const [chatState, setChatState] = useState({
        message: "",
        id: "",
        ChatRoomId: "",
        UserId: ""
    })

    const { roomName } = useParams();
    const { id } = useParams();

    useEffect(() => {
        userData()
        findChatRoom()
    }, [])

    function userData() {
        const token = localStorage.getItem("token");
        if (localStorage.getItem('token') !== null) {
            API.getProfile(token).then(data => {
                setUserState({
                    accountName: data.accountName,
                    id: data.id,
                    profileImage: data.profileImage
                })
                setChatState({
                    ...chatState,
                    UserId: data.id
                })
            })
        }
    }

    function findChatRoom() {
        API.getOneChatRoom(id).then(data => {
            setChatRoomState({
                roomName: data.roomName,
                id: data.id
            })
        })
    }
    return (
        <ChatBox 
            roomName={chatRoomState.roomName}
        />
    )
}
