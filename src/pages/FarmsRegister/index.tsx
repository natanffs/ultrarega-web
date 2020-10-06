import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'

import { Container,Wrapper, Label, Button, FormFarm, Input, ListUsers, User, TextInput, CheckBox } from './styles';

interface farmI {
  codigo_fazenda?: number,
  nome_fazenda?: string,
  cnpj?: string,
  inscricao_produtor?: string,
  localizacao_fazenda?: string,
  latitude?: number,
  longitude?: number,
  codigo_usuarios?: [number]
}

interface userI {
  codigo_usuario?: number,
  nome?: string,
  cpf?: string,
  numero_matricula?: number,
  senha?: string,
  telefone?: string,
  email?: string,


}

const FarmsRegister: React.FC = () => {

  const [farm, setFarm] = useState<farmI>({})
  const [users, setUsers] = useState<userI[]>([])
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])

  useEffect(()=>{loadUsers()},[])


  async function registerFarm() {
    await api.post('farms', {
      nome_fazenda: farm.nome_fazenda,
      cnpj: farm.cnpj,
      inscricao_produtor: farm.inscricao_produtor,
      localizacao_fazenda: farm.localizacao_fazenda,
      latitude: farm.latitude,
      longitude: farm.longitude,
      codigo_usuarios: selectedUsers
      
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

  // busca os usuários para que possam ser vinculados a uma fazenda
  async function loadUsers() {
    await api.get('users', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setUsers(response.data)
    }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
  }


  return (
    <Container>
      <Header/>
      <Wrapper>
      <h1>Cadastrar Fazenda</h1>
     <FormFarm >
          <Label >Fazenda</Label>
          <Input value={farm.nome_fazenda} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, nome_fazenda: text.target.value })} />
          <br/>
          <Label >CNPJ</Label>
          <Input value={farm.cnpj} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, cnpj: text.target.value })} />
          <br/>
          <Label>Inscrição do produtor</Label>
          <Input value={farm.inscricao_produtor} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, inscricao_produtor: text.target.value })} />
          <br/>
          <Label>Referencia de localização</Label>
          <Input value={farm.localizacao_fazenda} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, localizacao_fazenda: text.target.value })} />
          <br/>
          <Label>Latitude</Label>
          <Input value={farm.latitude} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, latitude: Number(text.target.value) })} />
          <br/>
          <Label>Longitude</Label>
          <Input value={farm.longitude} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, longitude: Number(text.target.value) })} />
          <br/>
          <ListUsers>
            <Label>Vincular usuários</Label>
            
            {users.length > 0 && users.map((u) =>
              <User key={u.codigo_usuario}>
                <CheckBox type="checkbox" value={u.codigo_usuario} onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  if (text.target.checked) {
                    setSelectedUsers([...selectedUsers, Number(text.target.value)])
                  } else {
                    setSelectedUsers(selectedUsers.filter(su => su !== Number(text.target.value)))
                  }
                }} />
                <TextInput>{u.nome}</TextInput>
              </User>)}
          </ListUsers>
              
          <br/>
          <Button onClick={registerFarm}>Cadastrar</Button>
          <br/>
        </FormFarm>
        </Wrapper>
    </Container>
  );
};

export default FarmsRegister;
