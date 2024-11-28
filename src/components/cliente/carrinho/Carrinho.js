import React, { useEffect, useState } from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router-dom";
import Header from "../../Header";
import { useAlert } from "../../shared/alert/AlertProvider";
import {
    atualizarQuantidadeItens,
    obterResumoCarrinho,
    removerItemDoCarrinho
} from "../../../services/carrinhoService";
import { useAppContext } from "../../../context/AppContext";
import { realizarPedido } from "../../../services/pedidoService";
import PedidoSucesso from "../pedidos/PedidoSucesso";

const Carrinho = () => {
    const [resumo, setResumo] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const showAlert = useAlert();
    const { carrinhoId, limparCarrinhoId } = useAppContext();
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

    const handleIrParaEnderecos = () => {
        navigate('/home/enderecos');
    }

    const handleIrParaPagamento = () => {
        navigate('/home/pagamento');
    }

    const handleIrParaHome = () => {
        navigate('/home');
    }

    const handleVoltar = () => {
        if (resumo.itens.length >= 1) {
            const last = resumo.itens.at(-1);
            navigate(`/home/produto/${last.produtoId}`);
        } else {
            handleIrParaHome();
        }
    }

    const handleRealizarPedido = async () => {
        try {
            if (!resumo.endereco || !resumo.cartao) {
                showAlert("Endereço e método de pagamento são obrigatórios!", "error");
                return;
            }

            const { itens, endereco, cartao } = resumo;
            const command = {
                itens: itens.map(item => item.id),
                enderecoId: endereco.id,
                cartaoId: cartao.id
            };

            const { data } = await realizarPedido(command);

            if (data) {
                limparCarrinhoId();
                setShowSuccess(true);
                setTimeout(() => {
                    navigate('/home/meus-pedidos');
                }, 2000);
            }
        } catch (error) {
            showAlert(error?.response?.data?.message, "error");
        }
    }

    const handleRemoverItemCarrinho = async (item) => {
        try {
            await removerItemDoCarrinho(carrinhoId, item.id);
            setResumo((prevResumo) => ({
                ...prevResumo,
                itens: prevResumo?.itens.filter(it => it.id !== item.id),
            }));
        } catch (error) {
            showAlert("Erro ao remover o item do carrinho", "error");
        }
    }

    const handleDiminuirQuantidadeItem = async (item) => {
        try {
            if (item.quantidade > 1) {
                const novaQuantidade = item.quantidade - 1;
                const { data } = await atualizarQuantidadeItens(carrinhoId, item.id, novaQuantidade);
                setResumo((prevResumo) => ({
                    ...prevResumo,
                    subTotal: data.subTotal,
                    valorTotal: data.valorTotal,
                    itens: prevResumo.itens.map((it) => it.id === item.id ? data.item : it),
                }));
            } else {
                showAlert("A quantidade mínima é 1", "warning");
            }
        } catch (error) {
            showAlert("Erro ao atualizar a quantidade do item", "error");
        }
    }

    const handleAumentarQuantidadeItem = async (item) => {
        try {
            const novaQuantidade = item.quantidade + 1;
            const { data } = await atualizarQuantidadeItens(carrinhoId, item.id, novaQuantidade);
            setResumo((prevResumo) => ({
                ...prevResumo,
                subTotal: data.subTotal,
                valorTotal: data.valorTotal,
                itens: prevResumo.itens.map((it) => it.id === item.id ? data.item : it),
            }));
        } catch (error) {
            showAlert("Erro ao atualizar a quantidade do item", "error");
        }
    }

    const handleLimparCarrinho = async () => {
        try {
            const itensIds = resumo?.itens?.map(item => item.id);
            if (itensIds?.length > 0) {
                await Promise.all(
                    itensIds.map(itemId => removerItemDoCarrinho(carrinhoId, itemId))
                );
            }

            setResumo((prevResumo) => ({
                ...prevResumo,
                itens: [],
                subTotal: 0,
                valorTotal: 0,
            }));

            showAlert("Carrinho limpo com sucesso!", "success");
        } catch (error) {
            showAlert("Erro ao limpar o carrinho", "error");
        }
    }

    if (showSuccess) {
        return <PedidoSucesso />;
    }

    return (
        <Card sx={{ maxWidth: 'md', margin: '0 auto', boxShadow: 'none' }}>
            <CardContent sx={{ padding: 0 }}>
                <Header
                    titulo="Carrinho"
                    onBack={handleVoltar}
                />

                <Box padding={2}>
                    <Typography variant="subtitle1" sx={{ color: '#BF7373', fontWeight: 'bold' }}>
                        Itens Adicionados
                    </Typography>
                    {resumo?.itens?.length > 0 ? (
                        resumo.itens.map((item, index) => (
                            <Box key={index} display="flex" alignItems="center" mt={2}>
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
                                        <IconButton size="small" onClick={() => handleRemoverItemCarrinho(item)}>
                                            <DeleteIcon fontSize="small" sx={{ color: '#BF7373' }} />
                                        </IconButton>
                                        <Box display="flex" alignItems="center" border="1px solid #BF7373" borderRadius="4px" paddingX={0.5}>
                                            <IconButton size="small" onClick={() => handleDiminuirQuantidadeItem(item)}>
                                                <RemoveIcon fontSize="small" sx={{ color: '#BF7373' }} />
                                            </IconButton>
                                            <Typography variant="body2">{item.quantidade}</Typography>
                                            <IconButton size="small" onClick={() => handleAumentarQuantidadeItem(item)}>
                                                <AddIcon fontSize="small" sx={{ color: '#BF7373' }} />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                            Nenhum item adicionado. Comece a adicionar itens ao seu carrinho.
                        </Typography>
                    )}
                </Box>
                <Divider />

                <Box padding={2}>
                    <Typography
                        variant="subtitle1"
                        onClick={handleIrParaHome}
                        sx={{ color: '#BF7373', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        + Adicionar mais
                    </Typography>
                </Box>
                <Divider />

                <List>
                    <ListItem button onClick={handleIrParaEnderecos}>
                        <ListItemText
                            primary="Endereço de Entrega"
                            secondary={
                                resumo?.endereco ? (
                                    `Quadra ${resumo.endereco.numero}, ${resumo.endereco.bairro}, ${resumo.endereco.cidade}`
                                ) : (
                                    "Nenhum endereço selecionado"
                                )
                            }
                        />
                        <ArrowForwardIosIcon fontSize="small" sx={{ color: '#BF7373' }} />
                    </ListItem>

                    <Divider component="li" />
                    <ListItem button onClick={handleIrParaPagamento}>
                        <ListItemText
                            primary="Pagamento"
                            secondary={
                                resumo?.cartao ? (
                                    `${resumo?.cartao?.bandeira} xxxx xxxx xxxx ${resumo?.cartao?.numero.slice(-4)}`
                                ) : (
                                    "Nenhum cartão selecionado"
                                )
                            }
                        />
                        <ArrowForwardIosIcon fontSize="small" sx={{ color: '#BF7373' }} />
                    </ListItem>
                </List>
                <Divider />

                <Box padding={2}>
                    <Typography variant="body2" display="flex" justifyContent="space-between">
                        <span>Subtotal</span>
                        <span>R$ {resumo?.subTotal?.toFixed(2) || "0.00"}</span>
                    </Typography>
                    <Typography variant="body2" display="flex" justifyContent="space-between">
                        <span>Taxa de entrega</span>
                        <span>R$ {resumo?.taxaEntrega?.toFixed(2) || "0.00"}</span>
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <Typography
                        variant="body1"
                        display="flex"
                        justifyContent="space-between"
                        fontWeight="bold"
                    >
                        <span>Total</span>
                        <span>R$ {resumo?.valorTotal?.toFixed(2) || "0.00"}</span>
                    </Typography>
                </Box>
                <Box padding={1} mb={5}>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            color: '#BF7373',
                            borderColor: '#BF7373',
                            '&:hover': { backgroundColor: '#FFE5E5', borderColor: '#A65050' },
                            mb: 1
                        }}
                        onClick={handleLimparCarrinho}
                        disabled={resumo?.itens?.length === 0}
                    >
                        Limpar Carrinho
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ backgroundColor: '#BF7373', '&:hover': { backgroundColor: '#A65050' } }}
                        onClick={handleRealizarPedido}
                        disabled={resumo?.itens?.length === 0}
                    >
                        Comprar
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Carrinho;
