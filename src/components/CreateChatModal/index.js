import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import "./styles.css"

export default function CreateChatModal() {
    const [modalShow, setModalShow] = useState(false);

    const handleOnHide = () => setModalShow(false);

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Create Chat
            </Button>

            <Modal
                show={modalShow}
                onHide={handleOnHide}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title >
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Form>
                    <Form.Control type="text" placeholder="Chatroom Name"/>
                    <Button className="modalBtns">Create</Button>
                </Form>

            </Modal>
        </>
    )
}
