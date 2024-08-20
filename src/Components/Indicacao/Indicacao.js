import React, { useState } from "react";
import * as S from './IndicacaoStyle';
import { useSelector } from "react-redux";
import axios from "axios";

const base_route = process.env.REACT_APP_API_BASE_URL;
const ADD_INDICACAO = process.env.REACT_APP_ADICIONAR_INDICACAO_GOLDEN;

export default function Indicacao() {
    const { clients } = useSelector(state => state.clients);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [indicationAddValue, setIndicationAddValue] = useState("");

    // Função para lidar com a mudança no campo de entrada
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtra os clientes com base no CPF ou Nome
    const filteredClients = clients.filter(client => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            client.NAME.toLowerCase().includes(lowerCaseSearchTerm) ||
            client.CPF.includes(lowerCaseSearchTerm)
        );
    });

    const handleSelectClient = (client) => {
        setSelectedClient(client);
        setSearchTerm("");
    };

    const handleSendIndicacao = async () => {
        if (!indicationAddValue || isNaN(indicationAddValue)) {
            alert("Por favor, insira um valor válido.");
            return;
        }

        try {
            const response = await axios.post(`${base_route}${ADD_INDICACAO}`, {
                userId: selectedClient.CPF,
                indicationQtt: parseFloat(indicationAddValue)
            });

            if (response.data.status === 200) {
                alert("SALDO ADICIONADO COM SUCESSO");
                setIndicationAddValue(""); // Limpa o valor de indicação após sucesso
                setSelectedClient(null); // Limpa a seleção do cliente
            } else {
                alert(`Erro ${response.data.status}, resposta: ${response.data.data}`);
            }
        } catch (error) {
            alert(`Erro ao adicionar indicação: ${error.message}`);
        }
    };

    return (
        <S.IndicacaoContainer>
            <h1>ADICIONAR INDICAÇÃO</h1>

            <S.ClientSearch>
                <h4>PESQUISE PELO CLIENTE</h4>
                <input
                    type="text"
                    placeholder="CPF OU NOME"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {searchTerm && filteredClients.length > 0 && (
                    <S.SearchResult>
                        {filteredClients.map(client => (
                            <div 
                                onClick={() => handleSelectClient({ NAME: client.NAME, CPF: client.CPF })} 
                                key={client.id}
                            >
                                <p>{client.NAME}</p>
                                - <span>{client.CPF}</span>
                            </div>
                        ))}
                    </S.SearchResult>
                )}
            </S.ClientSearch>

            {selectedClient && (
                <>
                    <h4>Selecionado: {selectedClient.NAME}</h4>
                    <S.QuandoDeseja>
                        <span>QUANTO DESEJA ADICIONAR AO SALDO DE INDICAÇÃO? (U$)</span>
                        <input
                            type="number"
                            value={indicationAddValue}
                            onChange={(e) => setIndicationAddValue(e.target.value)}
                        />
                        <button onClick={handleSendIndicacao}>ADICIONAR</button>
                    </S.QuandoDeseja>
                </>
            )}
        </S.IndicacaoContainer>
    );
}
