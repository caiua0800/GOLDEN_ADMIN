import styled from "styled-components";

// Estilos da tabela
export const TableContainer = styled.div`
  width: 100%;
  max-height: 400px; // Limite de altura
  overflow-y: auto; // Habilitar rolagem vertical
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: #f0f0f0;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: center;
  width: 33%; /* Ajuste de acordo com o número de colunas */
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 10px;
  width: 33%; /* Ajuste de acordo com o número de colunas */
`;

export const FilterInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;