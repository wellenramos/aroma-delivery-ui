import api from './api';

export const autenticar = async (login, senha) => {
    try {
        return await api.post('/autenticacao/login', { login, senha });
    } catch (error) {
        console.error('Erro ao autenticar:', error);
        throw error.response ? error.response.data : error;
    }
};
