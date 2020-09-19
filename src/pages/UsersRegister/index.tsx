import React, { useState } from 'react';
import api from '../../services/api'
import Header from '../Header'

import { Container, Wrapper, WrapperCheckBox, Label, FormUtr, Input, Select, Option, ListUtrs, Utrs,CheckBox, TextInput, Button } from './styles';

interface userI {
    nome?: string,
    cpf?: string,
    numero_matricula?: string,
    telefone?: string,
    email?: string,
    nivel_usuario?: string,
    senha?: string
}

const UsersRegister: React.FC = () => {

    const [user, setUser] = useState<userI>({})

    async function registerUser() {

        await api.post('users', {
          nome: user.nome,
          cpf: user.cpf,
          numero_matricula: user.numero_matricula,
          telefone: user.telefone,
          email: user.email,
          nivel_usuario: user.nivel_usuario,
          senha: user.senha
        }, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        }).then((response) => {
    
           alert(`sucesso: ${response.data.message}`)
    
    
        }).catch((error) => {
          alert(`erro: ${error.data.message}`)
    
        })
      }
    
    return (
        <Container>
            <Header />
            <Wrapper>
                <h1>Cadastrar Usuário</h1>
                <FormUtr >
                    <Label >Nome</Label>
                    <Input value={user.nome} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, nome: text.target.value })} />
                    <br />
                    <Label >CPF</Label>
                    <Input value={user.cpf} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, cpf: text.target.value })} />
                    <br />
                    <Label >Matrícula</Label>
                    <Input value={user.numero_matricula} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, numero_matricula: text.target.value })} />
                    <br />
                    <Label >Telefone</Label>
                    <Input value={user.telefone} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, telefone: text.target.value })} />
                    <br />
                    <Label >Email</Label>
                    <Input value={user.email} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, email: text.target.value })} />
                    <br />
                    <Label >Descrição do usuário (Ex: Fazendeiro, pivozeiro)</Label>
                    <Input value={user.nivel_usuario} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, nivel_usuario: text.target.value })} />
                    <br />
                    <Label >Senha</Label>
                    <Input value={user.senha} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, senha: text.target.value })} />
                    <br />
                    <Button onClick={registerUser}>Cadastrar</Button>
                </FormUtr>


            </Wrapper>
        </Container>
    );
};

export default UsersRegister;

