import styled from "styled-components";

export const ModalAddUser = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.6);
`;

export const ModalContent = styled.div`
    width: 600px;
    height: max-content;
    background-color: rgba(22, 22, 22, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 30px 40px 30px;
    box-sizing: border-box;
`;

export const ModalTitle = styled.h2`
    color: white;
    width: 100%;
    text-align: center;
`;

export const ModalInputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    width: 100%;
    div{
        h4{
            margin: 0;
            font-size: 22px;
            color: rgba(255, 255, 255, 0.7);
        }

        input{
            width: 80%;
            height: 30px;
            padding-left: 20px;
            box-sizing: border-box;
            color: white;
            font-size: 18px;
            background-color: rgba(0,0,0,0.5);
        }
    }
`;
export const ModalButtons = styled.div`
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 10px;
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: center;

    button{
        width: 100%;
        height: 40px;
        cursor: pointer;        
        color: white;
        font-size: 18px;
        border: 2px solid transparent;
        transition: .3s;

        &:hover{
            border: 2px solid white;
            background-color: transparent;
        }
    }

    .cancelar{
        background-color: rgba(223, 17, 17, 1);

    }

    .criar{
        background-color: rgba(38, 181, 13, 1);
    }

`;

export const UsersContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow:hidden;
    box-sizing: border-box;
    padding: 40px 40px;
    background: linear-gradient(to right, #001D3D, #003566, #001D3D);
    color: #f2f2f2;
    position: relative;
    @media (max-width: 915px){
        padding: 40px 20px;
    }
`;

export const UsersFirstContent = styled.div`
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

export const AddClient = styled.button`
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

export const Users = styled.div`
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
        text-transform: uppercase;
    }

    @media (max-width: 915px){
        padding: 0px;
    }
`;

export const UsersTable = styled.div`
    width: 100%;
    background: linear-gradient(to right, #003566, #001D3D , #003566); 
    box-sizing: border-box;
    padding: 0 30px 0 30px;
    margin-top: 30px;
    min-height: 300px;
    max-height: 500px;
    overflow-y: hidden;
    overflow-x: hidden;

    display: flex;
    justify-content: center;
    @media (max-width: 915px){
        
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
    overflow-x: hidden;
    @media (max-width: 1300px){
        overflow-x: scroll;
    }
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


export const OptionsGroup = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;


    button{
        background-color: black;
        transition: .3s;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 3px;
        img{
            width: 100%;
        }

        &:hover{
            transform: scale(1.1);
        }
    }
`;