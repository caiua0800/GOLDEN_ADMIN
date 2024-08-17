// MensagemBoxStyle.js
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999999999;
  flex-direction: column;
`;

export const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    animation: ${slideDown} 0.5s ease-out;
    max-width: 500px;
    width: 100%;

    h2{
        margin: 0;
        font-size: 32px;
        color: rgba(55,10,100, 0.8);
    }
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

export const DefineType = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    span{
        font-size: 18px;
        font-weight: 600;
        color: rgba(0,0,0,0.7);
    }

    select{
        width: 100%;
        box-sizing: border-box;
        height: 40px;
        font-size: 16px;
        text-align: center;
        border: 0;
        background-color: rgba(100, 200, 200, 1);
        box-shadow: 3px 3px 2px rgba(0,0,0,0.6);
        color: rgba(0,0,0,0.7);
        font-weight: 600;
    }

    h6{
        margin: 0;
        width: 100%;
        text-align: end;
        color: blue;
        text-decoration: underline;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
    }
`

export const DefineText = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    span{
        font-size: 18px;
        font-weight: 600;
        color: rgba(0,0,0,0.7);
    }

    textarea{
        width: 100%;
        box-sizing: border-box;
        font-size: 16px;
        text-align: center;
        border: 0;
        background-color: rgba(100, 200, 200, 0.3);
        box-shadow: 3px 3px 2px rgba(0,0,0,0.6);
        color: rgba(0,0,0,0.7);
        font-weight: 600;
        min-height: 100px;
        padding: 5px;
    }
`

export const DefineTitle = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    span{
        font-size: 18px;
        font-weight: 600;
        color: rgba(0,0,0,0.7);
    }

    textarea{
        width: 100%;
        box-sizing: border-box;
        font-size: 18px;
        text-align: center;
        border: 0;
        background-color: rgba(100, 200, 200, 0.3);
        box-shadow: 3px 3px 2px rgba(0,0,0,0.6);
        color: rgba(0,0,0,0.7);
        font-weight: 600;
        max-height: 40px;
    }
`

export const InputLink = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    height: 40px;
    box-sizing: border-box;
    border: 2px solid rgba(0,0,0,0.7);
    align-items: center;
    border-radius: 8px;
    overflow: hidden;
    gap: 10px;

    input{
        border: 0;
        width: 100%;
        box-sizing: border-box;
        height: 100%;
    }

    span{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 20px;
        font-weight: 800;
        color: #c86bfa;
    }
`;

export const CreateButton = styled.div`
    margin-top: 20px;
    width: 100%;

    button{
        width: 100%;
        transition: .3s;
        background-color: rgba(155,78,155, 1);

        &:hover{
            transform: scale(0.97);
        }
    }
`


// export const InputLink = styled.div`

// `;

// export const InputLink = styled.div`

// `;

// export const InputLink = styled.div`

// `;