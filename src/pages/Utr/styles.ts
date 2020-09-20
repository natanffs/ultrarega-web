import styled from 'styled-components';

export const Container = styled.div`
width: 100%;
    padding-top: 6vh;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column; 
`;

export const Wrapper = styled.div`
    margin-top: 20px;
    width: 80%;
    height: 100%;
    display:flex;
    flex-direction:column;
  

`



export const NameItem = styled.div`
    width: 50%;
    height: 100%;
    display:flex;
    background-color: #FAFAFA;
    /* margin-right:5px; */
    
    padding: 5px;
    align-items:center;
   

   
`
export const ValueItem = styled.div`
    
`
export const Item = styled.div`
    width: auto;
    height: 40px;
    padding: 10px;
    border: 0px 1px 0 0 solid gray;
`

export const Label = styled.div`
     width: 50%;
    height: 100%;
    background-color: #818182;
   /* margin-right:5px; */
    display:flex;
    align-items:center;
    padding-left: 15px;

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
