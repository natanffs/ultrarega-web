import styled from 'styled-components';
import { Link } from 'react-router-dom'

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
export const MenuDropdown = styled.button`
    background-color: transparent;
    position: relative;
    display: flex;
    color: white;
    padding: 16px;
    color: white;
    font-size: 20px;
    
    font-size: 16px;
    border: none;
    flex-direction:column;

    :hover{
        border:none;
    }
    :active{
        border: none;
    }
    
    

`
export const Dropdown = styled.div`
    flex-direction:column;
    position: absolute;
    background-color: #5C84D2;
    min-width: 160px;
    border: none;
    margin-top: 40px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    align-items: flex-start;
    padding: 10px;
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

