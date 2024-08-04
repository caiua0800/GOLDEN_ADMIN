import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { getDepositos, setAceito } from '../redux/actions';
import { formatCPF, formatNumber, getClients } from "./ASSETS/assets";

export default function Depositos() {
    const [search, setSearch] = useState('');
    const [clients, setClients] = useState([]);
    const [clientSearch, setClientSearch] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);
    const dispatch = useDispatch();
    const depositos = useSelector((state) => state.DepositosReducer.depositos);
    const first_price_coin = 67.32;
    const [modal, setModal] = useState(false);
    const [coinsQTDE, setCoinsQTDE] = useState(1);
    const [payMethod, setPayMethod] = useState('PIX');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        dispatch(getDepositos());
        getClients(setClients);
    }, [dispatch]);

    // Reset currentPage to 1 when search or any filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [search]); // You can add more dependencies if there are other filters

    const filteredDepositos = search.length > 0
        ? depositos.filter(user => (user.NAME && user.NAME.includes(search.toUpperCase())) ||
            (user.ID && user.ID.includes(search.toUpperCase())))
        : depositos.filter(user => !user.VISTO);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDepositos.slice(indexOfFirstItem, indexOfLastItem);

    const handleSetAceito = (userId, contratoId) => {
        dispatch(setAceito(userId, contratoId, true));
        dispatch(getDepositos());
    };

    const handleSetNegado = (userId, contratoId) => {
        dispatch(setAceito(userId, contratoId, false));
        dispatch(getDepositos());
    };

    const handleReload = () => {
        dispatch(getDepositos());
    };

    const filteredClients = clients.filter(client =>
        (client.NAME && client.NAME.toUpperCase().includes(clientSearch.toUpperCase())) ||
        (client.CPF && client.CPF.includes(clientSearch))
    );

    const handleHideModal = () => {
        setModal(false);
    }

    const handleShowModal = () => {
        setModal(true);
    }

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredDepositos.length / itemsPerPage)));
    };

    const handleStatus = (status) => {
        switch (status) {
            case 1:
                return 'VALORIZANDO'
            case 2:
                return 'Finalizado'
            case 3:
                return 'Cancelado'
            case 4:
                return 'Pendente'
            default:
                return 'Indefinido';
        }
    }

    return (
        <DepositosContainer>
            <DepositosFirstContent>
                <AreaTitle>VALIDAÇÃO DE DEPÓSITOS</AreaTitle>
                <AddDepositos onClick={handleShowModal}>+ REALIZAR NOVO DEPÓSITO</AddDepositos>
            </DepositosFirstContent>

            <DepositosContent>
                <SearchBar>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        type="text"
                        placeholder="Nome do Cliente"
                    />
                </SearchBar>

                <ReloadData>
                    <p onClick={handleReload}>RELOAD</p>
                </ReloadData>

                <DepositosTable>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>ID</TableHeaderCell>
                                    <TableHeaderCell>CLIENTE</TableHeaderCell>
                                    <TableHeaderCell>CPF</TableHeaderCell>
                                    <TableHeaderCell>DATA SOLICITAÇÃO</TableHeaderCell>
                                    <TableHeaderCell>TOKENS</TableHeaderCell>
                                    <TableHeaderCell>VALOR</TableHeaderCell>
                                    <TableHeaderCell>STATUS</TableHeaderCell>
                                    <TableHeaderCell>AÇÕES</TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentItems.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.IDCOMPRA}</TableCell>
                                        <TableCell>{user.NAME !== 'xxx xxxx' ? user.NAME : 'Indefinido'}</TableCell>
                                        <TableCell>{user.CPF ? formatCPF(user.CPF) : 'Não Informado'}</TableCell>
                                        <TableCell>{user.PURCHASEDATE}</TableCell>
                                        <TableCell>{user.COINS}</TableCell>
                                        <TableCell>$ {formatNumber(user.TOTALSPENT)}</TableCell>
                                        <TableCell>{handleStatus(user.STATUS ? user.STATUS : 0)}</TableCell>
                                        <TableCell>
                                            <OptionsButtons>
                                                <button className="negar" onClick={() => handleSetNegado(user.ID, user.IDCOMPRA)}>Negar</button>
                                                <button className="aceitar" onClick={() => handleSetAceito(user.ID, user.IDCOMPRA)}>Aceitar</button>
                                            </OptionsButtons>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Pagination>
                        <PaginationButton onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Anterior
                        </PaginationButton>
                        <PaginationInfo>{`Página ${currentPage} de ${Math.ceil(filteredDepositos.length / itemsPerPage)}`}</PaginationInfo>
                        <PaginationButton onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredDepositos.length / itemsPerPage)}>
                            Próxima
                        </PaginationButton>
                    </Pagination>
                </DepositosTable>
            </DepositosContent>

            {modal && (
                <ModalNovoDeposito>
                    <BoxModal>
                        <BoxTitle>
                            <h1>REALIZE UM DEPÓSITO</h1>
                        </BoxTitle>

                        <SearchArea>
                            <div>
                                <p>PESQUISE PELO CLIENTE</p>
                                <input
                                    placeholder="NOME OU CPF"
                                    value={clientSearch}
                                    onChange={e => setClientSearch(e.target.value)}
                                />
                                {clientSearch && (
                                    <SearchedClients>
                                        {filteredClients.map((client, index) => (
                                            <ClientBoxSearched key={index}>
                                                <span>{client.NAME}</span>
                                            </ClientBoxSearched>
                                        ))}
                                    </SearchedClients>
                                )}
                                <RestContentBox>
                                    <div>
                                        <span>CLIENTE</span>
                                        <input idRef={selectedClient ? selectedClient.CPF : ''} value={selectedClient ? selectedClient.NAME : ''} readOnly />
                                    </div>
                                    <div>
                                        <span>QUANTIDADE DE TOKENS</span>
                                        <input value={coinsQTDE} onChange={e => {
                                            if (e.target.value < 1) {
                                                setCoinsQTDE(1)
                                            } else {
                                                setCoinsQTDE(e.target.value)
                                            }
                                        }} type="number" />
                                        <p>VALOR DO TOKEN: $ {first_price_coin}</p>
                                    </div>
                                    <div>
                                        <span>VALOR A SER DEPOSITADO</span>
                                        <input value={'$ ' + formatNumber(coinsQTDE * first_price_coin)} readOnly />
                                    </div>
                                    <div>
                                        <span>MÉTODO DE PAGAMENTO</span>
                                        <select value={payMethod} onChange={e => setPayMethod(e.target.value)}>
                                            <option value='PIX'>PIX</option>
                                            <option value='DEPÓSITO BANCÁRIO'>DEPÓSITO BANCÁRIO</option>
                                        </select>
                                    </div>
                                </RestContentBox>
                            </div>
                        </SearchArea>

                        <ModalButtons>
                            <button onClick={handleHideModal} className="cancelBtn">CANCELAR</button>
                            <button className="confirmBtn">CONFIRMAR</button>
                        </ModalButtons>
                    </BoxModal>
                </ModalNovoDeposito>
            )}
        </DepositosContainer>
    );
}

const growWidth = keyframes`
  0% {
    height: 0%;
  }
  100% {
    height: 100%;
  }
`;

// Add styled-components for pagination
const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const PaginationButton = styled.button`
  background-color: #FFC300;
  color: #000814;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const PaginationInfo = styled.span`
  color: #f2f2f2;
`;


const ModalNovoDeposito = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(10px 5px 10px rgba(0, 0, 255, 0.2));

  // Aplica a animação
  animation: ${growWidth} 1s forwards;
`;



const BoxModal = styled.div`
    width: 90%;
    // height: 90%;
    padding-bottom: 80px;
    background-color: rgba(255,255,255,0.9);
    border-radius: 5px;
    box-sizing: border-box;
    overflow: hidden;
`;

const BoxTitle = styled.div`
    width: 100%;
    margin-top: 40px;
    display: flex;
    justify-content: center;

    h1 {
        padding: 10px;
        color: black;
        width: max-content;
        margin: 0;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
`;

const SearchArea = styled.div`
    width: 100%;
    margin-top: 20px;

    div {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 0 20px;
        position: relative;

        p {
            margin: 0;
            color: rgba(0,0,0,0.8);
            font-weight: 600;
        }

        input {
            height: 40px;
            padding-left: 30px;
            box-sizing: border-box;
            font-size: 18px;
            color: rgba(0,0,0,0.7);
            text-transform: uppercase;
            border-radius: 3px;
            border: 0;
            box-shadow: 2px 1px 4px rgba(0,0,0,0.6);
        }
    }
`;

const SearchedClients = styled.div`
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    max-height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
    left: 0;
    background-color: rgba(255,255,255,0.8);
    box-shadow: 2px 2px 3px rgba(0,0,0,0.8);
`;

const ClientBoxSearched = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    cursor: pointer;

    span {
        color: black;
        text-align: center;
        padding: 5px;
    }

    &:hover{
        background-color: rgba(0,0,0,0.3);
    }
`;

const RestContentBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    gap: 20px;
    box-sizing: border-box;

    div{
        display: flex;
        flex-direction: column;

        p{
            margin-bottom: 0;
            font-weight: 100;
            color: rgba(0,0,255,1);
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }

        span{
            color: rgba(0,0,0,0.7);
            font-weight: 600;
            margin-top: 30px;
        }
    
        input, select{
            height: 40px;
            box-sizing: border-box;
            text-align: center;
            font-size: 18px;
            background-color: rgba(255,255,255,0.6);
            border-radius: 3px;
            border: 0;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.9);
        }
    }
`;

const ModalButtons = styled.div`
    display: flex;
    margin-top: 50px;
    gap: 10px;
    padding: 0 60px;
    box-sizing: border-box;

    button{
        width: 100%;
        height: 40px;
        border: 0;
        box-shadow: 2px 2px 3px rgba(0,0,0,0.6);
        font-weight: 600;
        color: rgba(0,0,0,0.8);
        cursor: pointer;
        transition: .3s;
        &:hover{
            background-color: rgba(0,255,0, 0);
        }
    }

    .confirmBtn{
        background-color: rgba(0,255,0, 1);
    }

    .cancelBtn{
        background-color: rgba(255,0,0, 1);
    }
`;

const DepositosContainer = styled.div`
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

const DepositosFirstContent = styled.div`
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

const AddDepositos = styled.button`
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

const DepositosContent = styled.div`
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

const DepositosTable = styled.div`
    width: 100%;
    background: linear-gradient(to right, #003566, #001D3D , #003566); 
    box-sizing: border-box;
    padding: 0 30px 0 30px;
    margin-top: 30px;
    min-height: 300px;
    max-height: 500px;
    overflow-y: hidden;
    overflow-x: hidden;
    flex-direction: column;
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
`;

const OptionsButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: 2px;

    button{
        height: 30px;
        font-weight: 600;
        cursor: pointer;
    }

    .negar{
        background-color: #c1121f;
        color: rgba(0,0,0,1);
    }

    .aceitar{
        background-color: #06d6a0;
        color: rgba(0,0,0,1);
    }
`;

const ReloadData = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;

    p{
        padding-right: 40px;
        margin: 0;
        cursor: pointer;
    }

`;