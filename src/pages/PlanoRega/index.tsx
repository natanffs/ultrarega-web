import React, {useState, useEffect} from 'react';

import { Container, Wrapper,WrapperCheckBox, Label, FormUtr, Input, Select, Option, ListUtrs, Utrs,CheckBox, TextInput, Button  } from './styles';

interface planoRegaI{
  percentimetro?: number,
  angulo_inicio?:number,
  angulo_termino?: number
}

const PlanoRega: React.FC = () => {

  const [planoRega, setPlanoRega] = useState<planoRegaI>({})

  return (
    <Container>
       <Wrapper>
        <h1>Cadastrar UTR</h1>
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
         
          <br />
          </FormUtr>

         </Wrapper>? 
    </Container>
  );
};

export default PlanoRega;
