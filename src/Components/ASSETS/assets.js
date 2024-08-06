
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../DATABASE/firebaseConfig';
import axios from 'axios';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_GET_CLIENTS = process.env.REACT_APP_API_GET_CLIENTS;

export function addWeekToDateString(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + 7);
    const newDay = String(date.getDate()).padStart(2, '0');
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');
    const newYear = date.getFullYear();
    return `${newDay}/${newMonth}/${newYear}`;
}


export const formatNumber = (value) => {
    if (typeof value !== 'number' || isNaN(value)) {
        return '0.00'; 
    }
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};



export const formatCPF = (cpf) => {
    if (cpf != 'NULL') {
        cpf = cpf.replace(/\D/g, '');
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return '';
};

export const getClients = async (setUsers) => {
    try {
       
        console.log("Get Clients....")
        const response = await axios.get(`${API_BASE_URL}${API_GET_CLIENTS}`);
        const userList = response.data;

       console.log(userList)
        setUsers(userList);
    } catch (error) {
        console.error("Error getting clients: ", error);
    }
};

export async function getMonthlyYield() {
    try {
        const rendimentoDocRef = doc(db, "SYSTEM_VARIABLES", "RENDIMENTO");
        const rendimentoDocSnapshot = await getDoc(rendimentoDocRef);

        if (rendimentoDocSnapshot.exists()) {
            const data = rendimentoDocSnapshot.data();
            return data.RENDIMENTO_MENSAL;
        } else {
            console.log("O documento não existe!");
            return null;
        }
    } catch (error) {
        console.error("Erro ao obter rendimento mensal: ", error);
        return null;
    }
}

export function formatDate(dateString) {

    if (dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }else return null;

}


export function adicionarAno(data) {

    if(!data)
        return null;

    const [dia, mes, ano] = data.split('/').map(Number);
    const dataOriginal = new Date(ano, mes - 1, dia);
    dataOriginal.setFullYear(dataOriginal.getFullYear() + 1);
    const diaNovo = dataOriginal.getDate().toString().padStart(2, '0');
    const mesNovo = (dataOriginal.getMonth() + 1).toString().padStart(2, '0');
    const anoNovo = dataOriginal.getFullYear();
    return `${diaNovo}/${mesNovo}/${anoNovo}`;
}

export function formatCurrencyBRL(value) {
    // Converte o valor para string
    const valueStr = String(value).replace(',', '.');

    // Converte a string para número
    const number = parseFloat(valueStr);

    // Verifica se a conversão foi bem-sucedida
    if (isNaN(number)) {
        throw new Error("Invalid input. Please provide a valid number string.");
    }

    // Formata o número no padrão brasileiro
    return number.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};


export const formatCPFCriarCliente = (value) => {
    return value
        .replace(/\D/g, '') // Remove tudo o que não é dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após 3 dígitos
        .replace(/\.(\d{3})(\d)/, '.$1.$2') // Adiciona ponto após 3 dígitos
        .replace(/\.(\d{3})(\d)/, '.$1-$2') // Adiciona hífen após 3 dígitos
        .replace(/(-\d{2})\d+?$/, '$1'); // Limita a 11 dígitos
};

export const formatTelefone = (value) => {
    return value
        .replace(/\D/g, '') // Remove tudo o que não é dígito
        .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona parênteses e espaço
        .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona hífen
        .replace(/(-\d{4})\d+?$/, '$1'); // Limita a 11 dígitos
};

export const formatCEP = (value) => {
    return value
        .replace(/\D/g, '') // Remove tudo o que não é dígito
        .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona hífen após 5 dígitos
        .replace(/(-\d{3})\d+?$/, '$1'); // Limita a 8 dígitos
};

export const removeFormatting = (type, value) => {
    switch (type) {
        case 'cpf':
            return value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        case 'telefone':
            return value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        case 'cep':
            return value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        default:
            return value; // Retorna o valor sem alterações se o tipo não corresponder a nenhum dos casos
    }
};