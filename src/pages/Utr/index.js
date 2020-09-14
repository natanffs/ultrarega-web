import React, { useState, useEffect } from 'react';

import { Container, Farm, NameItem, Labels, Label } from './styles';
import Header from '../Header'
import api from '../../services/api'
import { connect, disconnect, subscribeToNewUsers, listenUpdates } from '../../services/socket.js'

const Utr = () => {
  const [socket, setSocket] = useState(connect())
  const [utr, setUtr] = useState({})
  const [, , codigo_utr] = window.location.pathname.split('/')

  useEffect(() => {
    loadUtr(Number(codigo_utr))
  }, [])

  useEffect(() => {
    if (socket && utr)
      setupWebSocket()
  }, [utr])

  function setupWebSocket() {
    socket.on(`utr-update-${codigo_utr}`, update => {
      setUtr(update)
    })
  }

  async function loadUtr(codigo_utr) {
    await api.get('utr/' + codigo_utr, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setUtr(response.data)
    }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })

  }

  function iterateJson() {
    let names = `${Object.keys(utr)}`
    let values = `${Object.values(utr)}`

    let vetnames = names.split(',')
    let vetvalues = values.split(',')

    let arrayzao = []

    for (let i = 1; i < vetnames.length; i++) {
      arrayzao.push({
        name: vetnames[i],
        value: vetvalues[i]
      })
    }

    return arrayzao
  }

  return (<>

    <Container>
      <Header />
      
      <Labels>
        <Label>Nome</Label>
        <Label>Valor</Label>

      </Labels>
      {
        iterateJson().map(item => (
          <Farm >
            <NameItem>{item.name}</NameItem>
            <NameItem>{item.value}</NameItem>
          </Farm>
        ))

      }

    </Container>
  </>);
};

export default Utr;
