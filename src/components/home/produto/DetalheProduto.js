import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    IconButton,
    TextField,
    Checkbox,
    Divider
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router-dom";

const DetalheProduto = () => {
    const [quantidade, setQuantidade] = useState(1);
    const [adicionalSelecionado, setAdicionalSelecionado] = useState(false);
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState('Pequeno');

    const precoProduto = 15.00;
    const precoAdicional = adicionalSelecionado ? 5.00 : 0.00;
    const total = precoProduto + precoAdicional * quantidade;

    const handleAdicionar = () => setQuantidade(quantidade + 1);
    const handleRemover = () => setQuantidade(quantidade > 1 ? quantidade - 1 : 1);

    const navigate = useNavigate();

    const handleVoltarHome = () => {
        navigate('/');
    }

    const handleTamanhoSelecionado = (tamanho) => {
        setTamanhoSelecionado(tamanho);
    };

    return (
        <Card sx={{ maxWidth: 'sm', margin: '0 auto', boxShadow: 'none', backgroundColor: '#FDF2F2' }}>
            <CardContent sx={{ padding: 0 }}>
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
                    <IconButton onClick={handleVoltarHome}>
                        <ArrowBackIcon color="primary" />
                    </IconButton>
                    <Typography variant="h6" sx={{ color: '#BF7373', fontWeight: 'bold' }}>Detalhe</Typography>
                    <IconButton>
                        <FavoriteIcon color="error" />
                    </IconButton>
                </Box>
                <Divider />
                {/* Imagem do Produto */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                    <img src="/imagem/lattleClassico.png" alt="Produto" style={{ width: '300px', height: 'auto' }} />
                </Box>

                {/* Detalhes do Produto */}
                <Box sx={{ backgroundColor: '#FFF', padding: 3, borderTopLeftRadius: 20, borderTopRightRadius: 20, margin: '20px' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#BF7373' }}>Latte Clássico</Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#BF7373' }}>R$ {precoProduto.toFixed(2)}</Typography>
                            <Box display="flex" alignItems="center" ml={1}>
                                <StarIcon fontSize="small" sx={{ color: '#FFD700' }} />
                                <Typography variant="body2" sx={{ color: '#777' }}>4.9</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Typography variant="body2" color="textSecondary">Espresso + leite vaporizado</Typography>

                    {/* Tamanho */}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        {['Pequeno', 'Médio', 'Grande'].map((tamanho) => (
                            <Button
                                key={tamanho}
                                variant="outlined"
                                size="small"
                                sx={{
                                    textTransform: 'none',
                                    color: tamanhoSelecionado === tamanho ? '#FFF' : '#BF7373',
                                    backgroundColor: tamanhoSelecionado === tamanho ? '#BF7373' : 'transparent',
                                    borderColor: '#BF7373'
                                }}
                                onClick={() => handleTamanhoSelecionado(tamanho)}
                            >
                                {tamanho}
                            </Button>
                        ))}
                    </Box>

                    {/* Adicional */}
                    <Box mt={2}>
                        <Typography variant="subtitle1" sx={{ color: '#BF7373', fontWeight: 'bold' }}>Adicional</Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="body2">Chantilly</Typography>
                            <Typography variant="body2" sx={{ marginLeft: 'auto', marginRight: 1 }}>+ R$ {precoAdicional.toFixed(2)}</Typography>
                            <Checkbox
                                checked={adicionalSelecionado}
                                onChange={() => setAdicionalSelecionado(!adicionalSelecionado)}
                                color="primary"
                            />
                        </Box>
                    </Box>

                    {/* Observação */}
                    <Box mt={2}>
                        <Typography variant="subtitle1" sx={{ color: '#BF7373', fontWeight: 'bold' }}>Observação</Typography>
                        <TextField
                            variant="outlined"
                            placeholder="Escreva aqui"
                            fullWidth
                            multiline
                            rows={2}
                            sx={{ mt: 1, backgroundColor: '#FFF' }}
                        />
                    </Box>

                    {/* Quantidade e Total */}
                    <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" sx={{ color: '#BF7373', fontWeight: 'bold' }}>Total</Typography>
                        <Typography variant="h6" sx={{ color: '#BF7373', fontWeight: 'bold' }}>R$ {total.toFixed(2)}</Typography>
                        <Box display="flex" alignItems="center">
                            <IconButton onClick={handleRemover} size="small">
                                <RemoveIcon />
                            </IconButton>
                            <Typography variant="body1" sx={{ mx: 1 }}>{quantidade}</Typography>
                            <IconButton onClick={handleAdicionar} size="small">
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Botão de Adicionar ao Carrinho */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, backgroundColor: '#BF7373', color: '#FFF', fontWeight: 'bold', borderRadius: '8px' }}
                    >
                        Adicionar Item
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default DetalheProduto;
