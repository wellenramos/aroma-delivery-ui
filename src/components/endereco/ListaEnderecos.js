import React, {useEffect, useState} from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Button,
    Divider,
    TextField,
    Menu,
    MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../Header";
import {useNavigate} from "react-router-dom";
import {useAlert} from "../shared/alert/AlertProvider";
import {obterEnderecos} from "../../services/enderecoService";
import HomeIcon from "@mui/icons-material/Home";
import * as PropTypes from "prop-types";
import MoreVertIcon from '@mui/icons-material/MoreVert';

MoreVertIcon.propTypes = {sx: PropTypes.shape({color: PropTypes.string})};
const ListaEnderecos = ({ enderecoSelecionado}) => {

    const [enderecos, setEnderecos] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuEnderecoId, setMenuEnderecoId] = useState(null);
    const navigate = useNavigate();
    const showAlert = useAlert();

    useEffect(() => {
        const fetchEnderecos = async () => {
            try {
                const { data } = await obterEnderecos();
                setEnderecos(data);
            } catch (error) {
                showAlert("Erro ao buscar o produto", "error");
            }
        };
            fetchEnderecos();
    }, []);

    const handleVoltarCarrinho = () => {
        navigate('/carrinho');
    }

    const handleMenuOpen = (event, enderecoId) => {
        setAnchorEl(event.currentTarget);
        setMenuEnderecoId(enderecoId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuEnderecoId(null);
    };

    const handleEditarEndereco = () => {
        showAlert("Editar endereço ainda não implementado!", "info");
        handleMenuClose();
    };

    const handleExcluirEndereco = () => {
        showAlert("Excluir endereço ainda não implementado!", "info");
        handleMenuClose();
    };

    return (
        <Card sx={{ maxWidth: "sm", margin: "0 auto", boxShadow: "none" }}>
            <CardContent sx={{ padding: 0 }}>
                <Header titulo="Meus Endereços" onBack={handleVoltarCarrinho} />

                {/* Lista de endereços */}
                {enderecos.map((endereco) => (
                    <Card
                        key={endereco.id}
                        sx={{
                            margin: 2,
                            border:
                                endereco.id === enderecoSelecionado
                                    ? "2px solid #BF7373"
                                    : "1px solid #E0E0E0",
                            borderRadius: "8px",
                            cursor: "pointer",
                            backgroundColor:
                                endereco.id === enderecoSelecionado ? "#FFF5F5" : "#FFFFFF",
                            boxShadow:
                                endereco.id === enderecoSelecionado
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
                                        <Typography variant="subtitle1">{endereco.complemento}</Typography>
                                        <Typography variant="body2">
                                            {endereco.bairro}, Q. {endereco.numero}
                                        </Typography>
                                        <Typography variant="body2">
                                            {endereco.cidade}/{endereco.estado}
                                        </Typography>
                                    </Box>
                                </Box>
                                {/* Ícone de menu */}
                                <IconButton
                                    onClick={(event) => handleMenuOpen(event, endereco.id)}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                ))}

                {/* Menu de ações */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleEditarEndereco}>
                        <EditIcon fontSize="small" sx={{ marginRight: 1 }} />
                        Editar
                    </MenuItem>
                    <MenuItem onClick={handleExcluirEndereco}>
                        <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} />
                        Excluir
                    </MenuItem>
                </Menu>
            </CardContent>
        </Card>
    );
};

export default ListaEnderecos;