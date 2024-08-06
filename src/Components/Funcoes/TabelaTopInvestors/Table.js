import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as H from './TableStyle';




const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const REACT_APP_API_GET_TOP_INVESTORS = process.env.REACT_APP_API_GET_TOP_INVESTORS;

export default function TabelaTopClients() {
    const [topClients, setTopClients] = useState([]);

    useEffect(() => {
        axios.get(`${REACT_APP_API_BASE_URL}${REACT_APP_API_GET_TOP_INVESTORS}`)
            .then(response => {
                setTopClients(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar os melhores clientes:', error);
            });
    }, []);

    return (
        <H.Table>
            <H.TableHeader>
                <H.TableRow>
                    <H.TableHeaderCell>Nome</H.TableHeaderCell>
                    <H.TableHeaderCell>CPF</H.TableHeaderCell>
                    <H.TableHeaderCell>Total Investido</H.TableHeaderCell>
                </H.TableRow>
            </H.TableHeader>
            <H.TableBody>
                {topClients.map(client => (
                    <H.TableRow key={client.cpf}>
                        <H.TableCell>{client.name}</H.TableCell>
                        <H.TableCell>{client.cpf}</H.TableCell>
                        <H.TableCell>{client.totalInvestido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</H.TableCell>
                    </H.TableRow>
                ))}
            </H.TableBody>
        </H.Table>
    );
}
