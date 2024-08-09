import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

export default function LoadingWithMessages({ isLoading }) {
  const [message, setMessage] = useState('Carregando todos os clientes');

  useEffect(() => {
    if (isLoading) {
      const timer1 = setTimeout(() => setMessage('Puxando os contratos'), 4000);
      const timer2 = setTimeout(() => setMessage('Carregando Histórico de saques'), 7000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isLoading]);

  return (
    <LoadingWrapper className={isLoading ? "loading" : "d-none"}>
      <CLoader />
      <Message>{message}</Message>
    </LoadingWrapper>
  );
}

const LoadingWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.753);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 99999999999;

  &.d-none {
    display: none;
  }
`;

const rotatingAnimation = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

const CLoader = styled.div`
  animation: ${rotatingAnimation} 1s infinite;
  border: 6px solid #e5e5e5;
  border-radius: 50%;
  border-top-color: #51d4db;
  height: 50px;
  width: 50px;
  margin-bottom: 20px;
`;

const Message = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`;
