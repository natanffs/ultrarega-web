import React, { useEffect, useState } from 'react';
import api from '../../services/api'
import Header from '../Header'

import { Container, Wrapper, WrapperCheckBox, Label, FormUtr, Input, Select, Option, ListUtrs, Utrs, CheckBox, TextInput, Button } from './styles';

interface pivotI {
  codigo_pivo?: number,
  nome_pivo?: string,


}

interface modeUtrI {
  codigo_item?: number,
  nome?: string,
  tipo?: string,
  visivel?: string,
  fator_multiplicador?: string,
  unidade_medida?: string

}

interface utrI {
  descricao?: string,
  codigo_pivo?: number
}
interface visibleModelI{
  codigo_item?: number,
  nome?: string,
  ordem_item?:number
}

const UtrRegister: React.FC = () => {

  const [selectedVisibleModel, setSelectedVisibleModel] = useState<visibleModelI[]>([])
  const [selectedModels, setSelectedModels] = useState<number[]>([])
  const [selectedModelsNames, setSelectedModelsNames] = useState<string[]>([])
  const [modelUtrs, setModelUtrs] = useState([])
  const [pivots, setPivots] = useState([])
  const [utr, setUtr] = useState<utrI>({})

 

  useEffect(() => {
    loadModelUtrs()
    loadPivots()
  }, [])

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

  async function registerUtr() {


    await api.post('utrs', {

      descricao: utr.descricao,
      codigo_pivo: utr.codigo_pivo,
      codigo_itens: selectedModels,
      itens_visiveis: selectedVisibleModel
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
      <Header />
      <Wrapper>
        <h1>Cadastrar UTR</h1>
        <FormUtr >
          <Label >Descrição</Label>
          <Input value={utr.descricao} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setUtr({ ...utr, descricao: text.target.value })} />
          <br />
          <Label >Vincular Pivo</Label>

          <Select onChange={(text) => setUtr({ ...utr, codigo_pivo: Number(text.target.value) })}>
            <Option selected>Selecione</Option>
            {pivots.length > 0 && pivots.map((p: pivotI) =>
              <Option key={p.codigo_pivo} value={p.codigo_pivo}>{p.nome_pivo}</Option>
            )}
          </Select>
          <br />

          <ListUtrs>
            <Label>Vincular Itens da UTR</Label>
            {modelUtrs.length > 0 && modelUtrs.map((mu: modeUtrI) =>
              <Utrs key={mu.codigo_item}>
                <WrapperCheckBox>
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
                </WrapperCheckBox>
                <WrapperCheckBox>
                  <CheckBox type="checkbox" value={mu.codigo_item} onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    if (text.target.checked) {
                     setSelectedVisibleModel([...selectedVisibleModel, {codigo_item:Number(text.target.value), nome: mu.nome} ])
                    

                    } else {
                      setSelectedVisibleModel(selectedVisibleModel.filter(sm => sm.codigo_item !== Number(text.target.value)))
                   
                    }
                  }} />
                  <TextInput>Visivel</TextInput>
                  
                </WrapperCheckBox>
               


              </Utrs>)}
            <br />
            <Label>Ordenar exibição de campos (a ordem de exibição se inicia em 1 )</Label>

            <ListUtrs>
              {selectedVisibleModel.length>0  && selectedVisibleModel.map((vm:visibleModelI) => { return(
                <Utrs key={vm.codigo_item}>
                <WrapperCheckBox >
                  <TextInput>{vm.nome}</TextInput>
                  <Input value={vm.ordem_item ? vm.ordem_item :  vm.ordem_item = 0} onChange={(text: React.ChangeEvent<HTMLInputElement>)=>{// var inde = selectedVisibleModel.indexOf( {codigo_item: vm.codigo_item})
                    setSelectedVisibleModel(selectedVisibleModel.map(( selected: visibleModelI, index:number)=>{
                     if(selected.codigo_item === vm.codigo_item){
                         selected.ordem_item = Number(text.target.value)
                     }
                   
                     return selected
                     
                   }))
                   }
                  }/>
                </WrapperCheckBox>
                </Utrs>
              )})


              }
              
            </ListUtrs>
           <br/>
            <Button onClick={registerUtr}>Cadastrar</Button>
            <br/>
          </ListUtrs>

        </FormUtr>


      </Wrapper>
    </Container>
  );
};

export default UtrRegister;
