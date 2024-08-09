import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styled from 'styled-components';

Chart.register(...registerables);

const base_url = process.env.REACT_APP_API_BASE_URL;
const urlRota = process.env.REACT_APP_API_OBTER_ESTADO;

const ChartContainer = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 1rem;

    h2 {
        text-align: center;
        margin-bottom: 1rem;
    }

    @media (max-width: 1000px) {
        padding: 0.5rem;
    }
`;

const ClientsByStateChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}${urlRota}`);
                const stateData = response.data;

                // Extrair estados e quantidades de clientes
                const states = Object.keys(stateData);
                const quantities = Object.values(stateData);

                const data = {
                    labels: states,
                    datasets: [{
                        label: 'Número de Clientes por Estado',
                        data: quantities,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }]
                };

                setChartData(data);
            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <ChartContainer>
            <h2>Clientes por Estado</h2>
            <Bar
                data={chartData}
                options={{
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Estado'
                            },
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10,
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Número de Clientes'
                            },
                            beginAtZero: true
                        }
                    }
                }}
            />
        </ChartContainer>
    );
};

export default ClientsByStateChart;
