import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import {useNavigate} from "react-router-dom";

const ProdutoList = ({produtos}) => {

    const navigate = useNavigate();

    const handleIrParaDetalhe = (produtoId) => {
        navigate(`/produto/${produtoId}`);
    }

    return (
        <List>
            {produtos.map(produto => (
                <ListItem key={produto.id}
                          alignItems="flex-start"
                          onClick={() => handleIrParaDetalhe(produto.id)}
                          sx={{
                              "&:hover": {
                                  backgroundColor: "rgba(0, 0, 0, 0.04)"
                              }
                          }}>
                    <ListItemAvatar>
                        <Avatar src={produto?.imagem} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1"
                                            fontWeight="bold"
                                            style={{ cursor: 'pointer' }}>
                                    {produto.nome}
                                </Typography>
                                <Typography variant="subtitle1"
                                            color="secondary"
                                            style={{ cursor: 'pointer' }}>
                                    R$ {produto.preco.toFixed(2)}
                                </Typography>
                            </Box>
                        }
                        secondary={
                            <Box display="flex" alignItems="center">
                                <Typography variant="body2" color="textSecondary"
                                            style={{ cursor: 'pointer' }}>
                                    {produto.descricao}
                                </Typography>
                                <Box display="flex" alignItems="center" ml={1}>
                                    <StarIcon fontSize="small" color="warning" />
                                    <Typography variant="body2">{produto?.avaliacao}</Typography>
                                </Box>
                            </Box>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default ProdutoList;
