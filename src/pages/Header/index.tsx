import React, { useState } from 'react';
import{useHistory} from 'react-router-dom'


import { Container, MenuItem, Button, Menu, MenuDropdown,Dropdown } from './styles';

const Header: React.FC = () => {

  const history = useHistory();
  const [visibleCadastrar, setVisibleCadastrar] = useState(false)
  const [visiblePerfil, setVisiblePerfil] = useState(false)
  const [visibleEquipamentos, setVisibleEquipamentos] = useState(false)

  function onSubmit(){
      localStorage.removeItem('token')
      history.push('/login')
  }
  return (
    <Container>
      {/* <Menu>
        <MenuItem to='/'>Tela Inicial</MenuItem>
        <MenuItem to='/usuarios'>Usuários</MenuItem>
        <MenuItem to='/permissoes'>Permissões</MenuItem>
        <MenuItem to='/modeloutr'>Modelo Utr</MenuItem>
        <MenuItem  to='/pivos'>Pivos</MenuItem>
        <MenuItem  to='/fazendas'>Fazendas</MenuItem>
        <Button onClick={onSubmit}>Sair</Button>
        </Menu> */}

        <Menu>
        <MenuItem to='/'>Tela Inicial</MenuItem>
        <MenuDropdown onClick={()=>{visibleEquipamentos? setVisibleEquipamentos(false) : setVisibleEquipamentos(true)}} className="dropdown">Equipamentos 
          <Dropdown style={{display: visibleEquipamentos ? 'flex' : 'none'}}>
            <MenuItem onClick={()=>{setVisibleEquipamentos(false)}} to= ''>Pivo</MenuItem>
           
          </Dropdown>
        </MenuDropdown>

        <MenuDropdown onClick={()=>{visibleCadastrar? setVisibleCadastrar(false): setVisibleCadastrar(true)}} className="dropdown">Cadastros 
          <Dropdown style={{display: visibleCadastrar ? 'flex' : 'none'}}>
            <MenuItem onClick={()=>{setVisibleCadastrar(false)}} to= ''>Usuário</MenuItem>
            <MenuItem  onClick={()=>{setVisibleCadastrar(false)}} to= ''>Pivos</MenuItem>
            <MenuItem  onClick={()=>{setVisibleCadastrar(false)}} to= ''>Fazenda</MenuItem>
          </Dropdown>
        </MenuDropdown>

        <MenuDropdown onClick={()=>{visiblePerfil? setVisiblePerfil(false): setVisiblePerfil(true)}} className="dropdown">Perfil
          <Dropdown style={{display: visiblePerfil ? 'flex' : 'none'}}>
            <MenuItem onClick={()=>{setVisiblePerfil(false)}} to= ''>Meu Perfil</MenuItem>
            <MenuItem  onClick={()=>{setVisiblePerfil(false)}} to= ''>Fazendas</MenuItem>
           
          </Dropdown>
        </MenuDropdown>
        
        <MenuItem to= 'Perfil'></MenuItem>
        </Menu>
    </Container>
  );
};

export default Header;
