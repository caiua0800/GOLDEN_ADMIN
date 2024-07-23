import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { formatCPF, getClients, formatNumber, getMonthlyYield } from "./ASSETS/assets";
import { db } from "../DATABASE/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export default function Clientes() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [specialIncome, setSpecialIncome] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newSpecialIncome, setNewSpecialIncome] = useState('');
    const [rendimentoPadrao, setRendimentoPadrao] = useState(0);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        getClients(setUsers);

        getMonthlyYield().then((res) => {
            setRendimentoPadrao(res);
            console.log(res);
        })
    }, []);

    const handleCheckboxChange = () => {
        setSpecialIncome(prevState => !prevState);
    };

    const filteredClients = users.filter(user => {
        const matchesSearch = user.NAME.includes(search.toUpperCase()) || user.CPF.includes(search.toUpperCase());
        const matchesSpecialIncome = !specialIncome || user.POSSUIRENDIMENTOESPECIAL;
        return matchesSearch && matchesSpecialIncome;
    });

    const handlereateClient = () => {
        window.location.href = '/criarcliente';
    };

    const handleCellDoubleClick = (user) => {
        setSelectedUser(user);
        setNewSpecialIncome(user.VALORRENDIMENTOESPECIAL || '');
        setShowModal(true);
    };

    function formatCPF(cpf) {
        return cpf.replace(/\D/g, '');
    }

    const handleSaveSpecialIncome = async () => {
        if (selectedUser && newSpecialIncome !== '') {
            try {
                const userDoc = doc(db, 'USERS', formatCPF(selectedUser.CPF));
                await updateDoc(userDoc, { VALORRENDIMENTOESPECIAL: newSpecialIncome });
                // Atualizando a lista de usuários no estado
                setUsers(prevUsers => prevUsers.map(user => 
                    user.CPF === selectedUser.CPF ? { ...user, VALORRENDIMENTOESPECIAL: newSpecialIncome, POSSUIRENDIMENTOESPECIAL: true } : user
                ));
                setShowModal(false);
                setMessage({ type: 'success', text: 'Rendimento atualizado com sucesso!' });
            } catch (error) {
                setMessage({ type: 'error', text: 'Erro ao atualizar rendimento. Tente novamente.' });
            }
        }
    };

    const handleReturnTypeOfRendimento = (taxa) => {
        if(taxa > rendimentoPadrao) return 'RENDIMENTO ESPECIAL';
        else if(taxa == rendimentoPadrao) return 'RENDIMENTO PADRÃO'
        else return 'RENDIMENTO ABAIXO DA MÉDIA'
    }

    return (
        <ClientsContainer>
            <ClientFirstContent>
                <AreaTitle>CLIENTES</AreaTitle>
                <AddClient onClick={handlereateClient}>+ ADICIONAR CLIENTE</AddClient>
            </ClientFirstContent>

            <Clients>
                <SearchBar>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        type="text"
                        placeholder="Nome ou CPF do Cliente"
                    />
                </SearchBar>

                <FiltrarClienteEspecial>
                    <div>
                        <input type="checkbox" checked={specialIncome} onChange={handleCheckboxChange} />
                        <label>COM RENDIMENTO ESPECIAL</label>
                    </div>
                </FiltrarClienteEspecial>

                <ClientsTable>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>NOME</TableHeaderCell>
                                    <TableHeaderCell>CPF</TableHeaderCell>
                                    <TableHeaderCell>DATA CAD.</TableHeaderCell>
                                    <TableHeaderCell>E-MAIL</TableHeaderCell>
                                    <TableHeaderCell>CELULAR</TableHeaderCell>
                                    <TableHeaderCell>TOKENS OBTIDOS</TableHeaderCell>
                                    <TableHeaderCell>TOTAL INVESTIDO</TableHeaderCell>
                                    <TableHeaderCell>TOTAL GANHO</TableHeaderCell>
                                    <TableHeaderCell>RENDIMENTO</TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredClients.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.NAME}</TableCell>
                                        <TableCell>{formatCPF(user.CPF)}</TableCell>
                                        <TableCell>{user.DATACRIACAO}</TableCell>
                                        <TableCell>{user.EMAIL}</TableCell>
                                        <TableCell>{user.CONTACT}</TableCell>
                                        <TableCell>{user.TOTALCOINS}</TableCell>
                                        <TableCell>$ {formatNumber(user.TOTALPAGO)}</TableCell>
                                        <TableCell>$ {formatNumber(user.LUCRO_OBTIDO)}</TableCell>
                                        <TableCell onDoubleClick={() => handleCellDoubleClick(user)}>
                                            {user.POSSUIRENDIMENTOESPECIAL ? user.VALORRENDIMENTOESPECIAL : rendimentoPadrao}%
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ClientsTable>
            </Clients>

            {showModal && (
                <MudarRendimentoModal>
                    <div className="ContainerRendimento">
                        <p className="TituloContainerModal">ADICIONAR RENDIMENTO ESPECIAL</p>
                        <div className="InformacoesDoCliente">
                            <h5 className="rendimentoAtualText">O Rendimento atual do cliente <span className="rendimentoAtualTextSpan">{selectedUser.NAME}</span> é <span>{selectedUser.VALORRENDIMENTOESPECIAL || rendimentoPadrao}%</span></h5>
                            <h4>{handleReturnTypeOfRendimento(selectedUser.POSSUIRENDIMENTOESPECIAL ? selectedUser.VALORRENDIMENTOESPECIAL : rendimentoPadrao)}</h4>
                        </div>
                        <div className="BoxDoNovoRendimento">
                            <p>DIGITE O NOVO RENDIMENTO</p>
                            <input type="number" value={newSpecialIncome} onChange={(e) => setNewSpecialIncome(e.target.value)} />
                            <div className="areaDosBotoes">
                                <button onClick={() => setShowModal(false)}>CANCELAR SOLICITAÇÃO</button>
                                <button onClick={handleSaveSpecialIncome}>SALVAR UPGRADE</button>
                            </div>
                        </div>
                    </div>
                </MudarRendimentoModal>
            )}

            {message.text && (
                <Message type={message.type}>
                    {message.text}
                </Message>
            )}
        </ClientsContainer>
    );
}

const MudarRendimentoModal = styled.div`
    width: 100%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    background-color: rgba(0,0,0,0.6);

    .ContainerRendimento{
        width: max-content;
        height: max-content;
        padding: 40px 30px;
        border-radius: 8px;
        box-shadow: 3px 3px 4px rgba(0,0,0,0.6);
        box-sizing: border-box;
        background: linear-gradient(to right, #001D3D, #001D3D);
    }

    .TituloContainerModal{
        margin: 0;
        font-size: 22px;
        text-shadow: 2px 2px 1px rgba(0,0,0,0.4);
        text-align: center;
    }

    .InformacoesDoCliente{
        width: 100%;
        display: flex;
        flex-direction: column;

        .rendimentoAtualText{
            margin: 0;
            font-size: 18px;
            font-weight: 100;
            text-align: center;

            span{
                margin: 0;
                color: #60b6fb;
                font-weight: 600;
            }
        }

        h4{
            margin: 0;
            text-align: center;
        }
    }

    .BoxDoNovoRendimento{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-top: 20px;

        p{
            margin: 0;
        }

        input{
            width: 100%;
            height: 35px;
            text-align: center;
            padding: 0;
            box-sizing: border-box;
            font-size: 22px;
        }
    }

    .areaDosBotoes{
        width: 100%;
        display: flex;
        gap: 10px;
        box-sizing: border-box;

        button{
            width: 100%;
            height: 35px;
            cursor: pointer;
        }
    }
`;

const ClientsContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow:hidden;
    box-sizing: border-box;
    padding: 40px 40px;
    background: linear-gradient(to right, #001D3D, #003566, #001D3D);
    color: #f2f2f2;
    position: relative;
    @media (max-width: 915px){
        padding: 40px 20px;
    }
`;

const ClientFirstContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    box-sizing: border-box;
    align-items: center;

    @media (max-width: 915px){
        flex-direction: column;
        gap: 10px;
    }
`;

const AreaTitle = styled.h1`
    text-shadow: 1px 1px 2px rgba(255,255,255,0.2);
    cursor: pointer;
    margin: 0;
    transition: .3s;

    &:hover{
        text-shadow: 1px 1px 2px rgba(255,255,255,0);
        color: #FFC300;
        padding-left: 20px;
    }
`;

const AddClient = styled.button`
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: #FFC300;
    color: #000814;
    border: 0;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
    cursor: pointer;
    transition: .3s;
    &:hover{
        background-color: #000814;
        color: #FFC300;
    }
`;

const Clients = styled.div`
    width: 100%;
    background: linear-gradient(to right, #003566, #001D3D , #003566);  
    box-sizing: border-box;
    margin-top: 50px;
    padding-bottom: 30px;
    box-shadow: 3px 3px 1px black;

    @media (max-width: 915px){
        padding: 20px;
    }
`;

const SearchBar = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    background: linear-gradient(to right, #003566, #001D3D , #003566); 
    input{
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        background: linear-gradient(to right, #000814, #001D3D, #000814);
        border: 0;
        padding-left: 30px;
        box-shadow: 1px 1px 2px black;
        color: rgba(255, 195, 0, 1);
        font-weight: 600;
        text-transform: uppercase;
    }

    @media (max-width: 915px){
        padding: 0px;
    }
`;

const ClientsTable = styled.div`
    width: 100%;
    background: linear-gradient(to right, #003566, #001D3D , #003566); 
    box-sizing: border-box;
    padding: 0 30px 0 30px;
    margin-top: 30px;
    min-height: 300px;
    max-height: 500px;
    overflow-y: hidden;
    overflow-x: hidden;

    display: flex;
    justify-content: center;
    @media (max-width: 915px){
        
        min-height: 300px;
        padding: 0;
        border: 2px solid rgba(0,0,0,0.2);
        max-height: 250px;
    }
`;

const TableContainer = styled.div`
    width: 100%;
    box-sizing: border-box;    
    overflow-y: scroll;
    overflow-x: scroll;
`;

const Table = styled.table`
    width: 100%;
    overflow: auto; 
    border-collapse: collapse;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
    position: relative;
`;

const TableHeader = styled.thead`
    color: #f2f2f2;
`;

const TableRow = styled.tr`
    background: #000814; 
    color: #FFC300;

    &:nth-child(even) {
        color: #FFC300;
        background-color: #001D3D;
    }
`;

const TableHeaderCell = styled.th`
    padding: 15px;
    text-align: center;
    color: #219ebc;
    background-color: #001D3D;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    min-width: 100px; /* Ajuste conforme necessário */
    white-space: nowrap;
`;

const TableBody = styled.tbody`
    background-color: white;
`;

const TableCell = styled.td`
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    min-width: 100px; /* Ajuste conforme necessário */
    white-space: nowrap;
    cursor: pointer; /* Adicionado para indicar que a célula é clicável */
`;

const ImgClient = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f96d00;
`;

const FiltrarClienteEspecial = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    div{
        display: flex;
        align-items: center;

        label{
            font-size: 14px;
        }
    }

    @media (max-width: 1200px){
        margin-top: 20px;
    }
`;

const Message = styled.div`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ type }) => (type === 'success' ? 'green' : 'red')};
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    text-align: center;
    font-weight: bold;
    animation: fade-in-out 3s ease-in-out;

    @keyframes fade-in-out {
        0% {
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;
