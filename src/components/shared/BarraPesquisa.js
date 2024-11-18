import React, {useRef, useState} from 'react';
import {IconButton, InputAdornment, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {buscarProdutos} from "../../services/produtoService";

const BarraPesquisa = ({ onHandleSetProdutos, categoriaSelecionada }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const debounceTimeoutRef = useRef(null);

  const fetchProducts = async (query) => {
    try {
      const {data} = await buscarProdutos(categoriaSelecionada, query)
      onHandleSetProdutos(data);
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



