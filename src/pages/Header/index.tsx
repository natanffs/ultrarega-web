import React from 'react';
import{useHistory} from 'react-router-dom'

import { Container, MenuItem, Button, Menu } from './styles';

const Header: React.FC = () => {

  const history = useHistory();

  function onSubmit(){
      localStorage.removeItem('token')
      history.push('/login')
  }
  return (
    <Container>
      <Menu>
        <MenuItem to='/'>Tela Inicial</MenuItem>
        <MenuItem to='/usuarios'>Usuários</MenuItem>
        <MenuItem to='/permissoes'>Permissões</MenuItem>
        <MenuItem  to='/pivos'>Pivos</MenuItem>
        <MenuItem  to='/fazendas'>Fazendas</MenuItem>
        <Button onClick={onSubmit}>Sair</Button>
        </Menu>
    </Container>
  );
};

export default Header;
