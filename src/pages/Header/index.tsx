import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'


import { Container, MenuItem, Button, Menu, MenuDropdown, Dropdown } from './styles';

const Header: React.FC = () => {

  const history = useHistory();
  const [visibleCadastrar, setVisibleCadastrar] = useState(false)
  const [visiblePerfil, setVisiblePerfil] = useState(false)
  const [visibleConfiguracao, setVisibleConfiguracao] = useState(false)
  const [visibleEquipamentos, setVisibleEquipamentos] = useState(false)

  function onSubmit() {
    localStorage.removeItem('token')
    history.push('/login')
  }
  return (
    <Container>




      <Menu>
        <MenuItem to='/'>Tela Inicial</MenuItem>

        

        <MenuDropdown onClick={() => {
          visibleCadastrar ? setVisibleCadastrar(false) : setVisibleCadastrar(true)
          setVisibleConfiguracao(false)
          setVisibleEquipamentos(false)
          setVisiblePerfil(false)
        }} className="dropdown">Cadastros
          <Dropdown style={{ display: visibleCadastrar ? 'flex' : 'none' }}>
            <MenuItem onClick={() => { setVisibleCadastrar(false) }} to='/cadastros/usuarios'>Usuário</MenuItem>
            <MenuItem onClick={() => { setVisibleCadastrar(false) }} to='/cadastros/pivos'>Pivos</MenuItem>
            <MenuItem onClick={() => { setVisibleCadastrar(false) }} to='/cadastros/fazendas'>Fazenda</MenuItem>
            <MenuItem  onClick={()=>{setVisibleCadastrar(false)}} to= '/cadastros/tratores'>Trator</MenuItem>
            <MenuItem onClick={() => { setVisibleCadastrar(false) }} to='/cadastros/utrs'>UTRs</MenuItem>
            <MenuItem onClick={() => { setVisibleCadastrar(false) }} to='/cadastros/modeloutr'>Modelo UTR</MenuItem>
          </Dropdown>
        </MenuDropdown>

        <MenuDropdown onClick={() => {
          visiblePerfil ? setVisiblePerfil(false) : setVisiblePerfil(true)
          setVisibleCadastrar(false)
          setVisibleEquipamentos(false)
          setVisibleConfiguracao(false)
        }} className="dropdown">Gestão
          <Dropdown style={{ display: visiblePerfil ? 'flex' : 'none' }}>
            <MenuItem onClick={() => { setVisiblePerfil(false) }} to='/usuarios'>Usuarios</MenuItem>
            <MenuItem onClick={() => { setVisiblePerfil(false) }} to='/fazendas'>Fazendas</MenuItem>
            {/* <MenuItem  onClick={()=>{setVisibleConfiguracao(false)}} to= ''>Visualizações</MenuItem> */}
            <MenuItem onClick={() => { setVisibleEquipamentos(false) }} to='/pivos'>Pivos</MenuItem>
            <MenuItem onClick={() => { setVisibleEquipamentos(false) }} to='/modeloutr'>Modelo UTR</MenuItem>
            <MenuItem onClick={()=>{setVisibleEquipamentos(false)}} to= '/tratores'>Tratores</MenuItem>
          </Dropdown>
        </MenuDropdown>


        <MenuItem onClick={() => { setVisibleConfiguracao(false) }} to='/usuario'>Perfil</MenuItem>




        <Button onClick={onSubmit}>Sair</Button>
      </Menu>




    </Container>
  );
};

export default Header;
