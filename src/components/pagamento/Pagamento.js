import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    Divider,
    IconButton,
    Radio,
    Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from 'react-router-dom';
import {obterCartoes, salvar} from "../../services/cartaoService";
import {useAlert} from "../shared/alert/AlertProvider";
import Cartao from "./Cartao";

const Pagamento = () => {
    const navigate = useNavigate();
    const [selectedCard, setSelectedCard] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [cartoes, setCartoes] = useState([]);

    const showAlert = useAlert();

    const fetchObterCartoesPagamento = async () => {
        try {
            const { data } = await obterCartoes();
            setCartoes(data);
        } catch (error) {
            showAlert("Erro ao buscar cartões de pagamento do usuário", "error");
        }
    };

    useEffect(() => {
        fetchObterCartoesPagamento();
    }, []);

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

    const handleSalvarCartao = async (cartao) => {
        try {
            const { data } = await salvar(cartao);
            if (data) {
                setOpenModal(false);
                fetchObterCartoesPagamento();
            }
        } catch (error) {
            const errorData = error?.response?.data;
            if (errorData) {
                const messages = Object.values(errorData).join(". ");
                showAlert(messages, "error");
            } else {
                showAlert("Ocorreu um erro inesperado.", "error");
            }
        }
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
                {cartoes.map((cartao) => (
                    <Card
                        key={cartao.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: 2,
                            borderRadius: 4,
                            boxShadow: selectedCard === cartao.id ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                            mb: 2,
                        }}
                        onClick={() => handleSelecionarCartao(cartao.id)}
                    >
                        <img src={'https://www.mobills.com.br/blog/wp-content/uploads/2022/06/logo-da-bandeira-mastercartao.png'} alt={cartao.tipo} style={{ width: 50, height: 'auto', marginRight: 16 }} />
                        <Box flexGrow={1}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: selectedCard === cartao.id ? '#BF7373' : '#000' }}>
                                {cartao.tipo} cartao
                            </Typography>
                            <Typography variant="body2">{cartao.numero}</Typography>
                        </Box>
                        <Radio checked={selectedCard === cartao.id} />
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

            {/* Modal de Adicionar Cartão */}
            <Cartao
                openModal={openModal}
                onCloseModal={handleCloseModal}
                onSalvarCartao={handleSalvarCartao}
            />
        </Box>
    );
};

export default Pagamento;

