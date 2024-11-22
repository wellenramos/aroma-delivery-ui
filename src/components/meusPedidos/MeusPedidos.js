import React from 'react';
import {Card, CardContent} from "@mui/material";
import {useNavigate} from "react-router-dom";
import AcompanharPedido from "./AcompanharPedido";
import HistoricoPedidos from "./HistoricoPedidos";

const pedidos = [
    {
        id: 1,
        nome: 'Cappuccino Clássico',
        descricao: 'Espresso, leite vaporizado, espuma de leite',
        preco: 15.00,
        avaliacao: 4.9,
        imagem: 'https://link-para-imagem.com/cappuccino.png',
    },
    {
        id: 2,
        nome: 'Latte Clássico',
        descricao: 'Espresso + leite vaporizado',
        preco: 15.00,
        avaliacao: 4.9,
        imagem: 'https://link-para-imagem.com/latte.png',
    },
];

const MeusPedidos = () => {

    const navigate = useNavigate();

    const handleAvaliar = () => {
        navigate('/avaliacao');
    }

    const handleVoltarHome = () => {
        navigate('/');
    }

    return(
        <Card sx={{ maxWidth: 'sm', margin: '0 auto', boxShadow: 'none'}}>
            <CardContent sx={{ padding: 0 }}>
                {pedidos.length >= 1
                    ? (<AcompanharPedido />)
                    : (<HistoricoPedidos />)
                }
            </CardContent>
        </Card>
    );
};

export default MeusPedidos;