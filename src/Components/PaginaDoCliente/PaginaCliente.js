import React, { useState, useEffect } from "react";
import * as S from './PaginaClienteStyle';
import axios from "axios";
import { fetchClientByCpfAndUpdate, updateClientInRedux } from "../../redux/clients/actions";
import Loading from "../Loader";
import { useDispatch } from "react-redux";
const base_url = process.env.REACT_APP_API_BASE_URL
const rota_url = process.env.REACT_APP_API_UPDATE_MORE_THAN_ONE_INFO
export default function PaginaCliente({ clienteData, handleClose, setUsers }) {
    const [editedData, setEditedData] = useState(clienteData || {});
    const [hasChanges, setHasChanges] = useState(false);
    const [isLoading, setLoading] = useState(false)
    const dispatch = useDispatch()

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

        try {
            setLoading(true)
            const response = await axios.post(`${base_url}${rota_url}`, {
                docId: clienteData.CPF,
                updates: changes
            });

            // Verifica o status da resposta
            if (response.status === 200) {
                alert("Dados alterados com sucesso");
             
                dispatch(fetchClientByCpfAndUpdate(clienteData.CPF));

                dispatch(updateClientInRedux(editedData));

                if (setUsers) {
                    setUsers(prevClients => prevClients.map(client =>
                        client.CPF === clienteData.CPF ? { ...client, ...editedData } : client
                    ));
                }

            } else {
                console.log("Ocorreu um erro ao alterar os dados: ", response);
            }
        } catch (error) {
            alert("Houve um erro ao alterar as informações do cliente: " + error.message);
        }
        setLoading(false)

        handleClose();
    };

    const createWhatsAppLink = (number) => {
        // Remove espaços, parênteses, hífens e outros caracteres não numéricos
        const cleanNumber = number.replace(/[^\d]/g, '');
        // Adiciona o código do país para o Brasil (55)
        const internationalNumber = '55' + cleanNumber;
        // Cria o link para o WhatsApp
        return `https://wa.me/${internationalNumber}`;
    };

    const handleWhatsAppClick = () => {
        const contactNumber = editedData.CONTACT;
        if (contactNumber) {
            const whatsappLink = createWhatsAppLink(contactNumber);
            // Abre o link em uma nova aba
            window.open(whatsappLink, '_blank');
        } else {
            alert('Número de contato não disponível.');
        }
    };

    return (
        <S.PaginaClienteContainer>

            {isLoading && (
                <Loading load={isLoading} />
            )}
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
                        value={`${clienteData.CPF} `}
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
                    <h3 onClick={handleWhatsAppClick} style={{ cursor: 'pointer', color: 'blue' }}>Chamar no WhatsApp</h3>
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
