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


export const listarPedidosPorStatus = async (status) => {
    return await api.get("/pedidos/admin", {
        params: { status },
    });
};

export const atualizarStatusPedido = async (id, status) => {
    return await api.put(`/pedidos/admin/${id}?status=${status}`);
};

export const obterDetalhesPedido = async (id) => {
    return await api.get(`/pedidos/admin/${id}`);
};