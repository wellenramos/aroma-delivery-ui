import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  TextField,
  Typography
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../Header";
import { obterProdutoPorId } from "../../../../services/produtoService";
import { useAlert } from "../../../shared/alert/AlertProvider";
import { adicionarItem, obterItemCarrinho } from "../../../../services/carrinhoService";
import { useAppContext } from "../../../../context/AppContext";
import { favoritar, obterFavorito } from "../../../../services/favoritoService";

const TamanhosCopoEnum = {
  PEQUENO: 'PEQUENO',
  MEDIO: 'MEDIO',
  GRANDE: 'GRANDE',
};

const DetalheProduto = () => {
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [observacao, setObservacao] = useState('');
  const [tamanhoCopo, setTamanhoCopo] = useState(TamanhosCopoEnum.PEQUENO);
  const [adicionaisSelecionados, setAdicionaisSelecionados] = useState([]);
  const [favoritoSelecionado, setFavoritoSelecionado] = useState(false);

  const precoProduto = produto?.preco;
  const somaAdicionais = adicionaisSelecionados.reduce((soma, adicional) => soma + adicional.preco, 0);
  const total = (precoProduto + somaAdicionais) * quantidade;

  const navigate = useNavigate();
  const { produtoId } = useParams();
  const { carrinhoId, setCarrinhoId } = useAppContext();
  const alert = useAlert();

  const showAlert = useCallback((message, type) => {
    alert(message, type);
  }, [alert]);

  const handleAdicionar = () => setQuantidade(quantidade + 1);
  const handleRemover = () => setQuantidade(quantidade > 1 ? quantidade - 1 : 1);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const { data } = await obterProdutoPorId(produtoId);
        setProduto(data);

        const result = await obterFavorito(produtoId);
        setFavoritoSelecionado(result.data !== "" && result.data !== null);
      } catch (error) {
        showAlert("Erro ao buscar o produto", "error");
      }
    };

    if (produtoId) {
      fetchProduto();
    }
  }, [produtoId, showAlert]); // Adicionado produtoId e showAlert no array de dependências

  useEffect(() => {
    const fetchItemCarrinho = async () => {
      try {
        const {data} =  await obterItemCarrinho(carrinhoId, produtoId);
        if (data) {
          setQuantidade(data.quantidade || 1);
          setObservacao(data.observacao || '');
          setTamanhoCopo(data.tamanhoCopo || TamanhosCopoEnum.PEQUENO);
          setAdicionaisSelecionados(data.adicionais || []);
        }
      } catch (error) {
        showAlert("Erro ao buscar o produto", "error");
      }
    };

    if (carrinhoId && produtoId) {
      fetchItemCarrinho();
    }
  }, [carrinhoId, produtoId, showAlert]); // Adicionado produtoId e showAlert no array de dependências

  const handleVoltarHome = () => {
    navigate("/home");
  };

  const handleFavoritar = async (produtoId) => {
    try {
      const novoEstadoFavorito = !favoritoSelecionado;
      setFavoritoSelecionado(novoEstadoFavorito);
      await favoritar(produtoId, novoEstadoFavorito);
      showAlert(novoEstadoFavorito ? "Produto favoritado com sucesso!" : "Produto removido dos favoritos.", "success");
    } catch (error) {
      setFavoritoSelecionado(!favoritoSelecionado);
      showAlert("Erro ao atualizar favorito. Tente novamente.", "error");
    }
  };

  const handleAdicionalChange = (adicional) => {
    setAdicionaisSelecionados((prev) => {
      if (prev.some((item) => item.id === adicional.id)) {
        return prev.filter((item) => item.id !== adicional.id);
      } else {
        return [...prev, adicional];
      }
    });
  };

  const removerAcentos = (str) => {
    return str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const handleAdicionarItem = async () => {
    const item = {
      produtoId: produto?.id,
      carrinhoId,
      quantidade,
      tamanhoCopo,
      observacao,
      adicionais: adicionaisSelecionados.map(it => it.id),
    };

    try {
      const { data } = await adicionarItem(item);
      if (data) {
        setCarrinhoId(data.id);
        navigate(`/home/carrinho/${data.id}`);
      }
    } catch (error) {
      showAlert("Erro ao adicionar o produto ao carrinho", "error");
    }
  };

  const handleTamanhoSelecionado = (tamanho) => {
    const tamanhoMapeado = {
      'Pequeno': TamanhosCopoEnum.PEQUENO,
      'Médio': TamanhosCopoEnum.MEDIO,
      'Grande': TamanhosCopoEnum.GRANDE,
    };

    setTamanhoCopo(tamanhoMapeado[tamanho] || TamanhosCopoEnum.PEQUENO);
  };

  return (
      <Card
          sx={{
            maxWidth: 'md',
            margin: '0 auto',
            boxShadow: 'none',
            backgroundColor: 'rgb(253, 242, 242)'
          }}
      >
        <CardContent sx={{ padding: 0 }}>
          <Header
              titulo='Detalhe'
              onBack={handleVoltarHome}
              onFavorite={() => handleFavoritar(produto?.id)}
              favorito={favoritoSelecionado}
          />
          <Box sx={{p: 2}}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2
            }}>
              <img src="/imagem/lattleClassico.png" alt="Produto"
                   style={{width: '300px', height: 'auto'}}/>
            </Box>

            <Box sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: 3,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40
            }}>
              <Box display="flex" justifyContent="space-between"
                   alignItems="center" mb={1}>
                <Typography variant="h6" sx={{fontWeight: 'bold', color: '#BF7373' }}>
                  {produto?.nome}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" sx={{fontWeight: 'bold', color: '#BF7373'}}>
                    R$ {produto?.preco.toFixed(2)}
                  </Typography>
                  {produto?.mediaAvaliacao && (
                      <Box display="flex" alignItems="center" ml={1}>
                        <StarIcon fontSize="small" sx={{color: '#FFD700'}}/>
                        <Typography variant="body2"sx={{color: '#777'}}>{produto?.mediaAvaliacao}</Typography>
                      </Box>
                  )}
                </Box>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {produto?.descricao}
              </Typography>

              <Box sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'center',
                gap: '10px'
              }}>
                {['Pequeno', 'Médio', 'Grande'].map((tamanho) => (
                    <Button
                        key={tamanho}
                        variant="outlined"
                        size="small"
                        sx={{
                          textTransform: 'none',
                          color: tamanhoCopo === TamanhosCopoEnum[removerAcentos(tamanho).toUpperCase()] ? '#FFF' : '#BF7373',
                          backgroundColor: tamanhoCopo === TamanhosCopoEnum[removerAcentos(tamanho).toUpperCase()] ? '#BF7373' : 'transparent',
                          borderColor: '#BF7373'
                        }}
                        onClick={() => handleTamanhoSelecionado(tamanho)}
                    >
                      {tamanho}
                    </Button>
                ))}
              </Box>

              <Box mt={2}>
                <Typography variant="subtitle1" sx={{ color: '#BF7373', fontWeight: 'bold'}}>
                  Adicional
                </Typography>

                {produto?.adicionais?.map((adicional) => (
                    <Box key={adicional.id} display="flex" alignItems="center">
                      <Typography variant="body2">
                        {adicional?.nome}
                      </Typography>
                      <Typography variant="body2" sx={{ marginLeft: 'auto' }}>
                        R$ {adicional?.preco.toFixed(2)}
                      </Typography>
                      <Checkbox
                          checked={adicionaisSelecionados.some((item) => item.id === adicional.id)}
                          onChange={() => handleAdicionalChange(adicional)}
                          inputProps={{ 'aria-label': 'checkbox' }}
                      />
                    </Box>
                ))}
              </Box>

              <Box mt={2}>
                <Typography variant="subtitle1" sx={{ color: '#BF7373', fontWeight: 'bold'}}>
                  Observações
                </Typography>
                <TextField
                    label="Observação"
                    fullWidth
                    multiline
                    rows={2}
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                    variant="outlined"
                />
              </Box>

              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleAdicionarItem}
                >
                  Adicionar ao Carrinho
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
};

export default DetalheProduto;
