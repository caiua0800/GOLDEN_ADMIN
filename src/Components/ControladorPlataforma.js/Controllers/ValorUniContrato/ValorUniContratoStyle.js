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
    text-align: center;
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
        height: 30px;
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

        &:hover{
            transform: scale(0.97);
        }
    }
`;