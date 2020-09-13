import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'
import { Container, ListPivots, Labels, Label, Pivot, NameItem, Buttons, Button, FormPivot, Input, Select, Option } from './styles';

interface pivotI {
  codigo_pivo?: number,
  nome?: string,
  descricao?: string,
  tipo_pivo?: string,
  raio?: number,
  velocidade_maxima?: number,
  area_irrigada?: number,
  lamina?: string,
  vazao_maxima?: string,
  altura_centro?: number,
  latitude_centro?: number,
  longitude_centro?: number,
  reversao?: string,
  religamento_energia?: string,
  religamento_pressao?: string,
  codigo_fazenda?: number,
  nome_fazenda?:string

}


interface farmI{
  codigo_fazenda?: number,
  nome_fazenda?: string,
  cnpj?: string,
  inscricao_produtor?: string,
  localizacao_fazenda?: string,
  latitude?: number,
  longitude?: number

}

const Pivots: React.FC = () => {

  const [farms, setFarms] = useState<farmI[]>([])
  const [pivot, setPivot] = useState<pivotI>({})
  const [pivots, setPivots] = useState([])
  const [visibleForm, setVisibleForm] = useState(false)



  useEffect(() => {
    loadPivots()
  }, [])

  async function loadPivots() {
    await api.get('pivots', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setPivots(response.data)
    }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
  }

  async function registerPivot() {
    await api.post('pivots', {

      codigo_pivo: pivot.codigo_pivo,
      nome: pivot.nome,
      descricao: pivot.descricao,
      tipo_pivo: pivot.tipo_pivo,
      raio: pivot.raio,
      velocidade_maxima: pivot.velocidade_maxima,
      area_irrigada: pivot.area_irrigada,
      lamina: pivot.lamina,
      vazao_maxima: pivot.vazao_maxima,
      altura_centro: pivot.altura_centro,
      latitude_centro: pivot.latitude_centro,
      longitude_centro: pivot.longitude_centro,
      reversao: pivot.reversao,
      religamento_energia: pivot.religamento_energia,
      religamento_pressao: pivot.religamento_pressao,
      codigo_fazenda: pivot.codigo_fazenda

    }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((response) => {

      setVisibleForm(false)
      loadPivots()
      alert(`sucesso: ${response.data.message}`)

    }).catch((error) => {
      alert(`erro: ${error.data.message}`)

    })
  }

  async function deletePivot({ codigo_pivo }: pivotI) {
    await api.delete('pivots/' + codigo_pivo, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((response) => {

      loadPivots()
      alert(`sucesso: ${response.data.message}`)

    }).catch((error) => {
      alert(`erro: ${error.data.message}`)

    })
  }

  async function updatePivot() {
    await api.put('pivots/' + pivot.codigo_pivo, {

      codigo_pivo: pivot.codigo_pivo,
      nome: pivot.nome,
      descricao: pivot.descricao,
      tipo_pivo: pivot.tipo_pivo,
      raio: pivot.raio,
      velocidade_maxima: pivot.velocidade_maxima,
      area_irrigada: pivot.area_irrigada,
      lamina: pivot.lamina,
      vazao_maxima: pivot.vazao_maxima,
      altura_centro: pivot.altura_centro,
      latitude_centro: pivot.latitude_centro,
      longitude_centro: pivot.longitude_centro,
      reversao: pivot.reversao,
      religamento_energia: pivot.religamento_energia,
      religamento_pressao: pivot.religamento_pressao,
      codigo_fazenda: pivot.codigo_fazenda

    }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((response) => {

      setVisibleForm(false)
      loadPivots()
      alert(`sucesso: ${response.data.message}`)

    }).catch((error) => {
      alert(`erro: ${error.data.message}`)

    })
  }

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

  return (
    <Container>
      <Header />
      {visibleForm &&
        <FormPivot >
          <Label >Nome</Label>
          <Input value={pivot.nome} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, nome: text.target.value })} />
          <Label >Descricão</Label>
          <Input value={pivot.descricao} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, descricao: text.target.value })} />
          <Label>Velocidade Maxima</Label>
          <Input value={pivot.velocidade_maxima} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, velocidade_maxima: Number(text.target.value) })} />
          <Label>Area irrigada</Label>
          <Input value={pivot.area_irrigada} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, area_irrigada: Number(text.target.value) })} />
          <Label>Lamina</Label>
          <Input value={pivot.lamina} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, lamina: text.target.value })} />
          <Label>Vazão maxima</Label>
          <Input value={pivot.vazao_maxima} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, vazao_maxima: text.target.value })} />
          <Label>Altura do centro</Label>
          <Input value={pivot.altura_centro} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, altura_centro: Number(text.target.value) })} />
          <Label>Latitude do centro</Label>
          <Input value={pivot.latitude_centro} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, latitude_centro: Number(text.target.value) })} />
          <Label>Longitude do centro</Label>
          <Input value={pivot.longitude_centro} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, longitude_centro: Number(text.target.value) })} />
          <Label>Reversão</Label>
          <Input value={pivot.reversao} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, reversao: text.target.value })} />
          <Label>Religamento de energia</Label>
          <Input value={pivot.religamento_energia} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, religamento_energia: text.target.value })} />
          <Label>Religamento por pressao</Label>
          <Input value={pivot.religamento_pressao} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, religamento_pressao: text.target.value })} />
          <Label>Fazenda</Label>
          <Select  onChange={(text) => setPivot({...pivot, codigo_fazenda: Number(text.target.value)})}>
            {farms.length >0 && farms.map((f:farmI)=>
               <Option key={f.codigo_fazenda} value={f.codigo_fazenda}>{f.nome_fazenda}</Option>            
            )}
           
           
          </Select>
          <Button onClick={registerPivot}>Cadastrar</Button>
          <Button onClick={updatePivot}>Salvar</Button>
        </FormPivot>
      }
      <ListPivots>
        <Button onClick={() => {if( farms.length <= 0) {loadFarms()}
                                setVisibleForm(true)}}>Cadastrar novo usuario</Button>
        <Labels>
          <Label>Pivo</Label>
          <Label>Fazenda</Label>

        </Labels>
        {pivots.length > 0 && pivots.map((p: pivotI) =>

          <Pivot key={p.codigo_pivo} >
            <NameItem>{p.nome}</NameItem>
            <NameItem>{p.nome_fazenda}</NameItem>

            <Buttons>
              <Button onClick={() => {
                setPivot(p)
                if( farms.length <= 0) {loadFarms()}
                setVisibleForm(true)
              }}>Editar</Button>
              <Button onClick={() => { deletePivot(p) }}>Excluir</Button>

            </Buttons>
          </Pivot>
        )
        }


      </ListPivots>
    </Container>
  );
};

export default Pivots;
