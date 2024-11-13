import React from 'react';
import {Avatar, Box, Button, Card, CardContent, Divider, IconButton, Typography} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";

const pedidos = [
    {
        id: 1,
        nome: 'Cappuccino Clássico',
        descricao: 'Espresso, leite vaporizado, espuma de leite',
        preco: 15.00,
        avaliacao: 4.9,
        imagem: 'https://link-para-imagem.com/cappuccino.png', // Substitua pelo link da imagem
    },
    {
        id: 2,
        nome: 'Latte Clássico',
        descricao: 'Espresso + leite vaporizado',
        preco: 15.00,
        avaliacao: 4.9,
        imagem: 'https://link-para-imagem.com/latte.png', // Substitua pelo link da imagem
    },
];

const MeusPedidos = () => {

    const navigate = useNavigate();

    const handleAvaliar = () => {
        navigate('/avaliacao');
    }

    const handleVoltarHome = () => {
        navigate('/');
    }

    return(
        <Card sx={{ maxWidth: 'sm', margin: '0 auto', boxShadow: 'none'}}>
            <CardContent sx={{ padding: 0 }}>
                {/* Header */}
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <IconButton onClick={handleVoltarHome}>
                        <ArrowBackIcon sx={{ color: '#BF7373' }} />
                    </IconButton>
                    <Typography variant="h6" sx={{ color: '#BF7373', fontWeight: 'bold' }}>
                        Meus Pedidos
                    </Typography>
                    <Box width="48px" />
                </Box>
                <Divider />
                <Box sx={{ padding: 2 }}>
                {/* Lista de Pedidos */}
                {pedidos.map((pedido) => (
                    <Box key={pedido.id} mb={2} sx={{ width: '100%', paddingX: 2 }}>
                        <Box display="flex" alignItems="center">
                            {/* Imagem e Avaliação */}
                            <Box position="relative">
                                <Avatar
                                    src={pedido.imagem}
                                    alt={pedido.nome}
                                    sx={{ width: 60, height: 60, mr: 2 }}
                                />
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    position="absolute"
                                    bottom={-5}
                                    left={8}
                                    bgcolor="white"
                                    borderRadius="8px"
                                    px={0.5}
                                >
                                    <StarIcon fontSize="small" sx={{ color: '#FBB03B', fontSize: 14 }} />
                                    <Typography variant="caption" sx={{ fontWeight: 'bold', ml: 0.2 }}>
                                        {pedido.avaliacao}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Informações do Pedido */}
                            <Box flexGrow={1}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    {pedido.nome}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {pedido.descricao}
                                </Typography>
                            </Box>

                            {/* Preço */}
                            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#BF7373' }}>
                                R$ {pedido.preco.toFixed(2)}
                            </Typography>
                        </Box>

                        {/* Botão Avaliar Pedido */}
                        <Box display="flex" justifyContent="flex-end" mt={1}>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    backgroundColor: '#BF7373',
                                    color: '#FFF',
                                    fontWeight: 'bold',
                                    borderRadius: 2,
                                }}
                                onClick={handleAvaliar}
                            >
                                Avaliar Pedido
                            </Button>
                        </Box>
                    </Box>
                ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default MeusPedidos;