import React from 'react';
import { Box, TextField, Typography, Button, IconButton, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Endereco = () => {
    const navigate = useNavigate();

    const handleVoltar = () => {
        navigate(-1); // Volta para a página anterior
    };

    const handleSalvarEndereco = () => {
        console.log("Endereço salvo!");
    };

    return (
        <Box sx={{ padding: 2, maxWidth: 600, margin: '0 auto' }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <IconButton onClick={handleVoltar}>
                    <ArrowBackIcon color="primary" />
                </IconButton>
                <Typography variant="h6" sx={{ color: '#BF7373', fontWeight: 'bold' }}>
                    Endereço
                </Typography>
                <Box width="40px" /> {/* Placeholder para centralizar o título */}
            </Box>
            <Divider />

            {/* Formulário de Endereço */}
            <Box mt={2}>
                {/* CEP e Número na mesma linha */}
                <Box display="flex" gap={2} mb={2}>
                    <TextField
                        label="CEP"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1 }}
                    />
                    <TextField
                        label="Número"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1 }}
                    />
                </Box>

                {[
                    { label: 'Complemento', name: 'complemento' },
                    { label: 'Bairro', name: 'bairro' },
                ].map((field, index) => (
                    <Box key={index} mb={2}>
                        <TextField
                            label={field.label}
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 1 }}
                        />
                    </Box>
                ))}

                {/* Cidade e Estado na mesma linha */}
                <Box display="flex" gap={2} mt={2}>
                    <TextField
                        label="Cidade"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1 }}
                    />
                    <TextField
                        label="Estado"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1 }}
                    />
                </Box>

                {/* Ponto de Referência */}
                <Box mt={2}>
                    <TextField
                        label="Ponto de Referência"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1 }}
                    />
                </Box>
            </Box>

            {/* Botão de Salvar */}
            <Box paddingTop={2}>
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: '#BF7373', color: '#FFF', fontWeight: 'bold', borderRadius: '8px' }}
                >
                    Salvar
                </Button>
            </Box>
        </Box>
    );
};

export default Endereco;
