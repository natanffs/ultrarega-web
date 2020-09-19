import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'
import { Container,LabelInput, ListPivots, DadosUser,  Buttons, Button,  Input} from './styles';

interface userI {
  codigo_usuario?: number,
  nome_usuario?: string,
  cpf?: string,
  numero_matricula?: number,
  
  telefone?: string,
  email?: string,
  

  
}



const User: React.FC = () => {

  const [user, setUser] = useState<userI>({})
  const [editable, setEditable] = useState<boolean>(false)
  // const [permissions, setPermissions] = useState<permissionI[]>([])

  useEffect(()=>{loadUser()},[])



  async function loadUser() {
    await api.get('users'+localStorage.getItem('id'), {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setUser(response.data)
    }).catch((error)=>{console.log('Não foi possivel carregar os dados'+ error)})
  }

  return (
    <Container>
      <ListPivots>
                
        
          <DadosUser>
          <LabelInput >Nome</LabelInput>
          <Input value={user.nome_usuario} readOnly={editable}  onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, nome_usuario: text.target.value })} />
          <br/>
          <LabelInput >CPF</LabelInput>
          <Input  readOnly={editable} value={user.cpf} 
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => 
          setUser({ ...user, cpf: text.target.value })} />
          <br/>
          <LabelInput >Numero de matricula</LabelInput>
          <Input  readOnly={editable} value={user.numero_matricula} 
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => 
          setUser({ ...user, numero_matricula: Number(text.target.value) })} />
          <br/>
          <LabelInput >Telefone</LabelInput>
          <Input  readOnly={editable} value={user.telefone} 
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => 
          setUser({ ...user, telefone: text.target.value })} />
          <br/>
          <LabelInput >Email</LabelInput>
          <Input  readOnly={editable} value={user.email} 
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => 
          setUser({ ...user, email: text.target.value })} />
          <br/>
          

            <Buttons>
              <Button onClick={() => {
                setEditable(true)
              }}>Editar</Button>
              

            </Buttons>
          </DadosUser>
        
        


      </ListPivots>
    </Container>
  );
};

export default User;
