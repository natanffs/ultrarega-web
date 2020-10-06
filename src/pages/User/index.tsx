import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'
import { Container, Wrapper, LabelInput, ListPivots, DadosUser, Buttons, Button, Input } from './styles';

interface userI {
  codigo_usuario?: number,
  nome?: string,
  cpf?: string,
  numero_matricula?: number,

  telefone?: string,
  email?: string,



}

interface permissionI {
  grupo_permissao: string,
  item_permissao: string
}


const User: React.FC = () => {

  const [user, setUser] = useState<userI>({})
  const [editable, setEditable] = useState<boolean>(true)
  const [permissions, setPermissions] = useState<permissionI[]>([])

  useEffect(() => { loadUser() }, [])



  async function loadUser() {
    await api.get('users/' + localStorage.getItem('id_user'), {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {

      setUser(response.data)
    }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
  }

  async function updateUser() {
    await api.put('users/' + localStorage.getItem('id_user'), {
      
      nome: user.nome,
      cpf: user.cpf,
      numero_matricula: user.numero_matricula,

      telefone: user.telefone,
      email: user.email
    }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setEditable(true)
     alert(response.data.message)
    }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
  }

  function findPermission(permission:string){
    let find = false
      permissions.map((p:permissionI)=>{
          if(p.item_permissao === permission) 
         find = true
      })
      return find
  }

  return (
    <Container>
      <Header />
      <Wrapper>
        <h1>Meus Dados</h1>
        <ListPivots>


          <DadosUser>
            <LabelInput >Nome</LabelInput>
            <Input value={user.nome} readOnly={editable} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, nome: text.target.value })} />
            <br />
            <LabelInput >CPF</LabelInput>
            <Input readOnly={editable} value={user.cpf}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                setUser({ ...user, cpf: text.target.value })} />
            <br />
            <LabelInput >Numero de matricula</LabelInput>
            <Input readOnly={editable} value={user.numero_matricula}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                setUser({ ...user, numero_matricula: Number(text.target.value) })} />
            <br />
            <LabelInput >Telefone</LabelInput>
            <Input readOnly={editable} value={user.telefone}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                setUser({ ...user, telefone: text.target.value })} />
            <br />
            <LabelInput >Email</LabelInput>
            <Input readOnly={editable} value={user.email}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                setUser({ ...user, email: text.target.value })} />
            <br />


           {findPermission("AUTOU") &&  <Buttons>
              <Button onClick={() => {
                setEditable(false)
              }}>Editar</Button>

              {!editable && <Button onClick={() => {
                updateUser()
              }}>Salvar</Button>}
            </Buttons>}
          </DadosUser>




        </ListPivots>
      </Wrapper>
    </Container>
  );
};

export default User;
