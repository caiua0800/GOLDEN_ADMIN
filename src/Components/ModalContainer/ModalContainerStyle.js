import styled from "styled-components";


export const ModalContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background-color: rgba(0,0,0,0.8);
    z-index: 99999;
`;