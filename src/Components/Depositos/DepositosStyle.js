import styled, {keyframes} from "styled-components";


export const growWidth = keyframes`
  0% {
    height: 0%;
  }
  100% {
    height: 100%;
  }
`;

// Add styled-components for pagination
export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const PaginationButton = styled.button`
  background-color: #FFC300;
  color: #000814;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const PaginationInfo = styled.span`
  color: #f2f2f2;
`;


export const ModalNovoDeposito = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(10px 5px 10px rgba(0, 0, 255, 0.2));
    animation: ${growWidth} 1s forwards;
    z-index: 99990;
`;



export const BoxModal = styled.div`
    width: 100%;
    height: 100vh;
    padding-bottom: 80px;
    background-color: rgba(255,255,255,0.9);
    border-radius: 0px;
    box-sizing: border-box;
    overflow-y: scroll;

`;

export const BoxTitle = styled.div`
    width: 100%;
    margin-top: 40px;
    display: flex;
    justify-content: center;

    h1 {
        padding: 10px;
        color: black;
        width: max-content;
        margin: 0;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }

    @media (max-width: 1000px){
        padding: 0px;
        font-size: 14px;
    }
`;

export const SearchArea = styled.div`
    width: 100%;
    margin-top: 20px;

    div {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 0 20px;
        position: relative;

        p {
            margin: 0;
            color: rgba(0,0,0,0.8);
            font-weight: 600;
        }

        input {
            height: 40px;
            padding-left: 30px;
            box-sizing: border-box;
            font-size: 18px;
            color: rgba(0,0,0,0.7);
      
            border-radius: 3px;
            border: 0;
            box-shadow: 2px 1px 4px rgba(0,0,0,0.6);
        }
    }

    @media (max-width: 1000px){
        margin-top: 10px;
    }
`;

export const SearchedClients = styled.div`
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    max-height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
    left: 0;
    background-color: rgba(255,255,255,0.8);
    box-shadow: 2px 2px 3px rgba(0,0,0,0.8);
`;

export const ClientBoxSearched = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    cursor: pointer;

    span {
        color: black;
        text-align: center;
        padding: 5px;
    }

    &:hover{
        background-color: rgba(0,0,0,0.3);
    }
`;

export const RestContentBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    gap: 20px;
    box-sizing: border-box;

    div{
        display: flex;
        flex-direction: column;

        p{
            margin-bottom: 0;
            font-weight: 100;
            color: rgba(0,0,255,1);
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }

        span{
            color: rgba(0,0,0,0.7);
            font-weight: 600;
            margin-top: 30px;
        }
    
        input, select{
            height: 40px;
            box-sizing: border-box;
            text-align: center;
            font-size: 18px;
            background-color: rgba(255,255,255,0.6);
            border-radius: 3px;
            border: 0;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.9);
        }
    }

    @media (max-width: 1000px){
        margin-top: 10px;
        gap: 10px;

        div{
            span{
                font-size: 16px;
            }

            input, select{
                height: 35px;
                width: 100%;
                text-align: center;
                padding: 0;
                display: flex;
                justify-content: center;
                font-size: 14px;
            }
        }
    }
`;

export const ModalButtons = styled.div`
    display: flex;
    margin-top: 50px;
    gap: 10px;
    padding: 0 60px;
    box-sizing: border-box;

    button{
        width: 100%;
        height: 40px;
        border: 0;
        box-shadow: 2px 2px 3px rgba(0,0,0,0.6);
        font-weight: 600;
        color: rgba(0,0,0,0.8);
        cursor: pointer;
        transition: .3s;
        &:hover{
            background-color: rgba(0,255,0, 0);
        }
    }

    .confirmBtn{
        background-color: rgba(0,255,0, 1);
    }

    .cancelBtn{
        background-color: rgba(255,0,0, 1);
    }


`;

export const DepositosContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow:hidden;
    box-sizing: border-box;
    padding: 40px 40px;
    background: linear-gradient(to right, #001D3D, #003566, #001D3D);
    color: #f2f2f2;
    position: relative;

    @media (max-width: 1000px){
        padding: 20px 10px;
        overflow-y: scroll;
    } 
`;

export const DepositosFirstContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    box-sizing: border-box;
    align-items: center;

    @media (max-width: 915px){
        flex-direction: column;
        gap: 10px;
    }
`;

export const AreaTitle = styled.h1`
    text-shadow: 1px 1px 2px rgba(255,255,255,0.2);
    cursor: pointer;
    margin: 0;
    transition: .3s;

    &:hover{
        text-shadow: 1px 1px 2px rgba(255,255,255,0);
        color: #FFC300;
        padding-left: 20px;
    }
`;

export const AddDepositos = styled.button`
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: #FFC300;
    color: #000814;
    border: 0;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
    cursor: pointer;
    transition: .3s;
    &:hover{
        background-color: #000814;
        color: #FFC300;
    }
`;

export const DepositosContent = styled.div`
    width: 100%;
    background: linear-gradient(to right, #003566, #001D3D , #003566);  
    box-sizing: border-box;
    margin-top: 50px;
    padding-bottom: 30px;
    box-shadow: 3px 3px 1px black;

    @media (max-width: 915px){
        padding: 20px;
    }
`;

export const SearchBar = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    background: linear-gradient(to right, #003566, #001D3D , #003566); 
    input{
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        background: linear-gradient(to right, #000814, #001D3D, #000814);
        border: 0;
        padding-left: 30px;
        box-shadow: 1px 1px 2px black;
        color: rgba(255, 195, 0, 1);
        font-weight: 600;

    }

    @media (max-width: 915px){
        padding: 0px;
    }
`;

export const DepositosTable = styled.div`
    width: 100%;
    background: linear-gradient(to right, #003566, #001D3D , #003566); 
    box-sizing: border-box;
    padding: 0 30px 0 30px;
    margin-top: 30px;
    min-height: 300px;
    max-height: 500px;
    overflow-y: hidden;
    overflow-x: hidden;
    flex-direction: column;
    display: flex;
    justify-content: center;

    @media (max-width: 1000px){
        min-height: 300px;
        padding: 0;
        border: 2px solid rgba(0,0,0,0.2);
        max-height: 250px;
    }
`;

export const TableContainer = styled.div`
    width: 100%;
    box-sizing: border-box;    
    overflow-y: scroll;

`;

export const Table = styled.table`
    width: 100%;
    overflow: auto; 
    border-collapse: collapse;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
    position: relative;
`;

export const TableHeader = styled.thead`
    color: #f2f2f2;
`;

export const TableRow = styled.tr`
    background: #000814; 
    color: #FFC300;

    &:nth-child(even) {
        color: #FFC300;
        background-color: #001D3D;
    }
`;

export const TableHeaderCell = styled.th`
    padding: 15px;
    text-align: center;
    color: #219ebc;
    background-color: #001D3D;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    min-width: 100px; /* Ajuste conforme necessário */
    white-space: nowrap;
`;

export const TableBody = styled.tbody`
    background-color: white;
`;

export const TableCell = styled.td`
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    min-width: 100px; /* Ajuste conforme necessário */
    white-space: nowrap;
`;

export const OptionsButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: 2px;

    img{
        width: 30px;
        transition: .3s;
        cursor: pointer;
        &:hover{
            transform: scale(1.1);
        }
    }
`;

export const ReloadData = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;

    p{
        padding-right: 40px;
        margin: 0;
        cursor: pointer;
    }

`;

export const ButtonArea = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    box-sizing: border-box;
    margin-top: 20px;
    padding: 0 80px;
    gap: 20px;
    
    h6{
        margin: 0;
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        cursor: pointer;
        border-radius: 8px;
        box-shadow: 4px 4px 2px rgba(0,0,0,0.2);
        transition: .3s;

        &:hover{
            transform: scale(0.95);
        }
    }

    .cancelBtn{
        background-color: red;
    }

    .SaveBtn{
        background-color: green;
    }

    @media (max-width: 1000px){
        padding: 10px;

        button{
            width: 100%;
            height: 45px;
        }
    }
`;

