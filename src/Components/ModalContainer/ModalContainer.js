import React from "react";
import * as S from './ModalContainerStyle';



export default function ModalContainer({ children }) {

    return (
        <S.ModalContainer>
            {children}
        </S.ModalContainer>
    )
}