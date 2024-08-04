
import styled from "styled-components";
import { Link } from 'react-router-dom';


export const HomeContainer = styled.div`
    width: 100%;
    background: linear-gradient(to right, #001D3D, #003566, #001D3D);
    min-height: 100vh;
    padding: 40px;
    display: flex;
    justify-content: start;
    box-sizing: border-box;
    flex-direction: column;

    @media (max-width: 915px){
        padding-left: 30px;
    }
`;

export const HomeTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    span{
        font-size: 32px;
        font-weight: 500;
        color : #ffc300;
        filter: drop-shadow(0px 4px 6px rgba(255, 215, 0, 0.5)) drop-shadow(0px 8px 12px rgba(255, 215, 0, 0.3));
    }
`;

export const HomeContent = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
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
    width: 500px;
    height: 100px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
    background-color: ${(props) => props.color || "white"};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    transition: .3s;
    color: rgba(0,0,0,0.7);
    font-weight: 600;
    &:hover{
        transform: scale(1.05);
    }

    @media (max-width: 920px){
        width: 100%;
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

export const ChartContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

export const ChatCentralize = styled.div`
    padding: 20px;
    background-color: #fff; 
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); 
    width: 70%
`;

// export const nomenomenome = styled.div``;

// export const nomenomenome = styled.div``;

// export const nomenomenome = styled.div``;

// export const nomenomenome = styled.div``;
