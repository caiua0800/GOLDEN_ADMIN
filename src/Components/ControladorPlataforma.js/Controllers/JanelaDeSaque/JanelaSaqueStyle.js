import styled from "styled-components";

export const JanelaDeSaqueContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: linear-gradient(45deg, #e9eaec, #fffdf7);
    padding: 20px;
    overflow-y: scroll;
`;

export const JanelaTitle = styled.h1`
    margin: 0;
    font-weight: 600;
    text-shadow: 3px 3px 2px rgba(0,0,0,0.3);
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    color: #333;
`;

export const StatusMessage = styled.p`
    text-align: center;
    font-size: 1.2rem;
    color: #333;
    margin: 10px 0;
`;

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

export const InputLabel = styled.label`
    font-size: 18px;
    margin-bottom: 10px;
    color: #555;
`;

export const Input = styled.input`
    width: 60%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 20px;
`;

export const SubmitButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const InputField = styled.input`
    width: 60%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
`;

export const DefinirButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #28a745;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 20px;

    &:hover {
        background-color: #218838;
    }
`;
