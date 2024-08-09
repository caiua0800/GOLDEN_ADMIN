import React, { useState } from "react";
import * as H from './HomeStyle';
import GrowthChart from '../GraficoDeCadastros/Grafico';
import ClientsByStateChart from '../GraficoEstado/Grafico'; 
import InvestorsValuesData from '../GraficoInvestimentos/Grafico';
import TabelaTopClients from '../TabelaTopInvestors/Table'; 
import TabelaNoQuota from "../TableDidNotBought/Table";

export default function HomeFuncoes() {
    const [activeChart, setActiveChart] = useState('growth'); // Define 'growth' como padrão

    const handleChartChange = (chartType) => {
        setActiveChart(chartType);
    };

    return (
        <H.HomeContainer>
            <H.HomeTitle><span>FUNÇÕES DA PLATAFORMA</span></H.HomeTitle>

            <H.HomeContent>
                <H.HomeOptions>
                    <H.StyledLink onClick={() => handleChartChange('growth')}>
                        <H.Option color="#1e96fc">CRESCIMENTO DE CADASTROS</H.Option>
                    </H.StyledLink>
                    <H.StyledLink onClick={() => handleChartChange('state')}>
                        <H.Option color="#1e96fc">QUANTIDADE DE CLIENTES POR ESTADO</H.Option>
                    </H.StyledLink>
                    <H.StyledLink onClick={() => handleChartChange('investimentos')}>
                        <H.Option color="#02cecb">INVESTIMENTOS</H.Option>
                    </H.StyledLink>
                    <H.StyledLink onClick={() => handleChartChange('bestClients')}>
                        <H.Option>MELHORES CLIENTES</H.Option>
                    </H.StyledLink>
                    <H.StyledLink onClick={() => handleChartChange('notPurchased')}>
                        <H.Option color="#fcf300">CADASTRARAM MAS NÃO COMPRARAM</H.Option>
                    </H.StyledLink>


                </H.HomeOptions>

                <H.ChartContainer>
                    <H.ChatCentralize>
                        {activeChart === 'growth' && <GrowthChart />}
                        {activeChart === 'state' && <ClientsByStateChart />}
                        {activeChart === 'investimentos' && <InvestorsValuesData />}
                        {activeChart === 'bestClients' && <TabelaTopClients />}
                        {activeChart === 'notPurchased' && <TabelaNoQuota />}
                    </H.ChatCentralize>
                </H.ChartContainer>
            </H.HomeContent>
        </H.HomeContainer>
    );
}
