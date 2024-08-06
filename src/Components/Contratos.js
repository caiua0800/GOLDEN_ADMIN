import React, { useState, useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { getDepositos, getAdminData } from '../redux/actions';
import debounce from 'lodash/debounce';
import Pagination from './Pagination';
import { formatDate, formatCurrencyBRL } from "./ASSETS/assets";

const PAGE_SIZE = 10; // Número de itens por página

export default function Contratos() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

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
            const matchesSearch = (user.NAME && user.NAME.toUpperCase().includes(search.toUpperCase())) ||
                (user.ID && user.ID.toUpperCase().includes(search.toUpperCase())) ||
                (user.PURCHASEDATE && user.PURCHASEDATE.includes(search));
            const matchesStatus = statusFilter === '' ||
                (statusFilter === 'FINALIZADOS' && user.STATUS === 2) ||
                (statusFilter === 'VALORIZANDO' && user.STATUS === 1) ||
                (statusFilter === 'CANCELADOS' && user.STATUS === 3); // Assuming '3' represents 'CANCELADOS'
            return matchesSearch && matchesStatus;
        });
    }, [depositos, search, statusFilter]);

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
        if(!lucro_atual)
            lucroATUAL = 0;
        else
            lucroATUAL = lucro_atual

        return ((lucroATUAL/100) * valorINVESTIDO) 

    }

    return (
        <ContratosContainer>
            <HomeInitialContent>
                <PartTitle>Painel do Investidor - Modelo de Sistema</PartTitle>
                <Boxes>
                    <Box bgColor="#f2f2f2">
                        <BoxContent>
                            <BoxTitle>VALOR TOTAL</BoxTitle>
                            <span>U$ {formatCurrencyBRL(adminData.totalSaldoPlataforma)}</span>
                        </BoxContent>
                    </Box>
                    <Box bgColor="#f2f2f2">
                        <BoxContent>
                            <BoxTitle>QUANTIDADE TOTAL DE TOKENS</BoxTitle>
                            <span>{adminData.totalCoinsPlataforma}</span>
                        </BoxContent>
                    </Box>
                    <Box bgColor="#f2f2f2">
                        <BoxContent>
                            <BoxTitle>TOTAL DE GANHOS</BoxTitle>
                            <span>U$ {formatCurrencyBRL(adminData.totalDeGanhosPlataforma)}</span>
                        </BoxContent>
                    </Box>
                </Boxes>
            </HomeInitialContent>

            <Contracts>
                <ContractsTitle>CONTRATOS</ContractsTitle>
                <SearchAreaContent>
                    <SearchArea>
                        <FilterDiv>
                            <h4>STATUS</h4>
                            <select onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value="">TODOS</option>
                                <option value="FINALIZADOS">FINALIZADOS</option>
                                <option value="VALORIZANDO">VALORIZANDO</option>
                                <option value="CANCELADOS">CANCELADOS</option>
                            </select>
                        </FilterDiv>
                    </SearchArea>
                    <SecondSearchBar>
                        <input
                            type="text"
                            placeholder="Nome Do Cliente ou Data de Compra"
                            onChange={debouncedSearch}
                        />
                    </SecondSearchBar>
                </SearchAreaContent>
            </Contracts>

            <TableContainer>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell>CLIENTE</TableHeaderCell>
                            <TableHeaderCell>CPF</TableHeaderCell>
                            <TableHeaderCell>DATA DE COMPRA</TableHeaderCell>
                            <TableHeaderCell>QUANTIDADE COINS</TableHeaderCell>
                            <TableHeaderCell>VALOR UNI.</TableHeaderCell>
                            <TableHeaderCell>VALOR INVESTIDO</TableHeaderCell>
                            <TableHeaderCell>TOTAL LUCRO ATUAL</TableHeaderCell>
                            <TableHeaderCell>FINALIZA EM</TableHeaderCell>
                            <TableHeaderCell>STATUS</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedClients.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.IDCOMPRA}</TableCell>
                                <TableCell>{user.CLIENT_NAME.toUpperCase()}</TableCell>
                                <TableCell>{user.CLIENT_CPF}</TableCell>
                                <TableCell>{formatDate(user.PURCHASEDATE)}</TableCell>
                                <TableCell>{user.COINS}</TableCell>
                                <TableCell>U$ {user.COINVALUE}</TableCell>
                                <TableCell>U$ {user.TOTALSPENT}</TableCell>
                                <TableCell>U$ {valorGanho(user.TOTALSPENT, user.RENDIMENTO_ATUAL).toFixed(2)}</TableCell>
                                <TableCell>{formatDate(user.YIELDTERM)}</TableCell>
                                <TableCell>{user.STATUS === 1 ? 'Valorizando' : user.STATUS === 2 ? 'Contrato Finalizado' : 'Cancelado'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={page => setCurrentPage(page)}
            />
        </ContratosContainer>
    );
}


const ContratosContainer = styled.div`
    width: 100%;
    background: linear-gradient(to right, #001D3D, #003566, #001D3D);
    min-height: 100vh;
    padding: 40px;
    display: flex;
    justify-content: start;
    box-sizing: border-box;
    flex-direction: column;

    @media (max-width: 915px){
        padding-left: 30px;
    }
`;

const HomeInitialContent = styled.div`
    width: 100%;
    height: max-content;
    box-sizing: border-box;
    padding: 20px 20px 20px 20px;

    display: flex;
    flex-direction: column;
    align-items: start;
   
    position: relative;
`;

const PartTitle = styled.div`
    color: #FFC300;
    font-weight: 600;
    font-size: 18px;

    @media (max-width: 915px){
        width: 100%;
        text-align: center;
    }
`;

const Boxes = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
    position: absolute;
    top: 70px;
    left: 0;
    @media (max-width: 915px){
        gap: 10px;
        top: 20px;
        flex-wrap: wrap;
        position: relative;
        justify-content: center;
    }
`;

const Box = styled.div`
    width: 100%;
    height: 50px;
    border: 1px solid rgba(0,0,0,0.1);
    // background-color: #F7F7F7;
    background-color: ${({ bgColor }) => bgColor || "#F7F7F7"};

    box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
    transition: .4s;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    
    &:hover{
        height: 100px;
    }

    @media (max-width: 915px){
        width: 300px;
        justify-content: center;
        height: 100px;
    }
`;

const BoxContent = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top: 15px;
    gap: 20px;

    @media (max-width: 915px){
        align-items: center;
        margin-top: 0;
        gap: 10px;
    }

`;

const BoxTitle = styled.p`
    margin:0;
    padding:0;
    font-weight: 600;
    color: #;
`;

const Contracts = styled.div`
    width: 100%;
    height: 300px;
    margin-top: 100px;
    
    @media (max-width: 915px){
        margin-top: 40px;
    }
`;

const ContractsTitle = styled.h1`
    width: 100%;
    display: flex;
    color: #FFC300;
    justify-content: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #FFC300;
`;

const SearchAreaContent = styled.div`
    width: 100%;
    // border: 1px solid rgba(0,0,0,0.1);

    // background-color: #222831;
    // box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);

    @media (max-width: 915px){
        // border: 1px solid rgba(0,0,0,0);
        // box-shadow: -2px 2px 2px rgba(0, 0, 0, 0);
        // background-color: transparent;
    }
`;

const SearchArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0px 40px;
    box-sizing: border-box;

    @media (max-width: 915px){
        flex-direction: column;
        padding: 0px 20px;
    }
`;

const FilterDiv = styled.div`
    width:100%;   
    padding: 10px 50px;
    box-sizing: border-box;

    h4{
        color: #f2f2f2;
    }

    select, input{
        width: 100%;
        height: 30px;
        border: 0;
        background-color: #F7F7F7;
        border: 1px solid rgba(0,0,0,0.1);
        color: rgba(0,0,0,0.7);
        padding-left: 20px;
        box-sizing: border-box;
        font-size: 16px;
        box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 915px){
        padding: 10px 20px;

        h4{
            margin-top: 10px;
            margin: 0;
        }

        select, input{
            height: 40px;
        }
    }
`;

const SecondSearchBar = styled.div`
    width: 100%;
    box-sizing: border-box;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top: 10px;
    padding: 0px 20px 40px 20px;

    input{
        width: 100%;
        height: 40px;
        border: 0;
        box-sizing: border-box;
        border-radius: 3px;  
        text-align: center;     
        background-color: #F7F7F7;
        border: 1px solid rgba(0,0,0,0.1);
        box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
        font-size: 18px;
    }

    @media (max-width: 915px){
        justify-content:center;
        align-items:center;
        margin-top: 10px;
        padding: 0px 40px 40px 40px;

        input{
            border-radius: 2px;  
            height: 40px;
        }
    }
`;

const TableContainer = styled.div`
    margin-top: 40px;
    width: 100%;
    overflow-y: scroll; 
    overflow-x: scroll; 
    max-height: 400px; 
    box-sizing: border-box;
    display: flex;
    box-shadow: 6px 6px 5px rgba(0,0,0,0.6);
    
    @media (max-width: 915px){
        margin-top: 150px;
        overflow-x: scroll; 
        border: 2px solid rgba(0,0,0,0.1);
        padding: 0;
        border-radius: 12px;
    }
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
    transition: .3s;
    &:hover{
        background-color: black;
        cursor: pointer;
        color: white;
        transform: scale(1.1);
    }
`;