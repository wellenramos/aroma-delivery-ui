import api from "./api";

export const obterCartoes = async () => {
  return await api.get(`/cartoes`);
};

export const salvar = async (cartao) => {
  return await api.post('/cartoes', cartao);
};