import styled from 'styled-components';

export const Container = styled.div`
width: 100%;
    padding-top: 6vh;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column; 
`;

export const Farm = styled.div`
    color: white;
    font-size: 15px;
    
    height: 6vh;
    width: 100%;
   
    display:flex;
    flex-direction:row;
    margin-top:5px;
   align-items:center;
   
`

export const NameItem = styled.div`
    width: 40%;
    height: 100%;
    display:flex;
    background-color: #779BE2;
    margin-right:5px;
    
    padding: 5px;
    align-items:center;
   

   
`

export const Labels = styled.div`
    width: 100%;
    height: 6vh;
    margin-top:10px;
    display:flex;
    flex-direction:row;
  

`

export const Label = styled.div`
    color: white;
    font-size: 18px;
    width:40%;
    background-color: #5C84D2;
    margin-right:5px;
    margin-top:15px;
    
    display:flex;
    align-items:center;
    padding-left: 15px;
    justify-content: space-between;

    
`
