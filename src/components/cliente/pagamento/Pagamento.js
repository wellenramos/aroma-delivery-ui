import React, { useEffect, useState, useCallback } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../shared/alert/AlertProvider";
import {
    excluir,
    marcarCartaoPrincipal,
    obterCartoes,
    salvar
} from "../../../services/cartaoService";
import Cartao from "./Cartao";

const Pagamento = () => {
    const navigate = useNavigate();
    const [cartoes, setCartoes] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [cartaoEdicao, setCartaoEdicao] = useState(null);

    const showAlert = useAlert();

    const fetchCartoes = useCallback(async () => {
        try {
            const { data } = await obterCartoes();
            setCartoes(data);
        } catch (error) {
            showAlert("Erro ao buscar cartões de pagamento", "error");
        }
    }, [showAlert]);

    useEffect(() => {
        fetchCartoes();
    }, [fetchCartoes]);

    const handleVoltar = () => {
        navigate(-1);
    };

    const handleExcluirCartao = async (event, cartao) => {
        event.stopPropagation();
        try {
            await excluir(cartao.id);
            showAlert("Cartão excluído com sucesso", "success");
            setCartoes(cartoes.filter(it => it.id !== cartao.id));
        } catch (error) {
            showAlert(error?.response?.data?.message, "error");
        }
    };

    const handleSalvarCartao = async (cartao) => {
        try {
            const { data } = await salvar(cartao);
            if (data) {
                setOpenModal(false);
                setCartaoEdicao(null);
                fetchCartoes();
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

    const handleObterLogomarcaCartao = (cartao) => {
        if (cartao.bandeira === 'MasterCard') {
            return '/imagem/mastercard.png';
        } else if (cartao.bandeira === 'Visa') {
            return '/imagem/visa.png';
        } else {
            return '/imagem/cartao.jpg';
        }
    };

    const handleCartaoPrincipal = async (cartao) => {
        if (cartao.principal) return;

        const { data } = await marcarCartaoPrincipal(cartao.id);
        if (data) {
            showAlert("Cartão principal atualizado com sucesso", "success");
            fetchCartoes();
        }
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <Card sx={{ maxWidth: "md", margin: "0 auto", boxShadow: "none" }}>
            <CardContent sx={{ padding: 0 }}>
                <Header titulo="Meus Cartões" onBack={handleVoltar} />

                {cartoes.length === 0 ? (
                    <Box textAlign="center" padding={2}>
                        <Typography variant="body2" color="textSecondary">
                            Nenhum cartão cadastrado.
                        </Typography>
                    </Box>
                ) : (
                    cartoes.map((cartao) => (
                        <Card
                            key={cartao.id}
                            onClick={() => handleCartaoPrincipal(cartao)}
                            sx={{
                                margin: 2,
                                border: cartao.principal
                                    ? "2px solid #BF7373"
                                    : "1px solid #E0E0E0",
                                borderRadius: "8px",
                                cursor: "pointer",
                                backgroundColor: cartao.principal ? "#FFF5F5" : "#FFFFFF",
                                boxShadow: cartao.principal
                                    ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                                    : "none",
                                "&:hover": {
                                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                                },
                            }}
                        >
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <img
                                            src={handleObterLogomarcaCartao(cartao)}
                                            alt={cartao.tipo}
                                            style={{ width: 50, height: "auto" }}
                                        />
                                        <Box>
                                            <Typography variant="subtitle1">{cartao.tipo}</Typography>
                                            <Typography variant="body2">{cartao.numero}</Typography>
                                        </Box>
                                    </Box>
                                    <IconButton
                                        onClick={(event) => handleExcluirCartao(event, cartao)}
                                    >
                                        <DeleteIcon sx={{ color: "#BF7373" }} />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                )}
                <Box paddingTop={2}>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ backgroundColor: 'primary', color: '#FFF', fontWeight: 'bold', borderRadius: '8px' }}
                        onClick={handleOpenModal}
                    >
                        Adicionar
                    </Button>
                </Box>

                {openModal &&
                    <Cartao
                        openModal={openModal}
                        cartaoEdicao={cartaoEdicao}
                        onCloseModal={handleCloseModal}
                        onSalvarCartao={handleSalvarCartao}
                    />
                }
            </CardContent>
        </Card>
    );
};

export default Pagamento;
