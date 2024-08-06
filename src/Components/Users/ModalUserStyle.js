import styled from "styled-components";


export const ModalContent = styled.div`
    padding: 20px 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const ModalContentTitle = styled.h1`
    margin: 0;
    width: 100%;
    display: flex;
    color: white;
    justify-content: center;
`;

export const Informacoes = styled.div`
    width: 100%;
    display: flex;
    margin-top: 50px;
    flex-direction: column;
    gap: 20px;
`;

export const Info = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 0 40px;

    h2{
        margin: 0;
    }

    input{
        border: 0;
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        padding-left: 20px;
    }
`;

export const ModalButtons = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;

    button{
        border: 0;
        width: 100%;
        transition: .3s;

        &:hover{
            transform: scale(0.97);
        }
    }

    .cancelar{
        background-color: rgba(255, 10, 25);
    }

    .salvar{
        background-color: rgba(25, 10, 255);
    }

`;

// export const ModalContent = styled.div``;

// export const ModalContent = styled.div``;

// export const ModalContent = styled.div``;

// export const ModalContent = styled.div``;
