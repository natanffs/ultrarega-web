import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;

`
export const LoginWrapper = styled.div`
    width: 300px;
    height: auto;

    display:flex;
    flex-direction: column;
    margin-top: 20px;
    align-items:flex-start;


`

export const Title = styled.h1`
    color: #1f1f1f;
    font-size:40px;


`

export const Label = styled.label`
    color: #323030;
    font-size: 20px;
    margin-bottom: 10px;
    margin-top: 15px;


`

export const Input = styled.input`
    width: 100%;
    height: 33px;
    border-radius: 5px;
    border: 1px solid #DBD7D7;
    padding: 2px 7px;
    font-size:15px;
    
    
    /* box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25); */
`

export const Button = styled.button`
    width: 100%;
    height: 35px;
    border-radius: 5px;
    border: 1px solid #5C84D2;
    background-color: #6F9BF0;
    margin-top:  35px;

    color: white;
    font-size: 18px;
`

