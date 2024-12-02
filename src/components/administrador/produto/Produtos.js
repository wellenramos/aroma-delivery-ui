import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
  Fab,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { excluirProduto, obterTodosProdutos } from "../../../services/produtoService";
import { useAlert } from "../../shared/alert/AlertProvider";
import BarraPesquisa from "../../shared/BarraPesquisa";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();
  const showAlert = useAlert();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const { data } = await obterTodosProdutos();
        setProdutos(data);
      } catch (error) {
        showAlert("Erro ao buscar produtos", "error");
      }
    };

    fetchProdutos();
  }, []);

  const handleAddProduto = () => {
    navigate("/admin/produtos/cadastrar");
  };

  const handleExcluirProduto = async (id) => {
    try {
      await excluirProduto(id);
      setProdutos(produtos.filter((produto) => produto.id !== id));
    } catch (error) {
      showAlert(error?.response?.data?.message, "error");
    }
  };

  const handleEditProduto = (id) => {
    navigate(`/admin/produtos/${id}/editar`);
  };

  return (
      <Card sx={{ maxWidth: "md", margin: "0 auto", boxShadow: "none" }}>
        <CardContent sx={{ padding: 0 }}>
          <BarraPesquisa onHandleSetProdutos={setProdutos} admin />
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
                            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                            transition: "background-color 0.3s",
                            marginBottom: 1,
                          }}
                          onClick={() => handleEditProduto(produto.id)}
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
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box display="flex" alignItems="center">
                                  <Typography
                                      variant="subtitle1"
                                      fontWeight="bold"
                                      sx={{ cursor: "pointer", marginRight: 1 }}
                                  >
                                    {produto.nome}
                                  </Typography>
                                  <Chip
                                      label={produto.situacao === "PUBLICADO" ? "Publicado" : "Cadastrado"}
                                      color={produto.situacao === "PUBLICADO" ? "success" : "warning"}
                                      sx={{
                                        fontWeight: "bold",
                                        height: 24,
                                        borderRadius: 12,
                                        fontSize: "0.75rem",
                                      }}
                                  />
                                </Box>
                                <Box textAlign="right">
                                  <Typography
                                      variant="subtitle1"
                                      color="secondary"
                                      sx={{ cursor: "pointer" }}
                                  >
                                    R$ {produto.preco?.toFixed(2)}
                                  </Typography>
                                </Box>
                              </Box>
                            }
                            secondary={
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="body2" color="textSecondary">
                                  Categoria: {produto.categoria?.nome || "Sem Categoria"}
                                </Typography>
                                <IconButton
                                    size="small"
                                    aria-label="delete"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleExcluirProduto(produto.id);
                                    }}
                                >
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
              bottom: isMobile ? 80 : 80,
              right: isMobile ? 40 : 500,
              zIndex: 1000,
            }}
        >
          <Fab
              sx={{
                width: 56,
                height: 56,
                backgroundColor: "#BF7373",
                color: "white",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#A14A4A" },
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
