import React from "react";
import {
    Avatar,
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

const AcompanharPedido = () => {
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

    const handleVoltarHome = () => {
        navigate("/");
    };

    const handleReceberPedido = () => {
        console.log("Pedido recebido pelo cliente");
    };

    return (
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
            <CardContent sx={{padding: 0}}>

                {/* Detalhes do Pedido */}
                <Box padding={2}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Avatar
                            src={pedido.imagem}
                            alt={pedido.nome}
                            sx={{width: 64, height: 64, marginRight: 2}}
                        />
                        <Box flexGrow={1}>
                            <Typography variant="h6" sx={{fontWeight: "bold", color: "#333"}}>
                                {pedido.nome}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {pedido.descricao}
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{fontWeight: "bold", color: "#333"}}>
                            {pedido.preco}
                        </Typography>
                    </Box>
                </Box>

                <Divider/>

                {/* Linha do Tempo */}
                <Box mt={2}>
                    {pedido.status.map((etapa, index) => (
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
                            backgroundColor: pedido.status.every((s) => s.completo)
                                ? "#5D4037"
                                : "#CCC",
                            color: "#FFF",
                            fontWeight: "bold",
                            borderRadius: "8px",
                        }}
                        onClick={handleReceberPedido}
                        disabled={!pedido.status.every((s) => s.completo)}
                    >
                        Confirmar Retirada
                    </Button>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        align="center"
                        mt={1}
                    >
                        Confirme a retirada quando já tiver recebido seu pedido.
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AcompanharPedido;

