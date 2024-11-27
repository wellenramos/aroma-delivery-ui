import api from './api';

export const obterProdutosPorCategoria = async (categoriaId) => {
    try {
        return await api.get(`/produtos/categoria/${categoriaId}`);
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const obterProdutoPorId = async (produtoId) => {
    try {
        return await api.get(`/produtos/${produtoId}`);
    } catch (error) {
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

export const obterTodosProdutos = async () => {
    return await api.get(`/produtos/todos`);
};

export const buscarProdutosPorNome = async (search) => {
    try {
        const url = search?.trim()
            ? `/produtos/todos-produtos?nome=${search}`
            : `/produtos/todos-produtos`;

        return await api.get(url);
    } catch (error) {
        console.error('Erro ao autenticar:', error);
        throw error.response ? error.response.data : error;
    }
};