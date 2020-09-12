import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding-top: 6vh;
    display:flex;
    justify-content:center;
    
`;



export const ListUsers = styled.div`
    width:80vw;
    height: 100%;
    margin-top:20px;
     
    display:flex;
    flex-direction:column;
    align-content:center;
   

`


export const Labels = styled.div`
    width: 90%;
    height: 4.5vh;

    display:flex;
    flex-direction:row;
    

    color: white;
    font-size: 18px;

    

`

export const Label = styled.div`
    
    background-color: #5C84D2;
    margin-right:5px;
    display:flex;
    align-items:center;
    padding-left: 15px;
    justify-content: space-between;

`

export const User = styled.div`
    color: white;
    font-size: 15px;

    width: 100%;
    height: 4vh;
    display:flex;
    flex-direction:row;
    margin-top:5px;
   
`

export const NameItem = styled.div`
    width: 40%;
    height: 4vh;
    display:flex;
    background-color: #779BE2;
    margin-right:5px;
    padding-left: 15px;
    align-items:center;

   
`
export const Buttons = styled.div`

    display:flex;
    flex-direction:row;
    width: 10%;
    height: 4vh;
    

`

export const Button = styled.button`
    color: white;
    font-size:12px;
    background-color: gray;
    width: 80px;
    height: 4vh;
    justify-content:center;
    align-items:center;
    display:flex;
    margin-left: 5px;
    border: none;
    border-radius: 5px;

`
