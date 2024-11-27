import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Typography,
} from "@mui/material";
import {confirmarRecebimento} from "../../../services/pedidoService";
import LinhaDoTempo from "./LinhaDoTempo";
import {useNavigate} from "react-router-dom";
import {useAlert} from "../../shared/alert/AlertProvider";
import Header from "../../Header";

const AcompanharPedido = ({pedidos, onRecarregarPedidos}) => {

    const navigate = useNavigate();
    const showAlert = useAlert();

    const handleVoltarHome = () => {
        navigate("/");
    };

    const handleConfirmarRecebimento = async (pedidoId) => {
        const {data} = await confirmarRecebimento(pedidoId);
        if (data) {
            onRecarregarPedidos();
            showAlert("Entrega confirmada", "success");
        }
    };

    return (
        <Box>
            <Card sx={{ maxWidth: 'sm', margin: '0 auto', boxShadow: 'none' }}>
                <CardContent sx={{ padding: 0 }}>
                    <Header
                        titulo="Acompanhar Pedido"
                        onBack={handleVoltarHome}
                    />
                    <Divider/>
                    {pedidos?.map((pedido) => (
                        <CardContent sx={{padding: 0}}>
                            {pedido.itens?.map((item) => (
                                <Box padding={1}>
                                    <Box display="flex" alignItems="center">
                                        <Box flexGrow={1}>
                                            <Typography variant="body1" sx={{fontWeight: "bold", color: "#333"}}>
                                                {item.nome}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {item.descricao}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body1" sx={{fontWeight: "bold", color: "#333"}}>
                                            {item.preco?.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}

                            <Divider/>

                            <LinhaDoTempo etapas={pedido?.etapas}/>

                            <Box mt={3}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        backgroundColor: pedido.etapas.every((s) => s.completo) ? "#5D4037" : "#CCC",
                                        color: "#FFF",
                                        fontWeight: "bold",
                                        borderRadius: "8px",
                                    }}
                                    onClick={() => handleConfirmarRecebimento(pedido.id)}
                                    disabled={!pedido.etapas.every((s) => s.completo)}
                                >
                                    Confirmar Entrega
                                </Button>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    align="center"
                                    mt={1}
                                >
                                    Confirme a entrega quando receber seu pedido.
                                </Typography>
                            </Box>
                        </CardContent>
                    ))}
                </CardContent>
            </Card>
        </Box>
    );
};

export default AcompanharPedido;

