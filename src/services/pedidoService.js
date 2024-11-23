import api from './api';

export const realizarPedido = async (pedido) => {
    return await api.post('/pedidos', pedido);
};

export const acompanhar = async () => {
    return await api.get('/pedidos/acompanhar');
};

export const confirmarRecebimento = async (pedidoId) => {
    return await api.put(`/pedidos/${pedidoId}/confirmar-recebimento`);
};

export const avaliar = async (pedidoId, nota) => {
    return await api.put(`/pedidos/${pedidoId}/avaliar?nota=${nota}`);
};
