import React, {useEffect, useState} from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Header from "../Header";
import {useNavigate} from "react-router-dom";
import {listarPedidosPorStatus} from "../../services/pedidoService";
import Menu from "../administrador/menu/Menu";
import {useAppContext} from "../../context/AppContext";

const statusPorAba = ["PENDENTE", "EM_ANDAMENTO", "ENVIADO", "ENTREGUE"];

const HomeAdmin = () => {
    const [value, setValue] = useState(0);
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { menuOpen, toggleMenu } = useAppContext();

    const fetchPedidos = async (status) => {
        setLoading(true);
        try {
            const response = await listarPedidosPorStatus(status);
            setPedidos(response.data);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPedidos(statusPorAba[value]);
    }, [value]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="md">
            <Card sx={{ boxShadow: 3, margin: "16px auto" }}>
                <CardContent sx={{ padding: 0 }}>
                    <Header titulo="Painel do Administrador" />

                    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                        >
                            <Tab label="Pedidos Pendentes" sx={{ minWidth: 100 }} />
                            <Tab label="Pedidos em Andamento" sx={{ minWidth: 100 }} />
                            <Tab label="Pedidos Enviados" sx={{ minWidth: 100 }} />
                            <Tab label="Pedidos Entregues" sx={{ minWidth: 100 }} />
                        </Tabs>
                    </Box>

                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
                            <CircularProgress />
                        </Box>
                    ) : pedidos?.length === 0 ? (
                        <Typography variant="subtitle1" color="textSecondary" align="center" mt={4}>
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
                                        padding: 2,
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
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="body2" color="textSecondary">
                                                    Solicitante: {pedido.usuarioSolicitante}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Data: {pedido.dataPedido}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </CardContent>
            </Card>
            <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
        </Container>
    );
};

export default HomeAdmin;
