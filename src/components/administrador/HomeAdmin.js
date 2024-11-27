import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Card,
    CardContent, Container,
    List,
    ListItem,
    ListItemText,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import {listarPedidosPorStatus} from "../../services/pedidoService";
import Menu from "../administrador/menu/Menu";
import {useAppContext} from "../../context/AppContext";

const HomeAdmin = () => {
    const [value, setValue] = useState(0); // Controla a aba ativa
    const [pedidos, setPedidos] = useState([]);
    const navigate = useNavigate();
    const {menuOpen, toggleMenu} = useAppContext();

    const statusPorAba = ["PENDENTE", "PROCESSANDO", "ENTREGUE"];

    const fetchPedidos = async (status) => {
        try {
            const response = await listarPedidosPorStatus(status);
            setPedidos(response.data);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        }
    };

    useEffect(() => {
        fetchPedidos(statusPorAba[value]);
    }, [value]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ maxWidth: "sm", margin: "0 auto", boxShadow: "none" }}>
                <CardContent sx={{ padding: 0 }}>
                    <Header titulo="Painel do Administrador" />

                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="Pedidos Pendentes" />
                            <Tab label="Pedidos em Andamento" />
                            <Tab label="Pedidos Entregues" />
                        </Tabs>
                    </Box>

                    <Box mb={10}>
                        {pedidos.length === 0 ? (
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                align="center"
                                sx={{ marginTop: 4 }}
                            >
                                Nenhum pedido nesta categoria.
                            </Typography>
                        ) : (
                            <List>
                                {pedidos.map((pedido) => (
                                    <ListItem
                                        key={pedido.id}
                                        alignItems="flex-start"
                                        onClick={() => navigate(`/admin/pedido/${pedido.id}`)}
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                                                cursor: "pointer",
                                            },
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Box display="flex" justifyContent="space-between">
                                                    <Typography variant="subtitle1" fontWeight="bold">
                                                        Pedido {pedido.id}
                                                    </Typography>
                                                    <Typography variant="subtitle1" color="secondary">
                                                        R$ {pedido.valorTotal.toFixed(2)}
                                                    </Typography>
                                                </Box>
                                            }
                                            secondary={
                                                <Box display="flex" alignItems="center">
                                                    <Typography variant="body2" color="textSecondary">
                                                        {pedido.usuarioSolicitante}
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
            <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
        </Container>
    );
};

export default HomeAdmin;
