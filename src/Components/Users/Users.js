import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import * as S from './UsersStyle'
import { db } from '../../DATABASE/firebaseConfig';
import { createUser } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Modal from "./ModalUser";


export default function Clientes() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const [modalName, setModalName] = useState('');
    const [modalCPF, setModalCPF] = useState('');
    const [modalContato, setModalContato] = useState('');
    const [modalCargo, setModalCargo] = useState('');
    const [modalEmail, setModalEmail] = useState('');
    const [modalPass1, setModalPass1] = useState('');
    const [modalPass2, setModalPass2] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [modalUser, setModalUser] = useState(false);

    const getUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'ADMIN'));
            let userList = [];
            querySnapshot.forEach((doc) => {
                const user = {
                    ID: doc.id,
                    NAME: doc.data().NAME,
                    CPF: formatCPF(doc.data().CPF),
                    CONTACT: doc.data().CONTACT,
                    CARGO: doc.data().CARGO,
                    EMAIL: doc.data().EMAIL,
                    ALLOW: doc.data().ALLOW,
                };
                userList.push(user);
            });

            setUsers(userList);

        } catch (error) {
            console.error("Error getting users:", error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const filteredClients = search.length > 0
        ? users.filter(user => (user.NAME.includes(search.toUpperCase()) || (user.CARGO.includes(search.toUpperCase()))))
        : users;

    const formatCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, '');
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };


    const handleCancelarModalClick = () => {
        setModalName('');
        setModalCPF('');
        setModalContato('');
        setModalEmail('');
        setModalPass1('');
        setModalPass2('');
        setModalCargo('');
        setModalShow(false);
    };

    const handleCriarModalClick = async () => {
        if (modalPass1 !== modalPass2) {
            alert('As senhas não coincidem');
            return;
        }

        dispatch(createUser(modalName, modalCPF, modalEmail, modalContato, modalCargo, modalPass1));
        handleCancelarModalClick();
        getUsers();
    };

    return (
        <S.UsersContainer>

            {modalUser && (
                <Modal setModalUser={setModalUser} />
            )}

            <S.UsersFirstContent>
                <S.AreaTitle>USUÁRIOS DO SISTEMA</S.AreaTitle>
                <S.AddClient onClick={() => setModalShow(true)}>+ ADICIONAR USUÁRIO</S.AddClient>
            </S.UsersFirstContent>

            <S.Users>
                <S.SearchBar>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        type="text"
                        placeholder="Nome ou Cargo"
                    />
                </S.SearchBar>

                <S.UsersTable>
                    <S.TableContainer>
                        <S.Table>
                            <S.TableHeader>
                                <S.TableRow>
                                    <S.TableHeaderCell>NOME</S.TableHeaderCell>
                                    <S.TableHeaderCell>CPF</S.TableHeaderCell>
                                    <S.TableHeaderCell>E-MAIL</S.TableHeaderCell>
                                    <S.TableHeaderCell>CELULAR</S.TableHeaderCell>
                                    <S.TableHeaderCell>CARGO</S.TableHeaderCell>
                                    <S.TableHeaderCell>OPÇÕES</S.TableHeaderCell>
                                </S.TableRow>
                            </S.TableHeader>
                            <S.TableBody>
                                {filteredClients.map((user, index) => (
                                    <S.TableRow key={index}>
                                        <S.TableCell>{user.NAME}</S.TableCell>
                                        <S.TableCell>{user.CPF}</S.TableCell>
                                        <S.TableCell>{user.EMAIL}</S.TableCell>
                                        <S.TableCell>{user.CONTACT}</S.TableCell>
                                        <S.TableCell>{user.CARGO}</S.TableCell>
                                        <S.TableCell>
                                            <S.OptionsGroup>
                                                <button>
                           
                                                    <img src='/user-edit.png' alt="Alterar permissão" />
                                                </button>
                                            </S.OptionsGroup>
                                        </S.TableCell>
                                    </S.TableRow>
                                ))}
                            </S.TableBody>
                        </S.Table>
                    </S.TableContainer>
                </S.UsersTable>
            </S.Users>

            {modalShow && (
                <S.ModalAddUser>
                    <S.ModalContent>
                        <S.ModalTitle>INFORMAÇÕES NOVO USUÁRIO</S.ModalTitle>
                        <S.ModalInputs>
                            <div>
                                <h4>NOME</h4>
                                <input
                                    type="text"
                                    onChange={e => setModalName(e.target.value)}
                                    value={modalName}
                                />
                            </div>
                            <div>
                                <h4>CPF</h4>
                                <input
                                    type="text"
                                    onChange={e => setModalCPF(e.target.value)}
                                    value={modalCPF}
                                />
                            </div>
                            <div>
                                <h4>CONTATO</h4>
                                <input
                                    type="text"
                                    onChange={e => setModalContato(e.target.value)}
                                    value={modalContato}
                                />
                            </div>
                            <div>
                                <h4>CARGO</h4>
                                <input
                                    type="text"
                                    onChange={e => setModalCargo(e.target.value)}
                                    value={modalCargo}
                                />
                            </div>
                            <div>
                                <h4>EMAIL</h4>
                                <input
                                    type="text"
                                    onChange={e => setModalEmail(e.target.value)}
                                    value={modalEmail}
                                />
                            </div>
                            <div>
                                <h4>SENHA</h4>
                                <input
                                    type="password"
                                    onChange={e => setModalPass1(e.target.value)}
                                    value={modalPass1}
                                />
                            </div>
                            <div>
                                <h4>CONFIRME A SENHA</h4>
                                <input
                                    type="password"
                                    onChange={e => setModalPass2(e.target.value)}
                                    value={modalPass2}
                                />
                            </div>
                        </S.ModalInputs>
                        <S.ModalButtons>
                            <button className="cancelar" onClick={handleCancelarModalClick}>
                                CANCELAR
                            </button>
                            <button className="criar" onClick={handleCriarModalClick}>
                                CRIAR
                            </button>
                        </S.ModalButtons>
                    </S.ModalContent>
                </S.ModalAddUser>
            )}
        </S.UsersContainer>
    );
}

