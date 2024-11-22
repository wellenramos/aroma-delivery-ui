import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {acompanhar} from "../../services/pedidoService";
import {useAlert} from "../shared/alert/AlertProvider";

const AcompanharPedido = () => {
    const [pedidos, setPedidos] = useState([]);
    const pedido = {
        imagem: "/path/to/coffee-image.png", // Substituir pelo caminho real da imagem
        nome: "Coffee Milk",
        descricao: "Gelo, Regular, Açúcar Normal, Gelo Normal",
        preco: "R$ 25,00",
        quantidade: 1,
        status: [
            {etapa: "A cafeteria recebeu seu pedido", completo: true},
            {etapa: "Preparando seu pedido", completo: true},
            {
                etapa: "Seu pedido está pronto. Por favor, retire no balcão",
                completo: false,
                hora: "Retirada agendada às 17h15",
            },
        ],
    };

    const navigate = useNavigate();
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

    const handleVoltarHome = () => {
        navigate("/");
    };

    const handleReceberPedido = () => {
        console.log("Pedido recebido pelo cliente");
    };

    return (
        <Box>
            <Card sx={{maxWidth: 'sm', margin: '0 auto', boxShadow: 'none'}}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <IconButton onClick={handleVoltarHome}>
                        <ArrowBackIcon sx={{ color: '#BF7373' }} />
                    </IconButton>
                    <Typography variant="h6" sx={{ color: '#BF7373', fontWeight: 'bold' }}>
                        Acompanhar Pedidos
                    </Typography>
                    <Box width="48px" />
                </Box>
                <Divider />
                {pedidos?.map((pedido) => (
                    <CardContent sx={{padding: 0}}>
                        {pedido.itens?.map((item) => (
                            <Box padding={2}>
                                <Box display="flex" alignItems="center">
                                    <Box flexGrow={1}>
                                        <Typography variant="h6" sx={{fontWeight: "bold", color: "#333"}}>
                                            {item.nome}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {item.descricao}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" sx={{fontWeight: "bold", color: "#333"}}>
                                        {item.preco?.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}

                        <Divider/>

                        {/* Linha do Tempo */}
                        <Box mt={2}>
                            {pedido?.etapas?.map((etapa, index) => (
                                <Box key={index} display="flex" alignItems="flex-start" mb={2}>
                                    <Box sx={{marginRight: 2}}>
                                        {etapa.completo ? (
                                            <CheckCircleIcon sx={{color: "green"}}/>
                                        ) : (
                                            <RadioButtonUncheckedIcon sx={{color: "#CCC"}}/>
                                        )}
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="body1"
                                            sx={{color: etapa.completo ? "#333" : "#AAA"}}
                                        >
                                            {etapa.etapa}
                                        </Typography>
                                        {etapa.hora && (
                                            <Typography variant="body2" color="textSecondary">
                                                {etapa.hora}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        {/* Botão */}
                        <Box mt={3}>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: pedido.etapas.every((s) => s.completo)
                                        ? "#5D4037"
                                        : "#CCC",
                                    color: "#FFF",
                                    fontWeight: "bold",
                                    borderRadius: "8px",
                                }}
                                onClick={handleReceberPedido}
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
            </Card>
        </Box>
    );
};

export default AcompanharPedido;

