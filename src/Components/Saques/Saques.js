import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { getSaques, setAceitoSaques } from '../../redux/actions';
import ValidarCredenciais from "../ValidarCredenciais/ValidarCredenciais";
import ModalNovoSaque from "./ModalNovoSaque";


const payIco = 'https://firebasestorage.googleapis.com/v0/b/wldata.appspot.com/o/payment-pay-later-svgrepo-com.png?alt=media&token=13b149d1-cdad-49e3-9e78-e85ca4940274';
const reloadIcon = 'https://firebasestorage.googleapis.com/v0/b/wldata.appspot.com/o/reload-svgrepo-com%20(1).png?alt=media&token=c99468e4-47db-4616-8788-540ef032113e';



export default function Saques() {
    const [search, setSearch] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modalAberto, setModalAberto] = useState(false);
    const [modalData, setModalData] = useState({})
    const [modalNovoSaque, setModalNovoSaque] = useState(false);

    const dispatch = useDispatch();
    const saques = useSelector(state => state.SaquesReducer.saques);


    useEffect(() => {dispatch(getSaques());}, [dispatch]);
    useEffect(() => {setCurrentPage(1);}, [search]);


    const filteredClients = search.length > 0
    ? saques.filter(user => (
        ((user.CLIENT_NAME && user.CLIENT_NAME.includes(search.toUpperCase())) ||
        (user.CLIENT_CPF && user.CLIENT_CPF.includes(search.toUpperCase()))) &&
        user.STATUS === 1
    )) : saques.filter(user => user.STATUS === 1);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);

    const handleReload = () => {dispatch(getSaques());};

    const handlePreviousPage = () => {setCurrentPage(prev => Math.max(prev - 1, 1));};

    const handleNextPage = () => {setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredClients.length / itemsPerPage)));};

    const handleStatus = (status) => {
        switch (status) {
            case 1:
                return 'Pendente'
            case 2:
                return 'Pago'
            case 3:
                return 'Expirado'
            case 4:
                return 'Cancelado'
            default:
                return 'Indefinido';
        }
    }

    const handleOpenValidarModal = (data) => {
        setModalData(data);
        setModalAberto(true);
        console.log(data);
    }



    return (
        <SaquesContainer>
            {modalAberto && (
                <ValidarCredenciais
                    modalData={modalData}
                    setModalAberto={setModalAberto}
                    type="SAQUE"
                />
            )}

            {modalNovoSaque && (
                <ModalNovoSaque setModalNovoSaque={setModalNovoSaque} />
            )}

            <SaquesFirstContent>
                <AreaTitle>VALIDAR SAQUES</AreaTitle>
                <AddSaques onClick={() => {setModalNovoSaque(true)}}>+ REALIZAR NOVO SAQUE</AddSaques>
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



                <SaquesTable>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>CLIENTE</TableHeaderCell>
                                    <TableHeaderCell>CPF</TableHeaderCell>
                                    <TableHeaderCell>DATA SOLICITAÇÃO</TableHeaderCell>
                                    <TableHeaderCell>VALOR</TableHeaderCell>
                                    <TableHeaderCell>APROVADO</TableHeaderCell>
                                    <TableHeaderCell>OPÇÕES</TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentItems.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.CLIENT_NAME}</TableCell>
                                        <TableCell>{user.CLIENT_CPF}</TableCell>
                                        <TableCell>{user.DATASOLICITACAO}</TableCell>
                                        <TableCell>$ {user.VALORSOLICITADO}</TableCell>

                                        <TableCell>{handleStatus(user.STATUS ? user.STATUS : 0)}</TableCell>
                                        <TableCell>
                                            <OptionsButtons>
                                                <img
                                                    onClick={() => { handleOpenValidarModal(user) }}
                                                    src={payIco} alt="payIco"
                                                />
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


const SaquesContainer = styled.div`
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

const SaquesFirstContent = styled.div`
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

const AddSaques = styled.button`
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: #49beb7;
    color: #f2f2f2;
    border: 0;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
    cursor: pointer;
    transition: .3s;

    &:hover{
        background-color: #085f63;
        color: #f1f1f1;
    }
`;

const SaquesContent = styled.div`
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

const SaquesTable = styled.div`
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
    // display: flex;
    // justify-content: center;
    // gap: 2px;

    // button{
    //     cursor: pointer;
    // }

    display: flex;
    align-items: center;
    justify-content: center;

    img{
        width: 40px;
        cursor: pointer;
        transition: .3s;

        &:hover{
            transform: scale(1.3);
        }
    }
`;

const ReloadData = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;

    p{
        margin: 0;
        padding-right: 60px;
        cursor: pointer;

        img{
            width: 30px;
            transition: .3s;

            &:hover{
                transform: scale(1.3);
            }
        }
    }

    @media(max-width: 1200px){
        align-items: end;
        justify-content: end;
        padding-top: 20px;

        p{
            padding-right: 0px;
            cursor: pointer;

            img{
                width: 30px;
                transition: .3s;

                &:hover{
                    transform: scale(1.3);
                }
            }
        }
    }

`;