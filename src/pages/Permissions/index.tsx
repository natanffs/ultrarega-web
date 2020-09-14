import React, { useEffect, useState } from 'react';
import Header from '../Header'
import api from '../../services/api'

import { Container,  ListPermissions, Labels, Label, Permission, NameItem,  Button, FormPermissions, Input } from './styles';

interface permissionI{
  codigo_permissao?: number,
  nome?: string,
 
}

const Permissions: React.FC = () => {

  const [permission, setPermission] = useState<permissionI>({})
  const [permissions, setPermissions] = useState([])
  const [visibleForm, setVisibleForm] = useState(false)

  useEffect(() => {
    loadPermissions()
  }, [])

  async function loadPermissions() {
    await api.get('permissions', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setPermissions(response.data)
    }).catch((error)=>{console.log('Não foi possivel carregar os dados'+ error)})
  }

  async function registerPermission(){
    await api.post('permissions',  {
      
      nome: permission.nome,
    },{
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((response)=>{
        
        setVisibleForm(false)
        loadPermissions().then(()=>alert(`sucesso: ${response.data.message}`))
        

    }).catch((error)=>{
      alert(`erro: ${error.data.message}`)
      
    })
  }

  

  return (
    <Container>
      <Header />
      {visibleForm &&
        <FormPermissions >
          <Label >Nome</Label>
          <Input value={permission.nome} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setPermission({ ...permission, nome: text.target.value })} />
         
          <Button onClick={registerPermission}>Cadastrar</Button>
        </FormPermissions>
      }
      <ListPermissions>
        <Button onClick={() => setVisibleForm(true)}>Cadastrar nova permissão</Button>
        <Labels>
          <Label>Código</Label>
          <Label>Permissão</Label>

        </Labels>
        {permissions.length > 0 && permissions.map((p: permissionI) =>

          <Permission key={p.codigo_permissao} >
            <NameItem>{p.codigo_permissao}</NameItem>
            <NameItem>{p.nome}</NameItem>
          </Permission>
        )
        }


      </ListPermissions>
    </Container>
  );
};


export default Permissions;
