import React, { useState } from 'react';
import{useHistory} from 'react-router-dom'


import { Container, MenuItem, Button, Menu, MenuDropdown,Dropdown } from './styles';

const Header: React.FC = () => {

  const history = useHistory();
  const [visibleCadastrar, setVisibleCadastrar] = useState(false)
  const [visiblePerfil, setVisiblePerfil] = useState(false)
  const [visibleConfiguracao, setVisibleConfiguracao] = useState(false)
  const [visibleEquipamentos, setVisibleEquipamentos] = useState(false)

  function onSubmit(){
      localStorage.removeItem('token')
      history.push('/login')
  }
  return (
    <Container>
      

       
 
       <Menu>
        <MenuItem to='/'>Tela Inicial</MenuItem>
        
        <MenuDropdown onClick={()=>{
          visibleEquipamentos? setVisibleEquipamentos(false) : setVisibleEquipamentos(true)
                        setVisibleCadastrar(false)
                        setVisibleConfiguracao(false)
                        setVisiblePerfil(false)
          }} className="dropdown">Equipamentos 
          <Dropdown style={{display: visibleEquipamentos ? 'flex' : 'none'}}>
            <MenuItem onClick={()=>{setVisibleEquipamentos(false)}} to= '/admin/pivos'>Pivos</MenuItem>
            {/* <MenuItem onClick={()=>{setVisibleEquipamentos(false)}} to= '/tratores'>Tratores</MenuItem> */}
           
          </Dropdown>
        </MenuDropdown>

        <MenuDropdown onClick={()=>{
          visibleCadastrar? setVisibleCadastrar(false): setVisibleCadastrar(true)
                        setVisibleConfiguracao(false)
                        setVisibleEquipamentos(false)
                        setVisiblePerfil(false)
          }} className="dropdown">Cadastros 
          <Dropdown style={{display: visibleCadastrar ? 'flex' : 'none'}}>
            <MenuItem onClick={()=>{setVisibleCadastrar(false)}} to= '/admin/cadastros/usuarios'>Usuário</MenuItem>
            <MenuItem  onClick={()=>{setVisibleCadastrar(false)}} to= '/admin/cadastros/pivos'>Pivos</MenuItem>
            <MenuItem  onClick={()=>{setVisibleCadastrar(false)}} to= '/cadastros/fazendas'>Fazenda</MenuItem>
            {/* <MenuItem  onClick={()=>{setVisibleCadastrar(false)}} to= '/cadastros/tratores'>Trator</MenuItem> */}
            <MenuItem  onClick={()=>{setVisibleCadastrar(false)}} to= '/cadastros/utrs'>Utrs</MenuItem>
          </Dropdown>
        </MenuDropdown>

        <MenuDropdown onClick={()=>{
          visiblePerfil? setVisiblePerfil(false): setVisiblePerfil(true)
                        setVisibleCadastrar(false)
                        setVisibleEquipamentos(false)
                        setVisibleConfiguracao(false)
          }} className="dropdown">Perfil
          <Dropdown style={{display: visiblePerfil ? 'flex' : 'none'}}>
            <MenuItem onClick={()=>{setVisiblePerfil(false)}} to= '/usuarios/:id'>Meu Perfil</MenuItem>
            <MenuItem  onClick={()=>{setVisiblePerfil(false)}} to= '/fazendas'>Fazendas</MenuItem>
           
          </Dropdown>
        </MenuDropdown>

        <MenuDropdown onClick={()=>{
                        visibleConfiguracao? setVisibleConfiguracao(false): setVisibleConfiguracao(true)
                        setVisibleCadastrar(false)
                        setVisibleEquipamentos(false)
                        setVisiblePerfil(false)
                      }} className="dropdown">Configurações
          <Dropdown style={{display: visibleConfiguracao ? 'flex' : 'none'}}>
            {/* as opcoes abaixo estao sem rota definida */}
            <MenuItem onClick={()=>{setVisibleConfiguracao(false)}} to= ''>Usuarios</MenuItem> 
            <MenuItem  onClick={()=>{setVisibleConfiguracao(false)}} to= ''>Visualizações</MenuItem>
           
          </Dropdown>
        </MenuDropdown>
        
        <Button onClick={onSubmit}>Sair</Button>
        </Menu>

      
        
        
    </Container>
  );
};

export default Header;
