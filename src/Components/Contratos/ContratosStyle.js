import styled from "styled-components";
export const ContratosContainer = styled.div`
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

export const HomeInitialContent = styled.div`
    width: 100%;
    height: max-content;
    box-sizing: border-box;
    padding: 20px 20px 20px 20px;

    display: flex;
    flex-direction: column;
    align-items: start;
   
    position: relative;
`;

export const PartTitle = styled.div`
    color: #FFC300;
    font-weight: 600;
    font-size: 18px;

    @media (max-width: 915px){
        width: 100%;
        text-align: center;
    }
`;

export const Boxes = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
    position: absolute;
    top: 70px;
    left: 0;
    @media (max-width: 915px){
        gap: 10px;
        top: 20px;
        flex-wrap: wrap;
        position: relative;
        justify-content: center;
    }
`;

export const Box = styled.div`
    width: 100%;
    height: 50px;
    border: 1px solid rgba(0,0,0,0.1);
    // background-color: #F7F7F7;
    background-color: ${({ bgColor }) => bgColor || "#F7F7F7"};

    box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
    transition: .4s;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    
    &:hover{
        height: 100px;
    }

    @media (max-width: 915px){
        width: 300px;
        justify-content: center;
        height: 100px;
    }
`;

export const BoxContent = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top: 15px;
    gap: 20px;

    @media (max-width: 915px){
        align-items: center;
        margin-top: 0;
        gap: 10px;
    }

`;

export const BoxTitle = styled.p`
    margin:0;
    padding:0;
    font-weight: 600;
    color: #;
`;

export const Contracts = styled.div`
    width: 100%;
    height: 300px;
    margin-top: 100px;
    
    @media (max-width: 915px){
        margin-top: 40px;
    }
`;

export const ContractsTitle = styled.h1`
    width: 100%;
    display: flex;
    color: #FFC300;
    justify-content: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #FFC300;
`;

export const SearchAreaContent = styled.div`
    width: 100%;
    // border: 1px solid rgba(0,0,0,0.1);

    // background-color: #222831;
    // box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);

    @media (max-width: 915px){
        // border: 1px solid rgba(0,0,0,0);
        // box-shadow: -2px 2px 2px rgba(0, 0, 0, 0);
        // background-color: transparent;
    }
`;

export const SearchArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0px 40px;
    box-sizing: border-box;

    @media (max-width: 915px){
        flex-direction: column;
        padding: 0px 20px;
    }
`;

export const FilterDiv = styled.div`
    width:100%;   
    padding: 10px 50px;
    box-sizing: border-box;

    h4{
        color: #f2f2f2;
    }

    select, input{
        width: 100%;
        height: 30px;
        border: 0;
        background-color: #F7F7F7;
        border: 1px solid rgba(0,0,0,0.1);
        color: rgba(0,0,0,0.7);
        padding-left: 20px;
        box-sizing: border-box;
        font-size: 16px;
        box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
    }

    .exceptionFilterDiv{
        width: 100%;
        display: flex;

        div{
            display: flex;
            flex-direction: row;
        }
    }

    @media (max-width: 915px){
        padding: 10px 20px;

        h4{
            margin-top: 10px;
            margin: 0;
        }

        select, input{
            height: 40px;
        }
    }
`;


export const FilterDivException = styled.div`
    width:100%;   
    padding: 10px 50px;
    box-sizing: border-box;

    h4{
        color: #f2f2f2;
    }

    div{
        width: 100%;
        display: flex;
        gap: 5px;

        input{
            width: 100%;
            height: 30px;
            border: 0;
            background-color: #F7F7F7;
            border: 1px solid rgba(0,0,0,0.1);
            color: rgba(0,0,0,0.7);
            padding-left: 20px;
            box-sizing: border-box;
            font-size: 16px;
            box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
        }

        button{
            height: 30px;
            font-size: 14px;
            background-color: #fff3;
            color: white;
            border-radius: 0;
            border: 1px solid black;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: .3s;

            &:hover{transform: scale(0.97);}
        }
    }




    @media (max-width: 915px){
        padding: 10px 20px;

        h4{
            margin-top: 10px;
            margin: 0;
        }

        select, input{
            height: 40px;
        }
    }
`;

export const SecondSearchBar = styled.div`
    width: 100%;
    box-sizing: border-box;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top: 10px;
    padding: 0px 20px 40px 20px;

    input{
        width: 100%;
        height: 40px;
        border: 0;
        box-sizing: border-box;
        border-radius: 3px;  
        text-align: center;     
        background-color: #F7F7F7;
        border: 1px solid rgba(0,0,0,0.1);
        box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
        font-size: 18px;
    }

    @media (max-width: 915px){
        justify-content:center;
        align-items:center;
        margin-top: 10px;
        padding: 0px 40px 40px 40px;

        input{
            border-radius: 2px;  
            height: 40px;
        }
    }
`;

export const TableContainer = styled.div`
    margin-top: 40px;
    width: 100%;
    overflow-y: scroll; 
    max-height: 400px; 
    box-sizing: border-box;
    display: flex;
    box-shadow: 6px 6px 5px rgba(0,0,0,0.6);
    
    @media (max-width: 915px){
        margin-top: 150px;
        overflow-x: scroll; 
        border: 2px solid rgba(0,0,0,0.1);
        padding: 0;
        border-radius: 12px;
    }
`;

export const Table = styled.table`
    width: 100%;
    overflow: auto; 
    border-collapse: collapse;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
    position: relative;
`;

export const TableHeader = styled.thead`
    color: #f2f2f2;
`;

export const TableRow = styled.tr`
    background: #000814; 
    color: #FFC300;

    &:nth-child(even) {
        color: #FFC300;
        background-color: #001D3D;
    }
`;

export const TableHeaderCell = styled.th`
    padding: 15px;
    text-align: center;
    color: #219ebc;
    background-color: #001D3D;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    min-width: 100px; /* Ajuste conforme necessário */
    white-space: nowrap;
`;

export const TableBody = styled.tbody`
    background-color: white;
`;

export const TableCell = styled.td`
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    min-width: 100px; /* Ajuste conforme necessário */
    white-space: nowrap;
    transition: .3s;
    &:hover{
        background-color: black;
        cursor: pointer;
        color: white;
        transform: scale(1.1);
    }
`;