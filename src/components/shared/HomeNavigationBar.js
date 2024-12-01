import React, {useEffect} from 'react';
import {BottomNavigation, BottomNavigationAction, Box} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import {useLocation, useNavigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import {ROLE_ADMIN} from "../login/Login";

const HomeNavigationBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = React.useState(0);
    const { setMenuOpen } = useAppContext();

    const role = localStorage.getItem('role');

    useEffect(() => {
        if (role !== ROLE_ADMIN) {
            if (location.pathname === '/home') setValue(0);
            else if (location.pathname === '/carrinho') setValue(1);
            else if (location.pathname === '/meus-pedidos') setValue(2);
            else if (location.pathname === '/home') setValue(3);
        } else {
            if (location.pathname === '/admin') setValue(0);
            else if (location.pathname === '/admin/produtos') setValue(1);
            else if (location.pathname === '/admin/menu') setValue(2);
        }
    }, [location.pathname, role]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (role === ROLE_ADMIN) {
            if (newValue === 2) {
                setMenuOpen((prev) => {
                    if (!prev) navigate('/admin');
                    return true;
                });
            } else {
                if (newValue === 0) navigate('/admin');
                else if (newValue === 1) navigate('/admin/produtos');
            }
        } else {
            if (newValue === 3) {
                setMenuOpen((prev) => {
                    if (!prev) navigate('/home');
                    return true;
                });
            } else {
                if (newValue === 0) navigate('/home');
                else if (newValue === 1) navigate('/home/carrinho');
                else if (newValue === 2) navigate('/home/meus-pedidos');
            }
        }
    };

    return (
        <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => handleChange(event, newValue)}
                showLabels
                sx={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff' }}
            >
                {role === ROLE_ADMIN
                    ? [
                        <BottomNavigationAction key="admin-home" label="Home" icon={<HomeIcon />} value={0} />,
                        <BottomNavigationAction key="admin-produtos" label="Produtos" icon={<InventoryIcon />} value={1} />,
                        <BottomNavigationAction key="admin-perfil" label="Perfil" icon={<PersonIcon />} value={2} />
                    ]
                    : [
                        <BottomNavigationAction key="home" label="Home" icon={<HomeIcon />} value={0} />,
                        <BottomNavigationAction key="carrinho" label="Carrinho" icon={<ShoppingCartIcon />} value={1} />,
                        <BottomNavigationAction key="pedidos" label="Pedidos" icon={<ReceiptIcon />} value={2} />,
                        <BottomNavigationAction key="perfil" label="Perfil" icon={<PersonIcon />} value={3} />
                    ]
                }
            </BottomNavigation>
        </Box>
    );
};

export default HomeNavigationBar;
