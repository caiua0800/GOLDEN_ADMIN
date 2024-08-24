import React, { useState, useEffect } from "react";
import * as S from './JanelaSaqueStyle';
import { db } from "../../../../DATABASE/firebaseConfig";
import { getDoc, doc, setDoc, updateDoc, deleteField } from "firebase/firestore";

export default function JanelaSaque() {
    const [numDays, setNumDays] = useState(0);
    const [inputs, setInputs] = useState([]);
    const [inputValues, setInputValues] = useState([]); // Novo estado para os valores dos inputs
    const [existeJanelaDeSaques, setExisteJanelaDeSaques] = useState(false);
    const [janelaDeSaquesAtual, setJanelaDeSaquesAtual] = useState(null);
    const [isDefinirVisible, setIsDefinirVisible] = useState(false);


    const fetchJanelaDeSaques = async () => {

        try {
            const docRef = doc(db, 'SYSTEM_VARIABLES', 'JANELA_DE_SAQUES');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data && data.DIAS && data.DIAS.length > 0) {
                    setExisteJanelaDeSaques(true);
                    setJanelaDeSaquesAtual(data.DIAS);
                } else {
                    setExisteJanelaDeSaques(false);
                    setJanelaDeSaquesAtual(null);
                }
            } else {
                console.log('Documento não encontrado.');
                setExisteJanelaDeSaques(false);
                setJanelaDeSaquesAtual(null);
            }
        } catch (error) {
            console.error('Erro ao buscar janela de saques', error);
        }
    };

    const handleInputChange = (event) => {
        
        setNumDays(event.target.value);
    };

    const handleSubmit = (event) => {
        
        event.preventDefault();
        const newInputs = Array.from({ length: numDays }, (_, index) => index + 1);
        setInputs(newInputs);
        setInputValues(newInputs.map(() => "")); 
        setIsDefinirVisible(true); 
    };

    const handleInputValueChange = (index, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
    };

    const handleDefinirClick = async () => {

        try {
            const docRef = doc(db, 'SYSTEM_VARIABLES', 'JANELA_DE_SAQUES');
            await updateDoc(docRef, { DIAS: deleteField() });
            const newDias = inputValues.map(Number).filter(day => !isNaN(day));
            await setDoc(docRef, { DIAS: newDias }, { merge: true });
            alert('Janela de saques definida com sucesso!');
            fetchJanelaDeSaques()
        } catch (error) {
            console.error('Erro ao definir janela de saques', error);
        }
    };

    useEffect(() => {


        fetchJanelaDeSaques();
    }, []);

    return (
        <S.JanelaDeSaqueContainer>
            <S.JanelaTitle>JANELA DE SAQUES</S.JanelaTitle>
            <S.StatusMessage>
                {existeJanelaDeSaques 
                    ? `A janela de saques ativa é: ${janelaDeSaquesAtual.join(', ')}`
                    : 'Nenhuma janela de saques ativa'}
            </S.StatusMessage>
            <S.FormContainer onSubmit={handleSubmit}>
                <S.InputLabel>
                    Quantos dias do mês você deseja abrir para saque?
                </S.InputLabel>
                <S.Input
                    type="number"
                    min="1"
                    value={numDays}
                    onChange={handleInputChange}
                    required
                />
                <S.SubmitButton type="submit">Prosseguir</S.SubmitButton>
            </S.FormContainer>
            <S.InputsContainer>
                {inputs.map((input, index) => (
                    <S.InputField 
                        key={index} 
                        maxLength="2" 
                        placeholder={`Dia ${input}`} 
                        value={inputValues[index] || ""} // Valor do input
                        onChange={(e) => handleInputValueChange(index, e.target.value)} // Atualiza o estado dos inputs
                    />
                ))}
            </S.InputsContainer>
            {isDefinirVisible && (
                <S.DefinirButton onClick={handleDefinirClick}>
                    Definir Janela
                </S.DefinirButton>
            )}
        </S.JanelaDeSaqueContainer>
    );
}
