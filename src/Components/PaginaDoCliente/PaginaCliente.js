import React, { useState, useEffect } from "react";
import * as S from './PaginaClienteStyle';
import axios from "axios";
import { getClients } from "../ASSETS/assets";

const base_url = process.env.REACT_APP_API_BASE_URL
const rota_url = process.env.REACT_APP_API_UPDATE_MORE_THAN_ONE_INFO

export default function PaginaCliente({ clienteData, handleClose, setUsers }) {
    const [editedData, setEditedData] = useState(clienteData || {});
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (clienteData) {
            setEditedData(clienteData);
        }
    }, [clienteData]);

    if (!clienteData) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevState => {
            const newData = { ...prevState, [name]: value };
            setHasChanges(JSON.stringify(newData) !== JSON.stringify(clienteData));
            return newData;
        });
    };

    const handleSave = async () => {
        const changes = Object.keys(editedData).reduce((acc, key) => {
            if (editedData[key] !== clienteData[key]) {
                acc.push({ field: key, fieldNewValue: editedData[key] });
            }
            return acc;
        }, []);

        // Imprime as alterações
        console.log('Campos alterados:', changes);

        try {
            const response = await axios.post(`${base_url}${rota_url}`, {
                docId: clienteData.CPF,
                updates: changes
            });

            // Verifica o status da resposta
            if (response.status === 200) {
                alert("Dados alterados com sucesso");
                getClients(setUsers)
            } else {
                console.log("Ocorreu um erro ao alterar os dados: ", response);
            }
        } catch (error) {
            alert("Houve um erro ao alterar as informações do cliente: " + error.message);
        }

        handleClose();
    };

    return (
        <S.PaginaClienteContainer>
            <S.PaginaButtons>
                <S.CloseButton onClick={handleClose}>Fechar</S.CloseButton>
                {hasChanges && (
                    <S.SaveButton onClick={handleSave}>Salvar e Voltar</S.SaveButton>
                )}
            </S.PaginaButtons>

            <h1>Detalhes do Cliente</h1>

            <S.ClientDataContainer>
                <S.ClientDataBox>
                    <span>Nome</span>
                    <input
                        type="text"
                        name="NAME"
                        value={editedData.NAME || ''}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>CPF</span>
                    <input
                        className="desabilitado"
                        type="text"
                        value={`${clienteData.CPF} (não pode ser mudado)`}
                        readOnly
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>Username</span>
                    <input
                        type="text"
                        name="USERNAME"
                        value={editedData.USERNAME || ''}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>Email</span>
                    <input
                        type="email"
                        name="EMAIL"
                        value={editedData.EMAIL || ''}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>Telefone</span>
                    <input
                        type="text"
                        name="CONTACT"
                        value={editedData.CONTACT || ''}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>Endereço</span>
                    <input
                        type="text"
                        name="ADRESS"
                        value={editedData.ADRESS || ''}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>Bairro</span>
                    <input
                        type="text"
                        name="NEIGHBORHOOD"
                        value={editedData.NEIGHBORHOOD || ''}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>Cidade</span>
                    <input
                        type="text"
                        name="CITY"
                        value={editedData.CITY || ''}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>CEP</span>
                    <input
                        type="text"
                        name="POSTALCODE"
                        value={editedData.POSTALCODE || ''}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>PROFISSÃO</span>
                    <input
                        type="text"
                        name="JOBTITLE"
                        value={editedData.JOBTITLE || ''}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
            </S.ClientDataContainer>
        </S.PaginaClienteContainer>
    );
}
