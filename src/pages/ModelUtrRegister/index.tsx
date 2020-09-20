import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'

import { Container, Wrapper, FormPivot, TextInput, Input, Select, Option, Button } from './styles';


interface modeUtrI {
  codigo_item?: number,
  nome?: string,
  tipo?: string,
  visivel?: string,
  fator_multiplicador?: string,
  unidade_medida?: string

}


const ModelUtrRegister: React.FC = () => {

  const [itemUtr, setItemUtr] = useState<modeUtrI>({})
  const [modelUtr, setModelUtr] = useState([])

  useEffect(() => {
    loadModelUtr()
  }, [])

  async function loadModelUtr() {
    await api.get('modelUtrs', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setModelUtr(response.data)
    }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
  }

  async function registerModelUtr() {
    await api.post('modelUtrs', {

      nome: itemUtr.nome,
      tipo: itemUtr.tipo,
      visivel: itemUtr.visivel,
      fator_multiplicador: itemUtr.fator_multiplicador,
      unidade_medida: itemUtr.unidade_medida
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


  return (
    <Container>
      <Header/>
      <Wrapper>
      <h1>Cadastrar Modelo UTR</h1>
        <FormPivot >
          <TextInput >Nome</TextInput>
          <Input value={itemUtr.nome} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setItemUtr({ ...itemUtr, nome: text.target.value })} />
          <br />
          <TextInput >Tipo</TextInput>
          <Select onChange={(text) => setItemUtr({ ...itemUtr, tipo: text.target.value })}>

            <Option value="int">int</Option>
            <Option value="varchar(255)">varchar</Option>
            <Option value="double)">double</Option>
            <Option value="booblea">boolean</Option>
            <Option value="datetime">datetime</Option>

          </Select>          <br />
          <TextInput >Visivel</TextInput>
          <Select onChange={(text) => setItemUtr({ ...itemUtr, visivel: text.target.value })}>

            <Option value="S">Sim</Option>
            <Option value="N">Não</Option>

          </Select>
          <br />
          <TextInput >Fator multiplicador</TextInput>
          <Input value={itemUtr.fator_multiplicador} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setItemUtr({ ...itemUtr, fator_multiplicador: text.target.value })} />
          <br />
          <TextInput >Unidade de medida (ex: %, º, mm)</TextInput>
          <Input value={itemUtr.unidade_medida} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setItemUtr({ ...itemUtr, unidade_medida: text.target.value })} />
          <br />
          <Button onClick={registerModelUtr}>Cadastrar</Button>
          <br />

        </FormPivot>
      </Wrapper>
    </Container>
  );
};

export default ModelUtrRegister;
