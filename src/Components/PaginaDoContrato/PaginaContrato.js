import React, { useState, useEffect } from "react";
import * as S from './PaginaContratoStyle';
import axios from "axios";
import { formatCPFCriarCliente, formatDate } from "../ASSETS/assets";
import { updateDepositoSuccess } from "../../redux/actions";
import { useDispatch } from "react-redux";
import Loading from "../Loader";
const base_url = process.env.REACT_APP_API_BASE_URL;
const rota_url = process.env.REACT_APP_API_EDITAR_CONTRATO;

export default function PaginaContrato({ handleClose, contratoData }) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [editedData, setEditedData] = useState({
        CLIENT_NAME: '',
        CLIENT_CPF: '',
        IDCOMPRA: '',
        PURCHASEDATE: '',
        COINS: '',
        COINVALUE: '',
        TOTALSPENT: '',
        RENDIMENTO_ATUAL: '',
        YIELDTERM: '',
        STATUS: '',
        MAXIMUMQUOTAYIELD: ''
    });

    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (!contratoData) return null;
        setEditedData({
            CLIENT_NAME: contratoData.CLIENT_NAME || '',
            CLIENT_CPF: contratoData.CLIENT_CPF || '',
            IDCOMPRA: contratoData.IDCOMPRA || '',
            PURCHASEDATE: contratoData.PURCHASEDATE || '',
            COINS: contratoData.COINS || '',
            COINVALUE: contratoData.COINVALUE || '', // Remover o prefixo `U$` para comparação
            TOTALSPENT: contratoData.TOTALSPENT || '', // Remover o prefixo `U$` para comparação
            RENDIMENTO_ATUAL: `${contratoData.RENDIMENTO_ATUAL ? contratoData.RENDIMENTO_ATUAL.toFixed(2) : contratoData.RENDIMENTO_ATUAL}` || '',
            YIELDTERM: contratoData.YIELDTERM || '',
            STATUS: contratoData.STATUS || '',
            MAXIMUMQUOTAYIELD: contratoData.MAXIMUMQUOTAYIELD || ''
        });
    }, [contratoData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setHasChanges(true);
    };

    const getChanges = () => {
        const changes = {};
        Object.keys(editedData).forEach(key => {
            const originalValue = contratoData[key];
            const editedValue = editedData[key];
    
            if (key === 'RENDIMENTO_ATUAL' || key === 'MAXIMUMQUOTAYIELD') {
                if (originalValue !== editedValue) {
                    if(key === 'RENDIMENTO_ATUAL'){
                        changes[key] = parseFloat(editedValue);

                    }else{
                        changes[key] = editedValue;
                    }
                }
            }
        });
        return changes;
    };

    const handleSave = async () => {

        try {
            setIsLoading(true);
            // Dados do contrato para incluir em cada requisição
            const commonData = {
                docId: contratoData.CLIENT_CPF, // CPF do cliente como docId
                IDCONTRATO: contratoData.IDCOMPRA // ID do contrato
            };
    
            // Dados para a alteração do campo MAXIMUMQUOTAYIELD
            const maximumQuotaYieldData = {
                ...commonData,
                fieldName: 'MAXIMUMQUOTAYIELD',
                fieldNewValue: editedData.MAXIMUMQUOTAYIELD
            };
    
            // Dados para a alteração do campo RENDIMENTO_ATUAL
            const rendimentoAtualData = {
                ...commonData,
                fieldName: 'RENDIMENTO_ATUAL',
                fieldNewValue: parseFloat(editedData.RENDIMENTO_ATUAL)
            };

            
    
            const res1 = await axios.post(`${base_url}${rota_url}`, maximumQuotaYieldData)
            const res2 = await axios.post(`${base_url}${rota_url}`, rendimentoAtualData)

            if(res1 && res2){
                console.log(res1.data)
                console.log(res2.data)

                dispatch(updateDepositoSuccess({
                    ...contratoData,
                    MAXIMUMQUOTAYIELD: editedData.MAXIMUMQUOTAYIELD,
                    RENDIMENTO_ATUAL: parseFloat(editedData.RENDIMENTO_ATUAL)
                }));
            }

            alert("Alterações salvas com sucesso.");
            handleClose()
        } catch (error) {
            console.error("Erro ao salvar as alterações do contrato:", error);
        }
        setIsLoading(false);

    };
    

    if (!contratoData) return null;

    return (
        <S.PaginaContratoContainer>
            {isLoading && (
                <Loading load={isLoading} />
            )}
            <S.PaginaButtons>
                <S.CloseButton onClick={handleClose}>Fechar</S.CloseButton>
                {hasChanges && (
                    <S.SaveButton onClick={handleSave}>Salvar e Voltar</S.SaveButton>
                )}
            </S.PaginaButtons>

            <h1>Detalhes do Contrato</h1>

            <S.ContratoDataContainer>
                <S.ContratoDataBox>
                    <span>CLIENTE</span>
                    <input
                        type="text"
                        name="CLIENT_NAME"
                        value={editedData.CLIENT_NAME}
                        className="desabilitado"
                        readOnly
                    />
                </S.ContratoDataBox>
                <S.ContratoDataBox>
                    <span>CPF</span>
                    <input
                        className="desabilitado"
                        type="text"
                        value={`${formatCPFCriarCliente(editedData.CLIENT_CPF)}`}
                        readOnly
                    />
                </S.ContratoDataBox>
                <S.ContratoDataBox>
                    <span>ID</span>
                    <input
                        type="text"
                        name="IDCOMPRA"
                        value={editedData.IDCOMPRA}
                        className="desabilitado"
                        readOnly
                    />
                </S.ContratoDataBox>
                <S.ContratoDataBox>
                    <span>DATA DA COMPRA</span>
                    <input
                        type="text"
                        name="PURCHASEDATE"
                        value={formatDate(editedData.PURCHASEDATE)}
                        className="desabilitado"
                        readOnly
                    />
                </S.ContratoDataBox>
                <S.ContratoDataBox>
                    <span>QUANTIDADE DE CONTRATOS</span>
                    <input
                        type="text"
                        name="COINS"
                        value={editedData.COINS}
                        className="desabilitado"
                        readOnly
                    />
                </S.ContratoDataBox>
                <S.ContratoDataBox>
                    <span>VALOR UNI. CONTRATO</span>
                    <input
                        type="text"
                        name="COINVALUE"
                        value={editedData.COINVALUE}
                        className="desabilitado"
                        readOnly
                    />
                </S.ContratoDataBox>
                <S.ContratoDataBox>
                    <span>VALOR INVESTIDO</span>
                    <input
                        type="text"
                        name="TOTALSPENT"
                        value={editedData.TOTALSPENT}
                        className="desabilitado"
                        readOnly
                    />
                </S.ContratoDataBox>

                <S.ContratoDataBox>
                    <span>FINALIZA EM</span>
                    <input
                        type="text"
                        name="YIELDTERM"
                        value={formatDate(editedData.YIELDTERM)}
                        className="desabilitado"
                        readOnly
                    />
                </S.ContratoDataBox>
                <S.ContratoDataBox>
                    <span>TOTAL DE LUCRO ATUALMENTE (%)</span>
                    <input
                        type="text"
                        name="RENDIMENTO_ATUAL"
                        value={editedData.RENDIMENTO_ATUAL}
                        onChange={handleInputChange} // Editável
                    />
                </S.ContratoDataBox>
                <S.ContratoDataBox>
                    <span>VALOR LUCRO DO CONTRATO (%)</span>
                    <input
                        type="text"
                        name="MAXIMUMQUOTAYIELD"
                        value={editedData.MAXIMUMQUOTAYIELD}
                        onChange={handleInputChange} // Editável
                    />
                </S.ContratoDataBox>
            </S.ContratoDataContainer>
        </S.PaginaContratoContainer>
    );
}
