import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { formatCPF, getClients, formatNumber, formatDate } from "./ASSETS/assets";
import Pagination from "./Pagination"; 
import PaginaCliente from "./PaginaDoCliente/PaginaCliente";

export default function Clientes() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [hasInvestedMoney, setHasInvestedMoney] = useState(false); 
    const [selectedClient, setSelectedClient] = useState(null); 
    const [existClient, setExistClient] = useState(false); 

    // Estado para paginação
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); 

    useEffect(() => {
        getClients(setUsers);
        console.log(users);
    }, []);

    const handleCheckboxChange = () => {
        setHasInvestedMoney(prevState => !prevState); 
    };

    const filteredClients = users.filter(user => {
        const searchLower = search.toLowerCase();
        const matchesSearch = user.NAME.toLowerCase().includes(searchLower) || user.CPF.includes(searchLower);
        const matchesInvestedMoney = !hasInvestedMoney || user.TOTAL_SPENT > 0; 
        return matchesSearch && matchesInvestedMoney;
    });

    const indexOfLastClient = currentPage * itemsPerPage;
    const indexOfFirstClient = indexOfLastClient - itemsPerPage;
    const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handlereateClient = () => {
        window.location.href = '/criarcliente';
    };

    const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

    const handleSelectClient = (client) => {
        setExistClient(true);
        setSelectedClient(client);
        console.log('Client selected:', client);
    }

    const handleUnselectClient = () => {
        setExistClient(false);
        setSelectedClient(null);
    }

    return (
        <ClientsContainer>


            <PaginaCliente handleClose={handleUnselectClient} clienteData={selectedClient} />
            <ClientFirstContent>
                <AreaTitle>CLIENTES</AreaTitle>
                <AddClient onClick={handlereateClient}>+ ADICIONAR CLIENTE</AddClient>
            </ClientFirstContent>

            <Clients>
                <SearchBar>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        type="text"
                        placeholder="Nome ou CPF do Cliente"
                    />
                </SearchBar>

                <FiltrarClienteInvestido>
                    <div>
                        <input type="checkbox" checked={hasInvestedMoney} onChange={handleCheckboxChange} />
                        <label>COM DINHEIRO INVESTIDO</label>
                    </div>
                </FiltrarClienteInvestido>

                <ClientsTable>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>NOME</TableHeaderCell>
                                    <TableHeaderCell>CPF</TableHeaderCell>
                                    <TableHeaderCell>DATA CAD.</TableHeaderCell>
                                    <TableHeaderCell>E-MAIL</TableHeaderCell>
                                    <TableHeaderCell>CELULAR</TableHeaderCell>
                                    <TableHeaderCell>TOKENS OBTIDOS</TableHeaderCell>
                                    <TableHeaderCell>TOTAL INVESTIDO</TableHeaderCell>
                                    <TableHeaderCell>TOTAL GANHO</TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentClients.map((user, index) => (
                                    <TableRow key={index} onClick={() => handleSelectClient(user)}>
                                        <TableCell>{user.NAME}</TableCell>
                                        <TableCell>{formatCPF(user.CPF)}</TableCell>
                                        <TableCell>{formatDate(user.DATACRIACAO)}</TableCell>
                                        <TableCell>{user.EMAIL}</TableCell>
                                        <TableCell>{user.CONTACT ? user.CONTACT : 'não informado'}</TableCell>
                                        <TableCell>{user.TOTAL_COINS}</TableCell>
                                        <TableCell>$ {user.TOTAL_SPENT}</TableCell>
                                        <TableCell>$ {formatNumber(user.LUCRO_CONTRATOS)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ClientsTable>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </Clients>

        </ClientsContainer>
    );
}

const ClientsContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow:hidden;
    box-sizing: border-box;
    padding: 40px 40px;
    background: linear-gradient(to right, #001D3D, #003566, #001D3D);
    color: #f2f2f2;
    position: relative;
    @media (max-width: 915px){
        padding: 40px 20px;
    }
`;

const ClientFirstContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    box-sizing: border-box;
    align-items: center;

    @media (max-width: 915px){
        flex-direction: column;
        gap: 10px;
    }
`;

const AreaTitle = styled.h1`
    text-shadow: 1px 1px 2px rgba(255,255,255,0.2);
    cursor: pointer;
    margin: 0;
    transition: .3s;

    &:hover{
        text-shadow: 1px 1px 2px rgba(255,255,255,0);
        color: #FFC300;
        padding-left: 20px;
    }
`;

const AddClient = styled.button`
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: #FFC300;
    color: #000814;
    border: 0;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
    cursor: pointer;
    transition: .3s;
    &:hover{
        background-color: #000814;
        color: #FFC300;
    }
`;

const Clients = styled.div`
    width: 100%;
    background: linear-gradient(to right, #003566, #001D3D , #003566);  
    box-sizing: border-box;
    margin-top: 50px;
    padding-bottom: 30px;
    box-shadow: 3px 3px 1px black;

    @media (max-width: 915px){
        padding: 20px;
    }
`;

const SearchBar = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    background: linear-gradient(to right, #003566, #001D3D , #003566); 
    input{
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        background: linear-gradient(to right, #000814, #001D3D, #000814);
        border: 0;
        padding-left: 30px;
        box-shadow: 1px 1px 2px black;
        color: rgba(255, 195, 0, 1);
        font-weight: 600;
        text-transform: uppercase;
    }

    @media (max-width: 915px){
        padding: 0px;
    }
`;

const ClientsTable = styled.div`
    width: 100%;
    background: linear-gradient(to right, #003566, #001D3D , #003566); 
    box-sizing: border-box;
    padding: 0 30px 0 30px;
    margin-top: 30px;
    min-height: 300px;
    max-height: 500px;
    overflow-y: hidden;
    overflow-x: hidden;

    display: flex;
    justify-content: center;
    @media (max-width: 915px){
        
        min-height: 300px;
        padding: 0;
        border: 2px solid rgba(0,0,0,0.2);
        max-height: 250px;
    }
`;

const TableContainer = styled.div`
    width: 100%;
    box-sizing: border-box;    
    overflow-y: scroll;
    overflow-x: scroll;
`;

const Table = styled.table`
    width: 100%;
    overflow: auto; 
    border-collapse: collapse;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
    position: relative;
`;

const TableHeader = styled.thead`
    color: #f2f2f2;
`;

const TableRow = styled.tr`
    background: #000814; 
    color: #FFC300;

    &:nth-child(even) {
        color: #FFC300;
        background-color: #001D3D;
    }
`;

const TableHeaderCell = styled.th`
    padding: 15px;
    text-align: center;
    color: #219ebc;
    background-color: #001D3D;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    min-width: 100px; /* Ajuste conforme necessário */
    white-space: nowrap;
`;

const TableBody = styled.tbody`
    background-color: white;
`;

const TableCell = styled.td`
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    min-width: 100px; /* Ajuste conforme necessário */
    white-space: nowrap;
    cursor: pointer; /* Adicionado para indicar que a célula é clicável */
`;

const ImgClient = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f96d00;
`;

const FiltrarClienteInvestido = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    div{
        display: flex;
        align-items: center;

        label{
            font-size: 14px;
        }
    }

    @media (max-width: 1200px){
        margin-top: 20px;
    }
`;

const Message = styled.div`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ type }) => (type === 'success' ? 'green' : 'red')};
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    text-align: center;
    font-weight: bold;
    animation: fade-in-out 3s ease-in-out;

    @keyframes fade-in-out {
        0% {
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;
