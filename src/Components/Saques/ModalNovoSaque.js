import React, { useEffect, useState } from "react";
import ModalContainer from '../ModalContainer/ModalContainer';
import * as S from './ModalNovoSaqueStyle';
import { getClients } from "../ASSETS/assets";
import axios from "axios";


const base_url = process.env.REACT_APP_API_BASE_URL;
const rota_url = process.env.REACT_APP_API_CRIAR_SAQUE_ADM;


export default function ModalNovoSaque({ setModalNovoSaque }) {
    const [selectedClient, setSelectedClient] = useState(null);
    const [clients, setClients] = useState([]);
    const [clientSearch, setClientSearch] = useState('');
    const [saqueValor, setSaqueValor] = useState(25);

    useEffect(() => {
        getClients(setClients);
    }, []);

    const filteredClients = clients.filter(client =>
        (client.NAME && client.NAME.toUpperCase().includes(clientSearch.toUpperCase())) ||
        (client.CPF && client.CPF.includes(clientSearch))
    );

    const handleSelectClient = (client) => {
        setSelectedClient(client);
        setClientSearch('');

        console.log(client)
    };

    const handleSaqueChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9,.]/g, '');
        value = value.replace(',', '.');
        setSaqueValor(value);
    };

    const realizeSaque = () => {

        if(!selectedClient){
            alert("Selecione um cliente!");
            return;
        }

        if(parseFloat(saqueValor) < 25){
            alert("O valor do saque precisa ser maior que U$ 25.00");
            return;
        }

        try {
            const response = axios.post(`${base_url}${rota_url}`, {
                docId: selectedClient.CPF,
                saqueData: {
                    STATUS: 2,
                    CODCLI: selectedClient.CPF,
                    VALORSOLICITADO: saqueValor
                }
            });

            alert("Saque Feito com sucesso, disponível em SAQUES FEITOS");

            if(response.status === 404){
                alert("Cliente não encontrato no Banco de Dados, contate o suporte");
            }

        } catch (error) {
            alert('Erro: ', error);
        }
    }

    return (
        <ModalContainer>
            <S.ModalContent>

                <S.FecharModal><button onClick={() => { setModalNovoSaque(false) }}>Fechar</button></S.FecharModal>
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
                            {filteredClients.map(client => (
                                <S.Cliente
                                    key={client.CPF}
                                    onClick={() => handleSelectClient(client)}
                                >
                                    {client.NAME} - {client.CPF}
                                </S.Cliente>
                            ))}
                        </S.SelecionarClienteBox>
                    )}
                </S.SearchClient>
                {selectedClient && (
                    <S.ClienteSelecionado>
                        <S.ClienteInfo>
                            <span>NOME</span>
                            <input type="text" value={selectedClient.NAME} />
                        </S.ClienteInfo>

                        <S.ClienteInfo>
                            <span>CPF</span>
                            <input type="text" value={selectedClient.CPF} />
                        </S.ClienteInfo>

                        <S.ClienteInfo>
                            <span>VALOR DISPONÍVEL</span>
                            <input type="text" value={`U$ ${selectedClient.TOTAL_PLATAFORMA.toFixed(2)}`} />
                        </S.ClienteInfo>

                        <S.ClienteInfo>
                            <span>VALOR DO SAQUE (U$)</span>
                            <input
                                type="text"
                                value={saqueValor}
                                onChange={(e) => {handleSaqueChange(e)}}
                            />
                        </S.ClienteInfo>
                        <S.ButtonSaque>
                            <button onClick={() => {realizeSaque()}}>REALIZAR SAQUE</button>
                        </S.ButtonSaque>
                    </S.ClienteSelecionado>
                )}
            </S.ModalContent>
        </ModalContainer>
    );
}
