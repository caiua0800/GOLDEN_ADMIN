import styled from "styled-components";



export const ModalContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background-color: rgba(0,0,0,0.8);
    z-index: 99999;
`;

export const ModalContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 50px 20px;
    justify-content: start;
    align-items: center;
    position: relative;
`;

export const ModalTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    h1{
        margin: 0;
    }

    span{
        text-decoration: underline;
    }
`;

export const Documentos = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 50px;
`;

export const Doc = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const DocTitle = styled.div`
    font-size: 18px;
`;

export const DocPhoto = styled.div`
    width: 100%;
    padding: 30px;
    box-sizing: border-box;

    img{
        width: 100%;
    }
`;

export const FecharModalButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;

    button{
        width: 150px;
        height: 35px;
        font-size: 14px;
        transition: .3s;
        border: 0;
        border-radius: 8px;
        background: linear-gradient(45deg, #003f88, #00509d); 
        color: white;

        &:hover{transform: scale(0.95);}
    }
`;

export const ModalOptions = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;

    button{
        width: 250px;
        transition: .3s;

        &:hover{transform: scale(0.95);}
    }

    .negar{
        background-color: rgba(255,50, 10, 0.9);
    }

    .aceitar{
        background-color: rgba(10,50, 255, 0.9);
    }
`;

// export const ModalContainer = styled.div``;

