import React, { useState, useEffect } from "react";
import * as S from './ValorUniContratoStyle';
import { db } from "../../../../DATABASE/firebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default function ValorUnidadeContrato() {
    const [valorAtualMoeda, setValorAtualMoeda] = useState(""); // Inicializa como string
    const [duracaoAtual, setDuracaoAtual] = useState('');
    const [rendimentoPadrao, setRendimentoPadrao] = useState(""); // Inicializa como string
    const [dolarPadrao, setDolarPadrao] = useState(""); // Inicializa como string
    const [novoValor, setNovoValor] = useState(""); // Novo estado para valor
    const [novoDuracao, setNovoDuracao] = useState(''); // Novo estado para duração
    const [novoRendimento, setNovoRendimento] = useState(""); // Inicializa como string
    const [novoDolar, setNovoDolar] = useState(""); // Inicializa como string

    // Estados para controlar a exibição dos botões
    const [showValorButton, setShowValorButton] = useState(false); 
    const [showDuracaoButton, setShowDuracaoButton] = useState(false); 
    const [showRendimentoButton, setShowRendimentoButton] = useState(false); // Para o botão de rendimento
    const [showDolarButton, setShowDolarButton] = useState(false); // Para o botão de dólar

    const fetchValorAtualMoeda = async () => {
        try {
            const docRef = doc(db, 'SYSTEM_VARIABLES', 'TOKEN');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data) {
                    setValorAtualMoeda(data.TOKEN_VALUE ? data.TOKEN_VALUE.toString() : ""); // Armazena como string
                    setRendimentoPadrao(data.RENDIMENTO_PADRAO ? data.RENDIMENTO_PADRAO.toString() : ""); 
                    setDuracaoAtual(data.CONTRACT_TIME ? data.CONTRACT_TIME : ''); // Duração pode ser mantida como string
                    setDolarPadrao(data.DOLAR ? data.DOLAR.toString() : ""); // Armazena como string
                }
            } else {
                console.log('Documento não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar pelo valor unitário do contrato', error);
        }
    };

    const handleValorInputChange = (event) => {
        const newValue = event.target.value;
        setNovoValor(newValue); // Mantém como string

        // Verifica se o novo valor é diferente do valor atual
        setShowValorButton(newValue !== valorAtualMoeda);
        setShowDuracaoButton(false);
        setShowRendimentoButton(false);
        setShowDolarButton(false); // Esconde botão de dólar se o valor mudar
    };

    const handleDuracaoInputChange = (event) => {
        const newDuration = event.target.value;
        setNovoDuracao(newDuration); // Mantém como string

        // Verifica se a nova duração é diferente da duração atual
        setShowDuracaoButton(newDuration !== duracaoAtual);
        setShowValorButton(false);
        setShowRendimentoButton(false);
        setShowDolarButton(false); // Esconde botão de dólar se a duração mudar
    };

    const handleRendimentoInputChange = (event) => {
        const newRendimento = event.target.value;
        setNovoRendimento(newRendimento); // Mantém como string

        // Verifica se o novo rendimento é diferente do rendimento padrão atual
        setShowRendimentoButton(newRendimento !== rendimentoPadrao);
        setShowValorButton(false);
        setShowDuracaoButton(false);
        setShowDolarButton(false); // Esconde botão de dólar se o rendimento mudar
    };

    const handleDolarInputChange = (event) => {
        const newDolar = event.target.value;
        setNovoDolar(newDolar); // Mantém como string
        setShowDolarButton(newDolar !== dolarPadrao); // Controla a visibilidade do botão para dólar

        setShowValorButton(false);
        setShowDuracaoButton(false);
        setShowRendimentoButton(false); // Esconde botão de rendimento se o dólar mudar
    };

    const handleRedefinirClick = async () => {
        try {
            const docRef = doc(db, 'SYSTEM_VARIABLES', 'TOKEN');

            // Atualiza os valores no Firestore
            await updateDoc(docRef, {
                TOKEN_VALUE: parseFloat(novoValor), // Converte para número ao atualizar
                CONTRACT_TIME: novoDuracao, // Atualiza a nova duração
                RENDIMENTO_PADRAO: parseFloat(novoRendimento), // Converte para número ao atualizar
                DOLAR: parseFloat(novoDolar) // Converte para número ao atualizar
            });

            // Atualiza os valores atuais para refletir as alterações
            setValorAtualMoeda(novoValor);
            setDuracaoAtual(novoDuracao);
            setRendimentoPadrao(novoRendimento); // Atualiza rendimento padrão
            setDolarPadrao(novoDolar); // Atualiza o valor atual do dólar

            // Limpa os botões
            setShowValorButton(false);
            setShowDuracaoButton(false);
            setShowRendimentoButton(false);
            setShowDolarButton(false); // Limpa o botão de dólar

            alert('Valor, duração, rendimento e dólar redefinidos com sucesso!');
        } catch (error) {
            console.error('Erro ao redefinir valores', error);
        }
    };

    useEffect(() => {
        fetchValorAtualMoeda();
    }, []);

    return (
        <S.ValorUniContratoContainer>
            <S.ContainerTitle>CONFIGURAÇÕES DE CONTRATO</S.ContainerTitle>
            <S.ContainerDivisor>
                <S.UniContratoValue>
                    <S.BoxTitle><span>VALOR UNITÁRIO:</span></S.BoxTitle>
                    <S.StatusMessage>
                        {valorAtualMoeda
                            ? `O valor unitário dos contratos é U$ ${valorAtualMoeda}`
                            : 'Valor unitário não encontrado'}
                    </S.StatusMessage>

                    <S.RedefineValorBox>
                        <h3>O novo valor será (U$)</h3>
                        <input
                            type="number"
                            placeholder="00.00"
                            value={novoValor}
                            onChange={handleValorInputChange}
                        />
                    </S.RedefineValorBox>

                    {showValorButton && (
                        <S.RedefineValorButton>
                            <button onClick={handleRedefinirClick}> REDEFINIR VALOR </button>
                        </S.RedefineValorButton>
                    )}
                </S.UniContratoValue>

                <S.ValorPadraoMeses>
                    <S.BoxTitle><span>DURAÇÃO DO CONTRATO (meses)</span></S.BoxTitle>
                    <S.StatusMessage>
                        {duracaoAtual
                            ? `A duração de meses atual é ${duracaoAtual}`
                            : 'Não encontrado'}
                    </S.StatusMessage>

                    <S.RedefineValorBox>
                        <h3>A nova duração será de</h3>
                        <input
                            type="number"
                            placeholder="00"
                            value={novoDuracao}
                            onChange={handleDuracaoInputChange}
                        />
                    </S.RedefineValorBox>

                    {showDuracaoButton && (
                        <S.RedefineValorButton>
                            <button onClick={handleRedefinirClick}> REDEFINIR DURAÇÃO </button>
                        </S.RedefineValorButton>
                    )}
                </S.ValorPadraoMeses>

                <S.RendimentoPadraoBox>
                    <S.BoxTitle><span>RENDIMENTO PADRÃO (%)</span></S.BoxTitle>
                    <S.StatusMessage>
                        {rendimentoPadrao !== 0
                            ? `O rendimento padrão atual é ${rendimentoPadrao}`
                            : 'Não encontrado'}
                    </S.StatusMessage>

                    <S.RedefineValorBox>
                        <h3>O novo rendimento será de</h3>
                        <input
                            type="number"
                            placeholder="00"
                            value={novoRendimento}
                            onChange={handleRendimentoInputChange}
                        />
                    </S.RedefineValorBox>

                    {showRendimentoButton && (
                        <S.RedefineValorButton>
                            <button onClick={handleRedefinirClick}> REDEFINIR RENDIMENTO </button>
                        </S.RedefineValorButton>
                    )}
                </S.RendimentoPadraoBox>

                <S.DolarPadraoBox>
                    <S.BoxTitle><span>VALOR DO DOLAR (U$)</span></S.BoxTitle>
                    <S.StatusMessage>
                        {dolarPadrao !== 0
                            ? `O valor do dólar atual é U$ ${dolarPadrao}`
                            : 'Não encontrado'}
                    </S.StatusMessage>

                    <S.RedefineValorBox>
                        <h3>O novo valor do dólar será de (U$)</h3>
                        <input
                            type="number"
                            placeholder="00.00"
                            value={novoDolar}
                            onChange={handleDolarInputChange}
                        />
                    </S.RedefineValorBox>

                    {showDolarButton && (
                        <S.RedefineValorButton>
                            <button onClick={handleRedefinirClick}> REDEFINIR DÓLAR </button>
                        </S.RedefineValorButton>
                    )}
                </S.DolarPadraoBox>
            </S.ContainerDivisor>
        </S.ValorUniContratoContainer>
    );
}
