import React, { useState, useEffect } from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent, List, ListItem, ListItemAvatar, ListItemText,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import Header from "../Header";
import StarIcon from "@mui/icons-material/Star";

const Admin = () => {
    const [value, setValue] = useState(0); // Controla a aba ativa
    const [pedidos, setPedidos] = useState([]);
    const [pedidosEntregues, setPedidosEntregues] = useState([]);
    const [pedidosEmAndamento, setPedidosEmAndamento] = useState([]);
    const [pedidosPendentes, setPedidosPendentes] = useState([]);

    const obterPedidos = () => {
        return {
            data: [
                { id: 1, cliente: "João", status: "ENTREGUE", total: 120.5 },
                { id: 2, cliente: "Maria", status: "EM_ANDAMENTO", total: 80.0 },
                { id: 3, cliente: "Pedro", status: "PENDENTE", total: 150.75 },
                { id: 4, cliente: "Ana", status: "ENTREGUE", total: 200.3 },
            ],
        };
    };

    // Busca pedidos na API
    const fetchPedidos = () => {
        try {
            const { data } = obterPedidos(); // Substitua por sua API real
            setPedidos(data);

            // Filtrar pedidos por status
            setPedidosEntregues(data.filter((pedido) => pedido.status === "ENTREGUE"));
            setPedidosEmAndamento(data.filter((pedido) => pedido.status === "EM_ANDAMENTO"));
            setPedidosPendentes(data.filter((pedido) => pedido.status === "PENDENTE"));
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    // Alterna a aba
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Card sx={{ maxWidth: "sm", margin: "0 auto", boxShadow: "none" }}>
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
                <Box mb={10}>
                    {pedidos.length === 0 ? (
                        <Typography variant="subtitle1" color="textSecondary" align="center">
                            Nenhum resultado encontrado.
                        </Typography>
                    ) : (
                        <List>
                            {pedidos.map((pedido) => (
                                <ListItem
                                    key={pedido.id}
                                    alignItems="flex-start"
                                    // onClick={() => handleIrParaDetalhe(produto.id)}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="subtitle1" fontWeight="bold" style={{ cursor: 'pointer' }}>
                                                    Pedido {pedido.id}
                                                </Typography>
                                                <Typography variant="subtitle1" color="secondary" style={{ cursor: 'pointer' }}>
                                                    R$ {pedido.total.toFixed(2)}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <Box display="flex" alignItems="center">
                                                <Typography variant="body2" color="textSecondary" style={{ cursor: 'pointer' }}>
                                                    {pedido.cliente}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default Admin;
