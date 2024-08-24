import styled from "styled-components";
import { Link } from "react-router-dom";


export const HomeContainer = styled.div`
    width: 100%;
    background: linear-gradient(to right, #001D3D, #003566, #001D3D);
    height: 100vh;
    overflow: auto;
    padding-top: 40px;
    display: flex;
    justify-content: center;
    align-items: start;
    box-sizing: border-box;
    overflow-x: hidden;
    position: relative;
    @media (max-width: 920px){
        padding: 80px 20px;
    }
`;

export const HomeContent = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    position: fixed;
    gap: 20px;
    flex-wrap: wrap;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.8);
    z-index: 9999999999;
    overflow: scroll;
    padding: 30px;
    box-sizing: border-box;

    span{
        position: fixed;
        top: 20px;
        right: 20px;
        color: white; 
        font-size: 22px;
        z-index: 99999999999;
        cursor: pointer;
        transition: .3s;
        &:hover{color: red; }
    }
`;

export const GrapthContainer = styled.div`
    padding: 40px 30px;
    box-sizing: border-box;
    width: 100%;
    height: 600px;
    overflow: hidden;
    display: flex;
    justify-content: center;

    @media (max-width: 920px){
        margin-top: 20px;
        padding: 0px;
        height: 450px;
    }
`;

export const HomeOptions = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    gap: 10px;

    @media (max-width: 920px){
        flex-wrap: no-wrap; 
        flex-direction: column; 
    }
`;

export const Option = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    transition: .3s;
    box-sizing: border-box;
    padding: 15px;
    color: rgba(0,0,0,0.7);
    font-weight: 800;
    background-color: #bf9b30;
    text-align: center;
    overflow: hidden;

    &:hover{
        transform: scale(1.05);
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

export const FirstMachine = styled.div`
    width: 60%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 100px;
    box-sizing: border-box;
`;

export const OptionCircle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    h1{
        text-align: center;
        margin: 0;
        font-size: 28px;
    }
`;

export const CircleOption = styled.div`
    width: 150px;
    height: 150px;
    box-shadow: 3px 3px 4px rgba(0,0,0,0.4);
    background-color: rgba(0,0,0,0.4);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;

    img{
        width: 100%;
        height: 100%;
        opacity: 0.9;
    }

    transition: .3s;

    &:hover{
        transform: scale(0.9);
    }
`;


// export const CircleOption = styled.div`

// `;

// export const CircleOption = styled.div`

// `;


// export const CircleOption = styled.div`

// `;