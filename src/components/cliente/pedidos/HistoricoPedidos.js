import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Divider,
    Rating,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { avaliar } from "../../../services/pedidoService";
import { useAlert } from "../../shared/alert/AlertProvider";
import Header from "../../Header";

const HistoricoPedidos = ({ historico: initialHistorico = [] }) => {
    const [historico, setHistorico] = useState(initialHistorico);
    const navigate = useNavigate();
    const showAlert = useAlert();

    useEffect(() => {
        if (initialHistorico) {
            setHistorico(initialHistorico);
        }
    }, [initialHistorico]);

    const handleAvaliar = async (newValue, pedidoId) => {
        try {
            const novoHistorico = historico.map((historicoAgg) => ({
                ...historicoAgg,
                itens: historicoAgg.itens.map((item) =>
                    item.id === pedidoId ? { ...item, notaAvaliacao: newValue } : item
                ),
            }));

            setHistorico(novoHistorico);

            await avaliar(pedidoId, newValue);
            showAlert("Obrigado pela avaliação!", "success");
        } catch (error) {
            showAlert("Erro ao salvar avaliação. Tente novamente.", "error");
        }
    };

    const handleVoltarHome = () => {
        navigate("/home");
    };

    return (
        <Card sx={{ maxWidth: 'md', margin: '0 auto', boxShadow: 'none' }}>
            <CardContent sx={{ padding: 0 }}>
                <Header
                    titulo="Histórico de Pedidos"
                    onBack={handleVoltarHome}
                />
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

                                    {historicoAgg.itens?.map((item) => (
                                        <Box key={item.id} mb={2} sx={{ width: '100%', paddingX: 2 }}>
                                            <Box display="column" alignItems="center">
                                                <Box display="flex" alignItems="center">
                                                    <CheckCircleIcon sx={{ color: "green" }} fontSize="small" />
                                                    <Typography variant="body1" sx={{ marginLeft: '5px' }}>
                                                        Pedido {item.status === 'CONCLUIDO' ? 'concluído' : ''} •
                                                        Nº {item.id}
                                                    </Typography>
                                                </Box>
                                                <Box flexGrow={1}>
                                                    <Typography variant="body2">
                                                        {item.quantidade} {item.nome}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Box display="flex" justifyContent="space-between" mt={1} alignItems="center">
                                                <Typography variant="caption" mr={2}>
                                                    Avalie seu pedido
                                                </Typography>
                                                <Rating
                                                    name={`pedido-avaliacao-${item.id}`}
                                                    value={item.notaAvaliacao || 0}
                                                    onChange={(e, newValue) => handleAvaliar(newValue, item.id)}
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
            </CardContent>
        </Card>
    );
};

export default HistoricoPedidos;
