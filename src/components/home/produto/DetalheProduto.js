import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Header";
import {obterProdutoPorId} from "../../../services/produtoService";
import {useAlert} from "../../shared/alert/AlertProvider";
import {adicionarItem} from "../../../services/carrinhoService";
import {useAppContext} from "../../../context/AppContext";
import {favoritar, obterFavorito} from "../../../services/favoritoService";

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
  const [favoritoSelecionado, setFavoritoSelecionado] = useState(false)

  const precoProduto = produto?.preco;
  const somaAdicionais = adicionaisSelecionados.reduce((soma, adicional) => soma + adicional.preco, 0);
  const total = (precoProduto + somaAdicionais) * quantidade;

  const handleAdicionar = () => setQuantidade(quantidade + 1);
  const handleRemover = () => setQuantidade(quantidade > 1 ? quantidade - 1 : 1);

  const showAlert = useAlert();
  const { produtoId} = useParams();
  const navigate = useNavigate();
  const { carrinhoId ,setCarrinhoId } = useAppContext();

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const {data} = await obterProdutoPorId(produtoId);
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
  }, [produtoId]);

  const handleVoltarHome = () => {
    navigate("/");
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
        navigate(`/carrinho/${data.id}`);
      }
    } catch (error) {
      showAlert("Erro ao buscar o produto", "error");
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
      <Card sx={{
        maxWidth: 'sm',
        margin: '0 auto',
        boxShadow: 'none',
        backgroundColor: 'rgb(253, 242, 242)'
      }}>
        <CardContent sx={{padding: 0}}>
          <Header
              titulo='Detalhe'
              onBack={handleVoltarHome}
              onFavorite={() => handleFavoritar(produto.id)}
              favorito={favoritoSelecionado}
          />

          {/* Imagem do Produto */}
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
                  <Box display="flex" alignItems="center" ml={1}>
                    <StarIcon fontSize="small" sx={{color: '#FFD700'}}/>
                    <Typography variant="body2"sx={{color: '#777'}}>4.9</Typography>
                  </Box>
                </Box>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {produto?.descricao}
              </Typography>

              {/* Tamanho */}
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

              {/* Adicional */}
              <Box mt={2}>
                <Typography variant="subtitle1" sx={{ color: '#BF7373', fontWeight: 'bold'}}>
                  Adicional
                </Typography>

                {produto?.adicionais?.map((adicional) => (
                    <Box key={adicional.id} display="flex" alignItems="center">
                      <Typography variant="body2">
                        {adicional?.nome}
                      </Typography>
                      <Typography variant="body2" sx={{ marginLeft: 'auto', marginRight: 1 }}>
                        + R$ {adicional?.preco.toFixed(2)}
                      </Typography>
                      <Checkbox
                          checked={adicionaisSelecionados.some(
                              (item) => item.id === adicional.id
                          )}
                          onChange={() => handleAdicionalChange(adicional)}
                          color="primary"
                      />
                    </Box>
                ))}
              </Box>

              {/* Observação */}
              <Box mt={2}>
                <Typography variant="subtitle1"
                            sx={{ color: '#BF7373', fontWeight: 'bold' }}>
                  Observação
                </Typography>
                <TextField
                    value={observacao}
                    variant="outlined"
                    placeholder="Escreva aqui"
                    fullWidth
                    multiline
                    rows={2}
                    sx={{mt: 1, backgroundColor: ' '}}
                    onChange={(e) => setObservacao(e.target.value)}
                />
              </Box>

              {/* Quantidade e Total */}
              <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ color: '#BF7373', fontWeight: 'bold' }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ color: '#BF7373', fontWeight: 'bold' }}>
                  R$ {total.toFixed(2)}
                </Typography>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={handleRemover} size="small">
                    <RemoveIcon/>
                  </IconButton>
                  <Typography variant="body1" sx={{mx: 1}}>
                    {quantidade}
                  </Typography>
                  <IconButton onClick={handleAdicionar} size="small">
                    <AddIcon/>
                  </IconButton>
                </Box>
              </Box>

              {/* Botão de Adicionar ao Carrinho */}
              <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: '#BF7373',
                    color: '#FFF',
                    fontWeight: 'bold',
                    borderRadius: '8px'
                  }}
                  onClick={handleAdicionarItem}
              >
                Adicionar Item
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
};

export default DetalheProduto;
