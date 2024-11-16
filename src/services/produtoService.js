import api from './api';

export const obterProdutosPorCategoria = async (categoriaId) => {
    try {
        return await api.get(`/produtos/categoria/${categoriaId}`);
    } catch (error) {
        console.error('Erro ao autenticar:', error);
        throw error.response ? error.response.data : error;
    }
};

export const buscarProdutos = async (categoriaId, search) => {
    try {
        const url = search?.trim()
            ? `/produtos/categoria/${categoriaId}/todos?nome=${search}`
            : `/produtos/categoria/${categoriaId}/todos`;

        return await api.get(url);
    } catch (error) {
        console.error('Erro ao autenticar:', error);
        throw error.response ? error.response.data : error;
    }
};
