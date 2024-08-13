import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const base_url = process.env.REACT_APP_API_BASE_URL;
const urlRota = process.env.REACT_APP_API_OBTER_CADASTROS;

const GrowthChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}${urlRota}`);
                const dates = response.data;
                if (!Array.isArray(dates)) {
                    throw new Error('Resposta da API não é um array');
                }

                // Função para converter string de data em objeto Date
                const parseDate = dateStr => {
                    if (typeof dateStr === 'string') {
                        return new Date(dateStr.replace(' ', 'T'));
                    }
                    return null;
                };

                // Ordena as datas da mais antiga para a mais recente
                const sortedDates = dates
                    .map(parseDate)
                    .filter(date => date !== null) // Remove datas inválidas
                    .sort((a, b) => a - b);

                // Agrupa os dados por mês e ano
                const groupByMonth = dates => {
                    const grouped = {};
                    dates.forEach(date => {
                        const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
                        if (!grouped[yearMonth]) {
                            grouped[yearMonth] = 0;
                        }
                        grouped[yearMonth]++;
                    });
                    return grouped;
                };

                const groupedData = groupByMonth(sortedDates);

                const data = {
                    labels: Object.keys(groupedData),
                    datasets: [{
                        label: 'Número de Clientes Cadastrados',
                        data: Object.values(groupedData),
                        backgroundColor: 'rgba(255, 215, 0, 0.2)',
                        borderColor: 'rgba(255, 215, 0, 1)',
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
            <h2>Crescimento de Clientes</h2>
            <Line data={chartData} />
        </div>
    );
};

export default GrowthChart;
