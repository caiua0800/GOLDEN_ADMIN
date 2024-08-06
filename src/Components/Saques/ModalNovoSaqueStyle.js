import styled from "styled-components";


export const FecharModal = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    padding: 50px;

    button{
        width: 150px;
        height: 35px;
        font-size: 16px;
        color: rgba(0,0,0,0.7);
        border: 0;
        border-radius: 8px;
        transition: .3s;
        font-weight: 600;
        background-color: #1e96fc;
        &:hover{
            transform: scale(0.95);
            color: black;
        }
    }
`;

export const ModalContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(to right, #001D3D, #003566, #001D3D);
    padding: 10px 20px;
    box-sizing: border-box;
`;

export const ModalTitle = styled.h1`
    margin: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a2d6f9;
`;

export const SearchClient = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    padding: 0 50px;

    span {
        text-shadow: 2px 2px 1px rgba(0,0,0,0.4);
        font-size: 22px;
    }

    input {
        border: 0;
        width: 100%;
        box-sizing: border-box;
        box-shadow: 2px 2px 1px rgba(0,0,0,0.4);
        padding-left: 20px;
        height: 40px;
        font-size: 18px;
    }
`;

export const SelecionarClienteBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    max-height: 300px;
    overflow-y: auto;
    gap: 10px;
    background-color: white;
    box-shadow: 4px 4px 2px rgba(0,0,0,0.4);
`;

export const Cliente = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    transition: .3s;
    color: rgba(0,0,0,0.9);
    font-weight: 500;
    &:hover{
        color: white;
        background-color: rgba(0,0,0,0.7);
    }
`;

export const ClienteSelecionado = styled.div`
    margin-top: 40px;
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const ClienteInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 5px;

    span{
        font-weight: 600;
        color: #a2d6f9;
        font-size: 22px;
    }

    input {
        border: 0;
        width: 100%;
        box-sizing: border-box;
        box-shadow: 2px 2px 1px rgba(0,0,0,0.4);
        padding-left: 20px;
        height: 40px;
        font-size: 18px;
        text-align: center;
    }
`;

export const ButtonSaque = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    button{
        width: 100%;
        background: linear-gradient(to bottom, #72ce27, #b8f500);
        font-weight: 600;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.4);
        transition: .3s;

        &:hover{
            transform: scale(0.95);
        }
    }
`;