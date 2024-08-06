import React, { useEffect, useState } from "react";
import * as Style from './ClientsStyle'
import { formatCPF, getClients, formatNumber, formatDate } from "../ASSETS/assets";
import Pagination from "../Pagination"; 
import PaginaCliente from "../PaginaDoCliente/PaginaCliente";
import CadastroPage from "../CadastroCliente/CriarCliente";


export default function Clientes() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [hasInvestedMoney, setHasInvestedMoney] = useState(false); 
    const [selectedClient, setSelectedClient] = useState(null); 
    const [existClient, setExistClient] = useState(false); 

    // Estado para paginação
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); 

    const [modalCriarCliente, setModalCriarCliente] = useState(false);

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

    const handleModalCriarClienteOpen = () => {
        setModalCriarCliente(true);
    }

    return (
        <Style.ClientsContainer>

            {
                modalCriarCliente && (
                    <CadastroPage setModalCriarCliente={setModalCriarCliente} />
                )
            }

            <PaginaCliente setUsers={setUsers} handleClose={handleUnselectClient} clienteData={selectedClient} />
            <Style.ClientFirstContent>
                <Style.AreaTitle>CLIENTES</Style.AreaTitle>
                <Style.AddClient onClick={handleModalCriarClienteOpen}>+ ADICIONAR CLIENTE</Style.AddClient>
            </Style.ClientFirstContent>

            <Style.Clients>
                <Style.SearchBar>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        type="text"
                        placeholder="Nome ou CPF do Cliente"
                    />
                </Style.SearchBar>

                <Style.FiltrarClienteInvestido>
                    <div>
                        <input type="checkbox" checked={hasInvestedMoney} onChange={handleCheckboxChange} />
                        <label>COM DINHEIRO INVESTIDO</label>
                    </div>
                </Style.FiltrarClienteInvestido>

                <Style.ClientsTable>
                    <Style.TableContainer>
                        <Style.Table>
                            <Style.TableHeader>
                                <Style.TableRow>
                                    <Style.TableHeaderCell>NOME</Style.TableHeaderCell>
                                    <Style.TableHeaderCell>CPF</Style.TableHeaderCell>
                                    <Style.TableHeaderCell>DATA CAD.</Style.TableHeaderCell>
                                    <Style.TableHeaderCell>E-MAIL</Style.TableHeaderCell>
                                    <Style.TableHeaderCell>CELULAR</Style.TableHeaderCell>
                                    <Style.TableHeaderCell>TOKENS OBTIDOS</Style.TableHeaderCell>
                                    <Style.TableHeaderCell>TOTAL INVESTIDO</Style.TableHeaderCell>
                                    <Style.TableHeaderCell>TOTAL GANHO</Style.TableHeaderCell>
                                </Style.TableRow>
                            </Style.TableHeader>
                            <Style.TableBody>
                                {currentClients.map((user, index) => (
                                    <Style.TableRow key={index} onClick={() => handleSelectClient(user)}>
                                        <Style.TableCell>{user.NAME}</Style.TableCell>
                                        <Style.TableCell>{formatCPF(user.CPF)}</Style.TableCell>
                                        <Style.TableCell>{formatDate(user.DATACRIACAO)}</Style.TableCell>
                                        <Style.TableCell>{user.EMAIL}</Style.TableCell>
                                        <Style.TableCell>{user.CONTACT ? user.CONTACT : 'não informado'}</Style.TableCell>
                                        <Style.TableCell>{user.TOTAL_COINS}</Style.TableCell>
                                        <Style.TableCell>$ {user.TOTAL_SPENT}</Style.TableCell>
                                        <Style.TableCell>$ {formatNumber(user.LUCRO_CONTRATOS)}</Style.TableCell>
                                    </Style.TableRow>
                                ))}
                            </Style.TableBody>
                        </Style.Table>
                    </Style.TableContainer>
                </Style.ClientsTable>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </Style.Clients>

        </Style.ClientsContainer>
    );
}
