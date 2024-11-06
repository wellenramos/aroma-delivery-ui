import React from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const BarraPesquisa = () => {
    return (
        <TextField
            placeholder="Search"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
                style: { borderRadius: 20 }
            }}
        />
    );
};

export default BarraPesquisa;



