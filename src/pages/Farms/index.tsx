import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'

import { Container,Wrapper,ListFarms, Farm,Label, Labels, NameItem, Buttons, Button,  } from './styles';


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
  nome_usuario?: string,
  cpf?: string,
  numero_matricula?: number,
  senha?: string,
  telefone?: string,
  email?: string,


}

const Farms: React.FC = () => {

  const [users, setUsers] = useState<userI[]>([])
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [farm, setFarm] = useState<farmI>({})
  const [farms, setFarms] = useState([])
  const [visibleForm, setVisibleForm] = useState(false)

  useEffect(() => {
    loadFarms()
  }, [])

  async function loadFarms() {
    await api.get('farms', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setFarms(response.data)
    }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
  }

  

  // async function deleteFarm({ codigo_fazenda }: farmI) {
  //   await api.delete('farms/' + codigo_fazenda, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //     }
  //   }).then((response) => {

  //     loadFarms()
  //     alert(`sucesso: ${response.data.message}`)

  //   }).catch((error) => {
  //     alert(`erro: ${error.data.message}`)

  //   })
  // }

  
  // async function updateFarm() {
  //   await api.put('farms/' + farm.codigo_fazenda, {
  //     nome_fazenda: farm.nome_fazenda,
  //     cnpj: farm.cnpj,
  //     inscricao_produtor: farm.inscricao_produtor,
  //     localizacao_fazenda: farm.localizacao_fazenda,
  //     latitude: farm.latitude,
  //     longitude: farm.longitude,
  //     codigo_usuarios: selectedUsers
  //   }, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //     }
  //   }).then((response) => {
  //     setVisibleForm(false)
  //     loadFarms()
  //     alert(`sucesso: ${response.data.message}`)

  //   }).catch((error) => {
  //     alert(`erro: ${error.data.message}`)

  //   })
  // }

  

  return (
    <Container>
      <Header />
      <Wrapper>
        <h1>Fazendas</h1>
      <ListFarms>
        
        <Labels>
          <Label>Fazenda</Label>
          <Label>Referencia de localização</Label>

        </Labels>
        {farms.length > 0 && farms.map((f: farmI) =>

          <Farm key={f.codigo_fazenda} >
            <NameItem>{f.nome_fazenda}</NameItem>
            <NameItem>{f.localizacao_fazenda}</NameItem>

            <Buttons>
              <Button onClick={() => {
               
              }}>Editar</Button>
              {/* <Button onClick={() => { deleteFarm(f) }}>Excluir</Button> */}

            </Buttons>
          </Farm>
        )
        }


      </ListFarms>
      </Wrapper>
    </Container>
  );
};

export default Farms;
