import React, { useState, useEffect } from "react";
import * as S from './ValorUniContratoStyle';
import { db } from "../../../../DATABASE/firebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default function ValorUnidadeContrato() {
    const [valorAtualMoeda, setValorAtualMoeda] = useState(0);
    const [novoValor, setNovoValor] = useState(0);
    const [showButton, setShowButton] = useState(false);

    const fetchValorAtualMoeda = async () => {
        try {
            const docRef = doc(db, 'SYSTEM_VARIABLES', 'TOKEN');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data && data.TOKEN_VALUE) {
                    setValorAtualMoeda(data.TOKEN_VALUE);
                    setNovoValor(data.TOKEN_VALUE);
                }
            } else {
                console.log('Documento não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar pelo valor unitário do contrato', error);
        }
    };

    const handleInputChange = (event) => {
        const newValue = parseFloat(event.target.value);
        setNovoValor(newValue);

        if (newValue !== valorAtualMoeda) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const handleRedefinirClick = async () => {
        try {
            const docRef = doc(db, 'SYSTEM_VARIABLES', 'TOKEN');
            
            // Atualiza o valor de TOKEN_VALUE
            await updateDoc(docRef, {
                TOKEN_VALUE: novoValor
            });

            // Atualiza o valor atual para refletir a alteração
            setValorAtualMoeda(novoValor);
            setShowButton(false);

            alert('Valor redefinido com sucesso!');
        } catch (error) {
            console.error('Erro ao redefinir valor', error);
        }
    };

    useEffect(() => {
        fetchValorAtualMoeda();
    }, []);

    return (
        <S.ValorUniContratoContainer>
            <S.ContainerTitle>VALOR UNIDADE CONTRATO</S.ContainerTitle>
            <S.StatusMessage>
                {valorAtualMoeda
                    ? `O valor unitário dos contratos é U$ ${valorAtualMoeda}`
                    : 'Valor unitário não encontrado'}
            </S.StatusMessage>

            <S.RedefineValorBox>
                <h3>O novo valor será: U$</h3>
                <input
                    type="number"
                    placeholder="00.00"
                    value={novoValor}
                    onChange={handleInputChange}
                />
            </S.RedefineValorBox>

            {showButton && (
                <S.RedefineValorButton>
                    <button onClick={handleRedefinirClick}> REDEFINIR VALOR </button>
                </S.RedefineValorButton>
            )}
        </S.ValorUniContratoContainer>
    );
}
