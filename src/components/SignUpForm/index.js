import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

export default function SignUpForm(props) {
    return (
        <Card className="signInForm">
            <Form onSubmit={props.handleFormSubmit}>
                <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={props.handleInputChange}
                    // required
                />
                <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={props.handleInputChange}
                    // required
                />
                <Form.Control
                    type="text"
                    placeholder="Account Name"
                    name="accountName"
                    onChange={props.handleInputChange}
                    // required
                />
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={props.handleInputChange}
                    // required
                />

         
                <Button
                    type="submit"
                >
                    Create
                </Button>
            </Form>
        </Card>
    )
}
