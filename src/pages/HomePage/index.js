// React
import React from 'react'
// Bootstrap
import { Container} from 'react-bootstrap'
// Components
import ChatroomsTab from '../../components/ChatroomsTab'

export default function HomePage() {

    return (
        <Container className="homeContainer">
            <ChatroomsTab />
        </Container>
    );
};
