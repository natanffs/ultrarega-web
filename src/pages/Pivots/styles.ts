import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding-top: 6vh;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;    
`;


export const FormPivot = styled.div`
    width:80vw;
    height: 100%;
    margin-top:20px;
     
    display:flex;
    flex-direction:column;
    align-content:center;
    justify-content:flex-start;
`


export const Input = styled.input`
    width: 100%;
    height: 33px;
    border-radius: 5px;
    border: 1px solid #DBD7D7;
    padding: 2px 7px;
    font-size:15px;
    
`
export const ListPivots = styled.div`
    width:80vw;
    height: 100%;
    margin-top:20px;
     
    display:flex;
    flex-direction:column;
    align-content:center;
   

`
export const Labels = styled.div`
    width: 80%;
    height: 4.5vh;
    margin-top:10px;
    display:flex;
    flex-direction:row;
    background-color: #818182;

   

    

`

export const Label = styled.div`
     width: 50%;
    height: auto;
    /* background-color: #818182; */
    margin-bottom: 5px;
    margin-top: 10px;
    display:flex;
    padding-left:20px;
    align-items:center;
    color: white;
    font-size: 18px;
`
export const LabelInput = styled.div`
     width: 30%;
    height: auto;
    /* background-color: #818182; */
    margin-bottom: 5px;
    margin-top: 10px;
    display:flex;
    align-items:center;
    color: black;
    font-size: 18px;
`

export const Pivot = styled.div`
     color: gray;
    font-size: 15px;

    width: 100%;
    height: 40px;
    display:flex;
    flex-direction:row;
    margin-top:5px;
   
`

export const NameItem = styled.div`
   width: 40%;
    height: 100%;
    display:flex;
    background-color: #FAFAFA;
    /* margin-right:5px; */
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
export const Select = styled.select`
    width: 30%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #DBD7D7;
    padding: 2px 7px;
    font-size:15px;
`

export const Option = styled.option`

`

