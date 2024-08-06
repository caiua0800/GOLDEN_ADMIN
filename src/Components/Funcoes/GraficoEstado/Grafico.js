import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const base_url = process.env.REACT_APP_API_BASE_URL
const urlRota = process.env.REACT_APP_API_OBTER_ESTADO

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
        <div>
            <h2>Clientes por Estado</h2>
            <Bar
                data={chartData}
                options={{
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Estado'
                            }
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
        </div>
    );
};

export default ClientsByStateChart;
