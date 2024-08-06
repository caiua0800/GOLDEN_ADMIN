import React, { useState } from "react";
import * as S from './ModalUserStyle';
import ModalContainer from "../ModalContainer/ModalContainer";


export default function Modal({ setModalUser }) {


    return (
        <ModalContainer>
            <S.ModalContent>
                <S.ModalContentTitle>INFORMAÇÕES USUÁRIO</S.ModalContentTitle>

                <S.Informacoes>
                    <S.Info>
                        <h2>Nome</h2>
                        <input type="text" />
                    </S.Info>
                    <S.Info>
                        <h2>CPF</h2>
                        <input type="text" />
                    </S.Info>
                    <S.Info>
                        <h2>Email</h2>
                        <input type="text" />
                    </S.Info>
                    <S.Info>
                        <h2>Cargo</h2>
                        <input type="text" />
                    </S.Info>

                    <S.ModalButtons>
                        <button onClick={() => {setModalUser(false)}} className="cancelar">CANCELAR</button>
                        <button className="salvar">SALVAR</button>
                    </S.ModalButtons>
                </S.Informacoes>
            </S.ModalContent>
        </ModalContainer>

    )
}