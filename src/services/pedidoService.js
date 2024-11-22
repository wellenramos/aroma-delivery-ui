import api from './api';

export const realizarPedido = async (pedido) => {
    return await api.post('/pedidos', pedido);
};

export const acompanhar = async () => {
    return await api.get('/pedidos/acompanhar');
};
