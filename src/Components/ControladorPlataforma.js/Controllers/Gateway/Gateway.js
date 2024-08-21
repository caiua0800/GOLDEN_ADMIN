import React, { useState } from "react";
import * as S from './GatewayStyle';
import LoginModal from './Modal'; // Importar o modal de login

export default function Gateway() {
    const [activeGateway, setActiveGateway] = useState(null); // Estado para rastrear o gateway ativo
    const [showLoginModal, setShowLoginModal] = useState(false); // Adiciona estado para controle do modal

    const handleGatewayClick = (gateway) => {
        setShowLoginModal(true); // Mostra o modal ao clicar em um gateway
        setActiveGateway(gateway); // Define o gateway ativo
    };

    const handleLoginSuccess = () => {
        // Aqui você pode adicionar a lógica que deve ocorrer após o login bem-sucedido
        console.log("Login bem-sucedido! Gateway ativo agora:", activeGateway);
    };

    return (
        <S.GatewayContainer>
            <S.Title>ESCOLHA SEU GATEWAY DE PAGAMENTO</S.Title>
            <S.GatewaysBox>
                <S.Box active={activeGateway === "MERCADO_PAGO"} onClick={() => handleGatewayClick("MERCADO_PAGO")}>
                    <S.ImageBox>
                        <img src="mp_icon.png" alt="Mercado Pago" />
                    </S.ImageBox>
                    <p>MERCADO PAGO</p>
                </S.Box>

                <S.Box active={activeGateway === "ASSAS"} onClick={() => handleGatewayClick("ASSAS")}>
                    <S.ImageBox>
                        <img src="assas_icon.png" alt="Assas" />
                    </S.ImageBox>
                    <p>ASSAS</p>
                </S.Box>
            </S.GatewaysBox>
            
            {showLoginModal && (
                <LoginModal onClose={() => setShowLoginModal(false)} onLoginSuccess={handleLoginSuccess} />
            )}
        </S.GatewayContainer>
    );
}
