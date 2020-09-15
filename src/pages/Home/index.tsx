import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'

import { Container, Wrapper, ListUtr, Labels, Label, Utr, NameItem, Button, FormUtr, Input, Select, Option, ListUtrs, Utrs, CheckBox, TextInput } from './styles';
import Header from '../Header'
import api from '../../services/api'

interface utrI {
  codigo_utr?: number,
  nome_utr_now?: string,
  descricao?: string,
  codigo_pivo?: number,
  nome_fazenda?: string
}

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
  nome_fazenda?: string

}

interface modeUtrI {
  codigo_item?: number,
  nome?: string,
  tipo?: string,
  visivel?: string,
  fator_multiplicador?: string,
  unidade_medida?: string

}

const Home: React.FC = () => {

  const [utr, setUtr] = useState<utrI>({})
  const [utrs, setUtrs] = useState([])
  const [selectedModels, setSelectedModels] = useState<number[]>([])
  const [selectedModelsNames, setSelectedModelsNames] = useState<string[]>([])
  const [visibleForm, setVisibleForm] = useState(false)
  const [modelUtrs, setModelUtrs] = useState([])
  const [pivots, setPivots] = useState([])

  const history = useHistory()

  useEffect(() => {
    loadUtrs()
  }, [])

  async function loadUtrs() {
    await api.get('utrs', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setUtrs(response.data)
    }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
  }

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

  async function loadModelUtrs() {
    await api.get('modelUtrs', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setModelUtrs(response.data)
    }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
  }

  async function registerUtr() {

    alert(utr.codigo_pivo)
    await api.post('utrs', {

      descricao: utr.descricao,
      codigo_pivo: utr.codigo_pivo,
      codigo_itens: selectedModels,
      nome_itens: selectedModelsNames
    }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((response) => {

      setVisibleForm(false)
      loadUtrs().then(() => alert(`sucesso: ${response.data.message}`))


    }).catch((error) => {
      alert(`erro: ${error.data.message}`)

    })
  }

  async function createTableString() {
    
  }
  return (

    <Container>
      <Header />

      <Wrapper>
        <ListUtr>
          <Labels>
            <Label>Fazenda</Label>
            <Label>Pivo


            </Label>
          </Labels>
          {utrs.length > 0 && utrs.map((u: utrI) =>
            <Utr>
              <NameItem>{u.nome_fazenda}</NameItem>
              <NameItem>{u.nome_utr_now}</NameItem>

              <Button onClick={() => { history.push(`utrs/${u.codigo_utr}`) }}>Visualizar</Button>
            </Utr>
          )}
          <br />
          <Button onClick={() => {
            if (pivots.length <= 0) { loadPivots() }
            if (modelUtrs.length <= 0) { loadModelUtrs() }
            setVisibleForm(true)
            setSelectedModels([])
            setSelectedModelsNames([])
          }}>Cadastrar nova UTR</Button>

        </ListUtr>
        {visibleForm &&
          <FormUtr >
            <Label >Descrição</Label>
            <Input value={utr.descricao} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUtr({ ...utr, descricao: text.target.value })} />

            <Label >Vincular Pivo</Label>
            <br />
            <Select onChange={(text) => setUtr({ ...utr, codigo_pivo: Number(text.target.value) })}>
              <Option selected>Selecione</Option>
              {pivots.length > 0 && pivots.map((p: pivotI) =>
                <Option key={p.codigo_pivo} value={p.codigo_pivo}>{p.nome}</Option>
              )}
            </Select>
            <br />

            <ListUtrs>
              <Label>Vincular Itens da UTR</Label>
              {modelUtrs.length > 0 && modelUtrs.map((mu: modeUtrI) =>
                <Utrs key={mu.codigo_item}>
                  <CheckBox type="checkbox" value={mu.codigo_item} onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    if (text.target.checked) {
                      setSelectedModels([...selectedModels, Number(text.target.value)])
                      setSelectedModelsNames([...selectedModelsNames, `${mu.nome}`])
                    } else {
                      setSelectedModels(selectedModels.filter(sm => sm !== Number(text.target.value)))
                      setSelectedModelsNames(selectedModelsNames.filter(sm => sm !== (mu.nome)))
                    }
                  }} />
                  <TextInput>{mu.nome}</TextInput>
                </Utrs>)}
              <Button onClick={registerUtr}>Cadastrar</Button>
            </ListUtrs>

          </FormUtr>


        }

      </Wrapper>
    </Container>
  );
};

export default Home;
