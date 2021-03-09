import React from 'react'
import { Card, Form, ListGroup } from 'react-bootstrap'
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
                            id={data.id}
                            className="chatMessage"
                        >
                            <strong>{props.accountName}</strong>
                            <span className="createdAtTime">
                                {" " + data.createdAt.slice(0, -8) + "at" + " " + data.createdAt.slice(11)}
                            </span>
                            <br></br>
                            {data.message}
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
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