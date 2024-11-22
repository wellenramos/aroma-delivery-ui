import api from "./api";

export const obterCartoes = async () => {
  return await api.get(`/cartoes`);
};

export const salvar = async (cartao) => {
  return await api.post('/cartoes', cartao);
};


export const excluir = async (cartaoId) => {
  return await api.delete(`/cartoes/${cartaoId}`);
};


export const marcarCartaoPrincipal = async (cartaoId) => {
    return await api.put(`/cartoes/${cartaoId}/principal`);
};