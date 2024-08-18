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
  flex-direction: row;
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
    display: flex;
    gap: 20px;
    flex-direction:column;
    align-items: center;
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

export const EnviouPara = styled.div`
   color: white;
   font-weight: 600; 

    span{
        display: flex;
        flex-wrap: wrap;
    }
`;