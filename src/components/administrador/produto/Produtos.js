import React from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent, Fab,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import BarraPesquisa from "../../shared/BarraPesquisa";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";

const Produtos = () => {

    const produtos = [
        {id: 1, nome: 'Expresso Clássico', descricao: 'Café moído fino, água', preco: '15,00'},
        {id: 2, nome: 'Expresso Duplo', descricao: 'Café moído fino, água', preco: '15,00'},
        {id: 3, nome: 'Americano Clássico', descricao: 'Expresso, água quente', preco: '15,00'},
        {id: 4, nome: 'Americano Longo', descricao: 'Expresso maior, água quente', preco: '15,00'},
        {id: 5, nome: 'Coado Tradicional', descricao: 'Café moído médio, água quente.', preco: '15,00'},
        {id: 6, nome: 'Coado Especial', descricao: 'Café moído médio com grãos selecionados, água quente.', preco: '15,00'}
    ];

    const navigate = useNavigate();

    const handleAddProduto = () => {
        navigate('/admin/cadastro');
    };

    return (
        <Card sx={{maxWidth: "sm", margin: "0 auto", boxShadow: "none"}}>
            <CardContent sx={{padding: 0}}>
                <BarraPesquisa/>
                <Box mb={10}>
                    {produtos.length === 0 ? (
                        <Typography variant="subtitle1" color="textSecondary" align="center">
                            Nenhum resultado encontrado.
                        </Typography>
                    ) : (
                        <List>
                            {produtos.map((produto) => (
                                <ListItem
                                    key={produto.id}
                                    alignItems="flex-start"
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                                        },
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar src='/imagem/lattleClassico.png' variant="rounded"/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="subtitle1" fontWeight="bold"
                                                            style={{cursor: 'pointer'}}>
                                                    {produto.nome}
                                                </Typography>
                                                <Typography variant="subtitle1" color="secondary"
                                                            style={{cursor: 'pointer'}}>
                                                    R$ {produto.preco}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="body2" color="textSecondary"
                                                            style={{cursor: 'pointer'}}>
                                                    {produto.descricao}
                                                </Typography>
                                                <IconButton size="small">
                                                    <DeleteIcon sx={{color: '#BF7373'}}/>
                                                </IconButton>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </CardContent>

            {/* Botão Flutuante */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 50, // Espaço do fundo dentro do Container
                    right: 500, // Espaço da lateral direita dentro do Container
                }}
            >
                <Fab
                    sx={{
                        width: 50,
                        height: 50,
                        backgroundColor: "#BF7373",
                        color: "white",
                        boxShadow: "none",
                        '&:hover': {
                            backgroundColor: "#A14A4A",
                        },
                    }}
                    onClick={handleAddProduto}
                >
                    <AddIcon sx={{ fontSize: 36 }} />
                </Fab>
            </Box>
        </Card>
    );
};

export default Produtos;