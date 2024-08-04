// Pagination.js
import React from 'react';
import styled from 'styled-components';

export const Pagination = ({ children }) => (
  <PaginationContainer>{children}</PaginationContainer>
);

export const PaginationButton = ({ isActive, onClick, children }) => (
  <PaginationButtonStyled isActive={isActive} onClick={onClick}>
    {children}
  </PaginationButtonStyled>
);

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButtonStyled = styled.button`
  background-color: ${props => (props.isActive ? '#219ebc' : '#003566')};
  color: #f2f2f2;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #219ebc;
  }
`;
