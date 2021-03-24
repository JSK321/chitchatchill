import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../../contexts/SocketProvider';
import API from '../../utils/API';
import ChatBox from '../../components/ChatBox';
import ContactsBox from '../../components/ContactsBox';


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
    // Boolean State to indicate new message in chatroom
    const [newMessageState, setNewMessageState] = useState({
        newMessages: []
    });
    // Socket.io
    const socket = useSocket()
    // Param of name and id on chatroom
    const { id } = useParams();
  
    // Find user data and chatroom data on load
    useEffect(() => {
        userData();
        findChatRoom();
        // getAllMessages()
    }, []);
    // Update messages in chatroom on changes
    useEffect(() => {
        function updateMessages() {
            getAllMessages()
        }
        updateMessages()
    }, [newMessageState])

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
            });
        };
    };
    // Function to find chatroom data
    function findChatRoom() {
        API.getOneChatRoomById(id).then(data => {
            setChatRoomState({
                roomName: data.roomName,
                id: data.id
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
        // getAllMessages();
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
        if (chatHistory[0].clientHeight > 0) {
            // updateScroll();
            // console.log(chatHistory)
            // console.log(chatHistory[0].clientHeight)
            // console.log(chatHistory[0].scrollTop)
            // console.log(chatHistory[0].scrollHeight)
            // console.log(chatHistory[0].scrollHeight - chatHistory[0].scrollTop)
            // chatHistory[0].scrollHeight - chatHistory[0].scrollTop
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
        API.updateOneMessage(userState.token, id, editChatState.editMessage).then(res => {
            // getAllMessages();
            // setNewMessageState(true)
        })
        if (editParent.hidden === false) {
            editParent.hidden = true
            message.hidden = false
        };
    }
    // Function to handle cancel button
    const handleCancelBtn = event => {
        event.preventDefault();
        let editGrandParent = event.target.parentNode.parentNode;
        let id = editGrandParent.id.slice(11);
        let message = document.getElementById(`message${id}`);
        if (editGrandParent.hidden === false) {
            editGrandParent.hidden = true
            message.hidden = false
        };
    };
    // Function to post new message in chatroom
    const handleSendMessage = event => {
        event.preventDefault();
        // socket.emit('send-message', )
        API.createMessage(userState.token, chatState).then(res => {
            // getAllMessages();
            let createdMessage = res
            newMessageState.newMessages.push(createdMessage)
            let allMessages = messageState.messages.concat(newMessageState.newMessages)
            setMessageState({
                messages: allMessages
            })
            updateScroll();
            setChatState({
                ...chatState,
                message: ""
            });
            // setNewMessageState(true)
        });
    };
    // Function to delete message in chatroom
    const handleDeleteMessage = event => {
        event.preventDefault();
        let id = event.currentTarget.parentNode.parentNode.parentNode.children[3].id.slice(7);
        API.deleteOneMessage(userState.token, id).then(after => {
            getAllMessages();
            // setNewMessageState(true)
        });
    };

    return (
        <>
            <ContactsBox />
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
                handleDeleteMessage={handleDeleteMessage}
            />
        </>
    );
};
