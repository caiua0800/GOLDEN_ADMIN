import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as H from './TableStyle';
import { formatCPF } from '../../ASSETS/assets';

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const REACT_APP_API_GET_DID_NOT_PURCHASED = process.env.REACT_APP_API_GET_DID_NOT_PURCHASED;


export default function TabelaNoQuota() {
    const [topClients, setTopClients] = useState([]);
    const [filter, setFilter] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);

    useEffect(() => {
        axios.get(`${REACT_APP_API_BASE_URL}${REACT_APP_API_GET_DID_NOT_PURCHASED}`)
            .then(response => {
                setTopClients(response.data);
                setFilteredClients(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar os melhores clientes:', error);
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
                    {filteredClients.map(client => (
                        <H.TableRow key={client.CPF}>
                            <H.TableCell>{client.NAME}</H.TableCell>
                            <H.TableCell>{formatCPF(client.CPF)}</H.TableCell>
                            <H.TableCell>{client.CONTACT ? client.CONTACT : 'Não Informado'}</H.TableCell>
                        </H.TableRow>
                    ))}
                </H.TableBody>
            </H.Table>
        </H.TableContainer>
    );
}
