import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const DetalhesPedido = () => {
    const navigate = useNavigate();
    const { pedidoId } = useParams(); // Captura o ID do pedido via URL

    // Simulação de detalhes do pedido
    const pedido = {
        id: pedidoId,
        cliente: "João",
        endereco: "Rua das Flores, 123",
        total: 120.5,
        itens: [
            { produto: "Pizza Margherita", quantidade: 2, preco: 40.0 },
            { produto: "Refrigerante", quantidade: 1, preco: 10.5 },
        ],
        status: "PENDENTE",
    };

    // Função para iniciar o pedido
    const handleIniciarPedido = () => {
        console.log(`Pedido ${pedido.id} iniciado!`);
        alert(`Pedido ${pedido.id} alterado para "Em Andamento".`);
        navigate("/admin"); // Redireciona para a tela do painel de administrador
    };

    return (
        <Card sx={{ maxWidth: "sm", margin: "0 auto", boxShadow: "none" }}>
            <CardContent sx={{ padding: 0 }}>
                <Box padding={2}>
                    <Typography variant="h5" fontWeight="bold">
                        Detalhes do Pedido #{pedido.id}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Cliente: {pedido.cliente}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Endereço: {pedido.endereco}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" fontWeight="bold">
                        Itens do Pedido
                    </Typography>
                    <List>
                        {pedido.itens.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`${item.produto} x${item.quantidade}`}
                                    secondary={`R$ ${(item.quantidade * item.preco).toFixed(2)}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6">
                        Total: <strong>R$ {pedido.total.toFixed(2)}</strong>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1">
                        Status Atual: <strong>{pedido.status}</strong>
                    </Typography>
                    <Box mt={3}>
                        {pedido.status === "PENDENTE" && (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleIniciarPedido}
                            >
                                Iniciar Pedido
                            </Button>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default DetalhesPedido;
