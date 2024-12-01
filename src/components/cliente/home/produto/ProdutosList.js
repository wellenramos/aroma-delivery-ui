import React from 'react';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import {useNavigate} from "react-router-dom";

const ProdutoList = ({produtos}) => {

    const navigate = useNavigate();

    const handleIrParaDetalhe = (produtoId) => {
        navigate(`/home/produto/${produtoId}`);
    }

    return (
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
                            onClick={() => handleIrParaDetalhe(produto.id)}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                                },
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar src={produto?.imagem} variant="rounded" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography variant="subtitle1" fontWeight="bold" style={{ cursor: 'pointer' }}>
                                            {produto.nome}
                                        </Typography>
                                        <Typography variant="subtitle1" color="secondary" style={{ cursor: 'pointer' }}>
                                            R$ {produto.preco.toFixed(2)}
                                        </Typography>
                                    </Box>
                                }
                                secondary={
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="body2" color="textSecondary" style={{ cursor: 'pointer' }}>
                                            {produto.descricao}
                                        </Typography>
                                        <Box display="flex" alignItems="center" ml={1}>
                                            {produto?.mediaAvaliacao && <StarIcon fontSize="small" color="warning"/>}
                                            <Typography variant="body2">{produto?.mediaAvaliacao?.toFixed(2)}</Typography>
                                        </Box>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default ProdutoList;
