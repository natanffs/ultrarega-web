import React, { useState, useEffect } from 'react'

import { Container } from './styles'
import api from '../../services/api'
import { connect, disconnect, subscribeToNewUsers, listenUpdates } from '../../services/socket.js'
import socketio from 'socket.io-client'

interface userI {
    id: Number,
    nome: String,
    email: String,
    senha: String,
    permissoes: [Number]
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTk5NzgwMzUzLCJleHAiOjE1OTk4NjY3NTN9.a4D8igzSzoSZEa9LF2YXYUmC06PZNWVOmg1vb4l9XuA"

const Main: React.FC = () => {
    const [socket, setSocket] = useState<SocketIOClient.Socket>(connect())
    const [users, setUsers] = useState<userI[]>([])

    useEffect(() => {
        //setupWebSocket()
        loadUsers()
    }, [])

    useEffect(() => {
        if(socket && users.length > 0) 
            setupWebSocket()
    }, [users])

    function updateUser(usr: userI) {
        console.log(users[0])
    }

    function setupWebSocket() {

        socket.on('new-insert', (newUser: userI) => {
            setUsers([...users, newUser]) //está sobreescrevendo o state
        })

        socket.on('new-update', (update: userI) => {
            setUsers(users.map(u => 
                u.id === update.id ? update : u    
            ))
        })

        socket.on('pivot-update', (update: userI) => {
            setUsers(users.map(u => 
                u.id === update.id ? update : u    
            ))
        })
    }

    async function loadUsers() {
        await api.get('users', {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            }
        }).then(response => {
            setUsers(response.data)
        })
    }

    return (
        <Container>
            <h1>Users:</h1>
            {users.length > 0 && users.map(u => (
                <h1 key={u.id.toString()}>{u.nome} - {u.email}</h1>
            ))}
        </Container>
    )
}

export default Main
