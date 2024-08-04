import React, { useState, useEffect } from "react";
import * as S from './PaginaClienteStyle';

export default function PaginaCliente({ clienteData, handleClose }) {
    if (!clienteData) return null;

    const [editedData, setEditedData] = useState(clienteData);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setEditedData(clienteData);
    }, [clienteData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevState => {
            const newData = { ...prevState, [name]: value };
            setHasChanges(JSON.stringify(newData) !== JSON.stringify(clienteData));
            return newData;
        });
    };

    const handleSave = () => {
        // Lógica para salvar as alterações no backend ou estado global
        console.log('Dados salvos:', editedData);
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
                        value={editedData.NAME}
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
                        value={editedData.USERNAME}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>Email</span>
                    <input
                        type="email"
                        name="EMAIL"
                        value={editedData.EMAIL}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>Telefone</span>
                    <input
                        type="text"
                        name="CONTACT"
                        value={editedData.CONTACT ? editedData.CONTACT : ''}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>Endereço</span>
                    <input
                        type="text"
                        name="ADRESS"
                        value={editedData.ADRESS}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>Bairro</span>
                    <input
                        type="text"
                        name="NEIGHBORHOOD"
                        value={editedData.NEIGHBORHOOD}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>Cidade</span>
                    <input
                        type="text"
                        name="CITY"
                        value={editedData.CITY}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>CEP</span>
                    <input
                        type="text"
                        name="POSTALCODE"
                        value={editedData.POSTALCODE}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
                <S.ClientDataBox>
                    <span>PROFISSÃO</span>
                    <input
                        type="text"
                        name="JOBTITLE"
                        value={editedData.JOBTITLE ? editedData.JOBTITLE : ''}
                        onChange={handleInputChange}
                    />
                </S.ClientDataBox>
            </S.ClientDataContainer>


        </S.PaginaClienteContainer>
    );
}
