import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
    const [socketState, setSocketState] = useState()

    useEffect(() => {
        const newSocket = io(
            'http://localhost:5000',
            { query: id })
            setSocketState(newSocket)

            return () => newSocket.close()
    }, [id])

    return (
        <SocketContext.Provider value={socketState}>
            {children}
        </SocketContext.Provider>
    )
}
