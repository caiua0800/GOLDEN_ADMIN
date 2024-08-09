import React, { useState, useEffect, useMemo, useCallback } from "react";
import * as S from './ContratosStyle'
import { useDispatch, useSelector } from 'react-redux';
import { getDepositos, getAdminData } from '../../redux/actions';
import debounce from 'lodash/debounce';
import Pagination from '../Pagination';
import { formatDate, formatCurrencyBRL, calcularTempoPassado, areDatesEqual } from "../ASSETS/assets";
import PaginaContrato from "../PaginaDoContrato/PaginaContrato";
const PAGE_SIZE = 10;

export default function Contratos() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedContract, setSelectedContract] = useState(null)
    const [dateFilter, setDateFilter] = useState(null);
    const dispatch = useDispatch();
    const depositos = useSelector((state) => state.DepositosReducer.depositos);

    const [adminData, setAdminData] = useState({
        totalCoinsPlataforma: 0,
        totalSaldoPlataforma: '0,00',
        totalDeGanhosPlataforma: '0,00',
        error: ''
    });

    useEffect(() => {

        const fetchData = async () => {
            try {
                dispatch(getDepositos());
                const data = await getAdminData(); // Espera pela Promise
                setAdminData(data); // Atualiza o estado com os dados retornados
            } catch (error) {
                console.error('Failed to fetch admin data:', error);
                setAdminData({
                    totalCoinsPlataforma: 0,
                    totalSaldoPlataforma: '0,00',
                    totalDeGanhosPlataforma: '0,00',
                    error: 'Failed to fetch admin data'
                });
            }
        };
        fetchData();
    }, [dispatch]);

    const filteredClients = useMemo(() => {
        return depositos.filter(user => {
            const matchesSearch = (user.CLIENT_NAME && user.CLIENT_NAME.toUpperCase().includes(search.toUpperCase())) ||
                (user.CLIENT_CPF && user.CLIENT_CPF.toUpperCase().includes(search.toUpperCase())) ||
                (user.PURCHASEDATE && user.PURCHASEDATE.includes(search));
            const matchesStatus = statusFilter === '' ||
                (statusFilter === 'FINALIZADOS' && user.STATUS === 2) ||
                (statusFilter === 'VALORIZANDO' && user.STATUS === 1) ||
                (statusFilter === 'CANCELADOS' && user.STATUS === 3);

            // Adiciona o filtro de ano
            const anoContrato = calcularTempoPassado(user.PURCHASEDATE).anos;
            const matchesYear = yearFilter === '' || anoContrato === parseInt(yearFilter);

            // Filtro de data
            const matchesDate = dateFilter === null || areDatesEqual(user.PURCHASEDATE, dateFilter);

            return matchesSearch && matchesStatus && matchesYear && matchesDate;
        });
    }, [depositos, search, statusFilter, yearFilter, dateFilter]);



    const totalPages = Math.ceil(filteredClients.length / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedClients = filteredClients.slice(startIndex, endIndex);

    const debouncedSearch = useMemo(() => debounce((e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    }, 300), []);

    const valorGanho = (valorInvestido, lucro_atual) => {
        let valorINVESTIDO = (typeof valorInvestido === 'string' ? parseFloat(valorInvestido) : valorInvestido)
        let lucroATUAL = 0;
        if (!lucro_atual)
            lucroATUAL = 0;
        else
            lucroATUAL = lucro_atual
        return ((lucroATUAL / 100) * valorINVESTIDO)
    }


    const handleSelectContract = (contract) => { setSelectedContract(contract) }
    const handleUnselectContract = () => { setSelectedContract(null) }


    return (
        <S.ContratosContainer>
            {selectedContract != null && (
                <PaginaContrato contratoData={selectedContract} handleClose={handleUnselectContract} />
            )}
            <S.HomeInitialContent>
                <S.PartTitle>Painel do Investidor - Modelo de Sistema</S.PartTitle>
                <S.Boxes>
                    <S.Box bgColor="#f2f2f2">
                        <S.BoxContent>
                            <S.BoxTitle>VALOR TOTAL</S.BoxTitle>
                            <span>U$ {formatCurrencyBRL(adminData.totalSaldoPlataforma)}</span>
                        </S.BoxContent>
                    </S.Box>
                    <S.Box bgColor="#f2f2f2">
                        <S.BoxContent>
                            <S.BoxTitle>QUANTIDADE TOTAL DE CONTRATOS</S.BoxTitle>
                            <span>{formatCurrencyBRL(parseInt(adminData.totalCoinsPlataforma))}</span>
                        </S.BoxContent>
                    </S.Box>
                    <S.Box bgColor="#f2f2f2">
                        <S.BoxContent>
                            <S.BoxTitle>TOTAL DE GANHOS</S.BoxTitle>
                            <span>U$ {formatCurrencyBRL(adminData.totalDeGanhosPlataforma)}</span>
                        </S.BoxContent>
                    </S.Box>
                </S.Boxes>
            </S.HomeInitialContent>

            <S.Contracts>
                <S.ContractsTitle>CONTRATOS</S.ContractsTitle>
                <S.SearchAreaContent>
                    <S.SearchArea>
                        <S.FilterDiv>
                            <h4>STATUS</h4>
                            <select onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value="">TODOS</option>
                                <option value="FINALIZADOS">FINALIZADOS</option>
                                <option value="VALORIZANDO">VALORIZANDO</option>
                                <option value="CANCELADOS">CANCELADOS</option>
                            </select>
                        </S.FilterDiv>
                        <S.FilterDiv>
                            <h4>ANOS DE CONTRATO</h4>
                            <select onChange={(e) => setYearFilter(e.target.value)}>
                                <option value="">TODOS</option>
                                <option value="0">Menos de 1 Ano</option>
                                <option value="1">1 à 2 Anos</option>
                                <option value="2">2 à 3 Anos</option>
                                <option value="3">3 à 4 Anos</option>
                                <option value="4">4 à 5 Anos</option>
                            </select>
                        </S.FilterDiv>
                        <S.FilterDivException className="exceptionFilterDiv">
                            <h4>POR DATA</h4>
                            <div>
                                <input
                                    type="date"
                                    onChange={(e) => {
                                        setDateFilter(e.target.value);
                                        setCurrentPage(1);  // Adicione esta linha para voltar à página 1
                                    }}
                                />
                                <button onClick={() => {
                                    setDateFilter(null);
                                    setCurrentPage(1);  // Adicione esta linha para voltar à página 1 ao limpar o filtro
                                }}>
                                    Limpar
                                </button>
                            </div>

                        </S.FilterDivException>
                    </S.SearchArea>

                    <S.SecondSearchBar>
                        <input
                            type="text"
                            placeholder="Nome Do Cliente ou Data de Compra"
                            onChange={debouncedSearch}
                        />
                    </S.SecondSearchBar>
                </S.SearchAreaContent>
            </S.Contracts>

            <S.TableContainer>
                <S.Table>
                    <S.TableHeader>
                        <S.TableRow>
                            <S.TableHeaderCell>ID</S.TableHeaderCell>
                            <S.TableHeaderCell>CLIENTE</S.TableHeaderCell>
                            <S.TableHeaderCell>CPF</S.TableHeaderCell>
                            <S.TableHeaderCell>DATA DE COMPRA</S.TableHeaderCell>
                            <S.TableHeaderCell>QUANTIDADE COINS</S.TableHeaderCell>
                            <S.TableHeaderCell>VALOR UNI.</S.TableHeaderCell>
                            <S.TableHeaderCell>VALOR INVESTIDO</S.TableHeaderCell>
                            <S.TableHeaderCell>LUCRO ATUAL (%))</S.TableHeaderCell>
                            <S.TableHeaderCell>LUCRO ATUAL (U$)</S.TableHeaderCell>
                            <S.TableHeaderCell>FINALIZA EM</S.TableHeaderCell>
                            <S.TableHeaderCell>STATUS</S.TableHeaderCell>
                        </S.TableRow>
                    </S.TableHeader>
                    <S.TableBody>
                        {paginatedClients.map((user, index) => (
                            <S.TableRow key={index} onClick={() => { handleSelectContract(user) }}>
                                <S.TableCell>{user.IDCOMPRA}</S.TableCell>
                                <S.TableCell>{user.CLIENT_NAME.toUpperCase()}</S.TableCell>
                                <S.TableCell>{user.CLIENT_CPF}</S.TableCell>
                                <S.TableCell>{formatDate(user.PURCHASEDATE)}</S.TableCell>
                                <S.TableCell>{user.COINS}</S.TableCell>
                                <S.TableCell>U$ {user.COINVALUE}</S.TableCell>
                                <S.TableCell>U$ {user.TOTALSPENT}</S.TableCell>
                                <S.TableCell>U$ {valorGanho(user.TOTALSPENT, user.RENDIMENTO_ATUAL).toFixed(2)}</S.TableCell>
                                <S.TableCell>U$ {user.RENDIMENTO_ATUAL ? user.RENDIMENTO_ATUAL.toFixed(2) : '00.00'}%</S.TableCell>
                                <S.TableCell>{formatDate(user.YIELDTERM)}</S.TableCell>
                                <S.TableCell>{user.STATUS === 1 ? 'Valorizando' : user.STATUS === 2 ? 'Contrato Finalizado' : 'Cancelado'}</S.TableCell>
                            </S.TableRow>
                        ))}
                    </S.TableBody>
                </S.Table>
            </S.TableContainer>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={page => setCurrentPage(page)}
            />
        </S.ContratosContainer>
    );
}

