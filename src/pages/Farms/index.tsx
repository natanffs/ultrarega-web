import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'

import { Container, FormFarm, ListUsers, CheckBox, Input, User, TextInput, Wrapper, ListFarms, Farm, Label, Labels, NameItem, Buttons, Button, } from './styles';


interface farmI {
  codigo_fazenda?: number,
  nome_fazenda?: string,
  cnpj?: string,
  inscricao_produtor?: string,
  localizacao_fazenda?: string,
  latitude?: number,
  longitude?: number,
  codigo_usuarios?: [number]
}

interface userI {
  codigo_usuario?: number,
  nome?: string,
  cpf?: string,
  numero_matricula?: number,
  senha?: string,
  telefone?: string,
  email?: string,


}
interface permissionI {
  grupo_permissao: string,
  item_permissao: string
}

const Farms: React.FC = () => {

  const [users, setUsers] = useState<userI[]>([])
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [farm, setFarm] = useState<farmI>({})
  const [farms, setFarms] = useState([])
  const [visibleForm, setVisibleForm] = useState(false)
  const [permissions, setPermissions] = useState<permissionI[]>([])

  useEffect(() => {
    loadFarms()
  }, [])
  useEffect(() => {
    const temp = localStorage.getItem('permissions_user')
    temp &&
      setPermissions(JSON.parse(temp))
  }, [])

  
  async function loadFarms() {

    localStorage.getItem('isAdmin') ?

      await api.get('farms', {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        setFarms(response.data)
      }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })

      :
      await api.get('farms' + localStorage.getItem('id_user'), {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        setFarms(response.data)
      }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
  }
  
// função para procurar as permissões do usuario
  function findPermission(permission: string) {
    let find = false
    permissions.map((p: permissionI) => {
      if (p.item_permissao === permission)
        find = true
    })
    return find
  }

// no momento não é permitido realizar açõ de deletar

  // async function deleteFarm({ codigo_fazenda }: farmI) {
  //   await api.delete('farms/' + codigo_fazenda, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //     }
  //   }).then((response) => {

  //     loadFarms()
  //     alert(`sucesso: ${response.data.message}`)

  //   }).catch((error) => {
  //     alert(`erro: ${error.data.message}`)

  //   })
  // }


  async function updateFarm() {
    await api.put('farms/' + farm.codigo_fazenda, {
      nome_fazenda: farm.nome_fazenda,
      cnpj: farm.cnpj,
      inscricao_produtor: farm.inscricao_produtor,
      localizacao_fazenda: farm.localizacao_fazenda,
      latitude: farm.latitude,
      longitude: farm.longitude,
      codigo_usuarios: selectedUsers
    }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((response) => {
      setVisibleForm(false)
      setFarm({})
      loadFarms()
      alert(`sucesso: ${response.data.message}`)

    }).catch((error) => {
      alert(`erro: ${error.data.message}`)

    })
  }



  return (
    <Container>
      <Header />
      <Wrapper>
        <h1>Fazendas</h1>
        <ListFarms>

          <Labels>
            <Label>Fazenda</Label>
            <Label>Referencia de localização</Label>

          </Labels>
          {farms.length > 0 && farms.map((f: farmI) =>

            <Farm key={f.codigo_fazenda} >
              <NameItem>{f.nome_fazenda}</NameItem>
              <NameItem>{f.localizacao_fazenda}</NameItem>

              <Buttons>
                {findPermission("FAZU") && <Button onClick={() => {
                      setFarm(f)
                      setVisibleForm(true)
                }}>Editar</Button>}
                {/* <Button onClick={() => { deleteFarm(f) }}>Excluir</Button> */}

              </Buttons>
            </Farm>


          )
          }
          {visibleForm &&

            <FormFarm >
              <Label >Fazenda</Label>
              <Input value={farm.nome_fazenda} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, nome_fazenda: text.target.value })} />
              <br />
              <Label >CNPJ</Label>
              <Input value={farm.cnpj} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, cnpj: text.target.value })} />
              <br />
              <Label>Inscrição do produtor</Label>
              <Input value={farm.inscricao_produtor} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, inscricao_produtor: text.target.value })} />
              <br />
              <Label>Referencia de localização</Label>
              <Input value={farm.localizacao_fazenda} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, localizacao_fazenda: text.target.value })} />
              <br />
              <Label>Latitude</Label>
              <Input value={farm.latitude} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, latitude: Number(text.target.value) })} />
              <br />
              <Label>Longitude</Label>
              <Input value={farm.longitude} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setFarm({ ...farm, longitude: Number(text.target.value) })} />
              <br />
              <ListUsers>
                <Label>Vincular usuários</Label>

                {users.length > 0 && users.map((u) =>
                  <User key={u.codigo_usuario}>
                    <CheckBox type="checkbox" value={u.codigo_usuario} onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                      if (text.target.checked) {
                        setSelectedUsers([...selectedUsers, Number(text.target.value)])
                      } else {
                        setSelectedUsers(selectedUsers.filter(su => su !== Number(text.target.value)))
                      }
                    }} />
                    <TextInput>{u.nome}</TextInput>
                  </User>)}
              </ListUsers>

              <br />
              <Button onClick={updateFarm}>Salvar</Button>
              <br />
            </FormFarm>

          }


        </ListFarms>
      </Wrapper>
    </Container>
  );
};

export default Farms;
