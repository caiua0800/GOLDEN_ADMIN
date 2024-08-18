import React from "react";
import * as S from './MensagemSchemaStyle';

export default function MensagemSchema({ data, handleClick, onDoubleClick }) {

    const handleVerMaisClick = () => {
        if (data.link) {
            window.open(data.link, '_blank'); // Abre o link em uma nova aba
        }
    };

    return (
        <S.MensagemVerBox 
            onClick={() => handleClick && handleClick(data)} 
            onDoubleClick={() => onDoubleClick && onDoubleClick()} 
            messageType={data.messageType}
        >
            <span>x</span>
            <h1>{data.title || 'TÍTULO'}</h1>
            <p>{data.message || 'MENSAGEM'}</p>
            <div>
                <h5>{data.diaData ? data.diaData : 'dd/mm/aaaa'}</h5>
                <h6 onClick={handleVerMaisClick}>ver mais</h6>
            </div>
        </S.MensagemVerBox>
    );
}
