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
import {
    excluir,
    marcarCartaoPrincipal,
    obterCartoes,
    salvar
} from "../../services/cartaoService";
import {useAlert} from "../shared/alert/AlertProvider";
import Cartao from "./Cartao";

const Pagamento = () => {
    const navigate = useNavigate();
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

    const handleExcluirCartao = async () => {
        const cartao = cartoes.filter(it => it.principal)[0];
        await excluir(cartao.id)
        const listaAtualizada =  cartoes.filter(it => it.id !== cartao.id)
        setCartoes(listaAtualizada);
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

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

    const handleObterLogomarcaCartao = (cartao) => {
        if (cartao.bandeira === 'MasterCeard') {
            return '/imagem/mastercard.png';
        } else if (cartao.bandeira === 'Visa') {
            return '/imagem/visa.png';
        } else {
            return '/imagem/cartao.jpg';
        }
    }

    const handlCartaoPrincipal = async (cartao) => {
        const {data} = await marcarCartaoPrincipal(cartao.id);
        if (data) {
            navigate("/carrinho")
        }
    }

    return (
        <Box sx={{ padding: 2, maxWidth: 600, margin: '0 auto' }}>
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

            <Box mt={2}>
                {cartoes.map((cartao) => (
                    <Card
                        key={cartao.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: 2,
                            borderRadius: 4,
                            boxShadow: cartao.principal ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                            mb: 2,
                        }}
                        onClick={() => handlCartaoPrincipal(cartao)}
                    >
                        <img src={handleObterLogomarcaCartao(cartao)} alt={cartao.tipo} style={{ width: 50, height: 'auto', marginRight: 16 }} />
                        <Box flexGrow={1}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: cartao.principal ? '#BF7373' : '#000' }}>
                                Cartão {cartao.tipo}
                            </Typography>
                            <Typography variant="body2">{cartao.numero}</Typography>
                        </Box>
                        <Radio checked={cartao.principal} />
                    </Card>
                ))}
            </Box>

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

            <Cartao
                openModal={openModal}
                onCloseModal={handleCloseModal}
                onSalvarCartao={handleSalvarCartao}
            />
        </Box>
    );
};

export default Pagamento;

