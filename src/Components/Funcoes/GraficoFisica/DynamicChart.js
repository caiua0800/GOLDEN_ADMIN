import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import regression from 'regression';
import './Css.css'; // Certifique-se de que o caminho está correto

Chart.register(...registerables);

const DynamicChart = () => {
    // Gerando valores para uma curva quadrática y = x^2
    const generateQuadraticCurve = (numPoints) => {
        const xValues = Array.from({ length: numPoints }, (_, i) => i + 1);
        const yValues = xValues.map(x => x * x); // y = x^2
        return { xValues, yValues };
    };

    const { xValues: initialXValues, yValues: initialYValues } = generateQuadraticCurve(10);

    const [numXValues, setNumXValues] = useState(initialXValues.length);
    const [numYValues, setNumYValues] = useState(initialYValues.length);
    const [xValues, setXValues] = useState(initialXValues);
    const [yValues, setYValues] = useState(initialYValues);
    const [chartTitle, setChartTitle] = useState('Curva Quadrática com Linha de Tendência');
    const [xAxisTitle, setXAxisTitle] = useState('Eixo X');
    const [yAxisTitle, setYAxisTitle] = useState('Eixo Y');
    const [chartData, setChartData] = useState(null);

    const handleGenerateChart = () => {
        if (xValues.length !== yValues.length) {
            alert('O número de valores de X e Y deve ser igual.');
            return;
        }

        const dataPoints = xValues.map((x, i) => [x, yValues[i]]);
        const result = regression.linear(dataPoints);
        const { equation } = result;

        const data = {
            labels: xValues,
            datasets: [
                {
                    label: chartTitle,
                    data: yValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false,
                },
                {
                    label: 'Linha de Tendência',
                    data: xValues.map(x => result.predict(x)[1]),
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
                <label>Quantidade de Valores para X:</label>
                <input
                    type="number"
                    value={numXValues}
                    onChange={(e) => {
                        const newNumX = parseInt(e.target.value);
                        setNumXValues(newNumX);
                        const { xValues: newX, yValues: newY } = generateQuadraticCurve(newNumX);
                        setXValues(newX);
                        setYValues(newY);
                    }}
                />
                <label>Quantidade de Valores para Y:</label>
                <input
                    type="number"
                    value={numYValues}
                    onChange={(e) => {
                        const newNumY = parseInt(e.target.value);
                        setNumYValues(newNumY);
                        const { xValues: newX, yValues: newY } = generateQuadraticCurve(newNumY);
                        setXValues(newX);
                        setYValues(newY);
                    }}
                />
            </div>

            <div className="values-section" style={{ marginBottom: '20px' }}>
                <h3>Inserir Valores de X</h3>
                {Array.from({ length: numXValues }).map((_, index) => (
                    <input
                        key={index}
                        type="number"
                        placeholder={`Valor X ${index + 1}`}
                        value={xValues[index] || ''}
                        onChange={(e) => {
                            const values = [...xValues];
                            values[index] = parseFloat(e.target.value) || 0;
                            setXValues(values);
                        }}
                    />
                ))}
            </div>

            <div className="values-section" style={{ marginBottom: '20px' }}>
                <h3>Inserir Valores de Y</h3>
                {Array.from({ length: numYValues }).map((_, index) => (
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
                    <p>Equação da Reta: y = {chartData.data.datasets[1].data[0].toFixed(2)}x + {chartData.data.datasets[1].data[1].toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default DynamicChart;
