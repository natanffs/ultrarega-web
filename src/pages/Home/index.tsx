import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'

import { Container, Wrapper, ListUtr, Labels, Label, Utr, NameItem,  } from './styles';
import Header from '../Header'
import api from '../../services/api'

interface utrI {
  codigo_utr?: number,
  nome_pivo?: string,
  nome_fazenda?: string,
  posicao_angular?: number,
  angulo_inicial?: number,
  angulo_final?: number,  
  codigo_pivo?: number
 
}



const Home: React.FC = () => {

  
  const [utrs, setUtrs] = useState([])
  

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
      //setPivots(response.data)
    }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
  }

  

  

  
  return (

    <Container>
      <Header />

      <Wrapper>
        <ListUtr>
          <Labels>
            <Label>Fazenda</Label>
            <Label>Pivo</Label>
            <Label>Estado</Label>
            <Label>Capacidade de campo</Label>
            <Label>Potencial Hidrico</Label>
            <Label>Ponto de murcha</Label>
          </Labels>
          {utrs.length > 0 && utrs.map((u: utrI) =>
            <Utr>
              <NameItem >{u.nome_fazenda}</NameItem>
              <NameItem>{u.nome_utr_now}</NameItem>

            </Utr>
          )}
          <br />
         

        </ListUtr>

      </Wrapper>
    </Container>
  );
};

export default Home;
