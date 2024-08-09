import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import regression from 'regression';
import './Css.css'; // Certifique-se de que o caminho está correto

Chart.register(...registerables);

const DynamicChart = () => {
    const initialData = [
        { massa: 295.00, tValues: [0.324, 2.304, 4.624, 7.744], yValues: [84.937, 83.169, 81.789, 82.262] },
        { massa: 391.48, tValues: [0.324, 2.304, 4.624, 7.744], yValues: [96.798, 64.035, 63.577, 63.659] },
        { massa: 492.53, tValues: [0.324, 2.304, 4.624, 7.744], yValues: [107.843, 51.590, 51.536, 51.291] },
    ];

    const [selectedDataIndex, setSelectedDataIndex] = useState(0);
    const [numTValues, setNumTValues] = useState(initialData[0].tValues.length);
    const [tValues, setTValues] = useState(initialData[0].tValues);
    const [yValues, setYValues] = useState(initialData[0].yValues);
    const [chartTitle, setChartTitle] = useState('Gráfico de Posição vs. Tempo²');
    const [xAxisTitle, setXAxisTitle] = useState('Tempo² (s²)');
    const [yAxisTitle, setYAxisTitle] = useState('Posição (cm)');
    const [chartData, setChartData] = useState(null);

    const handleDataSelection = (index) => {
        setSelectedDataIndex(index);
        setNumTValues(initialData[index].tValues.length);
        setTValues(initialData[index].tValues);
        setYValues(initialData[index].yValues);
    };

    const handleGenerateChart = () => {
        if (tValues.length !== yValues.length) {
            alert('O número de valores de T e Y deve ser igual.');
            return;
        }

        const dataPoints = tValues.map((t, i) => [t, yValues[i]]);
        const result = regression.linear(dataPoints);
        const { equation } = result;

        const data = {
            labels: tValues,
            datasets: [
                {
                    label: `Carrinho com Massa de ${initialData[selectedDataIndex].massa} g`,
                    data: yValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false,
                },
                {
                    label: `Linha de Tendência: x = ${equation[0].toFixed(2)}t² + ${equation[1].toFixed(2)}`,
                    data: tValues.map(t => result.predict(t)[1]),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false,
                    type: 'line',
                }
            ],
        };

        const options = {
            scales: {
                x: { title: { display: true, text: xAxisTitle } },
                y: { title: { display: true, text: yAxisTitle } },
            },
        };

        setChartData({ data, options });
    };

    return (
        <div className="dynamic-chart" style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            <div className="inputs-section" style={{ marginBottom: '20px' }}>
                <label>Selecione a Massa:</label>
                <select onChange={(e) => handleDataSelection(e.target.value)}>
                    {initialData.map((data, index) => (
                        <option key={index} value={index}>
                            {data.massa} g
                        </option>
                    ))}
                </select>
            </div>

            <div className="values-section" style={{ marginBottom: '20px' }}>
                <h3>Valores de T² (s²)</h3>
                {Array.from({ length: numTValues }).map((_, index) => (
                    <input
                        key={index}
                        type="number"
                        placeholder={`Valor T² ${index + 1}`}
                        value={tValues[index] || ''}
                        onChange={(e) => {
                            const values = [...tValues];
                            values[index] = parseFloat(e.target.value) || 0;
                            setTValues(values);
                        }}
                    />
                ))}
            </div>

            <div className="values-section" style={{ marginBottom: '20px' }}>
                <h3>Valores de Y (cm)</h3>
                {Array.from({ length: numTValues }).map((_, index) => (
                    <input
                        key={index}
                        type="number"
                        placeholder={`Valor Y ${index + 1}`}
                        value={yValues[index] || ''}
                        onChange={(e) => {
                            const values = [...yValues];
                            values[index] = parseFloat(e.target.value) || 0;
                            setYValues(values);
                        }}
                    />
                ))}
            </div>

            <div className="titles-section" style={{ marginBottom: '20px' }}>
                <label>Título do Gráfico:</label>
                <input
                    type="text"
                    value={chartTitle}
                    onChange={(e) => setChartTitle(e.target.value)}
                />
                <label>Título do Eixo X:</label>
                <input
                    type="text"
                    value={xAxisTitle}
                    onChange={(e) => setXAxisTitle(e.target.value)}
                />
                <label>Título do Eixo Y:</label>
                <input
                    type="text"
                    value={yAxisTitle}
                    onChange={(e) => setYAxisTitle(e.target.value)}
                />
            </div>

            <button onClick={handleGenerateChart} style={{ padding: '10px', fontSize: '16px' }}>
                Gerar Gráfico
            </button>
            {chartData && (
                <div style={{ marginTop: '20px' }}>
                    <h2>{chartTitle}</h2>
                    <Line data={chartData.data} options={chartData.options} />
                </div>
            )}
        </div>
    );
};

export default DynamicChart;
