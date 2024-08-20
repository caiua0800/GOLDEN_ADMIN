import styled from "styled-components";


export const IndicacaoContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 20px;
    box-sizing: border-box;
    background: linear-gradient(to right, #001D3D, #003566, #001D3D);

    h1{
        margin: 0;
        font-size: 42px;
        color: white;
        text-shadow: 3px 3px 2px rgba(0,0,0,0.4);
    }

    h4{
        margin: 0;
        margin-top: 20px;
        font-size: 22px;
        color: white;
    }
`;

export const ClientSearch = styled.div`
    width: 100%;
     display: flex;
    flex-direction: column;
    margin-top: 40px;

    h4{
        margin: 0;
        font-size: 22px;
        color: rgba(0, 100, 255, 1);
        text-shadow: 3px 3px 2px rgba(0,0,0,0.4);
    }

    input{
        height: 40px;
        border: 0;
        box-shadow: 3px 3px 2px rgba(0,0,0,0.4);
        font-size: 22px;
        box-sizing: border-box;
        text-align: center;
    }
`;

export const SearchResult = styled.div`
    width: 100%;
    max-height: 300px;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 20px;
    overflow-y: scroll;
    overflow-x: hidden;
    div{
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 20px;
        text-align: center;

        p, span{
            margin: 0;
            color: black;
            font-weight: 500;
            font-size: 18px;
        }
    }
`;

export const QuandoDeseja = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 20px;
    margin-top: 40px;

    SPAN{
        color: white;
        font-weight: 500;
    }

    input{
        height: 40px;
        border: 0;
        box-shadow: 3px 3px 2px rgba(0,0,0,0.4);
        font-size: 22px;
        box-sizing: border-box;
        text-align: center;
    }

    button{
        width: 100%;
        border: 0;
        background-color: rgba(100, 255, 0 , 1);
        font-size: 16px;
        font-weight: 600;
        color: black;
        transition: .3s;

        &:hover{
            transform: scale(0.98);
        }
    }
`;

// export const nome = styled.div``;

// export const nome = styled.div``;

// export const nome = styled.div``;
