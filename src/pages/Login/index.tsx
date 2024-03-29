import React, { useEffect, useState } from 'react';
import api from '../../services/api'
import { useHistory, Redirect } from 'react-router-dom'

import { Container, Title, Label, Input, Button, LoginWrapper } from './styles';

interface permissionI {
  grupo_permissao: string,
  codigo_perissao: string
}

const Login: React.FC = () => {

  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')
  const history = useHistory()



  async function onSubmit() {
    await api.post('login', {
      email: email,
      password: senha
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }
    ).then(response => {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('id_user', JSON.stringify(response.data.user))
      localStorage.setItem('permissions_user', JSON.stringify(response.data.permissions))

      const permissions = response.data.permissions
      
      let isAdmin = false
      
      for (var i = 0; i < permissions.length; i++) {
        if (permissions[i].grupo_permissao === "000") {
          sessionStorage.setItem('isAdmin', 'true')
          isAdmin = true
        }
      }

      history.push('/home')


    }).catch(error => { console.log(error) })
  }

  return (<>{

    localStorage.getItem('token') ?

      <Redirect to="/home" /> :

      <Container>
        <Title>Login de Usuário</Title>
        <LoginWrapper>
          <Label>email:</Label>
          <Input name="email" value={email} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setEmail(text.target.value)} />
          <Label >senha:</Label>
          <Input name="password" type='password' value={senha} onChange={(text: React.ChangeEvent<HTMLInputElement>) => setSenha(text.target.value)} />
          <Button onClick={onSubmit}>Entrar</Button>
        </LoginWrapper>
      </Container>

  }
  </>
  );
};

export default Login;
