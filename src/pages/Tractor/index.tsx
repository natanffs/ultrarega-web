import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'
import { Container, Wrapper, ListTractors, Labels, Label, Tracto, NameItem, Buttons, Button } from './styles';

interface tractorI {
  codigo_maquina?:number,
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

    localStorage.getItem('isAdmin')?

    await api.get('tractors', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setTractors(response.data)
    }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })

    :

    await api.get('tractors'+localStorage.getItem('id_user'), {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setTractors(response.data)
    }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
  }

  function findPermission(permission:string){
    let find = false
      permissions.map((p:permissionI)=>{
          if(p.item_permissao === permission) 
         find = true
      })
      return find
  }

  return (
    <Container>
      <Header/>
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
               
              }}>Editar</Button>}
              {/* <Button onClick={() => { deleteTracto(p) }}>Excluir</Button> */}

            </Buttons>
          </Tracto>
        )
        }


      </ListTractors>

      </Wrapper>
      

    </Container>
  );
};

export default Tractor;
