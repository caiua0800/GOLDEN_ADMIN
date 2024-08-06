import styled from "styled-components";



export const RendimentoContainer = styled.div`
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

export const RendimentoTitle = styled.div`

    h1{
        margin: 0;
    }
`;

export const InformacoesUltimoRendimento = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    h4{
        margin: 0;
        text-decoration: underline;
        font-size: 22px;
        color: rgba(255, 255, 255, 0.7);
        transition: .3s;
    margin-bottom: 20px;
        &:hover{
            color: white;

            transform: scale(0.97);
        }
    }
`;

export const Info = styled.div`
    p{
        margin: 0;
    }
    span{
        font-weight: 800;
    }
`;

export const RodarManualmente = styled.div`


`;

export const RodarManualmenteInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    p{
        margin: 0;
        span{
            color: #FFA500;
        }
    }

`;

export const RodarManualmenteButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;

    button{
        width: 300px;
        border: 0;
        background: linear-gradient(to bottom, #FFA500, #FFA550);
        font-size: 26px;
        font-weight: 800;
        transition: .3s;

        &:hover{
            transform: scale(1.1);
            color: black;
        }
    }
`;

export const MensagemAviso = styled.div`
    position: absolute;
    top: 100px;
    left: 100px;

    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999;
    background-color: black;
    p{
        margin: 0;
        color: red;
        font-weight: 600;
        font-size: 22px;
    }
`;

// export const nomeComponente = styled.div``;

// export const nomeComponente = styled.div``;

// export const nomeComponente = styled.div``;

// export const nomeComponente = styled.div``;

