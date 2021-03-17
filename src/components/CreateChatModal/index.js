import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import "./styles.css"

export default function CreateChatModal(props) {
    const [modalShow, setModalShow] = useState(false);

    const handleOnHide = () => setModalShow(false);

    function checkChatRoomName() {
        if(props.roomName === "") {
            console.log("here")
        }
    }

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Create Chat Room
            </Button>

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
                        className="modalBtns"
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
