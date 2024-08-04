import styled from "styled-components";

export const PaginaClienteContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    padding: 40px 40px;
    background: linear-gradient(to right, #001D3D, #003566, #001D3D);
    color: #f2f2f2;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    overflow-y: scroll;
    @media (max-width: 915px){
        padding: 40px 20px;
    }

    h1 {
        margin-top: 0;
    }
`;


export const ClientDataContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
`;

export const ClientDataBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;

    span{
        font-size: 22px;
    }
    
    input{
        width: 100%;
        height: 40px;
        border: 0;
        box-shadow: 4px 4px 2px rgba(0,0,0,0.7);
        font-size: 22px;
        box-sizing: border-box;
        padding-left: 20px;
    }

    .desabilitado{
        background-color: rgba(255,255,255,0.7);
    }
`;


export const PaginaButtons = styled.div`
    width: 100%;

    display: flex;
    gap: 10px;
    justify-content: end;
`;


export const CloseButton = styled.button`

    background-color: #FFC300;
    color: #000814;
    border: 0;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #000814;
        color: #FFC300;
    }
`;

export const SaveButton = styled.button`

    background: linear-gradient(to bottom, #0c9b18, #6acc1a);
    color: #000814;
    border: 0;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #000814;
        color: #FFC300;
    }
`;
// export const nome = styled.div``;

// export const nome = styled.div``;

// export const nome = styled.div``;
