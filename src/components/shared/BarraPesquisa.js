import React from 'react';
import {TextField, IconButton, InputAdornment, Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate} from "react-router-dom";

const BarraPesquisa = () => {

    const navigate = useNavigate();

    const handleIrAoMenu = () => {
        navigate('/menu');
    }

    return (
        <Box display="flex" alignItems="center" width="100%">
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
            <IconButton style={{ marginLeft: '8px' }}>
                <MenuIcon onClick={() => handleIrAoMenu()}/>
            </IconButton>
        </Box>
    );
};

export default BarraPesquisa;



