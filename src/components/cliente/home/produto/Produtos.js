import React, { useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import ProdutoTabs from "./ProdutoTabs";
import ProdutosList from "./ProdutosList";
import { obterProdutosPorCategoria } from "../../../../services/produtoService";

const Produtos = ({ produtos, onSetProdutos, onCategoriaChange }) => {

    const handleObterProdutos = useCallback(async (categoriaId) => {
        const { data } = await obterProdutosPorCategoria(categoriaId);
        onSetProdutos(data);
    }, [onSetProdutos]);

    useEffect(() => {
        handleObterProdutos(1);
    }, [handleObterProdutos]);

    return (
        <Box>
            <ProdutoTabs
                onObterProdutos={handleObterProdutos}
                onCategoriaChange={onCategoriaChange}
            />
            <ProdutosList produtos={produtos} />
        </Box>
    );
};

export default Produtos;
