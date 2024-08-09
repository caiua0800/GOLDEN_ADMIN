import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const base_url = process.env.REACT_APP_API_BASE_URL;
const urlRota = process.env.REACT_APP_API_OBTER_INVESTIMENTO;

const TopClientsChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [selectedYear, setSelectedYear] = useState('TODOS');
    const [selectedFilter, setSelectedFilter] = useState('ALL');
    const [years, setYears] = useState([]);

    const monthFilters = {
        ALL: [],
        'JANEIRO-MARÇO': [1, 2, 3],
        'MARÇO-JUNHO': [3, 4, 5, 6],
        'JUNHO-SETEMBRO': [6, 7, 8, 9],
        'SETEMBRO-DEZEMBRO': [9, 10, 11, 12],
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}${urlRota}`);
                const investments = response.data;

                // Função para converter string de data em objeto Date
                const parseDate = dateStr => new Date(dateStr.replace(' ', 'T'));

                // Agrupa os dados por ano e mês
                const groupByYearAndMonth = investments => {
                    const grouped = {};
                    investments.forEach(investment => {
                        const date = parseDate(investment.PURCHASEDATE);
                        const year = date.getFullYear();
                        const month = date.getMonth() + 1;

                        if (!grouped[year]) {
                            grouped[year] = {};
                        }
                        if (!grouped[year][month]) {
                            grouped[year][month] = 0;
                        }
                        grouped[year][month] += parseFloat(investment.TOTALSPENT);
                    });
                    return grouped;
                };

                const groupedData = groupByYearAndMonth(investments);

                // Obter lista de anos
                const uniqueYears = Object.keys(groupedData).sort((a, b) => b - a);
                setYears(uniqueYears);

                // Preparar dados para o gráfico
                const prepareChartData = (year, filter) => {
                    const labels = [];
                    const data = [];
                    const selectedMonths = monthFilters[filter];

                    if (year === 'TODOS') {
                        uniqueYears.forEach(y => {
                            Object.keys(groupedData[y]).forEach(m => {
                                if (selectedMonths.length === 0 || selectedMonths.includes(parseInt(m))) {
                                    labels.push(`${y}-${String(m).padStart(2, '0')}`);
                                    data.push(groupedData[y][m]);
                                }
                            });
                        });
                    } else {
                        Object.keys(groupedData[year]).forEach(m => {
                            if (selectedMonths.length === 0 || selectedMonths.includes(parseInt(m))) {
                                labels.push(`${year}-${String(m).padStart(2, '0')}`);
                                data.push(groupedData[year][m]);
                            }
                        });
                    }

                    setChartData({
                        labels,
                        datasets: [{
                            label: 'Investimentos por Data',
                            data: data,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        }]
                    });
                };

                prepareChartData(selectedYear, selectedFilter);
            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };

        fetchData();
    }, [selectedYear, selectedFilter]);

    return (
        <div>
            <h2>Investimentos por Ano e Período</h2>
            <div>
                <select 
                    value={selectedYear} 
                    onChange={e => {
                        setSelectedYear(e.target.value);
                        setSelectedFilter('ALL');
                    }}
                >
                    <option value="TODOS">TODOS</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <select 
                    value={selectedFilter} 
                    onChange={e => setSelectedFilter(e.target.value)}
                >
                    <option value="ALL">Todos os Meses</option>
                    <option value="JANEIRO-MARÇO">Janeiro a Março</option>
                    <option value="MARÇO-JUNHO">Março a Junho</option>
                    <option value="JUNHO-SETEMBRO">Junho a Setembro</option>
                    <option value="SETEMBRO-DEZEMBRO">Setembro a Dezembro</option>
                </select>
            </div>
            <Line data={chartData} />
        </div>
    );
};

export default TopClientsChart;
