import React from 'react'
import { Container, Card, Form } from 'react-bootstrap'
import "./styles.css"

export default function ChatBox(props) {
    return (
        <Container className="chatBox">
            <Card>
                <Card.Header className="cardHeader">{props.roomName}</Card.Header>
                <Form.Control
                    as="textarea"
                    className="chatDisplay"
                    rows={20}
                    readOnly
                >
                    Hello, this is read only.

                    </Form.Control>
                <Form>
                    <Form.Control
                        type="text"
                        placeholder="Message"
                        name=""
                    />
                </Form>
            </Card>
        </Container>
    )
}
