import React, {useEffect, useState} from 'react';
import {Card, CardContent} from "@mui/material";
import AcompanharPedido from "./AcompanharPedido";
import HistoricoPedidos from "./HistoricoPedidos";
import {useAlert} from "../shared/alert/AlertProvider";
import {acompanhar} from "../../services/pedidoService";

const MeusPedidos = () => {

    const [pedidos, setPedidos] = useState([]);

    const showAlert = useAlert();

    const fetchPedidos = async () => {
        try {
            const { data } = await acompanhar();
            setPedidos(data);
        } catch (error) {
            showAlert("Erro ao buscar o produto", "error");
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    const handleRecarregarPedidos = () => {
        fetchPedidos();
    }

    return(
        <Card sx={{ maxWidth: 'sm', margin: '0 auto', boxShadow: 'none'}}>
            <CardContent sx={{ padding: 0 }}>
                {pedidos.length >= 1
                    ? (<AcompanharPedido pedidos={pedidos} onRecarregarPedidos={handleRecarregarPedidos}/>)
                    : (<HistoricoPedidos />)
                }
            </CardContent>
        </Card>
    );
};

export default MeusPedidos;