import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import "./styles.css"

export default function SignInForm(props) {
    return (
        <Card className="signInForm">
            <Form onSubmit={props.handleFormSubmit}>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={props.handleInputChange}
                    required
                />

                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={props.handleInputChange}
                    required
                />

                <Button
                    type="submit"
                >
                    Sign In
                </Button>
            </Form>
        </Card>
    )
}
