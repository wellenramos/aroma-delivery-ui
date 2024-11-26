import api from './api';

export const adicionarItem = async (item) => {
    try {
        return await api.post('/carrinho', item);
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const alterarItem = async (item) => {
    try {
        return await api.put('/carrinho', item);
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const obterResumoCarrinho = async (carrinhoId) => {
    try {
        return await api.get(`/carrinho/${carrinhoId}/resumo`);
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const removerItemDoCarrinho = async (carrinhoId, itemId) => {
    try {
        return await api.delete(`/carrinho/${carrinhoId}/itens/${itemId}`);
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const atualizarQuantidadeItens = async (carrinhoId, itemId, quantidade) => {
    try {
        return await api.put(`/carrinho/${carrinhoId}/itens/${itemId}/atualizar-quantidade?quantidade=${quantidade}`);
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};