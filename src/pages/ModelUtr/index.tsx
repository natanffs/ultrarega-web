import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'

import { Container, Wrapper, ListItemUtr, Labels, Label, ItemUtr, NameItem,  Button, FormItemUtr, Input } from './styles';


interface modeUtrI{
  codigo_item?: number,
  nome?: string,
  tipo?: string,
  visivel?: string,
  fator_multiplicador?: string,
  unidade_medida?: string
 
}

const ModelUtr: React.FC = () => {

  const [itemUtr, setItemUtr] = useState<modeUtrI>({})
  const [modelUtr, setModelUtr] = useState([])
  
  const [visibleForm, setVisibleForm] = useState(false)

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
    }).catch((error)=>{console.log('Não foi possivel carregar os dados'+ error)})
  }

  

  async function updateModelUtr() {
    await api.put('modelUtrs/' + itemUtr.codigo_item, {
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
      setVisibleForm(false)
      loadModelUtr()
      alert(`sucesso: ${response.data.message}`)

    }).catch((error) => {
      alert(`erro: ${error.data.message}`)

    })
  }

  return (
    <Container>

      <Header />
      <Wrapper>
      <ListItemUtr>
        
        <br/>
        <Labels>
          <Label>Nome</Label>
          <Label>Tipo</Label>
          <Label>Visivel</Label>
          <Label>Fator multiplicador</Label>
          <Label>Unidade de medida</Label>

        </Labels>
        {modelUtr.length > 0 && modelUtr.map((mu: modeUtrI) =>

          <ItemUtr key={mu.codigo_item} >
            <NameItem>{mu.nome}</NameItem>
            <NameItem>{mu.tipo}</NameItem>
            <NameItem>{mu.visivel}</NameItem>
            <NameItem>{mu.fator_multiplicador}</NameItem>
            <NameItem>{mu.unidade_medida}</NameItem>

          </ItemUtr>
         
        )
        }


      </ListItemUtr>
      </Wrapper>
    </Container>
  );
};


export default ModelUtr;


