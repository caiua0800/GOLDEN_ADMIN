import React, { useEffect, useState } from "react";
import * as S from './SaquesStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getDepositos, getSaques } from '../../redux/actions';
import ValidarCredenciais from "../ValidarCredenciais/ValidarCredenciais";
import ModalNovoSaque from "./ModalNovoSaque";
import { fetchClients } from "../../redux/clients/actions";
import { formatCPF } from "../ASSETS/assets";


export default function Saques() {
    const [search, setSearch] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [modalData, setModalData] = useState({});
    const [modalNovoSaque, setModalNovoSaque] = useState(false);

    const dispatch = useDispatch();

    const saques = useSelector(state => state.SaquesReducer.saques);

    // Estado para paginação
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        if (saques.length === 0) {
            dispatch(getSaques());
        }
    }, [dispatch]);

    const handleStatus = (status) => {
        switch (status) {
            case 1:
                return 'Pendente';
            case 2:
                return 'Pago';
            case 3:
                return 'Expirado';
            case 4:
                return 'Cancelado';
            default:
                return 'Indefinido';
        }
    };

    const handleOpenValidarModal = (data) => {
        setModalData(data);
        setModalAberto(true);
    };

    const filteredSaques = saques
        .filter(saque => saque.STATUS === 1) // Filtra apenas os saques pendentes
        .filter(saque =>
            saque.CLIENT_NAME.toLowerCase().includes(search.toLowerCase())
        );

        console.log(filteredSaques)

    // Lógica de paginação
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSaques.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredSaques.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleReload = async () => {
        await dispatch(getSaques());
        await dispatch(fetchClients('recarregar'));
        await dispatch(getDepositos());
    }

    const handleAccount = (user) => {
        return (
            <S.AccountInfo>
                <span>AGÊNCIA: {user.CLIENT_AGENCY? user.CLIENT_AGENCY : 'sem agência'}</span>
                <span>CONTA: {user.CLIENT_ACCOUNT? user.CLIENT_ACCOUNT : 'sem conta'}</span>
                <span>TIPO: {user.CLIENT_ACCOUNTTYPE? user.CLIENT_ACCOUNTTYPE : 'sem definição'}</span>
                <span>PIX: {user.CLIENT_KEYPIX? formatCPF(user.CLIENT_KEYPIX) : 'sem pix'}</span>
            </S.AccountInfo>
        )
    }

    return (
        <S.SaquesContainer>
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

            <S.SaquesFirstContent>
                <S.AreaTitle>VALIDAR SAQUES</S.AreaTitle>
                <S.AddSaques onClick={() => { setModalNovoSaque(true) }}>+ REALIZAR NOVO SAQUE</S.AddSaques>
            </S.SaquesFirstContent>

            <S.SaquesContent>
                <S.SearchBar>
                    <input
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            setCurrentPage(1); // Redefine para a página 1 ao pesquisar
                        }}
                        type="text"
                        placeholder="FILTRAR"
                    />
                </S.SearchBar>

                <S.SaquesTable>
                    <S.AtualizarData onClick={handleReload}><span>ATUALIZAR</span></S.AtualizarData>
                    <S.TableContainer>
                        <S.Table>
                            <S.TableHeader>
                                <S.TableRow>
                                    <S.TableHeaderCell>CLIENTE</S.TableHeaderCell>
                                    <S.TableHeaderCell>CPF</S.TableHeaderCell>
                                    <S.TableHeaderCell>DATA SOLICITAÇÃO</S.TableHeaderCell>
                                    <S.TableHeaderCell>VALOR</S.TableHeaderCell>
                                    <S.TableHeaderCell>CONTA</S.TableHeaderCell>
                                    <S.TableHeaderCell>APROVADO</S.TableHeaderCell>
                                    <S.TableHeaderCell>OPÇÕES</S.TableHeaderCell>
                                </S.TableRow>
                            </S.TableHeader>
                            <S.TableBody>
                                {currentItems.map((user, index) => (
                                    <S.TableRow key={index}>
                                        <S.TableCell>{user.CLIENT_NAME}</S.TableCell>
                                        <S.TableCell>{user.CLIENT_CPF}</S.TableCell>
                                        <S.TableCell>{user.DATASOLICITACAO}</S.TableCell>
                                        <S.TableCell>$ {user.VALORSOLICITADO}</S.TableCell>
                                        <S.TableCell>{handleAccount(user)}</S.TableCell>
                                        <S.TableCell>{handleStatus(user.STATUS)}</S.TableCell>
                                        <S.TableCell>
                                            <S.OptionsButtons>
                                                <img
                                                    onClick={() => { handleOpenValidarModal(user) }}
                                                    src='pay-ico-saque.png' alt="payIco"
                                                />
                                            </S.OptionsButtons>
                                        </S.TableCell>
                                    </S.TableRow>
                                ))}
                            </S.TableBody>
                        </S.Table>
                    </S.TableContainer>
                </S.SaquesTable>

                {/* Componente de Paginação */}
                <S.Pagination>
                    <S.PaginationButton
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </S.PaginationButton>
                    <S.PaginationInfo>
                        Página {currentPage} de {totalPages}
                    </S.PaginationInfo>
                    <S.PaginationButton
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Próxima
                    </S.PaginationButton>
                </S.Pagination>
            </S.SaquesContent>
        </S.SaquesContainer>
    );
}
