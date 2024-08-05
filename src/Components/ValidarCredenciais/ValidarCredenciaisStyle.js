import styled from "styled-components";




export const ValidarCredenciaisContainer = styled.div`
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    z-index: 999999;
    background-color: rgba(0,0,0,0.6);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const FecharValidacao = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;

    span{
        font-size: 14px;
        transition: .3s;
        color: red;
        font-weight: 500;
        margin: 0;
        cursor: pointer;
        &:hover{
            color: white;
        }
    }
`;

export const ValidadacaoBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 20px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.7);
    position: relative;
    
    h1{
        font-weight: 500;
        font-size: 22px;
        margin: 0;
    }

    input{
        box-sizing: border-box;
        width: 250px;
        height: 35px;
    }

    button{
        margin-top: 10px;
        transition: .3s;
        border: 0;
        background: linear-gradient(35deg, #80b918, #aacc00): 
    }
`;

export const CheckArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    label{
        display: flex;
        flex-direction: row;
        align-items: center;
        input{
            width: 15px;
        }
        span{
            font-size: 14px;
        }
    }
`;

// export const nomecomponente = styled.div``;

// export const nomecomponente = styled.div``;

// export const nomecomponente = styled.div``;

// export const nomecomponente = styled.div``;

// export const nomecomponente = styled.div``;

// export const nomecomponente = styled.div``;
