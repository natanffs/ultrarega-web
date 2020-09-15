import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'

import { Container,  ListPermissions, Labels, Label, Permission, NameItem,  Button, FormPermissions, Input } from './styles';


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

  async function registerModelUtr(){
    await api.post('modelUtrs',  {
      
      nome: itemUtr.nome,
      tipo: itemUtr.tipo,
      visivel: itemUtr.visivel,
      fator_multiplicador: itemUtr.fator_multiplicador,
      unidade_medida: itemUtr.unidade_medida
    },{
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((response)=>{
        
        setVisibleForm(false)
        loadModelUtr().then(()=>alert(`sucesso: ${response.data.message}`))
        

    }).catch((error)=>{
      alert(`erro: ${error.data.message}`)
      
    })
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
      {visibleForm &&
        <FormPermissions >
          <Label >Nome</Label>
          <Input value={itemUtr.nome} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setItemUtr({ ...itemUtr, nome: text.target.value })} />
         
          <Label >Tipo</Label>
          <Input value={itemUtr.tipo} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setItemUtr({ ...itemUtr, tipo: text.target.value })} />
         
          <Label >Visivel</Label>
          <Input value={itemUtr.visivel} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setItemUtr({ ...itemUtr, visivel: text.target.value })} />
         
          <Label >Fator multiplicador</Label>
          <Input value={itemUtr.fator_multiplicador} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setItemUtr({ ...itemUtr, fator_multiplicador: text.target.value })} />
         
          <Label >Unidade de medida</Label>
          <Input value={itemUtr.unidade_medida} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setItemUtr({ ...itemUtr, unidade_medida: text.target.value })} />
         
          <Button onClick={registerModelUtr}>Cadastrar</Button>
          <br/>
          <Button onClick={updateModelUtr}>Salvar</Button>
        </FormPermissions>
      }
      <ListPermissions>
        <Button onClick={() => setVisibleForm(true)}>Cadastrar novo campo</Button>
        <br/>
        <Labels>
          <Label>Codigo</Label>
          <Label>Nome</Label>

        </Labels>
        {modelUtr.length > 0 && modelUtr.map((mu: modeUtrI) =>

          <Permission key={mu.codigo_item} >
            <NameItem>{mu.codigo_item}</NameItem>
            <NameItem>{mu.nome}</NameItem>

            <Button onClick={() => {
               
                setItemUtr(mu)
                setVisibleForm(true)
              }}>Editar</Button>
          </Permission>
         
        )
        }


      </ListPermissions>
    </Container>
  );
};


export default ModelUtr;


