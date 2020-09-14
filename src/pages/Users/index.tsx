import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'
import { Container, ListUsers, Labels, Label, User, NameItem, Buttons, Button, FormUser, Input, CheckBox, TextInput } from './styles';

interface userI {
  codigo_usuario?: number,
  nome_usuario?: string,
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

  async function registerUser(){
    await api.post('users',  {
      nome_usuario: user.nome_usuario,
      cpf: user.cpf,
      numero_matricula: user.numero_matricula,
      senha: user.senha,
      telefone: user.telefone,
      email: user.email
    },{
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((response)=>{
      
        setVisibleForm(false)
        loadUsers()
        alert(`sucesso: ${response.data.message}`)

    }).catch((error)=>{
      alert(`erro: ${error.data.message}`)
      
    })
  }

  async function deleteUser({codigo_usuario}: userI){
      await api.delete('users/'+codigo_usuario,{
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then((response)=>{
          
          loadUsers()
          alert(`sucesso: ${response.data.message}`)

      }).catch((error)=>{
        alert(`erro: ${error.data.message}`)
        
      })
  }

  async function updateUser(){
    await api.put('users/'+user.codigo_usuario,  {
      nome_usuario: user.nome_usuario,
      cpf: user.cpf,
      numero_matricula: user.numero_matricula,
      
      telefone: user.telefone,
      email: user.email,
      codigo_permissoes: selectedPermissions
    },{
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((response)=>{
        
        setVisibleForm(false)
        loadUsers()
        alert(`sucesso: ${response.data.message}`)

    }).catch((error)=>{
      alert(`erro: ${error.data.message}`)
      
    })
  }

  return (
    <Container>
      <Header />
    {visibleForm &&
      <FormUser >
        <Label >Nome do Usuário</Label>
        <Input value={user.nome_usuario} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, nome_usuario:text.target.value })}/>
        <Label >CPF</Label>
        <Input value={user.cpf} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, cpf:text.target.value })}/>
        <Label>Matricula</Label>
        <Input value={user.numero_matricula} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, numero_matricula:Number(text.target.value )})}/>
        <Label>Telefone</Label>
        <Input value={user.telefone} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user,  telefone:text.target.value })}/>
        <Label>Email</Label>
        <Input name='email' type='email' value={user.email} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({...user,  email:text.target.value })}/>
        <Label>Senha</Label>
        <Input name='password' type='password' value={user.senha} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({...user,  senha:text.target.value })}/>
        
        <ListUsers>
            <Label>Vincular usuários</Label>
            {permissions.length > 0 && permissions.map((p) =>
              <User key={p.codigo_permissao}>
                <CheckBox type="checkbox" value={p.codigo_permissao} onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  if (text.target.checked) {
                    setSelectedPermissions([...selectedPermissions, Number(text.target.value)])
                  } else {
                    setSelectedPermissions(selectedPermissions.filter(su => su !== Number(text.target.value)))
                  }
                }} />
                <TextInput>{p.nome}</TextInput>
              </User>)}
          </ListUsers>
        
        <Button onClick={registerUser}>Cadastrar</Button>
        <Button onClick={updateUser}>Salvar</Button>
      </FormUser> 
    }
      <ListUsers>
        <Button onClick={()=>setVisibleForm(true)}>Cadastrar novo usuario</Button>
        <Labels>
          <Label>Nome do usuário</Label>
          <Label>CPF</Label>

        </Labels>
        {users.length>0 && users.map((u:userI) => 

          <User key={u.codigo_usuario} >
            <NameItem>{u.nome_usuario}</NameItem>
            <NameItem>{u.cpf}</NameItem>

            <Buttons>
              <Button onClick={()=>{setUser(u) 
                                    setVisibleForm(true)}}>Editar</Button>
              <Button onClick={()=>{deleteUser(u)}}>Excluir</Button>

            </Buttons>
          </User>
        )
        }


      </ListUsers>
    </Container>
  );
};

export default Users;
