import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDepositos, setAceito } from '../../redux/actions';
import { formatCPF, formatNumber, getClients } from "../ASSETS/assets";
import ValidarCredenciais from "../ValidarCredenciais/ValidarCredenciais";
import * as S from './DepositosStyle';

const adminIcon = 'https://firebasestorage.googleapis.com/v0/b/golden-token-62a99.appspot.com/o/ICONS%2Fadmin-svgrepo-com.png?alt=media&token=568ef7e2-0166-4002-9042-6461bc3d34eb';

export default function Depositos() {
    
    const [search, setSearch] = useState('');
    const [clients, setClients] = useState([]);
    const [clientSearch, setClientSearch] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);
    const dispatch = useDispatch();
    const depositos = useSelector((state) => state.DepositosReducer.depositos);
    const [modal, setModal] = useState(false);
    const [coinsQTDE, setCoinsQTDE] = useState(1);
    const [payMethod, setPayMethod] = useState('PIX');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modalAberto, setModalAberto] = useState(false);
    const [modalData, setModalData] = useState({})
    const [valorUni, setValorUni] = useState(50);
    const [lucroFinal, setLucroFinal] = useState(150);
    const [type, setType] = useState('DEPOSITO');

    // useEffect(() => {
    //     if(depositos.length === 0){
    //         dispatch(getDepositos());
    //         console.log('dispachando depositos')
    //     }
    //     if(clients.length === 0){
    //         console.log('dispachando clientes')

    //         getClients(setClients);
    //     }
    // }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const filteredDepositos = depositos.filter(user => user.STATUS === 4)
        .filter(user =>
            (user.CLIENT_NAME && user.CLIENT_NAME.toUpperCase().includes(search.toUpperCase())) ||
            (user.CLIENT_CPF && user.CLIENT_CPF.includes(search.toUpperCase()))
        );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDepositos.slice(indexOfFirstItem, indexOfLastItem);

    const handleReload = () => {
        dispatch(getDepositos());
    };

    const filteredClients = clients.filter(client =>
        (client.NAME && client.NAME.toUpperCase().includes(clientSearch.toUpperCase())) ||
        (client.CPF && client.CPF.includes(clientSearch)) ||
        (client.CLIENT_NAME && client.CLIENT_NAME.toUpperCase().includes(clientSearch.toUpperCase())) ||
        (client.CLIENT_CPF && client.CLIENT_CPF.includes(clientSearch))
    );


    const handleShowModal = () => { setModal(true); }
    const handlePreviousPage = () => { setCurrentPage(prev => Math.max(prev - 1, 1)); };
    const handleNextPage = () => { setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredDepositos.length / itemsPerPage))); };

    const handleStatus = (status) => {
        switch (status) {
            case 1:
                return 'VALORIZANDO';
            case 2:
                return 'Finalizado';
            case 3:
                return 'Cancelado';
            case 4:
                return 'Pendente';
            default:
                return 'Indefinido';
        }
    }

    const handleOpenValidarModalDEPOSITO = (data, type) => {
        setModalData(data);
        setModalAberto(true);
        setType(type)
    }

    const handleSelectClient = (client) => {
        console.log("Cliente selecionado:", client); 
        setSelectedClient(client);
        setClientSearch('');
    }

    const handleSave = () => {
        if (selectedClient) {
            const totalPurchaseValue = parseFloat(coinsQTDE) * parseFloat(valorUni);
            const purchaseDetails = {
                CLIENT_NAME: selectedClient.NAME,
                CLIENT_CPF: selectedClient.CPF,
                INDICADOR: (selectedClient.INDICADOR) ?selectedClient.INDICADOR : null,
                COINS: coinsQTDE,
                COINVALUE: valorUni,
                TOTALSPENT: totalPurchaseValue,
                MAXIMUMQUOTAYIELD: lucroFinal,
                MAXIMUMNUMBEROFDAYSTOYIELD: "36",
                RENDIMENTO_ATUAL: 0,
                paymentMethod: payMethod
            };
            handleOpenValidarModalDEPOSITO(purchaseDetails, 'CRIAR_DEPOSITO');
        } else {
            console.error('Nenhum cliente selecionado.');
        }
    };


    const handleName = (name1, name2) => {return name1 ? name1 : name2}
    const handleCPF = (cpf1, cpf2) => {return cpf1 ? formatCPF(cpf1) : formatCPF(cpf2)}


    return (
        <S.DepositosContainer>
            {modalAberto && (
                <ValidarCredenciais
                    setModalAberto={setModalAberto}
                    type={type}
                    modalData={modalData}
                />
            )}
            <S.DepositosFirstContent>
                <S.AreaTitle>VALIDAÇÃO DE DEPÓSITOS</S.AreaTitle>
                <S.AddDepositos onClick={handleShowModal}>+ REALIZAR NOVO DEPÓSITO</S.AddDepositos>
            </S.DepositosFirstContent>

            <S.DepositosContent>
                <S.SearchBar>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        type="text"
                        placeholder="Nome do Cliente"
                    />
                </S.SearchBar>

 

                <S.DepositosTable>
                    <S.TableContainer>
                        <S.Table>
                            <S.TableHeader>
                                <S.TableRow>
                                    <S.TableHeaderCell>ID</S.TableHeaderCell>
                                    <S.TableHeaderCell>CLIENTE</S.TableHeaderCell>
                                    <S.TableHeaderCell>CPF</S.TableHeaderCell>
                                    <S.TableHeaderCell>DATA SOLICITAÇÃO</S.TableHeaderCell>
                                    <S.TableHeaderCell>TOKENS</S.TableHeaderCell>
                                    <S.TableHeaderCell>VALOR</S.TableHeaderCell>
                                    <S.TableHeaderCell>STATUS</S.TableHeaderCell>
                                    <S.TableHeaderCell>AÇÕES</S.TableHeaderCell>
                                </S.TableRow>
                            </S.TableHeader>
                            <S.TableBody>
                                {currentItems.map((user, index) => (
                                    <S.TableRow key={index} onClick={() => { console.log(user) }}>
                                        <S.TableCell>{user.IDCOMPRA}</S.TableCell>
                                        <S.TableCell>{handleName(user.NAME, user.CLIENT_NAME)}</S.TableCell>
                                        <S.TableCell>{handleCPF(user.CLIENT_CPF, user.CPF)}</S.TableCell>
                                        <S.TableCell>{user.PURCHASEDATE}</S.TableCell>
                                        <S.TableCell>{user.COINS}</S.TableCell>
                                        <S.TableCell>U$ {(user.TOTALSPENT)}</S.TableCell>
                                        <S.TableCell>{handleStatus(user.STATUS ? user.STATUS : 0)}</S.TableCell>
                                        <S.TableCell>
                                            <S.OptionsButtons>
                                                <img onClick={() => { handleOpenValidarModalDEPOSITO(user, "DEPOSITO") }} src={adminIcon} />
                                            </S.OptionsButtons>
                                        </S.TableCell>
                                    </S.TableRow>
                                ))}
                            </S.TableBody>
                        </S.Table>
                    </S.TableContainer>

                    <S.Pagination>
                        <S.PaginationButton onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Anterior
                        </S.PaginationButton>
                        <S.PaginationInfo>{`Página ${currentPage} de ${Math.ceil(filteredDepositos.length / itemsPerPage)}`}</S.PaginationInfo>
                        <S.PaginationButton onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredDepositos.length / itemsPerPage)}>
                            Próxima
                        </S.PaginationButton>
                    </S.Pagination>
                </S.DepositosTable>
            </S.DepositosContent>

            {modal && (
                <S.ModalNovoDeposito>
                    <S.BoxModal>
                        <S.BoxTitle>
                            <h1>REALIZE UM DEPÓSITO</h1>
                        </S.BoxTitle>

                        <S.SearchArea>
                            <div>
                                <p>PESQUISE PELO CLIENTE</p>
                                <input
                                    placeholder="NOME OU CPF"
                                    value={clientSearch}
                                    onChange={e => setClientSearch(e.target.value)}
                                />
                                {clientSearch && (
                                    <S.SearchedClients>
                                        {filteredClients.map((client, index) => (
                                            <S.ClientBoxSearched key={index} onClick={() => {
                                                console.log("Clicado"); // Verifique se o clique está sendo detectado
                                                handleSelectClient(client);
                                            }}>
                                                <span>{client.NAME}</span>
                                            </S.ClientBoxSearched>

                                        ))}
                                    </S.SearchedClients>
                                )}

                                <S.RestContentBox>
                                    <div>
                                        <span>CLIENTE</span>
                                        <input idRef={selectedClient ? selectedClient.CPF : ''} value={selectedClient ? (selectedClient.NAME + ' - ' + selectedClient.CPF) : ''} readOnly />
                                    </div>
                                    <div>
                                        <span>QUANTIDADE DE CONTRATOS</span>
                                        <input type="number" value={coinsQTDE} onChange={e => setCoinsQTDE(e.target.value)} />
                                    </div>
                                    <div>
                                        <span>VALOR POR CONTRATO (U$)</span>
                                        <input type="number" value={valorUni} onChange={e => setValorUni(e.target.value)} />
                                    </div>
                                    <div>
                                        <span>LUCRO FINAL (U$)</span>
                                        <input type="number" value={lucroFinal} onChange={e => setLucroFinal(e.target.value)} />
                                    </div>
                                    <div>
                                        <span>VALOR DE COMPRA FINAL (U$)</span>
                                        <input type="number" value={parseFloat(coinsQTDE) * parseFloat(valorUni)} />
                                    </div>
                                    <div>
                                        <span>LUCRO FINAL DO CLIENTE (U$)</span>
                                        <input type="number" value={(parseFloat(coinsQTDE) * parseFloat(valorUni)) * (parseFloat(lucroFinal) / 100)} />
                                    </div>
                                    <div>
                                        <span>FORMA DE PAGAMENTO</span>
                                        <select value={payMethod} onChange={e => setPayMethod(e.target.value)}>
                                            <option value="PIX">PIX</option>
                                            <option value="TED">TED</option>
                                            <option value="BOLETO">BOLETO</option>
                                        </select>
                                    </div>

                                </S.RestContentBox>

                            </div>
                        </S.SearchArea>

                        <S.ButtonArea>
                            <h6 className="cancelBtn" onClick={() => setModal(false)}>CANCELAR</h6>
                            <h6 onClick={handleSave} className="SaveBtn">Salvar</h6>
                        </S.ButtonArea>
                    </S.BoxModal>
                </S.ModalNovoDeposito>
            )}
        </S.DepositosContainer>
    );
}
