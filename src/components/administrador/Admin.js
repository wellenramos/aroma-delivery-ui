import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import Header from "../Header";

const Admin = () => {
    const [value, setValue] = useState(0); // Controla a aba ativa
    const [pedidos, setPedidos] = useState([]);
    const [pedidosEntregues, setPedidosEntregues] = useState([]);
    const [pedidosEmAndamento, setPedidosEmAndamento] = useState([]);
    const [pedidosPendentes, setPedidosPendentes] = useState([]);

    // Busca pedidos na API
    // const fetchPedidos = async () => {
    //     try {
    //         const { data } = await obterPedidos(); // Substitua por sua API real
    //         setPedidos(data);
    //
    //         // Filtrar pedidos por status
    //         setPedidosEntregues(data.filter((pedido) => pedido.status === "ENTREGUE"));
    //         setPedidosEmAndamento(data.filter((pedido) => pedido.status === "EM_ANDAMENTO"));
    //         setPedidosPendentes(data.filter((pedido) => pedido.status === "PENDENTE"));
    //     } catch (error) {
    //         console.error("Erro ao buscar pedidos:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchPedidos();
    // }, []);

    // Alterna a aba
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Componente para exibir a lista de pedidos
    const PedidosList = ({ pedidos }) => (
        <Box padding={2}>
            {pedidos.length === 0 ? (
                <Typography color="textSecondary">Nenhum pedido encontrado.</Typography>
            ) : (
                pedidos.map((pedido) => (
                    <Card
                        key={pedido.id}
                        sx={{ marginBottom: 2, borderRadius: 2, border: "1px solid #E0E0E0" }}
                    >
                        <CardContent>
                            <Typography variant="h6">Pedido #{pedido.id}</Typography>
                            <Typography variant="body2">Cliente: {pedido.cliente}</Typography>
                            <Typography variant="body2">Status: {pedido.status}</Typography>
                            <Typography variant="body2">Total: R$ {pedido.total.toFixed(2)}</Typography>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );

    return (
        <Card sx={{ maxWidth: "md", margin: "0 auto", boxShadow: "none" }}>
            <CardContent sx={{ padding: 0 }}>
                <Header titulo="Painel do Administrador" />

                {/* Abas de navegação */}
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Pedidos Pendentes" />
                        <Tab label="Pedidos em Andamento" />
                        <Tab label="Pedidos Entregues" />
                    </Tabs>
                </Box>

                {/* Conteúdo das abas */}
                <Box>
                    {value === 0 && <PedidosList pedidos={pedidosPendentes} />}
                    {value === 1 && <PedidosList pedidos={pedidosEmAndamento} />}
                    {value === 2 && <PedidosList pedidos={pedidosEntregues} />}
                </Box>
            </CardContent>
        </Card>
    );
};

export default Admin;
