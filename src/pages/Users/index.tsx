import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'
import { Container, ListUsers, FormUtr, Input, WrapperCheckBox,Utrs, CheckBox, TextInput, Labels, Label, User, NameItem, Buttons, Button, } from './styles';
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
  nivel_usuario?: string,
  
}

interface permissionI {
  grupo_permissao: string,
  item_permissao: string,
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

  useEffect(() => {
    const temp = localStorage.getItem('permissions_user')
    temp &&
    setPermissions(JSON.parse(temp))
  }, [])

  async function loadUsers() {

    localStorage.getItem('isAdmin')?

    await api.get('users', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setUsers(response.data)
    }).catch((error)=>{console.log('Não foi possivel carregar os dados'+ error)})

    :

    await api.get('users'+localStorage.getItem('id_user'), {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setUsers(response.data)
    }).catch((error)=>{console.log('Não foi possivel carregar os dados'+ error)})
  }

  function findPermission(permission:string){
    let find = false
      permissions.map((p:permissionI)=>{
          if(p.item_permissao === permission) 
         find = true
      })
      return find
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

  async function updateUser(){
    await api.put('users/'+user.codigo_usuario,  {
      nome_usuario: user.nome,
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
        setUser({})
        loadUsers()
        alert(`sucesso: ${response.data.message}`)

    }).catch((error)=>{
      alert(`erro: ${error.data.message}`)
      
    })
  }

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
            {findPermission("USUU") && <Button onClick={() => {
               setVisibleForm(true)
               setUser(u)
              }}>Editar</Button>}
              {/* <Button onClick={()=>{deleteUser(u)}}>Excluir</Button> */}

            </Buttons>
          </User>
        )
        }

        {visibleForm &&
          <FormUtr >
          <Label >Nome</Label>
          <Input value={user.nome} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, nome: text.target.value })} />
          <br />
          <Label >CPF</Label>
          <Input value={user.cpf} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, cpf: text.target.value })} />
          <br />
          <Label >Matrícula</Label>
          <Input value={user.numero_matricula} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, numero_matricula: Number(text.target.value) })} />
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

          <Label>Vincular Permissoes</Label>
          {permissions.length > 0 && permissions.map((p: permissionI) =>
            <Utrs key={p.codigo_permissao}>
              <WrapperCheckBox>
                <CheckBox type="checkbox" value={p.codigo_permissao} onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  if (text.target.checked) {
                    setSelectedPermissions([...selectedPermissions, Number(text.target.value)])
                  } else {
                    setSelectedPermissions(selectedPermissions.filter(su => su !== Number(text.target.value)))
                  }
                }} />
                <TextInput>{p.nome}</TextInput>
              </WrapperCheckBox>
            </Utrs>

          )}
          <br/>
          <Button onClick={updateUser}>Salvar</Button>
          <br/>
        </FormUtr>
        }
      </ListUsers>
      </Wrapper>
    </Container>
  );
};

export default Users;
