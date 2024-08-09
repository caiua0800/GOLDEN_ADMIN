import React, { useState } from "react";
import * as S from './ValidarCredenciaisStyle';
import { auth } from '../../DATABASE/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import axios from "axios";
import Loading from "../Loader";
import { generateRandomString } from "../ASSETS/assets";
import { useDispatch } from "react-redux";
import { updateDepositoSuccess } from "../../redux/actions";

const base_url = process.env.REACT_APP_API_BASE_URL;
const url_rota_rodar_all_ativos = process.env.REACT_APP_API_RODAR_ALL_ATIVOS;
const url_rota_edit_saque = process.env.REACT_APP_API_EDITAR_SAQUE;
const url_rota_edit_ctr = process.env.REACT_APP_API_EDITAR_CONTRATO;
const url_rota_create_ctr = process.env.REACT_APP_API_CRIAR_CONTRATO;
const url_rota_add_indication = process.env.REACT_APP_PESQUISAR_CLIENTE_ADICIONAR_SALDO_INDICACAO;

// `${base_url}${url_rota_edit_ctr}`

export default function ValidarCredenciais({ setMensagemAviso, setModalAberto, modalData, type }) {
    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [aceito, setAceito] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    async function verificarLogin(email, senha) {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, senha);
            return true;
        } catch (error) {
            console.error("Erro ao tentar fazer login:", error);
            setLoading(false);
            return false;
        }
    }


    const updateThing = async () => {

        switch (type) {
            case 'SAQUE':
                updateSaque();
                break;
            case 'DEPOSITO':
                updateDeposito();
                break;
            case 'CRIAR_DEPOSITO':
                criarDeposito();
                break;
            case 'RODAR_RENDIMENTO':
                rodarRendimento();
                break;
            default:
                break;
        }
    }

    const rodarRendimento = async () => {
        const rota = `${base_url}${url_rota_rodar_all_ativos}`;
        if (await verificarLogin(email, senha)) {
            setLoading(true); // Inicia o carregamento
            setMensagemAviso(true);
            try {
                const response = await axios.get(rota);
                
    
                if (response.data.failedUpdates && response.data.failedUpdates.length > 0) {
                    alert(`Contratos atualizados com sucesso. Total de documentos atualizados: ${response.data.message}\n\nContratos que falharam:\n${response.data.failedUpdates.map(fail => `Cliente: ${fail.NAME}, CPF: ${fail.CPF}, ID Compra: ${fail.IDCOMPRA}`).join('\n')}`);
                    setLoading(false);
                } else {
                    setLoading(false);
                    alert(response.data);
                }
                setMensagemAviso(false);

            } catch (error) {
                setLoading(false); // Para o carregamento em caso de erro
                setMensagemAviso(false);
                alert(`Houve um erro ao tentar fazer requisição para a rota ${rota}\nERRO: ${error}`);
            }
        } else {
            alert("CREDENCIAIS INVÁLIDAS");
                setMensagemAviso(false);
                setLoading(false);
        }
    }
    

    const updateSaque = async () => {
        if (await verificarLogin(email, senha)) {
            const response = await axios.post(`${base_url}${url_rota_edit_saque}`, {
                docId: modalData.CLIENT_CPF,
                DATASOLICITACAO: modalData.DATASOLICITACAO,
                fieldName: 'STATUS',
                fieldNewValue: aceito ? 2 : 4, // 2 para aceito, 4 para negado
            });

            if (response.status == 200) {
                if (aceito)
                    alert("Saque aceito com sucesso");
                else
                    alert("Saque negado com sucesso")
            } else {
                alert("Houve um erro ao atualizar o saque");
            }
            setLoading(false);
            setModalAberto(false);
        } else {
            alert("Credenciais Inválidas")
            setLoading(false);
        }
    };

    const updateDeposito = async () => {
        if (await verificarLogin(email, senha)) {
            console.log(modalData.INDICADOR)
            if(modalData.INDICADOR != null){
                const addDataIndication = {
                    CPF_INDICADOR: modalData.INDICADOR,
                    CPF_INDICADO: modalData.CLIENT_CPF,
                    NAME_INDICADO: modalData.CLIENT_NAME,
                    VALOR_INTEIRO: (modalData.TOTALSPENT)
                }

                try {
                    const res = axios.post(`${base_url}${url_rota_add_indication}`,addDataIndication);
                    console.log(`Resposta ao adicionar indicação: ${res.data}`);
                } catch (error) {
                    console.log(`Resposta de erro adicionar indicação: ${error}`);
                }
            }
            

            const response = await axios.post(`${base_url}${url_rota_edit_ctr}`, {
                docId: modalData.CLIENT_CPF,
                IDCONTRATO: modalData.IDCOMPRA,
                fieldName: 'STATUS',
                fieldNewValue: aceito ? 1 : 3,
            });
            
            dispatch(updateDepositoSuccess({ ...modalData, STATUS: aceito ? 1 : 3 }));
            if (response.status == 200) {
                if (aceito)
                    alert("Deposito aceito com sucesso");
                else
                    alert("Deposito negado com sucesso")
            } else {
                alert("Houve um erro ao atualizar o deposito");
            }
            setLoading(false);
            setModalAberto(false);
        } else {
            alert("Credenciais Inválidas")
            setLoading(false);
        }
    };


    const criarDeposito = async () => {

        if (await verificarLogin(email, senha)) {
            try {
                const {
                    CLIENT_CPF = '',
                    COINVALUE = '',
                    COINS = 0,
                    RENDIMENTO_ATUAL = 0,
                    MAXIMUMNUMBEROFDAYSTOYIELD = '',
                    TOTALSPENT = 0,
                    MAXIMUMQUOTAYIELD = ''
                } = modalData;


                const response = await axios.post(`${base_url}${url_rota_create_ctr}`, {
                    docId: CLIENT_CPF,
                    contratoData: {
                        COINVALUE: COINVALUE.toString(),
                        STATUS: 1,
                        IDCOMPRA: generateRandomString(),
                        COINS: COINS.toString(),
                        RENDIMENTO_ATUAL: RENDIMENTO_ATUAL,
                        MAXIMUMNUMBEROFDAYSTOYIELD: MAXIMUMNUMBEROFDAYSTOYIELD.toString(),
                        TOTALSPENT: TOTALSPENT.toString(),
                        MAXIMUMQUOTAYIELD: MAXIMUMQUOTAYIELD.toString()
                    }
                });

                if (response.status === 201) {
                    alert("Depósito gerado com sucesso, disponível em contratos");
                } else {
                    alert(`Houve um erro: ${response.status} ${response.statusText}`);
                }
                setLoading(false);
                setModalAberto(false);
            } catch (error) {
                console.error("Erro na requisição:", error);
                if (error.response) {
                    console.error('Resposta de erro do servidor:', error.response.data);
                    alert(`Houve um erro na requisição: ${error.response.status} ${error.response.statusText}`);
                } else if (error.request) {
                    console.error('Erro na requisição:', error.request);
                    alert('Não foi possível receber uma resposta do servidor.');
                } else {
                    console.error('Erro na configuração do pedido:', error.message);
                    alert(`Erro na configuração do pedido: ${error.message}`);
                }
                setLoading(false);
                setModalAberto(false);
            }
        }

    };




    const handleAceitoChange = (value) => {
        setAceito(value);
    };

    return (
        <S.ValidarCredenciaisContainer>
            <S.ValidadacaoBox>
                <Loading load={loading} />
                <S.FecharValidacao><span onClick={() => { setModalAberto(false) }}>x</span></S.FecharValidacao>
                <h1>Suas Credenciais</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Senha"
                />

                {(type != 'CRIAR_DEPOSITO' && type != 'RODAR_RENDIMENTO') && (
                    <S.CheckArea>
                        <label>
                            <input
                                type="checkbox"
                                checked={aceito === true}
                                onChange={() => handleAceitoChange(true)}
                            />
                            <span>Aceitar</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={aceito === false}
                                onChange={() => handleAceitoChange(false)}
                            />
                            <span>Negar</span>

                        </label>
                    </S.CheckArea>
                )}

                <button onClick={updateThing}>Validar</button>
            </S.ValidadacaoBox>
        </S.ValidarCredenciaisContainer>
    );
}
