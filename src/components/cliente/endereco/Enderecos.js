import React, { useEffect, useState, useCallback } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../shared/alert/AlertProvider";
import {
    excluir,
    marcarEnderecoComoPrincipal,
    obterEnderecos,
    salvar,
} from "../../../services/enderecoService";
import HomeIcon from "@mui/icons-material/Home";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Endereco from "./Endereco";

const Enderecos = () => {
    const [enderecos, setEnderecos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [enderecoEdicao, setEnderecoEdicao] = useState(null);

    const navigate = useNavigate();
    const showAlert = useAlert();

    const fetchEnderecos = useCallback(async () => {
        try {
            const { data } = await obterEnderecos();
            setEnderecos(data);
        } catch (error) {
            showAlert("Erro ao buscar o produto", "error");
        }
    }, [showAlert]);

    useEffect(() => {
        fetchEnderecos();
    }, [fetchEnderecos]);

    const handleVoltarCarrinho = () => {
        navigate("/home/carrinho");
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditarEndereco = (endereco) => {
        setOpenModal(true);
        setEnderecoEdicao(endereco);
        handleMenuClose();
    };

    const handleExcluirEndereco = async (event, endereco) => {
        event.stopPropagation();
        handleMenuClose();
        try {
            await excluir(endereco.id);
            showAlert("Endereço excluído com sucesso", "success");
            setEnderecos(enderecos.filter((it) => it.id !== endereco.id));
        } catch (error) {
            showAlert(error?.response?.data?.message, "error");
        }
    };

    const handleSalvar = async (endereco) => {
        try {
            const { data } = await salvar(endereco);
            if (data) {
                setOpenModal(false);
                setEnderecoEdicao(null);
                fetchEnderecos();
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

    const handleOpenModal = () => {
        setEnderecoEdicao(null);
        setOpenModal(true);
    };

    const handleCloseModal = () => setOpenModal(false);

    const handleAtualizarEnderecoPrincipal = async (endereco) => {
        if (endereco.principal) return;

        const { data } = await marcarEnderecoComoPrincipal(endereco.id);
        if (data) {
            navigate("/home/carrinho");
        }
    };

    return (
        <Card sx={{ maxWidth: "md", margin: "0 auto", boxShadow: "none" }}>
            <CardContent sx={{ padding: 0 }}>
                <Header titulo="Meus Endereços" onBack={handleVoltarCarrinho} />

                {enderecos.length === 0 ? (
                    <Box textAlign="center" padding={2}>
                        <Typography variant="body2" color="textSecondary">
                            Nenhum endereço cadastrado.
                        </Typography>
                    </Box>
                ) : (
                    enderecos.map((endereco) => (
                        <Card
                            key={endereco.id}
                            onClick={() => handleAtualizarEnderecoPrincipal(endereco)}
                            sx={{
                                margin: 2,
                                border: endereco.principal
                                    ? "2px solid #BF7373"
                                    : "1px solid #E0E0E0",
                                borderRadius: "8px",
                                cursor: "pointer",
                                backgroundColor: endereco.principal
                                    ? "#FFF5F5"
                                    : "#FFFFFF",
                                boxShadow: endereco.principal
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
                                        <HomeIcon sx={{ color: "#BF7373" }} />
                                        <Box>
                                            <Typography variant="subtitle1">
                                                {endereco.complemento}
                                            </Typography>
                                            <Typography variant="body2">
                                                {endereco.bairro}, Q. {endereco.numero}
                                            </Typography>
                                            <Typography variant="body2">
                                                {endereco.cidade}/{endereco.estado}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <IconButton
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setAnchorEl(event.currentTarget);
                                        }}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={(e) => handleExcluirEndereco(e, endereco)}>
                                    <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} />
                                    Excluir
                                </MenuItem>
                                <MenuItem onClick={() => handleEditarEndereco(endereco)}>
                                    <EditIcon fontSize="small" sx={{ marginRight: 1 }} />
                                    Editar
                                </MenuItem>
                            </Menu>
                        </Card>
                    ))
                )}
                <Box paddingTop={2}>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                            backgroundColor: "primary",
                            color: "#FFF",
                            fontWeight: "bold",
                            borderRadius: "8px",
                        }}
                        onClick={handleOpenModal}
                    >
                        Adicionar
                    </Button>
                </Box>

                {openModal && (
                    <Endereco
                        openModal={openModal}
                        enderecoEdicao={enderecoEdicao}
                        onCloseModal={handleCloseModal}
                        onSalvarEndereco={handleSalvar}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default Enderecos;
