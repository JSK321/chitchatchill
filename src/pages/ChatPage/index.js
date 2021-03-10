import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../utils/API';
import ChatBox from '../../components/ChatBox';


export default function ChatPage() {
    // useState of chatroom
    const [chatRoomState, setChatRoomState] = useState({
        roomName: "",
        id: ""
    });
    // useState of user info
    const [userState, setUserState] = useState({
        accountName: "",
        id: "",
        token: "",
        profileImage: ""
    });
    // useState of message input
    const [chatState, setChatState] = useState({
        message: "",
        ChatRoomId: ""
    });
    // useState of edit message input
    const [editChatState, setEditChatState] = useState({
        editMessage: "",
        ChatRoomId: ""
    });
    // useState of all messages in chatroom
    const [messageState, setMessageState] = useState({
        messages: []
    });
    // param of id on chatroom
    const { id } = useParams();

    useEffect(() => {
        userData();
        findChatRoom();
    }, []);
    // Function to retrieve user data
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
                setEditChatState({
                    ...editChatState,
                    ChatRoomId: id
                })
            });
        };
    };
    // Function to find chatroom data
    function findChatRoom() {
        API.getOneChatRoom(id).then(data => {
            setChatRoomState({
                roomName: data.roomName,
                id: data.id
            });
        });
        getAllMessages();
    };
    // Function to retrieve all messages in chatroom
    function getAllMessages() {
        API.getAllMessages(id).then(data => {
            setMessageState({
                messages: data
            });
            updateScroll();
        });
    };
    // Function to update scroll on page
    function updateScroll() {
        let chatHistory = document.getElementsByClassName("chatDisplay");
        chatHistory[0].scrollTop = chatHistory[0].scrollHeight;
    };
    // Function to handle input change on message
    const handleInputChange = event => {
        const { name, value } = event.target
        setChatState({
            ...chatState,
            [name]: value
        });
    };
    // Function to handle edit message state
    const handleEditInputChange = event => {
        const { name, value } = event.target
        setEditChatState({
            ...editChatState,
            [name]: value
        })
    }
    // Function to handle edit icon
    const handleEditMessage = event => {
        event.preventDefault();
        let id = event.currentTarget.id
        let message = document.getElementById(`message${id}`)
        let editForm = document.getElementById(`editMessage${id}`)
        let openForm = document.getElementsByClassName('editForm')
        let chatHistory = document.getElementsByClassName("chatDisplay")
        // Check to see if any edit forms are open
        for (let i = 0; i < openForm.length; i++) {
            if (openForm[i].hidden === false) {
                openForm[i].hidden = true
                openForm[i].previousSibling.hidden = false
            }
        }

        if (editForm.hidden === true) {
            editForm.hidden = false
            message.hidden = true
        }
        // console.log(chatHistory[0].scrollTop)
        if (chatHistory[0].scrollTop > 0) {
            updateScroll();
        }

        API.getOneMessage(id).then(data => {
            setEditChatState({
                ...editChatState,
                editMessage: data.message
            })
        })
    };
    // Function to handle save button
    const handleSaveBtn = event => {
        event.preventDefault();
        let editParent = event.target.parentNode;
        let id = editParent.id.slice(11);
        let message = document.getElementById(`message${id}`);
        API.updateOneMessage(userState.token, id, editChatState.editMessage).then(after => {
            getAllMessages();
        })
        if (editParent.hidden === false) {
            editParent.hidden = true
            message.hidden = false
        };
    }
    // Function to handle cancel button
    const handleCancelBtn = event => {
        event.preventDefault();
        let editParent = event.target.parentNode;
        let id = editParent.id.slice(11);
        let message = document.getElementById(`message${id}`);
        if (editParent.hidden === false) {
            editParent.hidden = true
            message.hidden = false
        };
    };
    // Function to post new message in chat room
    const handleSendMessage = event => {
        event.preventDefault();
        API.createMessage(userState.token, chatState).then(after => {
            getAllMessages();
            updateScroll();
            setChatState({
                ...chatState,
                message: ""
            });
        });
    };


    return (
        <ChatBox
            // States
            roomName={chatRoomState.roomName}
            message={chatState.message}
            messages={messageState.messages}
            editMessage={editChatState.editMessage}
            accountName={userState.accountName}
            // Handle Events
            handleInputChange={handleInputChange}
            handleEditMessage={handleEditMessage}
            handleSaveBtn={handleSaveBtn}
            handleCancelBtn={handleCancelBtn}
            handleSendMessage={handleSendMessage}
            handleEditInputChange={handleEditInputChange}
        />
    );
};
