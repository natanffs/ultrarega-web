import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'
import { Container,FormPivot, Input, TextInput, Select, Option, ListPivots, Labels, Label, Pivot, NameItem, Buttons, Button } from './styles';

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
  nome_fazenda?: string

}


interface farmI {
  codigo_fazenda?: number,
  nome_fazenda?: string,
  cnpj?: string,
  inscricao_produtor?: string,
  localizacao_fazenda?: string,
  latitude?: number,
  longitude?: number

}
interface permissionI {
  grupo_permissao: string,
  item_permissao: string
}


const Pivots: React.FC = () => {

  const [farms, setFarms] = useState<farmI[]>([])
  const [pivot, setPivot] = useState<pivotI>({})
  const [pivots, setPivots] = useState([])
  const [visibleForm, setVisibleForm] = useState(false)
  const [permissions, setPermissions] = useState<permissionI[]>([])


  useEffect(() => {
    loadPivots()
  }, [])
  useEffect(() => {
    const temp = localStorage.getItem('permissions_user')
    temp &&
      setPermissions(JSON.parse(temp))
  }, [])

  async function loadPivots() {

    localStorage.getItem('isAdmin') ?

      await api.get('pivots', {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        setPivots(response.data)
      }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })

      :

      await api.get('pivots' + localStorage.getItem('id_user'), {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        setPivots(response.data)
      }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
  }

  function findPermission(permission: string) {
    let find = false
    permissions.map((p: permissionI) => {
      if (p.item_permissao === permission)
        find = true
    })
    return find
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

  async function updatePivot() {
    await api.put('pivots/' + pivot.codigo_pivo, {

      codigo_pivo: pivot.codigo_pivo,
      nome_pivo: pivot.nome_pivo,
      descricao: pivot.descricao,
      tipo_pivo: pivot.tipo_pivo,
      raio: pivot.raio,
      velocidade_maxima: pivot.velocidade_maxima,
      area_irrigada: pivot.area_irrigada,
      lamina: pivot.lamina,
      vazao_maxima: pivot.vazao_maxima,
      altura_centro: pivot.altura_centro,
      latitude_centro: pivot.latitude_centro,
      longitude_centro: pivot.longitude_centro,
      reversao: pivot.reversao,
      religamento_energia: pivot.religamento_energia,
      religamento_pressao: pivot.religamento_pressao,
      codigo_fazenda: pivot.codigo_fazenda

    }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((response) => {

      setVisibleForm(false)
      loadPivots()
      alert(`sucesso: ${response.data.message}`)

    }).catch((error) => {
      alert(`erro: ${error.data.message}`)

    })
  }

  async function loadFarms() {
    await api.get('farms', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setFarms(response.data)
    }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
  }

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
              {findPermission("PIVU") && <Button onClick={() => {
                setVisibleForm(true)
                setPivot(p)
                loadFarms()
              }}>Editar</Button>}
              {/* <Button onClick={() => { deletePivot(p) }}>Excluir</Button> */}

            </Buttons>
          </Pivot>
        )
        }

        {visibleForm &&

          <FormPivot >
            <TextInput >Nome</TextInput>
            <Input value={pivot.nome_pivo} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, nome_pivo: text.target.value })} />
            <br />
            <TextInput >Descricão</TextInput>
            <Input value={pivot.descricao} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, descricao: text.target.value })} />
            <br />
            <TextInput>Velocidade Maxima</TextInput>
            <Input value={pivot.velocidade_maxima} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, velocidade_maxima: Number(text.target.value) })} />
            <br />
            <TextInput>Area irrigada</TextInput>
            <Input value={pivot.area_irrigada} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, area_irrigada: Number(text.target.value) })} />
            <br />
            <TextInput>Lamina</TextInput>
            <Input value={pivot.lamina} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, lamina: text.target.value })} />
            <br />
            <TextInput>Vazão maxima</TextInput>
            <Input value={pivot.vazao_maxima} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, vazao_maxima: text.target.value })} />
            <br />
            <TextInput>Altura do centro</TextInput>
            <Input value={pivot.altura_centro} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, altura_centro: Number(text.target.value) })} />
            <br />
            <TextInput>Latitude do centro</TextInput>
            <Input value={pivot.latitude_centro} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, latitude_centro: Number(text.target.value) })} />
            <br />
            <TextInput>Longitude do centro</TextInput>
            <Input value={pivot.longitude_centro} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, longitude_centro: Number(text.target.value) })} />
            <br />
            <TextInput>Reversão</TextInput>
            <Input value={pivot.reversao} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, reversao: text.target.value })} />
            <br />
            <TextInput>Religamento de energia</TextInput>
            <Input value={pivot.religamento_energia} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, religamento_energia: text.target.value })} />
            <br />
            <TextInput>Religamento por pressao</TextInput>
            <Input value={pivot.religamento_pressao} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPivot({ ...pivot, religamento_pressao: text.target.value })} />
            <br />
            <TextInput>Vincula fazenda</TextInput>
            <Select onChange={(text) => setPivot({ ...pivot, codigo_fazenda: Number(text.target.value) })}>
              {farms.length > 0 && farms.map((f: farmI) =>
                <Option key={f.codigo_fazenda} value={f.codigo_fazenda}>{f.nome_fazenda}</Option>
              )}


            </Select>
            <br />
            <Button onClick={updatePivot}>Salvar</Button>
            <br />

          </FormPivot>
        }


      </ListPivots>
    </Container>
  );
};

export default Pivots;
