import React from 'react';
import {BottomNavigation, BottomNavigationAction, Box} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from "react-router-dom";

const HomeNavigationBar = () => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/home')
    }

    const handleFavorito = () => {
        navigate('/favoritos')
    }

    const handleCarrinho = () => {
        navigate('/carrinho')
    }

    const handlePerfil = () => {
        navigate('/perfil')
    }

    return (
        <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                showLabels
                sx={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff' }}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={handleHome}/>
                <BottomNavigationAction label="Favoritos" icon={<FavoriteIcon />} onClick={handleFavorito}/>
                <BottomNavigationAction label="Carrinho" icon={<ShoppingCartIcon />} onClick={handleCarrinho} />
                <BottomNavigationAction label="Perfil" icon={<PersonIcon />} onClick={handlePerfil}/>
            </BottomNavigation>
        </Box>

    );
};

export default HomeNavigationBar;
