import styled from 'styled-components';
import {Link} from 'react-router-dom'

export const Container = styled.div`
    width: 100%;
    height: 6vh;

    display: flex;
    
    position:fixed;
    top: 0;
    background-color: #5C84D2;
    align-items: center;
    justify-content:center;

`
export const Menu = styled.div`
    display: flex;
    flex-direction:row;
    width: 80vw;
    justify-content:space-between;
    align-items: center;

`

export const MenuItem = styled(Link)`
    text-decoration:none;
    color: white;
    font-size: 20px;
`


export const Button = styled.button`
    width: 80px;
    height: 4vh;
    background-color:red;

    color: white;
    font-size: 15px;

    justify-content:center;
    align-items:center;
    display:flex;
    
    border: none;
    border-radius: 5px;
`

