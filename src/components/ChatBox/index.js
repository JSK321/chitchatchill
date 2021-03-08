import React from 'react'
import { Container, Card, Form, ListGroup } from 'react-bootstrap'
import "./styles.css"

export default function ChatBox(props) {
    // props.messages.map(data => {
    //     console.log(data.message)
    // })

    return (
        <Container className="chatBox">
            <Card>
                <Card.Header className="cardHeader">{props.roomName}</Card.Header>
                <Card.Body
                    className="chatDisplay"
                >

                    {!props.messages || props.messages < 1 ?
                        <p>No Messages</p>
                        :
                        props.messages.map(data => (
                            <div
                                key={data.id}
                                id={data.id}
                            >
                                <strong>{props.accountName}</strong>
                                <br></br>
                                {data.message}
                            </div>
                        ))
                    }

                </Card.Body>
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
        </Container >
    )
}