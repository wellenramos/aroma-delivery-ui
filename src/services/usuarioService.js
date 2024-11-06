import api from './api';

export const obterPorLogin = async (login) => {
    try {
        return await api.get(`/usuarios/dados/login/${login}`);
    } catch (error) {
        console.error('Erro ao autenticar:', error);
        throw error.response ? error.response.data : error;
    }
};
