import React, { useEffect, useState } from "react";
import * as HomeStyle from './HomeStyle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../../redux/clients/actions';
import LoadingWithMessages from '../InitialLoad';
import { getDepositos, getSaques } from "../../redux/actions";

export default function Home() {
    const dispatch = useDispatch();
    const clients = useSelector(state => state.clients);
    const depositos = useSelector((state) => state.DepositosReducer.depositos);
    const saques = useSelector((state) => state.SaquesReducer.saques);

    const [firstLoad, setFirstLoad] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [opSelected, setOpSelected] = useState(null);

    const handleOpClick = (op) => {
        setOpSelected(op);
    };

    const handleUnselect = () => {
        setOpSelected(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (clients.length === 0 || saques.length === 0 || depositos.length === 0) {
                setIsLoading(true);
                await Promise.all([
                    dispatch(fetchClients('novo')),
                    dispatch(getDepositos()),
                    dispatch(getSaques())
                ]);
                setIsLoading(false);
                setFirstLoad(false);
            } else {
                setFirstLoad(false);
            }
        };

        if (firstLoad) {
            fetchData();
        }
    }, [dispatch, firstLoad, clients.length, saques.length, depositos.length]);

    return (
        <HomeStyle.HomeContainer>
            {firstLoad && isLoading ? (
                <LoadingWithMessages isLoading={isLoading} />
            ) : (
                <>
                    <HomeStyle.FirstMachine>
                        <HomeStyle.OptionCircle onClick={() => handleOpClick("FERRAMENTAS")}>
                            <HomeStyle.CircleOption>
                                <img src="tools.png" alt="Ferramentas" />
                            </HomeStyle.CircleOption>
                            <h1>FERREMENTAS</h1>
                        </HomeStyle.OptionCircle>

                        <HomeStyle.OptionCircle onClick={() => { window.location.href = '/funcoes' }}>
                            <HomeStyle.CircleOption>
                                <img src="grapth.png" alt="Gráficos" />
                            </HomeStyle.CircleOption>
                            <h1>GRÁFICOS</h1>
                        </HomeStyle.OptionCircle>

                        <HomeStyle.OptionCircle onClick={() => handleOpClick("CLIENTES")}>
                            <HomeStyle.CircleOption>
                                <img src="clientes.png" alt="Clientes" />
                            </HomeStyle.CircleOption>
                            <h1>CLIENTES</h1>
                        </HomeStyle.OptionCircle>

                        <HomeStyle.OptionCircle onClick={() => handleOpClick("CONTRATOS")}>
                            <HomeStyle.CircleOption>
                                <img src="contratos.png" alt="Contratos" />
                            </HomeStyle.CircleOption>
                            <h1>CONTRATOS</h1>
                        </HomeStyle.OptionCircle>

                        <HomeStyle.OptionCircle onClick={() => handleOpClick("SAQUES")}>
                            <HomeStyle.CircleOption>
                                <img src="saque.png" alt="Saques" />
                            </HomeStyle.CircleOption>
                            <h1>SAQUES</h1>
                        </HomeStyle.OptionCircle>
                    </HomeStyle.FirstMachine>

                    {opSelected && (
                        <HomeStyle.HomeContent>
                            <span onClick={handleUnselect} style={{ cursor: "pointer", float: "right" }}>x</span>

                            {opSelected === "FERRAMENTAS" ? (
                                <>
                                    <HomeStyle.StyledLink to="/indicacao">
                                        <HomeStyle.Option>ADICIONAR INDICAÇÃO</HomeStyle.Option>
                                    </HomeStyle.StyledLink>
                                    <HomeStyle.StyledLink to="/mensagem">
                                        <HomeStyle.Option>CRIAR MENSAGEM</HomeStyle.Option>
                                    </HomeStyle.StyledLink>
                                    <HomeStyle.StyledLink to="/noticias">
                                        <HomeStyle.Option>CRIAR NOTÍCIA</HomeStyle.Option>
                                    </HomeStyle.StyledLink>
                                    <HomeStyle.StyledLink to="/anteciparLucro">
                                        <HomeStyle.Option>ANTECIPAR LUCRO PRA SAQUE</HomeStyle.Option>
                                    </HomeStyle.StyledLink>
                                    <HomeStyle.StyledLink>
                                        <HomeStyle.Option>EXTRAIR BD</HomeStyle.Option>
                                    </HomeStyle.StyledLink>
                                </>
                            ) : opSelected === "CLIENTES" ? (
                                <>
                                    <HomeStyle.StyledLink to="/validacao">
                                        <HomeStyle.Option>VALIDAÇÃO</HomeStyle.Option>
                                    </HomeStyle.StyledLink>
                                    <HomeStyle.StyledLink to="/clientes">
                                        <HomeStyle.Option>TODOS OS CLIENTES</HomeStyle.Option>
                                    </HomeStyle.StyledLink>
                                </>
                            ) : opSelected === "CONTRATOS" ? (
                                <>
                                    <HomeStyle.StyledLink to="/depositos">
                                        <HomeStyle.Option>VALIDAR CONTRATOS</HomeStyle.Option>
                                    </HomeStyle.StyledLink>
                                    <HomeStyle.StyledLink to="/contratos">
                                        <HomeStyle.Option>VER CONTRATOS</HomeStyle.Option>
                                    </HomeStyle.StyledLink>
                                </>
                            ) : opSelected === "SAQUES" ? (
                                <>
                                    <HomeStyle.StyledLink to="/saques">
                                        <HomeStyle.Option>VALIDAR SAQUES</HomeStyle.Option>
                                    </HomeStyle.StyledLink>
                                    <HomeStyle.StyledLink to="/saquesFeitos">
                                        <HomeStyle.Option>VER SAQUES</HomeStyle.Option>
                                    </HomeStyle.StyledLink>
                                </>
                            ) : null}
                        </HomeStyle.HomeContent>
                    )}
                </>
            )}
        </HomeStyle.HomeContainer>
    );
}
