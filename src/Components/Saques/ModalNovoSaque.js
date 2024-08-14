import React, { useState } from "react";
import ModalContainer from '../ModalContainer/ModalContainer';
import * as S from './ModalNovoSaqueStyle';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addSaque } from "../../redux/actions";

const base_url = process.env.REACT_APP_API_BASE_URL;
const rota_url = process.env.REACT_APP_API_CRIAR_SAQUE_ADM;

export default function ModalNovoSaque({ setModalNovoSaque }) {
    const [selectedClient, setSelectedClient] = useState(null);
    const clients = useSelector(state => state.clients.clients); // Valor padrão como array vazio
    const [clientSearch, setClientSearch] = useState('');
    const [saqueValor, setSaqueValor] = useState(25);
    const dispatch = useDispatch();

    const filteredClients = clients.filter(client =>
        (client.NAME && client.NAME.toUpperCase().includes(clientSearch.toUpperCase())) ||
        (client.CPF && client.CPF.includes(clientSearch))
    );

    const handleSelectClient = (client) => {
        setSelectedClient(client);
        setClientSearch('');
    };

    const handleSaqueChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9,.]/g, '');
        value = value.replace(',', '.');
        setSaqueValor(value);
    };

    const realizeSaque = async () => {
        if (!selectedClient) {
            alert("Selecione um cliente!");
            return;
        }

        if (parseFloat(saqueValor) < 25) {
            alert("O valor do saque precisa ser maior que U$ 25.00");
            return;
        }

        try {
            const response = await axios.post(`${base_url}${rota_url}`, {
                docId: selectedClient.CPF,
                saqueData: {
                    STATUS: 2,
                    CODCLI: selectedClient.CPF,
                    VALORSOLICITADO: parseFloat(saqueValor),
                },
            });

            if (response.data.status === 201) {
                const novoSaque = response.data.resposta;
                dispatch(addSaque(novoSaque));
                alert("Saque feito com sucesso, disponível em SAQUES FEITOS");
            } else if (response.status === 404) {
                alert("Cliente não encontrado no Banco de Dados, contate o suporte");
            }

        } catch (error) {
            alert('Erro: ' + error.message);
        }
    };

    return (
        <ModalContainer>
            <S.ModalContent>
                <S.FecharModal>
                    <button onClick={() => setModalNovoSaque(false)}>Fechar</button>
                </S.FecharModal>
                <S.ModalTitle>NOVO SAQUE</S.ModalTitle>
                <S.SearchClient>
                    <span>PROCURE PELO CLIENTE</span>
                    <input
                        type="text"
                        placeholder="NOME OU CPF"
                        value={clientSearch}
                        onChange={(e) => setClientSearch(e.target.value)}
                    />
                    {clientSearch && (
                        <S.SelecionarClienteBox>
                            {filteredClients.length > 0 ? (
                                filteredClients.map(client => (
                                    <S.Cliente
                                        key={client.CPF}
                                        onClick={() => handleSelectClient(client)}
                                    >
                                        {client.NAME} - {client.CPF}
                                    </S.Cliente>
                                ))
                            ) : (
                                <S.Cliente>Cliente não encontrado.</S.Cliente>
                            )}
                        </S.SelecionarClienteBox>
                    )}
                </S.SearchClient>
                {selectedClient && (
                    <S.ClienteSelecionado>
                        <S.ClienteInfo>
                            <span>NOME</span>
                            <input type="text" value={selectedClient.NAME} readOnly />
                        </S.ClienteInfo>

                        <S.ClienteInfo>
                            <span>CPF</span>
                            <input type="text" value={selectedClient.CPF} readOnly />
                        </S.ClienteInfo>

                        <S.ClienteInfo>
                            <span>VALOR DISPONÍVEL</span>
                            <input type="text" value={`U$ ${selectedClient.TOTAL_PLATAFORMA.toFixed(2)}`} readOnly />
                        </S.ClienteInfo>

                        <S.ClienteInfo>
                            <span>VALOR DO SAQUE (U$)</span>
                            <input
                                type="text"
                                value={saqueValor}
                                onChange={handleSaqueChange}
                            />
                        </S.ClienteInfo>
                        <S.ButtonSaque>
                            <button onClick={realizeSaque}>REALIZAR SAQUE</button>
                        </S.ButtonSaque>
                    </S.ClienteSelecionado>
                )}
                {clients.length === 0 && (
                    <S.Cliente>Nenhum cliente disponível para saque.</S.Cliente>
                )}
            </S.ModalContent>
        </ModalContainer>
    );
}
