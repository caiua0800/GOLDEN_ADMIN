import styled from "styled-components";


export const CriarMensagemContainer = styled.div`
    wwidth: 100%;
    min-height: 100vh;
    position: relative;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(to right, #001D3D, #003566, #001D3D);
`;

export const ContainerTitle = styled.div`
    width: 100%;
    display: flex;
    margin-top: 30px;
    justify-content: center;

    span{
        font-size: 48px;
        color: white;
    }
`

export const MensagensApp = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    span{
        font-size: 22px;
        color: rgba(255, 255, 255, 0.7);
    }
`

export const SelectType = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const CreateMessageButton = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    gap: 20px;

    button{
        transition: .3s;
        width: 300px;
        height: 40px;

        &:hover{
            transform: scale(1.1);
        }
    }

    .bt2{
        background-color: rgba(100,155,100, 1);
    }

    .bt3{
        background-color: rgba(0,100,100, 1);
    }

    .bt4{
        background-color: rgba(200,100,100, 1);
    }
`

// export const CriarMensagemContainer = styled.div``

// export const CriarMensagemContainer = styled.div``

// export const CriarMensagemContainer = styled.div``
