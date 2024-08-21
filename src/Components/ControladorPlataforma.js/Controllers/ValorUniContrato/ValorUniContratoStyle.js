import styled from "styled-components";

export const ValorUniContratoContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: linear-gradient(45deg, #e9eaec, #fffdf7);
    padding: 20px;
    overflow-y: scroll;
`;

export const ContainerTitle = styled.h1`
    margin: 0;
    font-weight: 600;
    text-shadow: 3px 3px 2px rgba(0,0,0,0.3);
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    color: #333;
`;

export const StatusMessage = styled.p`
    text-align: center ;
    font-size: 1.2rem;
    color: #333;
    margin: 10px 0;
`;

export const RedefineValorBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 40px;
    gap: 5px;
    align-items: center;
    flex-direction: column;

    h3{
        margin: 0;
        font-size: 22px;

        color: rgba(0,0,0,0.7);
    }


    input{
        border-top: 0;
        border-left: 0;
        border-right: 0;
        height: 35px;
        color: rgba(0,0,0,0.8);
        border-bottom: 1px solid black;
        font-size: 18px;
        box-sizing: border-box;
        background-color: #fffdf7;
    }

    @media (max-width: 1000px){
        flex-direction: column;
    }
`;



export const RedefineValorButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;


    button{
        width: 200px;
        height: 40px;
        font-size: 14px;
        color: rgba(0,0,0,0.8);
        transition: .3s;
        background: linear-gradient(to bottom, #3fa34d, #95e214);
        border: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        font-weight: 600;
        padding: 5px 5px;
        &:hover{
            transform: scale(0.97);
        }
    }
`;

export const ContainerDivisor = styled.div`
    width: 100%;
    overflow: auto;
    align-items: center;
    display: flex;
    gap: 80px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    padding: 10px;
    box-sizing: border-box;
`;

export const UniContratoValue = styled.div`
    border-radius: 20px;
    background-color: rgba(100, 255, 199, 0.2);
    padding: 20px;
    box-shadow: 3px 3px 2px rgba(0,0,0,0.4);
`;

export const BoxTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    span{
        margin: 0;
        font-size: 26px;
        font-weight: 500;
    }
`;

export const ValorPadraoMeses = styled.div`
    border-radius: 20px;
    background-color: rgba(100, 255, 199, 0.2);
    padding: 20px;
    box-shadow: 3px 3px 2px rgba(0,0,0,0.4);

`;

export const RendimentoPadraoBox = styled.div`
    border-radius: 20px;
    background-color: rgba(100, 255, 199, 0.2);
    padding: 20px;
    box-shadow: 3px 3px 2px rgba(0,0,0,0.4);

`;

export const DolarPadraoBox = styled.div`
    border-radius: 20px;
    background-color: rgba(100, 255, 199, 0.2);
    padding: 20px;
    box-shadow: 3px 3px 2px rgba(0,0,0,0.4);

`;

// export const ContainerDivisor = styled.div``;

// export const ContainerDivisor = styled.div``;
