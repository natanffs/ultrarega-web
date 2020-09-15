import React from 'react';
import Map from '../Map'
import { Container, Wrapper, WrapperMap, ListUtr, NameItem, Utr,  Labels, Label } from './styles';

import Header from '../Header'


const UtrList: React.FC = () => {
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
          
            <Utr>
              <NameItem>Jovem Pam</NameItem>
              <NameItem>Utr_001</NameItem>
            </Utr>
          
        </ListUtr>

      </Wrapper>
    </Container>
  );
};

export default UtrList;
