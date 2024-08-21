import styled from "styled-components";

export const GatewayContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: linear-gradient(45deg, #e9eaec, #fffdf7);
    padding: 20px;
    overflow-y: scroll;
`;

export const Title = styled.h1`
    margin: 0;
    font-weight: 600;
    text-shadow: 3px 3px 2px rgba(0,0,0,0.3);
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    color: #333;
`;

export const GatewaysBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 40px;
    box-sizing: border-box;
    margin-top: 20px;
`;

export const Box = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;

    // Estilo padrão
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer; // Adiciona o cursor de pointer para indicar interatividade
    padding: 10px 0;
    // Estilo quando ativo
    ${props => props.active && `
        background-color: rgba(0, 150, 255, 0.3);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
    `}

    p {
        margin: 0;
        font-size: 22px;
    }
`;

export const ImageBox = styled.label`
    width: 200px;
    
    img{
        width: 100%;
    }
`;
