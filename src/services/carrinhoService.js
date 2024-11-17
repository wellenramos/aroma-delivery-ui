import api from './api';

export const adicionarItem = async (item) => {
    try {
        return await api.post('/carrinho', item);
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