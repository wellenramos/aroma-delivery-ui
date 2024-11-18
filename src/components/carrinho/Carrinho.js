import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useNavigate} from "react-router-dom";
import Header from "../Header";
import {useAlert} from "../shared/alert/AlertProvider";
import {obterResumoCarrinho} from "../../services/carrinhoService";
import {useAppContext} from "../../context/AppContext";

const Carrinho = () => {
    const [resumo, setResumo] = useState([]);
    const quantidade = 1;

    const showAlert = useAlert();
    const { carrinhoId } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResumoCarrinho = async () => {
            try {
                const { data } = await obterResumoCarrinho(carrinhoId);
                setResumo(data);
            } catch (error) {
                showAlert("Erro ao buscar o produto", "error");
            }
        };

        if (carrinhoId) {
            fetchResumoCarrinho();
        }
    }, [carrinhoId]);

    const handleIrParaEndereco = () => {
        navigate('/endereco');
    }

    const handleIrParaPagamento = () => {
        navigate('/pagamento');
    }

    const handleIrParaHome = () => {
        navigate('/');
    }

    return (
        <Card sx={{ maxWidth: 'sm', margin: '0 auto', boxShadow: 'none'}}>
            <CardContent sx={{ padding: 0 }}>
                <Header
                    titulo='Carrinho'
                />

                {/* Itens Adicionados */}
                <Box padding={2}>
                    <Typography variant="subtitle1" sx={{ color: '#BF7373', fontWeight: 'bold' }}>Itens Adicionados</Typography>
                    {resumo?.itens?.map((item) => (
                        <Box display="flex" alignItems="center" mt={2}>
                            <img src="/imagem/lattleClassico.png" alt="Produto" style={{ width: '60px', borderRadius: '8px' }} />
                            <Box ml={2} flexGrow={1}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{item?.nomeProduto}</Typography>
                                <Typography variant="body2" color="textSecondary">{item?.descricaoProduto}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" alignItems="flex-end">
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    R$ {item?.valorTotal.toFixed(2)}
                                </Typography>
                                <Box display="flex" alignItems="center">
                                    <IconButton size="small">
                                        <EditIcon fontSize="small" sx={{ color: '#BF7373' }} />
                                    </IconButton>
                                    <IconButton size="small">
                                        <DeleteIcon fontSize="small" sx={{ color: '#BF7373' }} />
                                    </IconButton>
                                    <Box display="flex" alignItems="center" border="1px solid #BF7373" borderRadius="4px" paddingX={0.5}>
                                        <IconButton size="small">
                                            <RemoveIcon fontSize="small" sx={{ color: '#BF7373' }} />
                                        </IconButton>
                                        <Typography variant="body2">{quantidade}</Typography>
                                        <IconButton size="small">
                                            <AddIcon fontSize="small" sx={{ color: '#BF7373' }} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Divider />

                {/* Adicionar Mais */}
                <Box padding={2}>
                    <Typography variant="subtitle1"
                                onClick={handleIrParaHome}
                                sx={{ color: '#BF7373', fontWeight: 'bold', cursor: 'pointer' }}>
                        + Adicionar mais
                    </Typography>
                </Box>
                <Divider />

                {/* Endereço de Entrega e Pagamento */}
                <List>
                    <ListItem button>
                        <ListItemText
                            primary="Endereço de Entrega"
                            secondary="Quadra 22, Setor Leste, Gama DF"
                        />
                        <ArrowForwardIosIcon fontSize="small" sx={{ color: '#BF7373' }} onClick={handleIrParaEndereco}/>
                    </ListItem>
                    <Divider component="li" />
                    <ListItem button>
                        <ListItemText
                            primary="Pagamento"
                            secondary="XXXX XXXX XXXX 0505"
                        />
                        <ArrowForwardIosIcon fontSize="small" sx={{ color: '#BF7373' }} onClick={handleIrParaPagamento} />
                    </ListItem>
                </List>
                <Divider />

                {/* Resumo de Valores */}
                <Box padding={1}>
                    <Typography variant="subtitle1" sx={{ color: '#BF7373', fontWeight: 'bold' }}>Resumo de Valores</Typography>
                    <Box display="flex" justifyContent="space-between" mt={1}>
                        <Typography variant="body2" color="textSecondary">Subtotal</Typography>
                        <Typography variant="body2" color="textSecondary">
                            R$ {resumo?.subTotal?.toFixed(2)}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="textSecondary">(1 item)</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={1}>
                        <Typography variant="body2" color="textSecondary">Entrega</Typography>
                        <Typography variant="body2" color="textSecondary">
                            R$ {resumo?.valorFrete?.toFixed(2)}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={1}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Total</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#BF7373' }}>
                            R$ {resumo?.valorTotal?.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>

                {/* Botão de Comprar */}
                <Box padding={2}>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ backgroundColor: '#BF7373', color: '#FFF', fontWeight: 'bold', borderRadius: '8px' }}
                    >
                        Comprar
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Carrinho;
