import React, { useEffect, useState } from "react";
import * as S from './EnviosStyle';
import { db } from "../../../DATABASE/firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import MensagemSchema from "./MensagemSchema";

export default function Envios({ onClose }) {
    const [messages, setMessages] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "MENSAGENS"));
                const messagesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Filtra mensagens com o campo ENVIAR_PARA que existe e tem elementos
                const filteredMessages = messagesData.filter(message =>
                    message.ENVIAR_PARA && Array.isArray(message.ENVIAR_PARA) && message.ENVIAR_PARA.length > 0
                );

                setMessages(filteredMessages);
            } catch (error) {
                console.error("Erro ao buscar mensagens: ", error);
            }
        };

        getMessages();
    }, []);

    const handleDelete = async () => {
        if (messageToDelete) {
            try {
                const messageRef = doc(db, "MENSAGENS", messageToDelete.id);
                
                // Remove apenas o campo ENVIAR_PARA
                await updateDoc(messageRef, {
                    ENVIAR_PARA: [] // Ou use `FieldValue.delete()` se quiser deletar o campo
                });
                
                // Atualiza o estado local para remover a mensagem
                setMessages(messages.filter(message => message.id !== messageToDelete.id));
                setDeleteConfirm(false);
                setMessageToDelete(null);
                alert("Envio deletado com sucesso!");
            } catch (error) {
                console.error("Erro ao deletar o envio: ", error);
                alert("Ocorreu um erro ao deletar o envio.");
            }
        }
    };

    const handleDoubleClick = (message) => {
        setMessageToDelete(message);
        setDeleteConfirm(true);
    };

    return (
        <>
            <S.ModalOverlay>
                <S.ModalContent>
                    <S.CloseButton onClick={onClose}>X</S.CloseButton>
                    <h2>ENVIOS</h2>
                    <S.AllMessages>
                        {messages.map((message) => (
                            <div key={message.id}>
                                <MensagemSchema
                                    data={{
                                        message: message.mensagem,
                                        title: message.titulo,
                                        messageType: message.tipo,
                                        link: message.link,
                                        diaData: message.data
                                    }}
                                    onDoubleClick={() => handleDoubleClick(message)}
                                />

                                <S.EnviouPara>
                                    {message.ENVIAR_PARA.map((client, index) => (
                                        <span key={index}>{client.NAME}; </span> // Use um key exclusivo aqui
                                    ))}
                                </S.EnviouPara>
                            </div>
                        ))}
                    </S.AllMessages>
                </S.ModalContent>
            </S.ModalOverlay>

            {deleteConfirm && (
                <S.ReallyWannaDelete>
                    <S.Really>
                        <p>REALMENTE DESEJA DELETAR ESSE ENVIO?</p>
                        <S.Buttonzin>
                            <button onClick={() => setDeleteConfirm(false)}>NÃO</button>
                            <button onClick={handleDelete}>SIM</button>
                        </S.Buttonzin>
                    </S.Really>
                </S.ReallyWannaDelete>
            )}
        </>
    );
}
