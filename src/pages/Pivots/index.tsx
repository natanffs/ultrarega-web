import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'
import { Container, ListPivots, Labels, Label, Pivot, NameItem, Buttons, Button } from './styles';

interface pivotI {
  codigo_pivo?: number,
  nome_pivo?: string,
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
  nome_fazenda?:string

}


interface farmI{
  codigo_fazenda?: number,
  nome_fazenda?: string,
  cnpj?: string,
  inscricao_produtor?: string,
  localizacao_fazenda?: string,
  latitude?: number,
  longitude?: number

}

const Pivots: React.FC = () => {

  const [farms, setFarms] = useState<farmI[]>([])
  const [pivot, setPivot] = useState<pivotI>({})
  const [pivots, setPivots] = useState([])
  const [visibleForm, setVisibleForm] = useState(false)



  useEffect(() => {
    loadPivots()
  }, [])

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

  

  // async function deletePivot({ codigo_pivo }: pivotI) {
  //   await api.delete('pivots/' + codigo_pivo, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //     }
  //   }).then((response) => {

  //     loadPivots()
  //     alert(`sucesso: ${response.data.message}`)

  //   }).catch((error) => {
  //     alert(`erro: ${error.data.message}`)

  //   })
  // }

  // async function updatePivot() {
  //   await api.put('pivots/' + pivot.codigo_pivo, {

  //     codigo_pivo: pivot.codigo_pivo,
  //     nome_pivo: pivot.nome_pivo,
  //     descricao: pivot.descricao,
  //     tipo_pivo: pivot.tipo_pivo,
  //     raio: pivot.raio,
  //     velocidade_maxima: pivot.velocidade_maxima,
  //     area_irrigada: pivot.area_irrigada,
  //     lamina: pivot.lamina,
  //     vazao_maxima: pivot.vazao_maxima,
  //     altura_centro: pivot.altura_centro,
  //     latitude_centro: pivot.latitude_centro,
  //     longitude_centro: pivot.longitude_centro,
  //     reversao: pivot.reversao,
  //     religamento_energia: pivot.religamento_energia,
  //     religamento_pressao: pivot.religamento_pressao,
  //     codigo_fazenda: pivot.codigo_fazenda

  //   }, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //     }
  //   }).then((response) => {

  //     setVisibleForm(false)
  //     loadPivots()
  //     alert(`sucesso: ${response.data.message}`)

  //   }).catch((error) => {
  //     alert(`erro: ${error.data.message}`)

  //   })
  // }

  // async function loadFarms() {
  //   await api.get('farms', {
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //     }
  //   }).then(response => {
  //     setFarms(response.data)
  //   }).catch((error)=>{console.log('Não foi possivel carregar os dados'+ error)})
  // }

  return (
    <Container>
      <Header />
      
      <ListPivots>
                <Labels>
          <Label>Pivô</Label>
          <Label>Fazenda</Label>

        </Labels>
        {pivots.length > 0 && pivots.map((p: pivotI) =>

          <Pivot key={p.codigo_pivo} >
            <NameItem>{p.nome_pivo}</NameItem>
            <NameItem>{p.nome_fazenda}</NameItem>

            <Buttons>
              <Button onClick={() => {
                
              }}>Editar</Button>
              {/* <Button onClick={() => { deletePivot(p) }}>Excluir</Button> */}

            </Buttons>
          </Pivot>
        )
        }


      </ListPivots>
    </Container>
  );
};

export default Pivots;
