// React
import React, { useState } from 'react'
// Bootstrap
import { Modal, Form, Button, ListGroup } from 'react-bootstrap'
// Contexts
import { useTheme } from '../../contexts/ThemeContext'
import "./styles.css"

export default function CreateChatModal(props) {
    const [modalShow, setModalShow] = useState(false);

    const handleOnHide = () => setModalShow(false);

    // Theme Context
    const darkTheme = useTheme()
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#CCC',
        color: darkTheme ? '#CCC' : '#333',
    }

    return (
        <>
            <ListGroup.Item
                className="createChatBtn rounded-0"
                style={themeStyles}
                onClick={() => setModalShow(true)}
            >
                Create Chat Room
            </ListGroup.Item>

            <Modal
                show={modalShow}
                onHide={handleOnHide}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title >
                        Create Chatroom
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={props.handleCreateChatRoom}>
                    <Form.Control
                        type="text"
                        placeholder="Chatroom Name"
                        name="roomName"
                        value={props.roomName}
                        onChange={props.handleInputChange}
                    // required
                    />
                    <Button
                        className="modalBtns rounded-0"
                        type="submit"
                        onClick={() => setModalShow(false)}
                    >
                        Create
                    </Button>
                </Form>

            </Modal>
        </>
    );
};
