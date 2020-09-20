import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'
import { Container, Wrapper, ListTractors, Input, FormTractor, TextInput, Labels, Label, Tracto, NameItem, Buttons, Button } from './styles';
interface tractorI {
  codigo_maquina?: number,
  nome?: string,
  combustivel?: string,
  tacometro?: number,
  temperatura?: number,
  bateria?: string,
  tpd?: string,
  filtro_ar?: string,
  oleo_lubrificante?: string,
  horimetro?: number,
  pressao_motor?: number,
  nivel_fluido_freios?: number,
  velocidade_engrenada?: number,
  tomada_forca?: string,
  porcentagem_planagem?: number,
  desbloqueio_diferencial?: string
}

interface permissionI {
  grupo_permissao: string,
  item_permissao: string
}

const Tractor: React.FC = () => {

  const [visibleForm, setVisibleForm] = useState(false)
  const [tractor, setTractor] = useState<tractorI>()
  const [tractors, setTractors] = useState([])
  const [permissions, setPermissions] = useState<permissionI[]>([])

  useEffect(() => {
    loadTractors()
  }, [])

  useEffect(() => {
    const temp = localStorage.getItem('permissions_user')
    temp &&
      setPermissions(JSON.parse(temp))
  }, [])

  async function loadTractors() {

    localStorage.getItem('isAdmin') ?

      await api.get('tractors', {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        setTractors(response.data)
      }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })

      :

      await api.get('tractors' + localStorage.getItem('id_user'), {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        setTractors(response.data)
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

  async function updateTractor() {

    await api.post('tractors' + tractor?.codigo_maquina, {

     
      nome: tractor?.nome ,
      combustivel: tractor?.combustivel ,
      tacometro:tractor?.tacometro ,
      temperatura:tractor?.temperatura ,
      bateria: tractor?.bateria ,
      tpd: tractor?.tpd ,
      filtro_ar: tractor?.filtro_ar ,
      oleo_lubrificante: tractor?.oleo_lubrificante ,
      horimetro:tractor?.horimetro ,
      pressao_motor:tractor?.pressao_motor ,
      nivel_fluido_freios:tractor?.nivel_fluido_freios ,
      velocidade_engrenada:tractor?.velocidade_engrenada ,
      tomada_forca: tractor?.tomada_forca ,
      porcentagem_planagem: tractor?.porcentagem_planagem ,
      desbloqueio_diferencial: tractor?.desbloqueio_diferencial ,

    }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {

      setVisibleForm(false)
      setTractor({})
      loadTractors()
      console.log(response.data.message)
    }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })

  }
  return (
    <Container>
      <Header />
      <Wrapper>
        <h1>Tratores</h1>

        <ListTractors>
          <Labels>
            <Label>Nome</Label>
            <Label>Combustivel</Label>

          </Labels>
          {tractors.length > 0 && tractors.map((t: tractorI) =>

            <Tracto key={t.codigo_maquina} >
              <NameItem>{t.nome}</NameItem>
              <NameItem>{t.combustivel}</NameItem>

              <Buttons>
                {findPermission("MAQU") && <Button onClick={() => {
                  setVisibleForm(true)
                  setTractor(t)
                }}>Editar</Button>}
                {/* <Button onClick={() => { deleteTracto(p) }}>Excluir</Button> */}

              </Buttons>
            </Tracto>
          )
          }

          {visibleForm &&
            <FormTractor>
              <TextInput >Nome</TextInput>
              <Input value={tractor?.nome}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  setTractor({ ...tractor, nome: text.target.value })} />
              <br />
              <TextInput >Combustivel</TextInput>
              <Input value={tractor?.combustivel}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  setTractor({ ...tractor, combustivel: text.target.value })} />
              <br />
              <TextInput >Tacometro</TextInput>
              <Input value={tractor?.tacometro}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  setTractor({ ...tractor, tacometro: Number(text.target.value) })} />
              <br />
              <TextInput >Temperatura</TextInput>
              <Input value={tractor?.temperatura}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  setTractor({ ...tractor, temperatura: Number(text.target.value) })} />
              <br />
              <TextInput >Bateria</TextInput>
              <Input value={tractor?.bateria}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  setTractor({ ...tractor, bateria: text.target.value })} />
              <br />
              <TextInput >TPD</TextInput>
              <Input value={tractor?.tpd}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  setTractor({ ...tractor, tpd: text.target.value })} />
              <br />
              <TextInput >Filtro de ar</TextInput>
              <Input value={tractor?.filtro_ar}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  setTractor({ ...tractor, filtro_ar: text.target.value })} />
              <br />
              <TextInput >Oleo Lubrificante</TextInput>
              <Input value={tractor?.oleo_lubrificante}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  setTractor({ ...tractor, oleo_lubrificante: text.target.value })} />
              <br />
              <TextInput >Horimetro</TextInput>
              <Input value={tractor?.horimetro}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  setTractor({ ...tractor, horimetro: Number(text.target.value) })} />
              <br />
              <TextInput >Pressão do motor</TextInput>
              <Input value={tractor?.pressao_motor}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  setTractor({ ...tractor, pressao_motor: Number(text.target.value) })} />
              <br />
              <TextInput >Nivel de fluido de freios</TextInput>
              <Input value={tractor?.nivel_fluido_freios}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  setTractor({ ...tractor, nivel_fluido_freios: Number(text.target.value) })} />
              <br />
              <TextInput >Velocidade engrenada</TextInput>
              <Input value={tractor?.velocidade_engrenada}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  setTractor({ ...tractor, velocidade_engrenada: Number(text.target.value) })} />
              <br />
              <TextInput >Tomada Força</TextInput>
              <Input value={tractor?.tomada_forca}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  setTractor({ ...tractor, tomada_forca: text.target.value })} />
              <br />
              <TextInput >Porcentagem de planagem</TextInput>
              <Input value={tractor?.porcentagem_planagem}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  setTractor({ ...tractor, porcentagem_planagem: Number(text.target.value) })} />
              <br />
              <TextInput >Desbloqieio diferencial</TextInput>
              <Input value={tractor?.desbloqueio_diferencial}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  setTractor({ ...tractor, desbloqueio_diferencial: text.target.value })} />
              <br />

              <Button onClick={updateTractor}>Salvar</Button>
              <br />
            </FormTractor>
          }


        </ListTractors>

      </Wrapper>


    </Container>
  );
};

export default Tractor;
