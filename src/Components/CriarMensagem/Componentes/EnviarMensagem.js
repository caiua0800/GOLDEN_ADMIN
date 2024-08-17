import React, { useEffect, useState } from "react";
import * as S from './EnviarMensagemStyle';
import { db } from "../../../DATABASE/firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import MensagemSchema from "./MensagemSchema";
import { useSelector } from "react-redux";

export default function EnviarMensagem({ onClose }) {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [clientesSelecionados, setClientesSelecionados] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCPFs, setSelectedCPFs] = useState([]);

    const { clients } = useSelector(state => state.clients);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "MENSAGENS"));
                const messagesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMessages(messagesData);
            } catch (error) {
                console.error("Erro ao buscar mensagens: ", error);
            }
        };

        getMessages();
    }, []);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredClients([]);
        } else if (searchTerm === "*") {
            setFilteredClients([{ NAME: "TODOS", CPF: "*" }]);
        } else {
            const filtered = clients.filter(client =>
                client.NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.CPF.includes(searchTerm)
            );
            setFilteredClients(filtered);
        }
    }, [searchTerm, clients]);

    useEffect(() => {
        if (clientesSelecionados === "ENVIAR PARA TODOS") {
            setSelectedCPFs(clients.map(client => client.CPF));
        } else {
            const selectedCPFs = clients
                .filter(client => clientesSelecionados.split('; ').includes(client.NAME))
                .map(client => client.CPF);
            setSelectedCPFs(selectedCPFs);
        }
    }, [clientesSelecionados, clients]);

    const handleClick = (messageData) => {
        setSelectedMessage(messageData);
    };

    const handleExitModalEnviar = () => { 
        setSelectedMessage(null);
        setClientesSelecionados('');
        setSearchTerm('');
        setSelectedCPFs([]);
    };

    const handleSelectClient = (client) => {
        if (client.CPF === "*") {
            setClientesSelecionados('ENVIAR PARA TODOS');
        } else {
            const isSelected = clientesSelecionados.split('; ').includes(client.NAME);

            if (clientesSelecionados === "ENVIAR PARA TODOS") {
                setClientesSelecionados(client.NAME);
                setSelectedCPFs([client.CPF]);
            } else if (isSelected) {
                setClientesSelecionados(prevState => 
                    prevState.split('; ').filter(name => name !== client.NAME).join('; ')
                );
                setSelectedCPFs(prevState => 
                    prevState.filter(cpf => cpf !== client.CPF)
                );
            } else {
                setClientesSelecionados(prevState => 
                    prevState ? `${prevState}; ${client.NAME}` : client.NAME
                );
                setSelectedCPFs(prevState => 
                    [...prevState, client.CPF]
                );
            }
        }
    };

    const handleEnviarMensagens = async () => {
        if (!selectedMessage || !selectedMessage.id) {
            console.error("Nenhuma mensagem selecionada ou id da mensagem não encontrado.");
            console.log(selectedMessage.id)
            return;
        }
    
        try {
            // Verifique se selectedCPFs é um array e não está vazio
            if (!Array.isArray(selectedCPFs)) {
                console.error("selectedCPFs não é um array.");
                return;
            }
    
            const messageRef = doc(db, "MENSAGENS", selectedMessage.id);
    
            await updateDoc(messageRef, {
                ENVIAR_PARA: selectedCPFs
            });
            console.log("Mensagens enviadas com sucesso.");
    
            // Limpar o estado após salvar
            setSelectedMessage(null);
            setClientesSelecionados('');
            setSearchTerm('');
            setSelectedCPFs([]);
        } catch (error) {
            console.error("Erro ao enviar mensagens: ", error);
        }
    };

    return (
        <>
            <S.ModalOverlay>
                <S.ModalContent>
                    <S.CloseButton onClick={onClose}>X</S.CloseButton>
                    <h2>SELECIONE UMA MENSAGEM</h2>
                    <S.AllMessages>
                        {messages.map((message) => (
                            <MensagemSchema
                                key={message.id}
                                data={{
                                    id: message.id,
                                    message: message.mensagem,
                                    title: message.titulo,
                                    messageType: message.tipo,
                                    link: message.link,
                                    diaData: message.data
                                }}
                                handleClick={handleClick}
                            />
                        ))}
                    </S.AllMessages>
                </S.ModalContent>
            </S.ModalOverlay>

            {selectedMessage && (
                <S.ModalEnviar>
                    <S.FecharModalEnviar> <span onClick={handleExitModalEnviar}>x</span></S.FecharModalEnviar>
                    <h3>SELECIONE OS CLIENTES</h3>
                    <S.ShowWicthMessage>
                        <MensagemSchema
                            onClick={() => { console.log('click') }}
                            onDoubleClick={() => { console.log('click') }}
                            data={selectedMessage}
                        />
                    </S.ShowWicthMessage>

                    <S.SearchClient>
                        <p>DIGITE * PARA TODOS OU PESQUISE E SELECIONE</p>
                        <input 
                            type="text" 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                        />

                        <S.Clients>
                            {filteredClients.map(client => (
                                <div 
                                    key={client.CPF} 
                                    onClick={() => handleSelectClient(client)}
                                    style={{
                                        cursor: 'pointer',
                                        textDecoration: selectedCPFs.includes(client.CPF) ? 'underline' : 'none'
                                    }}
                                >
                                    <span>{client.NAME} - {client.CPF}</span>
                                </div>
                            ))}
                        </S.Clients>

                        <S.Result>{clientesSelecionados}</S.Result>

                        <S.BotaoEnviar>
                            <button onClick={handleEnviarMensagens}>ENVIAR</button>
                        </S.BotaoEnviar>
                    </S.SearchClient>
                </S.ModalEnviar>
            )}
        </>
    );
}
