import React, {useEffect} from 'react';
import {BottomNavigation, BottomNavigationAction, Box} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import {useLocation, useNavigate} from "react-router-dom";

const HomeNavigationBar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        if (location.pathname === '/') setValue(0);
        else if (location.pathname === '/favoritos') setValue(1);
        else if (location.pathname === '/carrinho') setValue(3);
        else if (location.pathname === '/perfil') setValue(5);
    }, [location.pathname]);

    const handleChange = (event, newValue) => {
        setValue(newValue);

        if (newValue === 0) navigate('/');
        else if (newValue === 1) navigate('/favoritos');
        else if (newValue === 3) navigate('/carrinho');
        else if (newValue === 5) navigate('/perfil');
    };

    return (
        <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }}>
            <BottomNavigation
                value={value}
                onChange={handleChange}
                showLabels
                sx={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff' }}
            >
                <BottomNavigationAction
                    label="Home"
                    icon={<HomeIcon />}
                />
                <BottomNavigationAction
                    label="Favoritos"
                    icon={<FavoriteIcon />}
                />
                />
                <BottomNavigationAction
                    label="Carrinho"
                    icon={<ShoppingCartIcon />}
                />
                />
                <BottomNavigationAction
                    label="Perfil"
                    icon={<PersonIcon />}
                />
                />
            </BottomNavigation>
        </Box>

    );
};

export default HomeNavigationBar;
