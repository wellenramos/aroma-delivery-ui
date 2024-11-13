import React, { useState } from 'react';
import {Avatar, Box, Button, Card, CardContent, Divider, IconButton, TextField, Typography} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/Star";
import {useNavigate} from "react-router-dom";

const Avaliacao = () => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(-1);

    const handleRating = (value) => {
        setRating(value);
    };

    const navigate = useNavigate();

    const handleVoltarMeusPedidos = () => {
        navigate('/meus-pedidos');
    }

    return(
        <Card sx={{ maxWidth: 'sm', margin: '0 auto', boxShadow: 'none'}}>
            <CardContent sx={{ padding: 0 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
                    <IconButton onClick={handleVoltarMeusPedidos}>
                        <ArrowBackIcon color="primary" />
                    </IconButton>
                    <Typography variant="h6" sx={{ color: '#BF7373', fontWeight: 'bold' }}>
                        Avaliação
                    </Typography>
                    <Box width="48px" />
                </Box>
                <Divider />

                {/* Produto */}
                <Box display="flex" justifyContent="center" alignItems="center" padding={2}>
                    <Avatar
                        src="https://link-para-imagem.com/imagem1.png" // Coloque o link da imagem do produto
                        alt="Latte Clássico"
                        sx={{ width: 100, height: 100, mx: 'auto', mb: 1 }}
                    />
                </Box>
                <Box textAlign="center" padding={2}>
                    <Typography variant="subtitle1" sx={{ color: '#BF7373', fontWeight: 'bold' }}>
                        Latte Clássico
                    </Typography>
                </Box>

                {/* Avaliação com Estrelas */}
                <Box sx={{ my: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Avaliação
                    </Typography>
                    <Box display="flex" justifyContent="center">
                        {[...Array(5)].map((_, index) => (
                            <IconButton
                                key={index}
                                onClick={() => handleRating(index + 1)}
                                onMouseEnter={() => setHover(index + 1)}
                                onMouseLeave={() => setHover(-1)}
                                sx={{ color: '#BF7373' }}
                            >
                                {index + 1 <= (hover || rating) ? <StarIcon /> : <StarBorderIcon />}
                            </IconButton>
                        ))}
                    </Box>
                </Box>

                <Divider />

                {/* Comentário */}
                <Box sx={{ my: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Comentário
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Escreva aqui o seu comentário"
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />
                </Box>

                {/* Botão de Enviar Avaliação */}
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: '#BF7373',
                        color: '#FFF',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        py: 1.5,
                        mb: 2,
                    }}
                >
                    Enviar avaliação
                </Button>
            </CardContent>
        </Card>

    );
};

export default Avaliacao;