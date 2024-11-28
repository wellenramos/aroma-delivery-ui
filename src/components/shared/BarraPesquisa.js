import React, {useRef, useState} from 'react';
import {IconButton, InputAdornment, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  buscarProdutos,
  buscarProdutosPorNome
} from "../../services/produtoService";

const BarraPesquisa = ({ onHandleSetProdutos, categoriaSelecionada, admin }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const debounceTimeoutRef = useRef(null);

  const fetchProducts = async (query) => {
    try {
      let data;

      if (admin) {
        const response = await buscarProdutosPorNome(query);
        data = response.data;
      } else {
        const response = await buscarProdutos(categoriaSelecionada, query);
        data = response.data;
      }

      if (data) {
        onHandleSetProdutos(data);
      } else {
        console.warn('Nenhum dado encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };


  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const trimmedQuery = query.trim();

      if (trimmedQuery.length <= 1 || (event.ctrlKey && event.key === 'Backspace')) {
        fetchProducts();
      } else {
        fetchProducts(trimmedQuery);
      }
    }, 200);
  };

  return (
      <TextField
          sx={{padding: 2}}
          value={searchQuery}
          placeholder="Search"
          onChange={handleSearchChange }
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon/>
                  </IconButton>
                </InputAdornment>
            ),
            style: {borderRadius: 20}
          }}
      />
  );
};

export default BarraPesquisa;



