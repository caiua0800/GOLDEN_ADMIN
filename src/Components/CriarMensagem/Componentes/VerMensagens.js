// VerMensagens.js
import React, { useEffect, useState } from "react";
import * as S from './VerMensagensStyle';
import { db } from "../../../DATABASE/firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import MensagemSchema from "./MensagemSchema";

export default function VerMensagens({ onClose }) {
    const [messages, setMessages] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null); // Armazena a mensagem a ser deletada

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

    const handleDelete = async () => {
        if (messageToDelete) {
            try {
                await deleteDoc(doc(db, "MENSAGENS", messageToDelete.id));
                setMessages(messages.filter(message => message.id !== messageToDelete.id));
                setDeleteConfirm(false);
                setMessageToDelete(null);
                alert("Mensagem deletada com sucesso!");
            } catch (error) {
                console.error("Erro ao deletar a mensagem: ", error);
                alert("Ocorreu um erro ao deletar a mensagem.");
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
                    <h2>TODAS AS MENSAGENS</h2>
                    <S.AllMessages>
                        {messages.map((message) => (
                            <MensagemSchema
                                key={message.id}
                                data={{
                                    message: message.mensagem,
                                    title: message.titulo,
                                    messageType: message.tipo,
                                    link: message.link,
                                    diaData: message.data
                                }}
                                onDoubleClick={() => handleDoubleClick(message)}
                            />
                        ))}
                    </S.AllMessages>
                </S.ModalContent>
            </S.ModalOverlay>

            {deleteConfirm && (
                <S.ReallyWannaDelete>
                    <S.Really>
                        <p>REALMENTE DESEJA DELETAR ESSA MENSAGEM?</p>
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
