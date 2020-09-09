import React, { useState, useEffect } from 'react'

import { Container } from './styles'
import api from '../../services/api'
import { connect, disconnect, subscribeToNewUsers, listenUpdates } from '../../services/socket.js'

interface userI {
    id: Number,
    nome: String,
    email: String,
    senha: String,
    permissoes: [Number]
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5NjUyMDg1LCJleHAiOjE1OTk3Mzg0ODV9.slkSdiATrUJh1FNnkwe7HNBt3TWm7OoPJoZi_ZUBkDg"

const Main: React.FC = () => {
    const [users, setUsers] = useState<userI[]>([])

    useEffect(() => {
        setupWebSocket()
        loadUsers()
    }, [])

    useEffect(() => {
        // subscribeToNewUsers(user => setUsers([...users, user]))
        // subscribeToNewUsers(function(user: userI) {
        //     setUsers([...users, user])
        // })
        
            console.log('atualizou')
    }, [users])

    useEffect(() => {
        if (users && users.length > 0) {
            listenUpdates(function (user: userI) {
                let userstmp = users

                const index = userstmp.findIndex(u => u.id === user.id)
                userstmp[index] = user

                setUsers(userstmp)
            })
        }
    })

    function setupWebSocket() {
        disconnect()

        connect()
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
