
import React, { useState } from 'react';
import{useHistory} from 'react-router-dom'

import { Container, MenuItem, Button, Menu, MenuDropdown,Dropdown } from './styles';

const HeaderAdmin: React.FC = () => {
  const history = useHistory();
  const [visibleCadastrar, setVisibleCadastrar] = useState(false)
  const [visiblePerfil, setVisiblePerfil] = useState(false)
  const [visibleConfiguracao, setVisibleConfiguracao] = useState(false)
  const [visibleEquipamentos, setVisibleEquipamentos] = useState(false)

  function onSubmit(){
      localStorage.removeItem('token')
      history.push('/login')
  }

//  o Header Admin não está sendo usado pois no momento as funções do administrados são as mesmas do usuário 
// conforme as permissões que possui

  return (
    <Container>

       
    </Container>
  );
};


export default HeaderAdmin;
