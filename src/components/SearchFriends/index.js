// React
import React, { useState, useEffect } from 'react'
// API
import API from '../../utils/API';
// Bootstrap
import { Card, InputGroup, ListGroup, Form, FormControl } from 'react-bootstrap'
// Contexts
import { useTheme } from '../../contexts/ThemeContext'
// CSS
import "./styles.css"

export default function SearchFriends() {
    const [userState, setUserState] = useState({
        user: ""
    })
    const [searchState, setSearchState] = useState({
        search: ""
    })

    const handleSearchInput = event => {
        event.preventDefault();
        const { value } = event.target;
        setSearchState({
            search: value
        })
    }

    const handleSearchUser = event => {
        event.preventDefault();
        if (searchState.search !== "") {
            API.getOneProfile(searchState.search).then(res => {
                if (res !== null) {
                    setUserState({
                        user: {
                            accountName: res.accountName,
                            name: res.name,
                            profileImage: res.profileImage,
                            id: res.id
                        }
                    })
                } else {
                    setUserState({
                        user: null
                    })
                }
            })
        }
    }

    // Theme Context
    const darkTheme = useTheme()
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#CCC',
        color: darkTheme ? '#CCC' : '#333',
    }

    return (
        <InputGroup>
            <Form
                onSubmit={handleSearchUser}
                className="searchBar rounded-0"
            >
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="rounded-0"
                    onChange={handleSearchInput}
                />
            </Form>
            {!userState.user
                ?
                (userState.user === null ?
                    <p>Could not find user... please try again</p>
                    :
                    null
                )
                :
                < Card className="userCard">
                    < Card.Img variant="top" src={userState.profileImage} />
                    <Card.Body>
                        <Card.Title>{userState.user.accountName}</Card.Title>
                        <ListGroup>
                            <ListGroup.Item>{userState.user.name}</ListGroup.Item>
                            <ListGroup.Item>{userState.user.id}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            }

        </InputGroup >
    )
}
