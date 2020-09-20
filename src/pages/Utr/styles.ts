import styled from 'styled-components';

export const Container = styled.div`
width: 100%;
    padding-top: 5%;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column; 
`;

export const Wrapper = styled.div`
    margin-top: 50px;
    width: 80%;
    height: 60%;
    display:flex;
    flex-direction:column;
  

`
export const WrapperMap = styled.div`
    
    width: 100%;
    height: 40%;
    display:flex;
  

`
export const WrapperItem = styled.div`
    
    
    display:flex;
    flex-direction:row;
    
  

`



export const NameItem = styled.div`
    
    
    /* margin-right:5px; */
    
    padding: 5px;
    /* align-items:center; */
    align-self:center;
    color:#707070;
    font-size:15px;
   

   
`
export const ValueItem = styled.div`
 color:#3a3a3a;
    font-size:20px;
    
`
export const Item = styled.div`

    display:flex; background-color: #FBFBFB; 
   
    width: auto;
    max-width: 200px;
    height: auto;
    padding: 10px;
    
    display:flex;
    flex-direction:column;
    align-items:center;
    align-content:center;
    justify-content:center;
    margin-top: 20px;
    border-right-width: 1px ;
    border-right-color: #707070 ;
    border-right-style: solid;
   
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
