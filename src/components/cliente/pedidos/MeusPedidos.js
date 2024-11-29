import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from "@mui/material";
import AcompanharPedido from "./AcompanharPedido";
import HistoricoPedidos from "./HistoricoPedidos";
import { useAlert } from "../../shared/alert/AlertProvider";
import { acompanhar } from "../../../services/pedidoService";

const MeusPedidos = () => {

    const [pedidos, setPedidos] = useState([]);
    const [historico, setHistorico] = useState([]);

    const showAlert = useAlert();

    const fetchPedidos = useCallback(async () => {
        try {
            const { data } = await acompanhar();
            if (data.pedidosEmAndamento.length >= 1) {
                setPedidos(data.pedidosEmAndamento);
            } else {
                setHistorico(data.historico);
            }
        } catch (error) {
            showAlert("Erro ao buscar o produto", "error");
        }
    }, [showAlert]);

    useEffect(() => {
        fetchPedidos();
    }, [fetchPedidos]);

    const handleRecarregarPedidos = () => {
        fetchPedidos();
    }

    return (
        <Card sx={{ maxWidth: 'md', margin: '0 auto', boxShadow: 'none' }}>
            <CardContent sx={{ padding: 0 }}>
                {pedidos.length >= 1
                    ? (<AcompanharPedido pedidos={pedidos} onRecarregarPedidos={handleRecarregarPedidos} />)
                    : (<HistoricoPedidos historico={historico} />)
                }
            </CardContent>
        </Card>
    );
};

export default MeusPedidos;
