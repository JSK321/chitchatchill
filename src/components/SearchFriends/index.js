// React
import React, { useState } from 'react'
// Bootstrap
import { InputGroup, FormControl } from 'react-bootstrap'
// Contexts
import { useTheme } from '../../contexts/ThemeContext'
// CSS
import "./styles.css"

export default function SearchFriends() {
    // Theme Context
    const darkTheme = useTheme()
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#CCC',
        color: darkTheme ? '#CCC' : '#333',
    }

    return (
        <InputGroup>
            <FormControl
                type="search"
                placeholder="Search"
                className="rounded-0"
            />
        </InputGroup>
    )
}
