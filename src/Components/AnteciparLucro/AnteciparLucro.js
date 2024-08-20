import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import * as S from './AnteciparLucroStyle';
import { getDepositos } from "../../redux/actions";
import axios from "axios";

const base_route = process.env.REACT_APP_API_BASE_URL;
const ANTECIPAR = process.env.REACT_APP_ANTECIPAR_LUCRO;

export default function AnteciparLucro() {

    const depositos = useSelector((state) => state.DepositosReducer.depositos);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedContract, setSelectedClient] = useState(null);
    const [aditionalValue, setAditionalalue] = useState("");
    const dispatch = useDispatch();


    // useEffect(async ()=>{
    //     await dispatch(getDepositos())
    // }, [])

    const filteredContracts = depositos.filter(contract => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            contract.CLIENT_NAME.toLowerCase().includes(lowerCaseSearchTerm) ||
            contract.CLIENT_CPF.includes(lowerCaseSearchTerm) ||
            (contract.IDCOMPRA && typeof contract.IDCOMPRA === 'string' && contract.IDCOMPRA.includes(searchTerm))
        );
    });
    

    const handleSelectContract = (contract) => {
        setSelectedClient(contract);
        setSearchTerm("");
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSendValue = async () => {

        try {

            const response = await axios.post(`${base_route}${ANTECIPAR}`, {
                userId: selectedContract.CLIENT_CPF,
                contractId: selectedContract.IDCOMPRA,
                increasement: aditionalValue
            });

            if(response.data.status === 200)
                alert("Saldo antecipado com sucesso");
            else
                alert(`Erro: ${response.data.data}, status : ${response.data.status}`);

        } catch (error) {
            alert(`Houve um erro: ${error}`);
        }

        setSearchTerm('');
        setSelectedClient(null)
    }

    return (
        <S.AnteciparLucroContainer>
            <h1>ANTECIPAÇÃO DE LUCRO</h1>
            <S.ContractSearch>
                <h4>PESQUISE PELO CONTRATO</h4>
                <input
                    type="text"
                    placeholder="CPF, NOME OU ID DA COMPRA"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {searchTerm && filteredContracts.length > 0 && (
                    <S.SearchResult>
                        {filteredContracts.map(contract => (
                            <div 
                                onClick={() => handleSelectContract({ CLIENT_NAME: contract.CLIENT_NAME, CLIENT_CPF: contract.CLIENT_CPF, IDCOMPRA: contract.IDCOMPRA })} 
                                key={contract.IDCOMPRA}
                            >
                                <p>CONTRATO {contract.IDCOMPRA}, </p>
                                <p>Cliente {contract.CLIENT_NAME},</p>
                                 <span>U${contract.TOTALSPENT}</span>
                            </div>
                        ))}
                    </S.SearchResult>
                )}
            </S.ContractSearch>

            {selectedContract && (
                <>
                    <h4>CONTRATO: {selectedContract.IDCOMPRA}, CLIENTE: {selectedContract.CLIENT_NAME},</h4>
                    <S.QuandoDeseja>
                        <span>QUANTO DESEJA ANTECIPAR? (U$)</span>
                        <input
                            type="number"
                            value={aditionalValue}
                            onChange={(e) => setAditionalalue(e.target.value)}
                        />
                        <button onClick={handleSendValue}>ADICIONAR</button>
                    </S.QuandoDeseja>
                </>
            )}

        </S.AnteciparLucroContainer>
    )
}