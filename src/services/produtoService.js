import api from './api';

export const obterProdutosPorCategoria = async (categoriaId) => {
    try {
        return await api.get(`/produtos/categoria/${categoriaId}`);
    } catch (error) {
        console.error('Erro ao autenticar:', error);
        throw error.response ? error.response.data : error;
    }
};
