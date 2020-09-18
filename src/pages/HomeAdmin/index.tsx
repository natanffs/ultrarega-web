import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'


import { Container, Wrapper, ListUtr, Labels, Label, Utr, NameItem, } from './styles';
import Header from '../Header'
import api from '../../services/api'

interface calcsI {
  nome?: string,
  valor?: number,
  unidade_medida?: string
}

interface utrI {
  codigo_utr?: number,
  nome_pivo?: string,
  nome_fazenda?: string,
  posicao_angular?: number,
  angulo_inicio?: number,
  angulo_termino?: number,
  codigo_pivo?: number,
  capacidade_campo?: number,
  ponto_murcha?: number,
  taxa_lamina_atual?: number,
  potencial_hidrico?: number,
  informacao_sentido?: string,
  calcs?: calcsI[],
}



const HomeAdmin: React.FC = () => {


  const [utrs, setUtrs] = useState([])


  const history = useHistory()

  useEffect(() => {
    loadUtrs()
  }, [])

  async function loadUtrs() {
    await api.get('utrs/', {
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
            <Label>Lamina atual</Label>
            <Label>Capacidade de campo</Label>
            <Label>Potencial Hidrico</Label>
            <Label>Ponto de murcha</Label>
          </Labels>
          {utrs.length > 0 && utrs.map((u: utrI) =>
            <Utr key={u.codigo_utr}>
              <NameItem >{u.nome_fazenda}</NameItem>
              <NameItem onClick={()=>{history.push(`/utrs/${u.codigo_utr}`)}}>{u.nome_pivo}</NameItem>
              <NameItem>{`em ${u.posicao_angular} de ${u.angulo_inicio} até ${u.angulo_termino} sentido ${u.informacao_sentido}`}</NameItem>
              <NameItem>{u.taxa_lamina_atual}</NameItem>
              {u.calcs && <>
                <NameItem>{`${u.calcs[0]?.valor}${u.calcs[0]?.unidade_medida}`}</NameItem>
                <NameItem>{`${u.calcs[1]?.valor}${u.calcs[1]?.unidade_medida}`}</NameItem>
                <NameItem>{`${u.calcs[2]?.valor}${u.calcs[2]?.unidade_medida}`}</NameItem>
              </>}


            </Utr>
          )}
        </ListUtr>

      </Wrapper>
    </Container>
  );
};

export default HomeAdmin;
