import api from './api';

export const favoritar = async (produtoId, favoritoSelecionado) => {
    return await api.post(`/favoritos/produto/${produtoId}?favorito=${favoritoSelecionado}`);
};

export const obterFavoritos = async () => {
    return await api.get('/favoritos');
};

export const obterFavorito = async (produtoId) => {
    return await api.get(`/favoritos/produto/${produtoId}`);
};