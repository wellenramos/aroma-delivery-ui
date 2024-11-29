import React from "react";
import {List, ListItem, ListItemText, Typography} from "@mui/material";

const PedidoItens = ({ itens }) => (
    <>
        <Typography variant="h6" fontWeight="bold" mb={1}>
            Itens do Pedido
        </Typography>
        <List>
            {itens.length > 0 ? (
                itens.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`${item.produto} (x${item.quantidade})`}
                            secondary={`Preço unitário: R$ ${item.preco.toFixed(2)} | Total: R$ ${(item.quantidade * item.preco).toFixed(2)}`}
                        />
                    </ListItem>
                ))
            ) : (
                <Typography variant="body2" color="textSecondary">
                    Nenhum item no pedido.
                </Typography>
            )}
        </List>
    </>
);

export default PedidoItens;