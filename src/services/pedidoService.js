import api from './api';

export const realizarPedido = async (pedido) => {
    return await api.post('/pedidos', pedido);
};
