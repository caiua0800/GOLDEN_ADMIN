import React from 'react';
import styled from 'styled-components';

// Componente Pagination
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <PaginationContainer>
            <PaginationButton 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Anterior
            </PaginationButton>
            <PageIndicator>
                Página {currentPage} de {totalPages}
            </PageIndicator>
            <PaginationButton 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Próxima
            </PaginationButton>
        </PaginationContainer>
    );
};


// Styled Components
const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
`;

const PaginationButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 5px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    
    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

const PageIndicator = styled.span`
    font-size: 16px;
    margin: 0 15px;
`;

export default Pagination;
