import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { atualizarStatusPedido, obterDetalhesPedido } from "../../../services/pedidoService";
import { useAlert } from "../../shared/alert/AlertProvider";

const DetalhesPedido = () => {
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { pedidoId } = useParams();
  const showAlert = useAlert();

  const fetchPedidoDetails = async () => {
    try {
      const response = await obterDetalhesPedido(pedidoId);
      setPedido(response.data);
    } catch (error) {
      showAlert("Erro ao buscar os detalhes do pedido.", 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidoDetails();
  }, [pedidoId]);

  const handleAtualizar = async (status) => {
    try {
      const { data } = await atualizarStatusPedido(pedido.id, status);
      if (data) {
        setPedido((prevState) => ({ ...prevState, status }));
      }
    } catch (error) {
      showAlert("Erro ao atualizar o status do pedido.", 'error');
    }
  };

  const handleVoltar = () => navigate("/admin");

  const getStatusIcon = (status) => {
    const statusIcons = {
      "PENDENTE": <HourglassEmptyIcon color="warning" />,
      "EM_ANDAMENTO": <AccessTimeIcon color="info" />,
      "ENVIADO": <LocalShippingIcon color="primary" />,
      "ENTREGUE": <CheckCircleIcon color="success" />,
    };
    return statusIcons[status] || null;
  };

  const getTituloButton = (status) => {
    const statusTitulos = {
      "PENDENTE": "Iniciar Pedido",
      "EM_ANDAMENTO": "Finalizar Pedido",
      "ENVIADO": "Entregar Pedido",
      "ENTREGUE": "Concluir",
    };
    return statusTitulos[status] || null;
  };

  const handleAtualizarPedido = () => {
    const statusSequence = {
      "PENDENTE": "EM_ANDAMENTO",
      "EM_ANDAMENTO": "ENVIADO",
      "ENVIADO": "ENTREGUE",
    };

    const nextStatus = statusSequence[pedido.status];
    if (nextStatus) {
      handleAtualizar(nextStatus);
    }
  };

  if (loading) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
    );
  }

  if (!pedido) {
    return (
        <Typography variant="h6" align="center" color="textSecondary">
          Não foi possível carregar os detalhes do pedido.
        </Typography>
    );
  }

  return (
      <Container maxWidth="md">
        <Card sx={{ boxShadow: 3, margin: "16px auto" }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Button onClick={handleVoltar} startIcon={<ArrowBackIcon />} sx={{ marginBottom: 2 }}>
                Voltar
              </Button>
            </Box>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Detalhes do Pedido #{pedido.id}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Cliente: <strong>{pedido.cliente}</strong>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Endereço: <strong>{pedido.endereco}</strong>
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Itens do Pedido
            </Typography>
            <List>
              {pedido.itens.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                        primary={`${item.produto} (x${item.quantidade})`}
                        secondary={`Preço unitário: R$ ${item.preco.toFixed(2)} | Total: R$ ${(item.quantidade * item.preco).toFixed(2)}`}
                    />
                  </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" fontWeight="bold" color="primary">
                R$ {pedido.total.toFixed(2)}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" alignItems="center">
              {getStatusIcon(pedido.status)}
              <Typography variant="body1" ml={1}>
                Status Atual: <strong>{pedido.status}</strong>
              </Typography>
            </Box>

            {(pedido.status !== 'ENTREGUE' && pedido.status !== 'CONCLUIDO') && (
                <Box mt={3}>
                  <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleAtualizarPedido}
                      sx={{ padding: "10px", fontSize: "1rem" }}
                  >
                    {getTituloButton(pedido.status)}
                  </Button>
                </Box>
            )}
          </CardContent>
        </Card>
      </Container>
  );
};

export default DetalhesPedido;
