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

export const Farm = styled.div`
    color: gray;
    font-size: 15px;
    
    height: 6vh;
    width: 100%;
   
    display:flex;
    flex-direction:row;
    margin-top:5px;
   align-items:center;
   
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

export const Labels = styled.div`
    width: 100%;
    height: 40px;

    display:flex;
    flex-direction:row;
    

    color: white;
    font-size: 18px;

    

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
