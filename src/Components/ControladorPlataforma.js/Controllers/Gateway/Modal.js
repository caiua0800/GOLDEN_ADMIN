import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../../../../DATABASE/firebaseConfig"; // Certifique-se de que o caminho está correto
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importa a função de login



const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    min-width: 300px;
`;

const ModalTitle = styled.h2`
    margin: 0 0 10px;
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
`;

const Button = styled.button`
    padding: 10px 20px;
    color: white;
    background: blue;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const CloseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: red;
    width: 100%;
    text-align: end;
`;

const LoginModal = ({ onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            // Tenta fazer login com email e senha
            await signInWithEmailAndPassword(auth, email, password);
            onLoginSuccess(); // Chama a função para mudar o gateway
            onClose(); // Fecha o modal ao sucesso
        } catch (error) {
            alert("Negado, credenciais inválidas"); // Exibir erro ao usuário
        }
    };

    return (
        <ModalContainer>
            <ModalContent>
                <CloseButton onClick={onClose}>x</CloseButton>
                <ModalTitle>AUTENTICAÇÃO</ModalTitle>
                <Input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <Input 
                    type="password" 
                    placeholder="Senha" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <Button onClick={handleLogin}>Entrar</Button>
            </ModalContent>
        </ModalContainer>
    );
};

export default LoginModal;
