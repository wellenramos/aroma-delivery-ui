import api from './api';

export const consultarEnderecoPorCep = async (cep) => {
    try {
        return await api.get(`/enderecos/cep/${cep}`);
    } catch (error) {
        console.error('Erro ao consultar endereço:', error);
        throw error.response ? error.response.data : error;
    }
};

export const salvar = async (endereco) => {
    return await api.post('/enderecos', endereco);
};

export const obterEnderecos = async () => {
    try {
        return await api.get(`/enderecos`);
    } catch (error) {
        console.error('Erro ao consultar endereço:', error);
        throw error.response ? error.response.data : error;
    }
};