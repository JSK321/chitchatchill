import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { Card, Form, ListGroup, Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faReply } from '@fortawesome/free-solid-svg-icons'
import "./styles.css"

export default function ChatBox(props) {
    // Theme Context
    const darkTheme = useTheme()
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#CCC',
        color: darkTheme ? '#CCC' : '#333',
    }

    return (
        <Card
            className="chatBox"
            style={themeStyles}
        >
            <Card.Header className="cardHeader">{props.roomName}</Card.Header>
            <ListGroup className="chatDisplay">
                {!props.messages || props.messages < 1 ?
                    <p>No Messages</p>
                    :
                    props.messages.map(data => (
                        <ListGroup.Item
                            key={data.id}
                            className="chatMessage"
                            style={themeStyles}
                        >
                            {/* User Account Name */}
                            <strong>{data.userName}</strong>

                            {/* TimeStamp */}
                            <span className="createdAtTime">
                                {" " + data.createdAt.slice(0, -8) + "at" + " " + data.createdAt.slice(11)}
                            </span>

                            {/* Edit & Reply Icon */}
                            {props.accountName === data.userName ?
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="editIcon"
                                    onClick={props.handleEditMessage}
                                    id={data.id}
                                />
                                :
                                <FontAwesomeIcon
                                    icon={faReply}
                                    className="editIcon"
                                    // onClick={props.handleEditMessage}m
                                    id={data.id}
                                />
                            }
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
                                hidden={true}
                            >
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    className="editChatMessage"
                                    placeholder="Edit message"
                                    name="editMessage"
                                    value={props.editMessage}
                                    onChange={props.handleEditInputChange}
                                    style={themeStyles}
                                />
                                {/* Save Button */}
                                <Button
                                    className="saveBtn"
                                    onClick={props.handleSaveBtn}
                                    size="sm"
                                >
                                    Save
                                </Button>
                                {/* Delete and Cancel Buttons */}
                                <ButtonGroup className="editBtnGroup">
                                    <Button
                                        onClick={props.handleDeleteMessage}
                                        className="CancelOrDelete"
                                        size="sm"
                                        style={{ color: "red" }}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        onClick={props.handleCancelBtn}
                                        className="CancelOrDelete"
                                        size="sm"
                                    >
                                        Cancel
                                    </Button>
                                </ButtonGroup>
                            </Form>

                        </ListGroup.Item>
                    ))
                }
            </ListGroup>

            {/* Send Message Form */}
            <Form
                onSubmit={props.handleSendMessage}
            >
                <Form.Control
                    type="text"
                    placeholder="Message"
                    name="message"
                    value={props.message}
                    onChange={props.handleInputChange}
                    autoComplete="off"
                    style={themeStyles}
                    className="rounded-0"
                />
            </Form>

        </Card>
    );
};