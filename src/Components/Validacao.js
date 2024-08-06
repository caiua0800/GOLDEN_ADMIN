import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { formatCPF, getClients, formatNumber } from "./ASSETS/assets";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import Modal from "./ModalDocumentos/Modal";


const reloadIcon = 'https://firebasestorage.googleapis.com/v0/b/wldata.appspot.com/o/reload-svgrepo-com%20(1).png?alt=media&token=c99468e4-47db-4616-8788-540ef032113e'

export default function Validacao() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelecetedUser] = useState(null);
    const [showModalDocs, setShowModalDocs] = useState(true);

    useEffect(() => {
        getClients(setUsers);
    }, []);

    const filteredClients = search.length > 0
        ? users.filter(user => (user.NAME.toUpperCase().includes(search.toUpperCase()) && (!user.DOCSVERIFICADOS && user.DOCSENVIADOS)))
        : users.filter(user => !user.DOCSVERIFICADOS && user.DOCSENVIADOS);

    const handleReload = () => {
        getClients(setUsers);
    };

    const handleShowModal = (usuario) => {
        setSelecetedUser(usuario);
        setShowModalDocs(true);
    }


    const handleCloseModal = () => {
        setSelecetedUser(null);
        setShowModalDocs(false);
        handleReload()
    }

    return (
        <ClientsContainer>

            {showModalDocs && (
                <Modal handleCloseModal={handleCloseModal} cliente={selectedUser} />
            )}

            <ClientFirstContent>
                <AreaTitle>VALIDAÇÃO DE DOCUMENTOS</AreaTitle>
            </ClientFirstContent>

            <Clients>
                <SearchBar>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        type="text"
                        placeholder="Nome do Cliente"
                    />
                </SearchBar>
                <ReloadData>
                    <p onClick={handleReload}><img src={reloadIcon} alt="RELOAD" /></p>
                </ReloadData>

                <ClientsTable>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>NOME</TableHeaderCell>
                                    <TableHeaderCell>CPF</TableHeaderCell>
                                    <TableHeaderCell>E-MAIL</TableHeaderCell>
                                    <TableHeaderCell>CELULAR</TableHeaderCell>
                                    <TableHeaderCell>OPÇÕES</TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredClients.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.NAME}</TableCell>
                                        <TableCell>{formatCPF(user.CPF)}</TableCell>
                                        <TableCell>{user.EMAIL}</TableCell>
                                        <TableCell>{user.CONTACT}</TableCell>
                                        <TableCell>
                                            <OptionsVerificacao>
                                                <button onClick={() => {handleShowModal(user)}}>VERIFICAR</button>
                                            </OptionsVerificacao>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ClientsTable>
            </Clients>
        </ClientsContainer>
    );
}

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
    background-color: #f96d00;
    color: #f2f2f2;
    border: 0;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
    cursor: pointer;
    transition: .3s;
    &:hover{
        background-color: #393e46;
        color: #f96d00;
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
`;

const OptionsVerificacao = styled.div`
    display: flex;
    justify-content: center;
    gap: 2px;

`;

const ReloadData = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;

    p{
        margin: 0;
        padding-right: 60px;
        cursor: pointer;

        img{
            width: 30px;
            transition: .3s;

            &:hover{
                transform: scale(1.3);
            }
        }
    }

`;