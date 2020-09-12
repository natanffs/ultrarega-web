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
        <MenuItem to='/'>Usuários</MenuItem>
        <MenuItem  to='/pivot'>Pivos</MenuItem>
        <MenuItem  to='/'>Fazendas</MenuItem>
        <Button onClick={onSubmit}>Sair</Button>
        </Menu>
    </Container>
  );
};

export default Header;
