import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { getSaques } from '../redux/actions';
import { formatCPF } from "./ASSETS/assets";

const closeIcon = 'https://firebasestorage.googleapis.com/v0/b/wldata.appspot.com/o/cancel-close-delete-svgrepo-com.png?alt=media&token=b0d9ff03-fef7-4eb4-8bae-f6624f1483f2';
const payIco = 'https://firebasestorage.googleapis.com/v0/b/wldata.appspot.com/o/payment-pay-later-svgrepo-com.png?alt=media&token=13b149d1-cdad-49e3-9e78-e85ca4940274';
const reloadIcon = 'https://firebasestorage.googleapis.com/v0/b/wldata.appspot.com/o/reload-svgrepo-com%20(1).png?alt=media&token=c99468e4-47db-4616-8788-540ef032113e';

export default function SaquesFeitos() {
    const [search, setSearch] = useState('');
    const [filterOption, setFilterOption] = useState('pendentes');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const dispatch = useDispatch();
    const saques = useSelector(state => state.SaquesReducer.saques);

    useEffect(() => {
        dispatch(getSaques());
    }, [dispatch]);

    // Reset currentPage to 1 when search or filterOption changes
    useEffect(() => {
        setCurrentPage(1);
    }, [search, filterOption]);

    const filteredClients = saques.filter(user => {
        const matchesSearch = search.length > 0
            ? (user.CLIENT_NAME && user.CLIENT_NAME.includes(search.toUpperCase())) ||
              (user.CLIENT_CPF && user.CLIENT_CPF.includes(search.toUpperCase()))
            : true;

        const matchesFilter = 
            filterOption === 'aceitos'
            ? user.STATUS === 2
            : filterOption === 'negados'
            ? user.STATUS === 3
            : true;

        return matchesSearch && matchesFilter;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);

    const handleStatus = (Status) => {
        if(Status === 1)
            return 'PENDENTE'
        else if(Status === 2)
            return 'PAGO'
        else if(Status === 3)
            return 'CANCELADO'
        else
            return 'INDEFINIDO'
    }

    const handlePreviousPage = () => { setCurrentPage(prev => Math.max(prev - 1, 1)); };

    const handleNextPage = () => { setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredClients.length / itemsPerPage))); };

    return (
        <SaquesContainer>
            <SaquesFirstContent>
                <AreaTitle>OPERAÇÕES DE SAQUES</AreaTitle>
            </SaquesFirstContent>

            <SaquesContent>
                <SearchBar>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        type="text"
                        placeholder="FILTRAR"
                    />
                </SearchBar>

                <SearchCheck>
                    <div>
                        <input
                            type="radio"
                            id="negados"
                            name="saquesFilter"
                            value="negados"
                            checked={filterOption === 'negados'}
                            onChange={() => setFilterOption('negados')}
                        />
                        <label htmlFor="negados">SAQUES NEGADOS</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="aceitos"
                            name="saquesFilter"
                            value="aceitos"
                            checked={filterOption === 'aceitos'}
                            onChange={() => setFilterOption('aceitos')}
                        />
                        <label htmlFor="aceitos">SAQUES ACEITOS</label>
                    </div>
                </SearchCheck>

                <SaquesTable>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>CLIENTE</TableHeaderCell>
                                    <TableHeaderCell>CPF</TableHeaderCell>
                                    <TableHeaderCell>DATA SOLICITAÇÃO</TableHeaderCell>
                                    <TableHeaderCell>OBSERVAÇÕES</TableHeaderCell>
                                    <TableHeaderCell>VALOR</TableHeaderCell>
                                    <TableHeaderCell>FUNDO</TableHeaderCell>
                                    <TableHeaderCell>APROVADO</TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentItems.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.CLIENT_NAME}</TableCell>
                                        <TableCell>{formatCPF(user.CLIENT_CPF)}</TableCell>
                                        <TableCell>{user.DATASOLICITACAO}</TableCell>
                                        <TableCell>{user.OBS ? user.OBS : 'Não'}</TableCell>
                                        <TableCell>$ {user.VALORSOLICITADO}</TableCell>
                                        <TableCell>{user.FUNDO_ESCOLHIDO ? 'Sim' : 'Não Informado'}</TableCell>
                                        <TableCell>{handleStatus(user.STATUS ? user.STATUS : 0)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <Pagination>
                        <PaginationButton onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Anterior
                        </PaginationButton>
                        <PaginationInfo>{`Página ${currentPage} de ${Math.ceil(filteredClients.length / itemsPerPage)}`}</PaginationInfo>
                        <PaginationButton onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredClients.length / itemsPerPage)}>
                            Próxima
                        </PaginationButton>
                    </Pagination>
                </SaquesTable>
            </SaquesContent>
        </SaquesContainer>
    );
}

const SearchCheck = styled.div`
    display: flex;
    width: 100%;
    justify-content: start;
    padding: 10px 0 0 30px;
    box-sizing: border-box;
    gap: 20px;

    div {
        display: flex;
        align-items: center;
    }

    input {
        margin-right: 10px;
    }

    label {
        cursor: pointer;
    }

    @media (max-width: 1200px){
        flex-direction: column;
        align-items: end;
        padding: 0;
        margin-top: 20px;
        margin-bottom: 20px;
    }
`;

const SaquesContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    padding: 40px 40px;
    background: linear-gradient(to right, #001D3D, #003566, #001D3D);
    color: #f2f2f2;
    position: relative;
    
    @media (max-width: 915px){
        padding: 20px 10px;
        overflow-y: scroll;
    } 
`;

const SaquesFirstContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    box-sizing: border-box;
    align-items: center;

    @media (max-width: 1000px){
        flex-direction: column;
        gap: 5px;
    }
`;

const AreaTitle = styled.h1`
    text-shadow: 1px 1px 2px rgba(255,255,255,0.2);
    cursor: pointer;
    margin: 0;
    transition: .3s;
    
    &:hover {
        color: #ffcc00;
    }

    @media (max-width: 1000px){
        font-size: 22px;
    }
`;

const SaquesContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

const SearchBar = styled.div`
    margin-bottom: 20px;

    input {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 16px;
    }

    @media (max-width: 1000px){
        margin-bottom: 0;

        input {
            width: 100%;
            height: 35px;
            padding: 0;
            box-sizing: border-box;
            padding-left: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 16px;
        }
    }
`;

const SaquesTable = styled.div`
    width: 100%;
    overflow-x: auto;

    @media (max-width: 1000px){
        overflow-x: scroll;
        overflow-y: scroll;
    }
`;

const TableContainer = styled.div`
    width: 100%;
    @media (max-width: 1000px){
        overflow-x: scroll;
        overflow-y: scroll;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.thead`
    background: #003566;
    color: #fff;
`;

const TableRow = styled.tr``;

const TableHeaderCell = styled.th`
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
    padding: 10px;
    border: 1px solid #ccc;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const PaginationButton = styled.button`
    padding: 10px 20px;
    border: 1px solid #ccc;
    background: #003566;
    color: #fff;
    cursor: pointer;
    margin: 0 10px;
    border-radius: 5px;
    font-size: 16px;

    &:disabled {
        background: #666;
        cursor: not-allowed;
    }
`;

const PaginationInfo = styled.span`
    font-size: 16px;
    color: #fff;
`;
