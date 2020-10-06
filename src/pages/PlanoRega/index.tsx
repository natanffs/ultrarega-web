import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import Header from '../Header'

import { Container, Wrapper, WrapperCheckBox, Label, FormUtr, Input, Select, Option, ListUtrs, Utrs, CheckBox, TextInput, Button } from './styles';

interface planoRegaI {
  percentimetro?: number,
  angulo_inicio?: number,
  angulo_termino?: number
}

const PlanoRega: React.FC = () => {

  const [planoRega, setPlanoRega] = useState<planoRegaI>({})
  const [, , codigo_utr] = window.location.pathname.split('/')

  async function registerUtr() {


    await api.post('turnosrega/'+codigo_utr, {

      percentimetro: planoRega.percentimetro,
      angulo_inicio: planoRega.angulo_inicio,
      angulo_termino: planoRega.angulo_termino
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
        <h1>Cadastrar plano de rega</h1>
        <FormUtr >
          <Label >Percentimetro</Label>
          <Input value={planoRega.percentimetro} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPlanoRega({ ...planoRega, percentimetro: Number(text.target.value) })} />
          <br />
          <Label >Angulo de Inicio</Label>
          <Input value={planoRega.angulo_inicio} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPlanoRega({ ...planoRega, angulo_inicio: Number(text.target.value) })} />
          <br />
          <Label >Angulo Final</Label>
          <Input value={planoRega.angulo_termino} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPlanoRega({ ...planoRega, angulo_termino: Number(text.target.value) })} />
          <br />
          <Button onClick={registerUtr}>Cadastrar</Button>
          <br />
        </FormUtr>

      </Wrapper>
    </Container>
  );
};

export default PlanoRega;
