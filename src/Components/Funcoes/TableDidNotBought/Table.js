import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as H from './TableStyle';
import { formatCPF } from '../../ASSETS/assets';
import Loading from '../../Loader';

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const REACT_APP_API_GET_DID_NOT_PURCHASED = process.env.REACT_APP_API_GET_DID_NOT_PURCHASED;

export default function TabelaNoQuota() {
    const [topClients, setTopClients] = useState([]);
    const [filter, setFilter] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);
    const [loading, setLoading] = useState(true); // Novo estado para controle de carregamento

    useEffect(() => {
        axios.get(`${REACT_APP_API_BASE_URL}${REACT_APP_API_GET_DID_NOT_PURCHASED}`)
            .then(response => {
                setTopClients(response.data);
                setFilteredClients(response.data);
                setLoading(false); // Dados carregados, ocultar o carregamento
            })
            .catch(error => {
                console.error('Erro ao buscar os melhores clientes:', error);
                setLoading(false); // Ocultar o carregamento em caso de erro também
            });
    }, []);

    useEffect(() => {
        const filtered = topClients.filter(client => 
            client.NAME.toLowerCase().includes(filter.toLowerCase()) ||
            (client.CPF).includes(filter)
        );
        setFilteredClients(filtered);
    }, [filter, topClients]);

    return (
        <H.TableContainer>
            <Loading load={loading} /> {/* Exibir o componente de carregamento */}
            <H.FilterInput
                type="text"
                placeholder="Filtrar por Nome ou CPF"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <H.Table>
                <H.TableHeader>
                    <H.TableRow>
                        <H.TableHeaderCell>Nome</H.TableHeaderCell>
                        <H.TableHeaderCell>CPF</H.TableHeaderCell>
                        <H.TableHeaderCell>Telefone</H.TableHeaderCell>
                    </H.TableRow>
                </H.TableHeader>
                <H.TableBody>
                    {filteredClients.length > 0 ? (
                        filteredClients.map(client => (
                            <H.TableRow key={client.CPF}>
                                <H.TableCell>{client.NAME}</H.TableCell>
                                <H.TableCell>{formatCPF(client.CPF)}</H.TableCell>
                                <H.TableCell>{client.CONTACT ? client.CONTACT : 'Não Informado'}</H.TableCell>
                            </H.TableRow>
                        ))
                    ) : (
                        <H.TableRow>
                            <H.TableCell colSpan="3">Nenhum dado disponível</H.TableCell>
                        </H.TableRow>
                    )}
                </H.TableBody>
            </H.Table>
        </H.TableContainer>
    );
}
