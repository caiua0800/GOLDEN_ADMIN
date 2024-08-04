import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as H from './TableStyle';

export default function TabelaTopClients() {
    const [topClients, setTopClients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/clientes/topInvestors')
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
