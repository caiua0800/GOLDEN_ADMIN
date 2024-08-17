// CriarMensagem.js
import React, { useState } from "react";
import * as S from './CriarMensagemStyle';
import MensagemBox from "./Componentes/MensagemBox";
import VerMensagens from "./Componentes/VerMensagens";
import EnviarMensagem from "./Componentes/EnviarMensagem";

export default function CriarMensagem() {
    const [isModalOpenCriar, setIsModalOpenCriar] = useState(false);
    const [isModalOpenVer, setIsModalOpenVer] = useState(false);
    const [isModalOpenEnviar, setIsModalOpenEnviar] = useState(false);

    const handleOpenModal = (funct) => {
        funct(true);
    };

    const handleCloseModal = (funct) => {
        funct(false);
    };

    return (
        <S.CriarMensagemContainer>
            <S.ContainerTitle><span>MENSAGENS</span></S.ContainerTitle>

            <S.MensagensApp>
                <span>
                    Aqui você é capaz de configurar mensagens, enviar para um cliente, ou para todos, definir a duração e tipo.
                </span>
            </S.MensagensApp>

            <S.CreateMessageButton>
                <button className="bt1" onClick={() => {handleOpenModal(setIsModalOpenCriar)}}>CRIAR NOVA MENSAGEM</button>
                <button className="bt2" onClick={() => {handleOpenModal(setIsModalOpenVer)}}>VER MENSAGENS</button>
                <button className="bt3" onClick={() => {handleOpenModal(setIsModalOpenEnviar)}}>ENVIAR MENSAGEM</button>
                <button className="bt4">ENVIOS</button>
            </S.CreateMessageButton>

            {isModalOpenCriar && <MensagemBox onClose={() => {handleCloseModal(setIsModalOpenCriar)}} />}

            {isModalOpenVer && <VerMensagens onClose={() => {handleCloseModal(setIsModalOpenVer)}} />}

            {isModalOpenEnviar && <EnviarMensagem onClose={() => {handleCloseModal(setIsModalOpenEnviar)}} />}
        </S.CriarMensagemContainer>
    );
}
