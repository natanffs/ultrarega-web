import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'


import { Container, Wrapper, ListUtr, Labels, Label, Utr, NameItem, } from './styles';
import Header from '../Header'
import api from '../../services/api'

interface calcsI {
    nome?: string,
    valor?: number,
    unidade_medida?: string
}

interface nowsI {
    nome?: string,
    valor?: string
}

interface utrI {
    codigo_utr?: number,
    nome_pivo?: string,
    nome_fazenda?: string,
    posicao_angular?: number,
    angulo_inicio?: number,
    angulo_termino?: number,
    codigo_pivo?: number,
    capacidade_campo?: number,
    taxa_lamina_atual?: number,
    ponto_murcha?: number,
    potencial_hidrico?: number,
    sentido?: string,
    calcs?: calcsI[],
    nows?: nowsI[]
}



const Home: React.FC = () => {

    const [utrs, setUtrs] = useState([])
    const [isAdmin, setIsAdmin] = useState('')

    const history = useHistory()

    useEffect(() => {
        loadUtrs()
    }, [])

    async function loadAllUtrs() {
        await api.get('utrs/', {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(response => {
            setUtrs(response.data)
            console.log(response.data)
        }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
    }

    async function loadUserUtrs() {
        await api.get('utrsbyUser/' + localStorage.getItem('id_user'), {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(response => {
            setUtrs(response.data)
        }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
    }

    async function loadUtrs() {
        await sessionStorage.getItem('isAdmin') ?

            await api.get('utrs/', {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(response => {
                setUtrs(response.data)
                console.log(response.data)
            }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })

            :

            await api.get('utrsbyUser/' + localStorage.getItem('id_user'), {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(response => {
                setUtrs(response.data)
            }).catch((error) => { console.log('Não foi possivel carregar os dados' + error) })
    }



    return (

        <Container>

            <Header />
            <Wrapper>
                <ListUtr>
                    <Labels>
                        <Label>Fazenda</Label>
                        <Label>Pivo</Label>
                        <Label>Estado</Label>
                        <Label>Lamina atual</Label>
                        <Label>Capacidade de campo</Label>
                        <Label>Potencial Hidrico</Label>
                        <Label>Ponto de murcha</Label>
                    </Labels>
                    {utrs.length > 0 && utrs.map((u: utrI) =>
                        <Utr key={u.codigo_utr}>
                            <NameItem >{u.nome_fazenda}</NameItem>
                            <NameItem onClick={() => { history.push(`/utrs/${u.codigo_utr}`) }}>{u.nome_pivo}</NameItem>
                            <NameItem>{`em ${u.nows?.find(n => n.nome === 'posicao_angular')?.valor} de ${u.angulo_inicio} até ${u.angulo_termino} sentido ${u.sentido}`}</NameItem>
                            <NameItem>{u.nows?.find(n => n.nome === 'taxa_lamina_atual')?.valor}mm</NameItem>
                            {u.calcs && <>
                                <NameItem>{`${u.calcs[0]?.valor}${u.calcs[0]?.unidade_medida}`}</NameItem>
                                <NameItem>{`${u.calcs[1]?.valor}${u.calcs[1]?.unidade_medida}`}</NameItem>
                                <NameItem>{`${u.calcs[2]?.valor}${u.calcs[2]?.unidade_medida}`}</NameItem>
                            </>}


                        </Utr>
                    )}
                </ListUtr>

            </Wrapper>
        </Container>
    );
};

export default Home;
