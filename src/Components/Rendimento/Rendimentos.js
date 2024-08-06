import React, { useState } from "react";
import * as S from './RendimentoStyle';
import ValidarCredenciais from "../ValidarCredenciais/ValidarCredenciais";


export default function Rendimento() {

    const [modalAberto, setModalAberto] = useState(false)
    const [mensagemAviso, setMensagemAviso] = useState(false)

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
                    <p>O último rendimento aconteceu no dia <span>00/00/0000</span> às <span>00:00:00</span></p>
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
                    <button onClick={() => {setModalAberto(true)}}>RODAR MANUALMENTE</button>
                </S.RodarManualmenteButton>
            </S.RodarManualmente>
        </S.RendimentoContainer>
    )
}