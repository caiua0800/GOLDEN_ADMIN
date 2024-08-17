import React, { useEffect, useState } from "react";
import * as HomeStyle from './HomeStyle'
import TradingViewWidget from '../TeatherGrapth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../../redux/clients/actions';
import LoadingWithMessages from '../InitialLoad'; 
import { getDepositos, getSaques } from "../../redux/actions";

export default function Home() {
    const dispatch = useDispatch();
    const clients = useSelector(state => state.clients.clients);
    const loadingClients = useSelector(state => state.clients.loading);
    const [firstLoad, setFirstLoad] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const depositos = useSelector((state) => state.DepositosReducer.depositos);
    const saques = useSelector((state) => state.SaquesReducer.saques);

    useEffect(() => {
        if (firstLoad) {
            if (loadingClients || clients.length === 0 || saques.length === 0 || depositos.length === 0 ) {
                setIsLoading(true);
                Promise.all([
                    dispatch(fetchClients('novo')),
                    dispatch(getDepositos()),
                    dispatch(getSaques())
                ]).finally(() => {
                    setTimeout(() => {
                        setIsLoading(false);
                        setFirstLoad(false);
                    },5000)
                });

            } else {
                setFirstLoad(false);
            }
        }
    }, [dispatch, firstLoad, clients, depositos, loadingClients]);

    return (
        <HomeStyle.HomeContainer>
            {firstLoad && isLoading ? (
                <LoadingWithMessages isLoading={isLoading} />
            ) : (
                <HomeStyle.HomeContent>
                    <HomeStyle.HomeOptions>
                        <HomeStyle.StyledLink to="/depositos">
                            <HomeStyle.Option color="#FFC300">VALIDAR DEPOSITOS</HomeStyle.Option>
                        </HomeStyle.StyledLink>
                        <HomeStyle.StyledLink to="/clientes">
                            <HomeStyle.Option color="#219ebc">CLIENTES</HomeStyle.Option>
                        </HomeStyle.StyledLink>
                        <HomeStyle.StyledLink to="/usuarios">
                            <HomeStyle.Option color="#FFC300">USUÁRIOS</HomeStyle.Option>
                        </HomeStyle.StyledLink>
                        <HomeStyle.StyledLink to="/contratos">
                            <HomeStyle.Option color="#219ebc">CONTRATOS</HomeStyle.Option>
                        </HomeStyle.StyledLink>
                        <HomeStyle.StyledLink to="/saques">
                            <HomeStyle.Option color="#FFC300">VALIDAR SAQUES</HomeStyle.Option>
                        </HomeStyle.StyledLink>
                        <HomeStyle.StyledLink to="/saquesFeitos">
                            <HomeStyle.Option color="#219ebc">OPERAÇÕES DE SAQUES</HomeStyle.Option>
                        </HomeStyle.StyledLink>
                        <HomeStyle.StyledLink to="/validacao">
                            <HomeStyle.Option color="#FFC300">VALIDAÇÃO DE DOCUMENTOS</HomeStyle.Option>
                        </HomeStyle.StyledLink>
                        <HomeStyle.StyledLink to="/noticias">
                            <HomeStyle.Option color="#219ebc">NOTÍCIAS</HomeStyle.Option>
                        </HomeStyle.StyledLink>
                        <HomeStyle.StyledLink to="/rendimentos">
                            <HomeStyle.Option color="#FFC300">RODAR RENDIMENTO DIÁRIO</HomeStyle.Option>
                        </HomeStyle.StyledLink>
                        <HomeStyle.StyledLink to="/funcoes">
                            <HomeStyle.Option color="#FFC300">FUNÇÕES PLATAFORMA</HomeStyle.Option>
                        </HomeStyle.StyledLink>
                        <HomeStyle.StyledLink to="/mensagem">
                            <HomeStyle.Option color="#FFC300">MENSAGENS</HomeStyle.Option>
                        </HomeStyle.StyledLink>
                    </HomeStyle.HomeOptions>

                    <HomeStyle.GrapthContainer>
                        {/* <TradingViewWidget /> */}
                    </HomeStyle.GrapthContainer>
                </HomeStyle.HomeContent>
            )}
        </HomeStyle.HomeContainer>
    );
}
