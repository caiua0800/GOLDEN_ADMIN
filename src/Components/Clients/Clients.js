import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Style from './ClientsStyle';
import { formatCPF, formatDate, formatNumber } from '../ASSETS/assets';
import Pagination from '../Pagination'; 
import PaginaCliente from '../PaginaDoCliente/PaginaCliente';
import CadastroPage from '../CadastroCliente/CriarCliente';
import Loading from '../Loader';
import { fetchClients } from '../../redux/clients/actions';

export default function Clientes() {
    const dispatch = useDispatch();
    const { clients, loading } = useSelector(state => state.clients);
    const [search, setSearch] = useState('');
    const [hasInvestedMoney, setHasInvestedMoney] = useState(false); 
    const [selectedClient, setSelectedClient] = useState(null); 
    const [existClient, setExistClient] = useState(false); 
    const [modalCriarCliente, setModalCriarCliente] = useState(false);

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    useEffect(() => {
        if (selectedClient) {
            const updatedClient = clients.find(client => client.CPF === selectedClient.CPF);
            setSelectedClient(updatedClient);
        }
    }, [clients]); 

    const handleCheckboxChange = () => {
        setHasInvestedMoney(prevState => !prevState); 
    };

    const filteredClients = clients.filter(client => {
        const searchUpper = search.toUpperCase();
        const matchesSearch = client.NAME.toUpperCase().includes(searchUpper) || client.CPF.includes(searchUpper);
        const matchesInvestedMoney = !hasInvestedMoney || client.TOTAL_SPENT > 0; 
        return matchesSearch && matchesInvestedMoney;
    });

    // Paginação
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); 

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
            {modalCriarCliente && (
                <CadastroPage setModalCriarCliente={setModalCriarCliente} />
            )}
            <PaginaCliente handleClose={handleUnselectClient} clienteData={selectedClient} />
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
                        {loading ? (  
                            <Loading load={loading} />
                        ) : (
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
                                    {currentClients.length > 0 ? (
                                        currentClients.map((client, index) => (
                                            <Style.TableRow key={index} onClick={() => handleSelectClient(client)}>
                                                <Style.TableCell>{client.NAME}</Style.TableCell>
                                                <Style.TableCell>{formatCPF(client.CPF)}</Style.TableCell>
                                                <Style.TableCell>{formatDate(client.DATACRIACAO)}</Style.TableCell>
                                                <Style.TableCell>{client.EMAIL}</Style.TableCell>
                                                <Style.TableCell>{client.CONTACT || 'não informado'}</Style.TableCell>
                                                <Style.TableCell>{client.TOTAL_COINS}</Style.TableCell>
                                                <Style.TableCell>U$ {client.TOTAL_SPENT}</Style.TableCell>
                                                <Style.TableCell>U$ {formatNumber(client.LUCRO_CONTRATOS)}</Style.TableCell>
                                            </Style.TableRow>
                                        ))
                                    ) : (
                                        <Style.TableRow>
                                            <Style.TableCell colSpan="8">Nenhum cliente encontrado</Style.TableCell>
                                        </Style.TableRow>
                                    )}
                                </Style.TableBody>
                            </Style.Table>
                        )}
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
