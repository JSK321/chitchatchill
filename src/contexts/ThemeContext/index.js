import React, { useContext, useState } from 'react'

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

export function useTheme() {
    return useContext(ThemeContext)
}
export function useThemeUpdate() {
    return useContext(ThemeUpdateContext)
}

export function ThemeProvider({ children }) {
    const [darkThemeState, setDarkThemeState] = useState(true)

    function toggleTheme() {
        setDarkThemeState(prevDarkTheme => !prevDarkTheme)
    }

    return (
        <ThemeContext.Provider value={darkThemeState}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}
