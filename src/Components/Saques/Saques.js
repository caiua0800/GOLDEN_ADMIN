import React, { useEffect, useState } from "react";
import * as S from './SaquesStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getSaquesPendentes } from '../../redux/actions';
import ValidarCredenciais from "../ValidarCredenciais/ValidarCredenciais";
import ModalNovoSaque from "./ModalNovoSaque";

const payIco = 'https://firebasestorage.googleapis.com/v0/b/wldata.appspot.com/o/payment-pay-later-svgrepo-com.png?alt=media&token=13b149d1-cdad-49e3-9e78-e85ca4940274';
const reloadIcon = 'https://firebasestorage.googleapis.com/v0/b/wldata.appspot.com/o/reload-svgrepo-com%20(1).png?alt=media&token=c99468e4-47db-4616-8788-540ef032113e';

export default function Saques() {
    const [search, setSearch] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [modalData, setModalData] = useState({});
    const [modalNovoSaque, setModalNovoSaque] = useState(false);
    
    const dispatch = useDispatch();

    const saques = useSelector(state => state.SaquesPendentesReducer.saques)
    useEffect(() => {
        if(saques.length === 0){
            dispatch(getSaquesPendentes());
        }
        console.log(saques);
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
        console.log(data);
    };

    const filteredSaques = saques.filter(saque =>
        saque.CLIENT_NAME.toLowerCase().includes(search.toLowerCase())
    );

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
                        onChange={e => setSearch(e.target.value)}
                        type="text"
                        placeholder="FILTRAR"
                    />
                </S.SearchBar>

                <S.SaquesTable>
                    <S.TableContainer>
                        <S.Table>
                            <S.TableHeader>
                                <S.TableRow>
                                    <S.TableHeaderCell>CLIENTE</S.TableHeaderCell>
                                    <S.TableHeaderCell>CPF</S.TableHeaderCell>
                                    <S.TableHeaderCell>DATA SOLICITAÇÃO</S.TableHeaderCell>
                                    <S.TableHeaderCell>VALOR</S.TableHeaderCell>
                                    <S.TableHeaderCell>APROVADO</S.TableHeaderCell>
                                    <S.TableHeaderCell>OPÇÕES</S.TableHeaderCell>
                                </S.TableRow>
                            </S.TableHeader>
                            <S.TableBody>
                                {filteredSaques.map((user, index) => (
                                    <S.TableRow key={index}>
                                        <S.TableCell>{user.CLIENT_NAME}</S.TableCell>
                                        <S.TableCell>{user.CLIENT_CPF}</S.TableCell>
                                        <S.TableCell>{user.DATASOLICITACAO}</S.TableCell>
                                        <S.TableCell>$ {user.VALORSOLICITADO}</S.TableCell>
                                        <S.TableCell>{handleStatus(user.STATUS)}</S.TableCell>
                                        <S.TableCell>
                                            <S.OptionsButtons>
                                                <img
                                                    onClick={() => { handleOpenValidarModal(user) }}
                                                    src={payIco} alt="payIco"
                                                />
                                            </S.OptionsButtons>
                                        </S.TableCell>
                                    </S.TableRow>
                                ))}
                            </S.TableBody>
                        </S.Table>
                    </S.TableContainer>
                </S.SaquesTable>
            </S.SaquesContent>
        </S.SaquesContainer>
    );
}
