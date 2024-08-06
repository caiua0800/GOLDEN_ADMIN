import React, { useState, useEffect } from "react";
import * as M from './ModalStyle';
import axios from "axios";
import Loading from "../Loader";

export default function Modal({ cliente, handleCloseModal }) {

    const [load, setLoad] = useState(false);

    if (cliente === null) return null;


    const handleSetValidacao = (DOCSENVIADOS, DOCSVERIFICADOS) => {
        setLoad(true);
        const sendData = {
            docId: cliente.CPF,
            DOCSENVIADOS: DOCSENVIADOS,
            DOCSVERIFICADOS: DOCSVERIFICADOS,
        }

        try {
            const response = axios.post('http://localhost:4000/clientes/updateClienteValidacao', sendData)

            alert("Cliente atualizado com sucesso!");

            setTimeout(() => {
                handleCloseModal();
                setLoad(false);
            },1000)

        } catch (error) {
            setLoad(false);
            alert("Houve um erro ao fazer a requisição", error);
        }
    }

    return (
        <M.ModalContainer>
            <Loading load={load} />
            <M.ModalContent>
                <M.FecharModalButton><button onClick={handleCloseModal}>Fechar</button></M.FecharModalButton>
                <M.ModalTitle><h1>Cliente: <span>{cliente.NAME}</span></h1></M.ModalTitle>
                <M.ModalTitle><h1>CPF: <span>{cliente.CPF}</span></h1></M.ModalTitle>
                <M.Documentos>
                    <M.Doc>
                        <M.DocTitle>FOTO DOCUMENTO</M.DocTitle>

                        <M.DocPhoto>
                            <img src={cliente.URL_DOCUMENTO} alt="IMAGEM DO DOCUMENTO" />
                        </M.DocPhoto>

                    </M.Doc>
                    <M.Doc>
                        <M.DocTitle>FOTO DO ROSTO</M.DocTitle>

                        <M.DocPhoto>
                            <img src={cliente.URL_FACE} alt="IMAGEM DO ROSTO" />
                        </M.DocPhoto>
                    </M.Doc>

                </M.Documentos>

                <M.ModalOptions>
                    <button
                        className="negar"
                        onClick={() => {handleSetValidacao(false, false)}}
                    >
                        Negar
                    </button>
                    <button
                        className="aceitar"
                        onClick={() => {handleSetValidacao(true, true)}}

                    >
                        Aceitar
                    </button>
                </M.ModalOptions>
            </M.ModalContent>
        </M.ModalContainer>
    )
}