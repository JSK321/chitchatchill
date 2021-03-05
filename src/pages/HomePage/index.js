import React from 'react'
import { Card, Container, Button, ButtonGroup, Nav } from 'react-bootstrap'
import CreateChatModal from '../../components/CreateChatModal'
import "./styles.css"

export default function HomePage() {

    return (
        <Container className="homeContainer">
            <Card className="homeCard">
                <ButtonGroup vertical className="homeButtons">
                    <Button>Join Chat</Button>
                    <CreateChatModal/>
                </ButtonGroup>
            </Card>
        </Container>
    );
};
