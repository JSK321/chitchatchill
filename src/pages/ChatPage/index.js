import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../utils/API';
import ChatBox from '../../components/ChatBox'

export default function ChatPage() {
    const [chatRoomState, setChatRoomState] = useState({
        roomName: "",
        id: ""
    });

    const [userState, setUserState] = useState({
        accountName: "",
        id: "",
        token: "",
        profileImage: ""
    });

    const [chatState, setChatState] = useState({
        message: "",
        ChatRoomId: ""
    });

    const [messageState, setMessageState] = useState({
        messages: []
    })

    const { id } = useParams();
    const { chatRoom } = useParams();

    useEffect(() => {
        userData();
        findChatRoom();
    }, []);

    function userData() {
        const token = localStorage.getItem("token");
        if (localStorage.getItem('token') !== null) {
            API.getProfile(token).then(data => {
                setUserState({
                    accountName: data.accountName,
                    id: data.id,
                    token: token,
                    profileImage: data.profileImage
                });
                setChatState({
                    ...chatState,
                    ChatRoomId: id
                });
            });
        };
    };

    function findChatRoom() {
        API.getOneChatRoom(id).then(data => {
            setChatRoomState({
                roomName: data.roomName,
                id: data.id
            });
        });
        getAllMessages()
    };

    function getAllMessages() {
        API.getAllMessages(id).then(data => {
            setMessageState({
                messages: data
            })
            updateScroll()
        })
    }

    function updateScroll() {
        let chatHistory = document.getElementsByClassName("chatDisplay");
        chatHistory[0].scrollTop = chatHistory[0].scrollHeight
    }

    const handleInputChange = event => {
        const { name, value } = event.target
        setChatState({
            ...chatState,
            [name]: value
        });
    };

    const handleSendMessage = event => {
        event.preventDefault();
        API.createMessage(userState.token, chatState).then(after => {
            getAllMessages()
            updateScroll()
            setChatState({
                ...chatState,
                message: ""
            })
        })
    };

    
    return (
        <ChatBox
            roomName={chatRoomState.roomName}
            message={chatState.message}
            messages={messageState.messages}
            accountName={userState.accountName}
            handleInputChange={handleInputChange}
            handleSendMessage={handleSendMessage}
        />
    );
};
