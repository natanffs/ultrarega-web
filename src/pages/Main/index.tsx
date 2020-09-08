import React, { useState, useEffect } from 'react'

import { Container } from './styles'
import api from '../../services/api'
import socket from '../../services/socket'

interface userI {
    id: Number,
    nome: String,
    email: String,
    senha: String,
    permissoes: [Number]
}

const Main: React.FC = () => {
    const [users, setUsers] = useState<userI[]>([])

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        await api.get('users').then(response => {
            setUsers(response.data)
        })
    }
    
    return (
        <Container>
            <h1>Users:</h1>
            {users.length > 0 && users.map(u => (
                <h1>u.nome</h1>
            ))}
        </Container>
    )
}

export default Main
