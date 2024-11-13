import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    Radio,
    Button,
    Checkbox,
    FormControlLabel,
    Modal,
    TextField,
    RadioGroup,
    FormControlLabel as RadioLabel,
    Divider,
    IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Pagamento = () => {
    const navigate = useNavigate();
    const [selectedCard, setSelectedCard] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [tipoCartao, setTipoCartao] = useState('credito');

    const handleSelecionarCartao = (id) => {
        setSelectedCard(id);
    };

    const handleExcluirCartao = () => {
        alert("Excluir cartão ainda não implementado!");
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const cards = [
        { id: 1, tipo: "Crédito", numero: "5105 **** **** 0505", logo: "/logo/mastercard.png", cor: "#3A2A2A" },
        { id: 2, tipo: "Débito", numero: "3566 **** **** 0535", logo: "/logo/visa.png", cor: "#F5F5F5" },
    ];

    const handleSalvarCartao = () => {
        alert("Cartão salvo com sucesso!");
        setOpenModal(false);
    };

    const handleVoltar = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ padding: 2, maxWidth: 600, margin: '0 auto' }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <IconButton onClick={handleVoltar}>
                    <ArrowBackIcon color="primary" />
                </IconButton>
                <Typography variant="h6" sx={{ color: '#BF7373', fontWeight: 'bold' }}>
                    Pagamento
                </Typography>
                <Box width="40px" />
            </Box>
            <Divider />

            {/* Cartões disponíveis */}
            <Box mt={2}>
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: 2,
                            borderRadius: 4,
                            boxShadow: selectedCard === card.id ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                            mb: 2,
                        }}
                        onClick={() => handleSelecionarCartao(card.id)}
                    >
                        <img src={'https://www.mobills.com.br/blog/wp-content/uploads/2022/06/logo-da-bandeira-mastercard.png'} alt={card.tipo} style={{ width: 50, height: 'auto', marginRight: 16 }} />
                        <Box flexGrow={1}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: selectedCard === card.id ? '#BF7373' : '#000' }}>
                                {card.tipo} card
                            </Typography>
                            <Typography variant="body2">{card.numero}</Typography>
                        </Box>
                        <Radio checked={selectedCard === card.id} />
                    </Card>
                ))}
            </Box>

            {/* Botões */}
            <Box paddingTop={2}>
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: 'primary', color: '#FFF', fontWeight: 'bold', borderRadius: '8px' }}
                    onClick={handleExcluirCartao}
                >
                    Excluir cartão
                </Button>
            </Box>
            <Box paddingTop={2}>
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: 'primary', color: '#FFF', fontWeight: 'bold', borderRadius: '8px' }}
                    onClick={handleOpenModal}
                >
                    Adicionar cartão
                </Button>
            </Box>

            {/* Checkbox para salvar informações */}
            <Box mt={2}>
                <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Salvar dados do cartão para pagamentos futuros"
                    sx={{ color: '#777' }}
                />
            </Box>

            {/* Modal de Adicionar Cartão */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        backgroundColor: '#FFF',
                        padding: 4,
                        borderRadius: 2,
                        maxWidth: 500,
                        margin: '50px auto',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#BF7373' }}>
                        Adicionar Cartão
                    </Typography>

                    {/* Tipo do cartão */}
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Tipo do cartão
                    </Typography>
                    <RadioGroup
                        value={tipoCartao}
                        onChange={(e) => setTipoCartao(e.target.value)}
                        row
                    >
                        <RadioLabel value="credito" control={<Radio color="primary" />} label="Crédito" />
                        <RadioLabel value="debito" control={<Radio color="primary" />} label="Débito" />
                    </RadioGroup>

                    {/* Dados do cartão */}
                    {['Número do cartão', 'Nome do titular', 'Validade (MM/AA)', 'CVV'].map((label, index) => (
                        <Box key={index} mt={2}>
                            <TextField
                                label={label}
                                variant="outlined"
                                fullWidth
                                sx={{
                                    '& .MuiInputBase-root': { height: 45 },
                                }}
                            />
                        </Box>
                    ))}

                    {/* Botão Salvar */}
                    <Box mt={4}>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ backgroundColor: 'primary', color: '#FFF', fontWeight: 'bold', borderRadius: '8px' }}
                            onClick={handleSalvarCartao}
                        >
                            Salvar Cartão
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default Pagamento;

