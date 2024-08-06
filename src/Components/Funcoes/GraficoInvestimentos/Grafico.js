import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const base_url = process.env.REACT_APP_API_BASE_URL
const urlRota = process.env.REACT_APP_API_OBTER_INVESTIMENTO

const TopClientsChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}${urlRota}`);
                const investments = response.data;

                // Função para converter string de data em objeto Date
                const parseDate = dateStr => new Date(dateStr.replace(' ', 'T'));

                // Agrupa os dados por data e soma os valores investidos
                const groupByDate = investments => {
                    const grouped = {};
                    investments.forEach(investment => {
                        const date = parseDate(investment.PURCHASEDATE);
                        const dateString = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD

                        if (!grouped[dateString]) {
                            grouped[dateString] = 0;
                        }
                        grouped[dateString] += parseFloat(investment.TOTALSPENT);
                    });
                    return grouped;
                };

                const groupedData = groupByDate(investments);

                const data = {
                    labels: Object.keys(groupedData),
                    datasets: [{
                        label: 'Investimentos por Data',
                        data: Object.values(groupedData),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
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
            <h2>Investimentos por Data</h2>
            <Line data={chartData} />
        </div>
    );
};

export default TopClientsChart;
