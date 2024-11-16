import {Box} from "@mui/material";
import ProdutoTabs from "./ProdutoTabs";
import ProdutosList from "./ProdutosList";
import React, {useEffect, useState} from "react";
import {obterProdutosPorCategoria} from "../../../services/produtoService";

const Produtos = ({produtos}) => {

    useEffect(() => {
        handleObterProdutos(1);
    }, []);

    const handleObterProdutos = async (categoriaId) => {
        const {data} = await obterProdutosPorCategoria(categoriaId);
        // setProdutos(data);
    }

    return(
        <Box>
            <ProdutoTabs onObterProdutos={handleObterProdutos}/>
            <ProdutosList produtos={produtos }/>
        </Box>
    )
}

export default Produtos;