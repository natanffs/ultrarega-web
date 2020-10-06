import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'



import { Container, MenuItem, Button, Menu, MenuDropdown, Dropdown } from './styles';

interface permissionI {
  grupo_permissao: string,
  item_permissao: string
}

const Header: React.FC = () => {

  const history = useHistory();
  const [visibleCadastrar, setVisibleCadastrar] = useState(false)
  const [permissions, setPermissions] = useState<permissionI[]>([])
  const [visibleGestao, setVisibleGestao] = useState(false)

  useEffect(() => {
    const temp = localStorage.getItem('permissions_user')
    temp &&
    setPermissions(JSON.parse(temp))
  }, [])

  function onSubmit() {
    localStorage.removeItem('token')
    localStorage.removeItem('permissions_user')
    localStorage.removeItem('id_user')
    sessionStorage.removeItem('isAdmin')
    history.push('/login')
  }

  // função para procurar as permissões do usuario
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


      <Menu>
        <MenuItem to='/'>Tela Inicial</MenuItem>

        

        <MenuDropdown onClick={() => {
          visibleCadastrar ? setVisibleCadastrar(false) : setVisibleCadastrar(true)
          setVisibleGestao(false)
        }} className="dropdown">Cadastros
          <Dropdown style={{ display: visibleCadastrar ? 'flex' : 'none' }}>
            {findPermission("USUC") && <MenuItem onClick={() => { setVisibleCadastrar(false) }} to='/cadastros/usuarios'>Usuário</MenuItem>}
            {findPermission("PIVC") && <MenuItem onClick={() => { setVisibleCadastrar(false) }} to='/cadastros/pivos'>Pivos</MenuItem>}
            {findPermission("FAZC") && <MenuItem onClick={() => { setVisibleCadastrar(false) }} to='/cadastros/fazendas'>Fazenda</MenuItem>}
            {findPermission("MAQC") && <MenuItem  onClick={()=>{setVisibleCadastrar(false)}} to= '/cadastros/tratores'>Trator</MenuItem>}
            {findPermission("UTRC") && <MenuItem onClick={() => { setVisibleCadastrar(false) }} to='/cadastros/utrs'>UTRs</MenuItem>}
            
            { localStorage.getItem('isAdmin') === "1" && findPermission("MODUTRC") && <MenuItem onClick={() => { setVisibleCadastrar(false) }} to='/cadastros/modeloutr'>Modelo UTR</MenuItem>}
          
          </Dropdown>
        </MenuDropdown>

        <MenuDropdown onClick={() => {
          visibleGestao ? setVisibleGestao(false) : setVisibleGestao(true)
          setVisibleCadastrar(false)
        }} className="dropdown">Editar
          <Dropdown style={{ display: visibleGestao ? 'flex' : 'none' }}>
            {findPermission("USUR") && <MenuItem onClick={() => { setVisibleGestao(false) }} to='/usuarios'>Usuarios</MenuItem>}
            {findPermission("FAZR") && <MenuItem onClick={() => { setVisibleGestao(false) }} to='/fazendas'>Fazendas</MenuItem>}
            {/* <MenuItem  onClick={()=>{setVisibleConfiguracao(false)}} to= ''>Visualizações</MenuItem> */}
            {findPermission("PIVR") && <MenuItem onClick={() => { setVisibleGestao(false) }} to='/pivos'>Pivos</MenuItem>}
            {localStorage.getItem('isAdmin') === "1" &&findPermission("MODUTRR") && <MenuItem onClick={() => { setVisibleGestao(false) }} to='/modeloutr'>Modelo UTR</MenuItem>}
            {findPermission("MAQR") && <MenuItem onClick={()=>{setVisibleGestao(false)}} to= '/tratores'>Tratores</MenuItem>}
          </Dropdown>
        </MenuDropdown>


        <MenuItem onClick={() => { setVisibleGestao(false)
           setVisibleCadastrar(false)}} to='/usuario'>Perfil</MenuItem>




        <Button onClick={onSubmit}>Sair</Button>
      </Menu>




    </Container>
  );
};

export default Header
