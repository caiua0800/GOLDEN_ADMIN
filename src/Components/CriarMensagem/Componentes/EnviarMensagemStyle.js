import styled, { keyframes} from 'styled-components';

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999999999;
  flex-direction: column;
`;

export const ModalContent = styled.div`
    padding: 20px;
    border-radius: 8px;
    animation: ${slideDown} 0.5s ease-out;
    width: 100%;
    box-sizing: border-box;

    h2{
        margin: 0;
        font-size: 32px;
        color: rgba(255,255,100, 0.8);
    }
`;

export const AllMessages = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 30px 40px;
    flex-wrap: wrap;
    display: flex;
    gap: 20px;
`;


export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

export const ReallyWannaDelete = styled.div`
    width: 100%; 
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999999999;
    background-color: rgba(0,0,0,0.8);
`;

export const Really = styled.div`
    width: 350px;
    flex-direction: column;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: white;
    border-radius: 8px;

    p{
        color: rgba(0,0,0,0.8);
        margin: 0;
        text-align: center;
    }
`;

export const Buttonzin = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;

    button{
        border: 1px solid black;
        background-color: rgba(0,0,0,0.2);
        width: 100px;
        color: black;
        cursor: pointer;
    }
`;

export const ModalEnviar = styled.div`
    width: 100%;
    height: 100%¨;
    z-index: 999999999999;
    height: 100%;
    position: fixed;
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px 20px;
    box-sizing: border-box;

    h3{
        width: 100%;
        text-align: center;
        margin: 0;
        font-size: 32px;
        color: rgba(0,0,0,0.8);
    }
`;

export const ShowWicthMessage = styled.div`

`

export const FecharModalEnviar = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;

    span{
        font-weight: 800;
        font-size: 22px;
        cursor: pointer;
        transition: .3s;

        &:hover{
            color: red;
        }
    }
`

export const SearchClient = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 40px;

    p{
        margin: 0;
        font-weight: 500;
        font-size: 24px;
    }

    input{
        width: 100%;
        height: 40px;
        border: 0;
        background-color: rgba(0,0,0,0.07);
        box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
        text-align: center;
        box-sizing: border-box;
        font-size: 22px;
    }
`;

export const Clients = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    max-height: 100px;
    margin-top: 10px;
    gap: 5px;
    background-color: rgba(0,0,0,0.07);
    overflow: auto;

    span{
        transition: .3s;
        cursor: pointer;
        &:hover{
            font-weight: 500;
        }
    }
`

export const Result = styled.div`
    width: 100%;
    display: flex;
    gap: 5px;
    box-sizing: border-box;
    flex-wrap: wrap;
    padding: 10px 20px;
    font-style: italic;
    color: blue;
    font-weight: 800;
`

export const BotaoEnviar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    button{
        width: 100%;
        height: 40px;
    }
`

// export const Result = styled.div``

// export const Result = styled.div``

// export const Result = styled.div``

