import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'
import { Container, ListUsers, Labels, Label, User, NameItem, Buttons, Button, } from './styles';
import { Wrapper } from '../Home/styles';

interface userI {
  codigo_usuario?: number,
  nome?: string,
  cpf?: string,
  numero_matricula?: number,
  senha?:string,
  telefone?: string,
  email?: string,
  codigo_permissoes?: [Number]

  
}

interface permissionI{
  codigo_permissao?: number,
  nome?: string,
 
}


const Users: React.FC = () => {

  const [permissions, setPermissions] = useState<permissionI[]>([])
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([])
  const [user, setUser] = useState<userI>({})
  const [users, setUsers] = useState([])
  const [visibleForm, setVisibleForm] = useState(false)
  
  

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    await api.get('users', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setUsers(response.data)
    }).catch((error)=>{console.log('Não foi possivel carregar os dados'+ error)})
  }

  

  // async function deleteUser({codigo_usuario}: userI){
  //     await api.delete('users/'+codigo_usuario,{
  //       headers: {
  //         "Content-Type": "application/json",
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //       }
  //     }).then((response)=>{
          
  //         loadUsers()
  //         alert(`sucesso: ${response.data.message}`)

  //     }).catch((error)=>{
  //       alert(`erro: ${error.data.message}`)
        
  //     })
  // }

  // async function updateUser(){
  //   await api.put('users/'+user.codigo_usuario,  {
  //     nome_usuario: user.nome_usuario,
  //     cpf: user.cpf,
  //     numero_matricula: user.numero_matricula,
      
  //     telefone: user.telefone,
  //     email: user.email,
  //     codigo_permissoes: selectedPermissions
  //   },{
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //     }
  //   }).then((response)=>{
        
  //       setVisibleForm(false)
  //       loadUsers()
  //       alert(`sucesso: ${response.data.message}`)

  //   }).catch((error)=>{
  //     alert(`erro: ${error.data.message}`)
      
  //   })
  // }

  return (
    <Container>
      <Header />
      <Wrapper>
        <h1>Usuários</h1>
      <ListUsers>
        <Labels>
          <Label>Nome do usuário</Label>
          <Label>CPF</Label>

        </Labels>
        {users.length>0 && users.map((u:userI) => 

          <User key={u.codigo_usuario} >
            <NameItem>{u.nome}</NameItem>
            <NameItem>{u.cpf}</NameItem>

            <Buttons>
              <Button onClick={()=>{setUser(u) 
                                    setVisibleForm(true)}}>Editar</Button>
              {/* <Button onClick={()=>{deleteUser(u)}}>Excluir</Button> */}

            </Buttons>
          </User>
        )
        }


      </ListUsers>
      </Wrapper>
    </Container>
  );
};

export default Users;
