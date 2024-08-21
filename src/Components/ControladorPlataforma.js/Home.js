import React, { useState } from "react";
import * as H from './HomeStyle';
import JanelaSaque from "./Controllers/JanelaDeSaque/JanelaSaque";
import ValorUnidadeContrato from "./Controllers/ValorUniContrato/ValorUniContrato";
import Gateway from "./Controllers/Gateway/Gateway";

export default function HomeController() {
    const [selectedOption, setSelectedOption] = useState(''); // Estado para gerenciar o componente ativo

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const renderComponent = () => {
        switch (selectedOption) {
            case 'JANELA_DE_SAQUES':
                return <JanelaSaque />;
            case 'VALOR_UNIDADE_CONTRATO':
                return <ValorUnidadeContrato />;
            case 'GATEWAY':
                return <Gateway />
            default:
                return null;
        }
    };

    return (
        <H.HomeContainer>
            <H.HomeTitle><span>CONTROLADOR DA PLATAFORMA</span></H.HomeTitle>

            <H.HomeContent>
                <H.HomeOptions>
                    <H.StyledLink onClick={() => handleOptionClick('JANELA_DE_SAQUES')}>
                        <H.Option color="#1e96fc">JANELA DE SAQUES</H.Option>
                    </H.StyledLink>
                    <H.StyledLink onClick={() => handleOptionClick('VALOR_UNIDADE_CONTRATO')}>
                        <H.Option color="#fcf300">CONFIGURAÇÕES DE CONTRATO</H.Option>
                    </H.StyledLink>
                    <H.StyledLink onClick={() => handleOptionClick('GATEWAY')}>
                        <H.Option color="#1e96fc">GATEWAY DE PAGAMENTO</H.Option>
                    </H.StyledLink>
                </H.HomeOptions>

                <H.ControllerCentralize>
                    {renderComponent()} {/* Renderiza o componente com base na opção selecionada */}
                </H.ControllerCentralize>
            </H.HomeContent>
        </H.HomeContainer>
    );
}
