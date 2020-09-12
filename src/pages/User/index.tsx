import React from 'react';
import Header from '../Header'
import { Container, ListUsers, Labels, Label, User, NameItem, Buttons, Button } from './styles';

const Users: React.FC = () => {
  return (
    <Container>
      <Header/>
      <ListUsers>
          <Labels>
            <Label >Nome do usuário</Label>
            <Label >CPF</Label>
            <Label >Matricula</Label>
            <Label >Telefone</Label>
            <Label>Email</Label>
            <Label>Situação</Label>
            <Label>permições</Label>
          </Labels>
          
            <User>
              <NameItem>Raquel msf</NameItem>
              <NameItem>nenhuma</NameItem>
              <NameItem>nenhuma</NameItem>
              <NameItem>nenhuma</NameItem>
              <NameItem>nenhuma</NameItem>
              <NameItem>nenhuma</NameItem>
              <NameItem>nenhuma</NameItem>
              <Buttons>
              <Button>Editar</Button> 
                <Button>Excluir</Button>
                
              </Buttons>
            </User>
          
        </ListUsers>
    </Container>
  );
};

export default Users;
