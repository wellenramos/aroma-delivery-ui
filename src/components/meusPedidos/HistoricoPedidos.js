import React, {useState} from 'react';
import {
    Box,
    Card,
    CardContent,
    Divider,
    IconButton,
    Rating,
    Typography
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {avaliar} from "../../services/pedidoService";
import {useAlert} from "../shared/alert/AlertProvider";

const MeusPedidos = ({ historico }) => {

    const [rating, setRating] = useState(0);

    const navigate = useNavigate();
    const showAlert = useAlert();

    const handleAvaliar = async (newValue, pedidoId) => {
        setRating(newValue);
        historico.forEach((h => {
            h.itens?.map((it) => {
                if (it.id === pedidoId) {
                    it.notaAvaliacao = newValue;
                }
            })
        }))

        await avaliar(pedidoId, newValue);
        showAlert("Obrigado pela avaliação!", "success");
    };

    const handleVoltarHome = () => {
        navigate("/");
    };

    return (
        <Card sx={{ maxWidth: 'sm', margin: '0 auto', boxShadow: 'none' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <IconButton onClick={handleVoltarHome}>
                    <ArrowBackIcon sx={{ color: '#BF7373' }} />
                </IconButton>
                <Typography variant="h6" sx={{ color: '#BF7373', fontWeight: 'bold' }}>
                    Histórico de pedidos
                </Typography>
                <Box width="48px" />
            </Box>
            <Divider />
            <CardContent sx={{ padding: 0 }}>
                <Box sx={{ padding: 2 }}>
                    {historico.length === 0 ? (
                        <Typography variant="body1" sx={{ textAlign: 'center', color: '#BF7373', marginTop: 2 }}>
                            Nenhum resultado encontrado.
                        </Typography>
                    ) : (
                        historico.map((historicoAgg) => (
                            <Box key={historicoAgg.id}>
                                <Box flexGrow={1}>
                                    <Typography variant="overline">
                                        {historicoAgg.dataSolicitacao}
                                    </Typography>
                                </Box>

                                {historicoAgg?.itens.map((historico) => (
                                    <Box key={historico.id} mb={2} sx={{ width: '100%', paddingX: 2 }}>
                                        <Box display="column" alignItems="center">
                                            <Box display="flex" alignItems="center">
                                                <CheckCircleIcon sx={{ color: "green" }} fontSize="small" />
                                                <Typography variant="body1" sx={{ marginLeft: '5px' }}>
                                                    Pedido {historico.status === 'CONCLUIDO' ? 'concluído' : ''} • Nº {historico.id}
                                                </Typography>
                                            </Box>
                                            {historico?.itens?.map((item) => (
                                                <Box flexGrow={1} key={item.id}>
                                                    <Typography variant="body2">
                                                        {item.quantidade} {item.nome}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>

                                        <Box display="flex" justifyContent="space-between" mt={1} alignItems="center">
                                            <Typography variant="caption" mr={2}>
                                                Avalie seu pedido
                                            </Typography>
                                            <Rating
                                                name="pedido-avaliacao"
                                                value={historico?.notaAvaliacao}
                                                onChange={(e, newValue) => handleAvaliar(newValue, historico.id)}
                                                size="large"
                                                sx={{ color: "#BF7373" }}
                                            />
                                        </Box>
                                        <Divider />
                                    </Box>
                                ))}
                            </Box>
                        ))
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default MeusPedidos;