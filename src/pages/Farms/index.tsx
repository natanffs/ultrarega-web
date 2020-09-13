import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'

import { Container,  ListFarms, Labels, Label, Farm, NameItem, Buttons, Button, FormFarm, Input } from './styles';

interface farmI{
  codigo_fazenda?: number,
  nome_fazenda?: string,
  cnpj?: string,
  inscricao_produtor?: string,
  localizacao_fazenda?: string,
  latitude?: number,
  longitude?: number

}

const Farms: React.FC = () => {

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
    }).catch((error)=>{console.log('Não foi possivel carregar os dados'+ error)})
  }

  async function registerFarm(){
    await api.post('farms',  {
      nome_fazenda : farm.nome_fazenda,
      cnpj : farm.cnpj,
      inscricao_produtor: farm.inscricao_produtor,
      localizacao_fazenda: farm.localizacao_fazenda,
      latitude: farm.latitude,
      longitude: farm.longitude
    },{
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((response)=>{
        
        setVisibleForm(false)
        loadFarms()
        alert(`sucesso: ${response.data.message}`)

    }).catch((error)=>{
      alert(`erro: ${error.data.message}`)
      
    })
  }

  async function deleteFarm({codigo_fazenda}: farmI){
      await api.delete('farms/'+codigo_fazenda,{
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then((response)=>{
          
          loadFarms()
          alert(`sucesso: ${response.data.message}`)

      }).catch((error)=>{
        alert(`erro: ${error.data.message}`)
        
      })
  }

  async function updateFarm(){
    await api.put('farms/'+farm.codigo_fazenda,  {
      nome_fazenda : farm.nome_fazenda,
      cnpj : farm.cnpj,
      inscricao_produtor: farm.inscricao_produtor,
      localizacao_fazenda: farm.localizacao_fazenda,
      latitude: farm.latitude,
      longitude: farm.longitude

    },{
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((response)=>{
        setVisibleForm(false)
        loadFarms()
        alert(`sucesso: ${response.data.message}`)

    }).catch((error)=>{
      alert(`erro: ${error.data.message}`)
      
    })
  }

  return (
    <Container>
      <Header />
      {visibleForm &&
        <FormFarm >
          <Label >Fazenda</Label>
          <Input value={farm.nome_fazenda} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, nome_fazenda: text.target.value })} />
          <Label >CNPJ</Label>
          <Input value={farm.cnpj} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, cnpj: text.target.value })} />
          <Label>Inscrição do produtor</Label>
          <Input value={farm.inscricao_produtor} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, inscricao_produtor: text.target.value })} />
          <Label>Referencia de localização</Label>
          <Input value={farm.localizacao_fazenda} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, localizacao_fazenda: text.target.value })} />
          <Label>Latitude</Label>
          <Input  value={farm.latitude} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, latitude: Number(text.target.value) })} />
          <Label>Longitude</Label>
          <Input value={farm.longitude} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, longitude:  Number(text.target.value)})} />
          <Button onClick={registerFarm}>Cadastrar</Button>
          <Button onClick={updateFarm}>Salvar</Button>
        </FormFarm>
      }
      <ListFarms>
        <Button onClick={() => setVisibleForm(true)}>Cadastrar nova fazenda</Button>
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
                setFarm(f)
                setVisibleForm(true)
              }}>Editar</Button>
              <Button onClick={() => { deleteFarm(f) }}>Excluir</Button>

            </Buttons>
          </Farm>
        )
        }


      </ListFarms>
    </Container>
  );
};

export default Farms;