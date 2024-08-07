import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TradingViewWidget from './TeatherGrapth';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../redux/clients/actions'; // Importe a ação fetchClients
import LoadingWithMessages from './InitialLoad'; // Importe o novo componente de Loading

export default function Home() {
    const dispatch = useDispatch();
    const clients = useSelector(state => state.clientsReducer.clients); // Selecionar clientes
    const loadingClients = useSelector(state => state.clientsReducer.loading);
    const [firstLoad, setFirstLoad] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const depositos = useSelector((state) => state.DepositosReducer.depositos);

    useEffect(() => {
        if (firstLoad) {
            console.log('first Load iniciou');
            if (clients.length === 0 || depositos.length === 0) { // Verificar se os dados estão carregados
                setIsLoading(true);
                dispatch(fetchClients()).finally(() => {
                    setTimeout(() => {
                        setIsLoading(false);
                        setFirstLoad(false);
                        console.log('first Load finalizou');
                    }, 10000); // Espera 10 segundos
                });
            } else {
                setFirstLoad(false);
            }
        }
    }, [dispatch, firstLoad, clients]);

    return (
        <HomeContainer>
            {firstLoad && isLoading ? (
                <LoadingWithMessages isLoading={isLoading} />
            ) : (
                <HomeContent>
                    <HomeOptions>
                        <StyledLink to="/depositos">
                            <Option color="#FFC300">VALIDAR DEPOSITOS</Option>
                        </StyledLink>                    
                        <StyledLink to="/clientes">
                            <Option color="#219ebc">CLIENTES</Option>
                        </StyledLink>
                        <StyledLink to="/usuarios">
                            <Option color="#FFC300">USUÁRIOS</Option>
                        </StyledLink>
                        <StyledLink to="/contratos">
                            <Option color="#219ebc">CONTRATOS</Option>
                        </StyledLink>
                        <StyledLink to="/saques">
                            <Option color="#FFC300">VALIDAR SAQUES</Option>
                        </StyledLink>
                        <StyledLink to="/saquesFeitos">
                            <Option color="#219ebc">OPERAÇÕES DE SAQUES</Option>
                        </StyledLink>
                        <StyledLink to="/validacao">
                            <Option color="#FFC300">VALIDAÇÃO DE DOCUMENTOS</Option>
                        </StyledLink>
                        <StyledLink to="/noticias">
                            <Option color="#219ebc">NOTÍCIAS</Option>
                        </StyledLink>
                        <StyledLink to="/rendimentos">
                            <Option color="#FFC300">RODAR RENDIMENTO DIÁRIO</Option>
                        </StyledLink>
                        <StyledLink to="/funcoes">
                            <Option color="#FFC300">FUNÇÕES PLATAFORMA</Option>
                        </StyledLink>
                    </HomeOptions>

                    <GrapthContainer>
                        <TradingViewWidget />
                    </GrapthContainer>
                </HomeContent>
            )}
        </HomeContainer>
    );
}

const HomeContainer = styled.div`
    width: 100%;
    background: linear-gradient(to right, #001D3D, #003566, #001D3D);
    height: 100vh;
    overflow-y: scroll;
    padding-top: 40px;
    display: flex;
    justify-content: center;
    align-items: start;
    box-sizing: border-box;
    overflow-x: hidden;
    @media (max-width: 920px){
        padding: 80px 20px;
    }
`;

const HomeContent = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const GrapthContainer = styled.div`
    padding: 40px 30px;
    box-sizing: border-box;
    width: 100%;
    height: 600px;
    overflow: hidden;
    display: flex;
    justify-content: center;

    @media (max-width: 920px){
        margin-top: 20px;
        padding: 0px;
        height: 450px;
    }
`;

const HomeOptions = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    gap: 10px;

    @media (max-width: 920px){
        flex-wrap: no-wrap; 
        flex-direction: column; 
    }
`;

const Option = styled.div`
    width: 500px;
    height: 100px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
    background-color: ${(props) => props.color || "white"};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    transition: .3s;
    color: rgba(0,0,0,0.7);
    font-weight: 600;
    &:hover{
        transform: scale(1.05);
    }

    @media (max-width: 920px){
        width: 100%;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
