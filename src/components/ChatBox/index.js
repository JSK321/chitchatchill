import React from 'react'
import { Card, Form, ListGroup, Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import "./styles.css"

export default function ChatBox(props) {

    return (
        <Card className="chatBox">
            <Card.Header className="cardHeader">{props.roomName}</Card.Header>
            <ListGroup className="chatDisplay">
                {!props.messages || props.messages < 1 ?
                    <p>No Messages</p>
                    :
                    props.messages.map(data => (
                        <ListGroup.Item
                            key={data.id}
                            // id={`message${data.id}`}
                            className="chatMessage"
                        >
                            {/* User Account Name */}
                            <strong>{props.accountName}</strong>

                            {/* TimeStamp */}
                            <span className="createdAtTime">
                                {" " + data.createdAt.slice(0, -8) + "at" + " " + data.createdAt.slice(11)}
                            </span>

                            {/* Edit Icon */}
                            <FontAwesomeIcon
                                icon={faEdit}
                                className="editIcon"
                                onClick={props.handleEditMessage}
                                id={data.id}
                            />

                            {/* Chat Message */}
                            <p
                                id={`message${data.id}`}
                            >
                                {data.message}
                            </p>

                            {/* Edit Message Form */}
                            <Form
                                id={`editMessage${data.id}`}
                                className="editForm"
                                hidden="true"
                            >
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    className="editChatMessage"
                                    placeholder="Edit message"
                                    name="editMessage"
                                    value={props.editMessage}
                                    onChange={props.handleEditInputChange}
                                />
                                <Button
                                    className="saveBtn"
                                    onClick={props.handleSaveBtn}
                                    size="sm"
                                >
                                    Save
                                </Button>
                                <Button
                                    className="cancelBtn"
                                    onClick={props.handleCancelBtn}
                                    size="sm"
                                >
                                    Cancel
                                </Button>
                            </Form>

                        </ListGroup.Item>
                    ))
                }
            </ListGroup>

            {/* Send Message Form */}
            <Form
                onSubmit={props.handleSendMessage}
                className="sendMessageInput"
            >
                <Form.Control
                    type="text"
                    placeholder="Message"
                    name="message"
                    value={props.message}
                    onChange={props.handleInputChange}
                    autoComplete="off"
                />
            </Form>

        </Card>
    );
};