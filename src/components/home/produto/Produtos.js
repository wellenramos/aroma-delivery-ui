import {Box} from "@mui/material";
import ProdutoTabs from "./ProdutoTabs";
import ProdutosList from "./ProdutosList";
import React, {useEffect} from "react";
import {obterProdutosPorCategoria} from "../../../services/produtoService";

const Produtos = ({produtos, onSetProdutos, onCategoriaChange }) => {

    useEffect(() => {
        handleObterProdutos(1);
    }, []);

    const handleObterProdutos = async (categoriaId) => {
        const {data} = await obterProdutosPorCategoria(categoriaId);
        onSetProdutos(data);
    }

    return(
        <Box>
            <ProdutoTabs
                onObterProdutos={handleObterProdutos}
                onCategoriaChange={onCategoriaChange}
            />
            <ProdutosList produtos={produtos}/>
        </Box>
    )
}

export default Produtos;