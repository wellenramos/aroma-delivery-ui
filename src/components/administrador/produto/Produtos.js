import React, {useEffect, useState} from "react";
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
import {obterTodosProdutos} from "../../../services/produtoService";

const Produtos = () => {
    const [produtos, setProdutos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
      const fetchProdutos = async () => {
        const { data } = await obterTodosProdutos();
        setProdutos(data);
      }

      fetchProdutos();
    }, []);

    const handleAddProduto = () => {
        navigate('/admin/cadastro');
    };

    const handleSetProdutos = (produtos) => {
      setProdutos(produtos);
    }

    return (
        <Card sx={{maxWidth: "md", margin: "0 auto", boxShadow: "none"}}>
            <CardContent sx={{padding: 0}}>
                <BarraPesquisa onHandleSetProdutos={handleSetProdutos} admin />
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
                                    padding: 1.5,
                                    borderRadius: 2,
                                    "&:hover": {
                                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                                    },
                                    transition: "background-color 0.3s",
                                    marginBottom: 1,
                                  }}
                              >
                                <ListItemAvatar>
                                  <Avatar
                                      src={produto.imagem || "/imagem/defaultProduct.png"}
                                      variant="rounded"
                                      sx={{ width: 60, height: 60, marginRight: 2 }}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                      <Box display="flex" justifyContent="space-between">
                                        <Typography variant="subtitle1" fontWeight="bold" sx={{ cursor: "pointer" }}>
                                          {produto.nome}
                                        </Typography>
                                        <Typography variant="subtitle1" color="secondary" sx={{ cursor: "pointer" }}>
                                          R$ {produto.preco?.toFixed(2)}
                                        </Typography>
                                      </Box>
                                    }
                                    secondary={
                                      <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="textSecondary">
                                          {produto.descricao}
                                        </Typography>
                                        <IconButton size="small" aria-label="delete">
                                          <DeleteIcon sx={{ color: "#BF7373" }} />
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

            <Box
                sx={{
                    position: "fixed",
                    bottom: 80,
                    right: 500,
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