import React, { useState, useEffect } from "react";
import * as S from './RendimentoStyle';
import ValidarCredenciais from "../ValidarCredenciais/ValidarCredenciais";
import { convertToLocalTime } from "../ASSETS/assets";
import { db } from "../../DATABASE/firebaseConfig";
import { getDoc, doc, collection } from "firebase/firestore";

export default function Rendimento() {

    const [modalAberto, setModalAberto] = useState(false)
    const [mensagemAviso, setMensagemAviso] = useState(false)
    const [lastRendimento, setLastRendimento] = useState({ data: '', hora: '' });

    useEffect(() => {
        const fetchLastRendimento = async () => {
            try {
                // Obter referência ao documento
                const docRef = doc(collection(db, 'SYSTEM_VARIABLES'), 'RENDIMENTOS');
                // Buscar o documento
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data && data.ULTIMO_RENDIMENTO) {
                        console.log(data.ULTIMO_RENDIMENTO);
                        const { data: formattedDate, hora: formattedTime } = convertToLocalTime(data.ULTIMO_RENDIMENTO);
                        setLastRendimento({ data: formattedDate, hora: formattedTime });
                        console.lof(lastRendimento)
                    } else {
                        console.log('Nenhum dado encontrado no campo ULTIMO_RENDIMENTO.');
                    }
                } else {
                    console.log('Documento não encontrado.');
                }
            } catch (error) {
                console.error('Erro ao buscar o último rendimento:', error);
            }
        };

        fetchLastRendimento();
    }, []);


    return (
        <S.RendimentoContainer>

            {modalAberto && (
                <ValidarCredenciais setMensagemAviso={setMensagemAviso} setModalAberto={setModalAberto} modalData={null} type="RODAR_RENDIMENTO" />
            )}

            {mensagemAviso && (
                <S.MensagemAviso >
                    <p>NÃO FECHE ESSA PÁGINA E NEM ATUALIZE, ISSO PODE LEVAR ATÉ 6 MINUTOS</p>
                </S.MensagemAviso>
            )}

            <S.RendimentoTitle><h1>RENDIMENTO DIÁRIO</h1></S.RendimentoTitle>

            <S.InformacoesUltimoRendimento>
                <h4>Informações sobre o último rendimento</h4>
                <S.Info>
                    <p>O último rendimento aconteceu no dia <span>{lastRendimento.data ? lastRendimento.data : 'dd/mm/aaaa'}</span> às <span>{lastRendimento.hora ? lastRendimento.hora : 'hh:mm:ss'}</span></p>
                </S.Info>
                <S.Info>
                    <p>Os rendimentos de todos os clientes foram atualizados com <span>exito!</span></p>
                </S.Info>
            </S.InformacoesUltimoRendimento>

            <S.RodarManualmente>
                <S.RodarManualmenteInfo>
                    <p>
                        Você pode executar manualmente o rendimento, mas somente se o servidor não rodar no horário programado, caso tenha rodado e for rodado manualmente, contate o suporte de <span>imediato!</span>
                    </p>
                </S.RodarManualmenteInfo>

                <S.RodarManualmenteButton>
                    <button onClick={() => { setModalAberto(true) }}>RODAR MANUALMENTE</button>
                </S.RodarManualmenteButton>
            </S.RodarManualmente>
        </S.RendimentoContainer>
    )
}