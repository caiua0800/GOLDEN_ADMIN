// MensagemBox.js
import React, { useState } from 'react';
import * as S from './MensagemBoxStyle';
import { db } from '../../../DATABASE/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import MensagemSchema from './MensagemSchema'; // Certifique-se de que o caminho está correto

export default function MensagemBox({ onClose }) {
    const [messageType, setMessageType] = useState('AVISO');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [ver, setVer] = useState(false);
    const [link, setLink] = useState('');



    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} às ${hours}:${minutes}`;
    };

    const handleSave = async () => {
        if (messageType !== '' && title !== '' && message !== '') {
            try {
                const formattedDate = formatDate(new Date());
                await addDoc(collection(db, 'MENSAGENS'), {
                    tipo: messageType,
                    titulo: title,
                    mensagem: message,
                    link: link,
                    data: formattedDate // Salva a data formatada
                });
                alert("Mensagem salva com sucesso!");
                onClose(); // Fecha o modal após salvar
            } catch (error) {
                console.error("Erro ao salvar a mensagem: ", error);
                alert("Ocorreu um erro ao salvar a mensagem.");
            }
        } else {
            alert("Insira todos os campos para criar uma nova mensagem");
        }
    };

    return (
        <S.ModalOverlay>
            <S.ModalContent>
                <S.CloseButton onClick={onClose}>X</S.CloseButton>
                <h2>NOVA MENSAGEM</h2>

                <S.DefineType>
                    <span>DEFINA O TIPO DA MENSAGEM</span>
                    <select value={messageType} onChange={(e) => setMessageType(e.target.value)}>
                        <option value='AVISO'>AVISO</option>
                        <option value='PROMOCAO'>PROMOÇÃO</option>
                        <option value='ATUALIZACAO'>ATUALIZAÇÃO</option>
                        <option value='NOTICIA'>NOTÍCIA</option>
                    </select>
                    <h6 onClick={() => setVer(!ver)}>{!ver ? 'ver' : 'fechar'}</h6>
                </S.DefineType>

                <S.DefineTitle>
                    <span>DIGITE O TÍTULO</span>
                    <textarea
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </S.DefineTitle>

                <S.DefineText>
                    <span>DIGITE A MENSAGEM</span>
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                </S.DefineText>

                <S.InputLink>
                    <span>LINK</span>
                    <input
                        placeholder='cole seu link aqui'
                        type='text'
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </S.InputLink>

                <S.CreateButton>
                    <button onClick={handleSave}>CRIAR</button>
                </S.CreateButton>
            </S.ModalContent>

            {ver && (
                <MensagemSchema data={{ messageType, title, message, link }} />
            )}
        </S.ModalOverlay>
    );
}
