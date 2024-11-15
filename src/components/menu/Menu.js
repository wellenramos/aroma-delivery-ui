import React from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PaymentIcon from "@mui/icons-material/Payment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {useNavigate} from "react-router-dom";
import Header from "../Header";

const Menu = ({menuOpen, toggleMenu}) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const handleIrParaMeusPedidos = () => {
    navigate('/meus-pedidos');
  }

  const handleIrParaEndereco = () => {
    navigate('/endereco');
  }

  const handleIrParaFavoritos = () => {
    navigate('/favoritos');
  }

  const handleIrParaPagamento = () => {
    navigate('/pagamento');
  }

  return (
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu(false)}>
        <Box sx={{width: 300}} role="presentation" onClick={toggleMenu(false)}
             onKeyDown={toggleMenu(false)}>
          <Header
              titulo='Menu Principal'
          />
          <List>
            <ListItem onClick={handleIrParaMeusPedidos} button>
              <ListItemIcon><ShoppingBagIcon
                  sx={{color: '#BF7373'}}/></ListItemIcon>
              <ListItemText primary="Meus Pedidos" primaryTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                  color: '#BF7373'
                }
              }}/>
              <ChevronRightIcon sx={{color: '#BF7373'}}/>
            </ListItem>
            <ListItem onClick={handleIrParaPagamento} button>
              <ListItemIcon><PaymentIcon
                  sx={{color: '#BF7373'}}/></ListItemIcon>
              <ListItemText primary="Pagamentos" primaryTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                  color: '#BF7373'
                }
              }}/>
              <ChevronRightIcon sx={{color: '#BF7373'}}/>
            </ListItem>
            <ListItem onClick={handleIrParaFavoritos} button>
              <ListItemIcon><FavoriteIcon
                  sx={{color: '#BF7373'}}/></ListItemIcon>
              <ListItemText primary="Favoritos" primaryTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                  color: '#BF7373'
                }
              }}/>
              <ChevronRightIcon sx={{color: '#BF7373'}}/>
            </ListItem>
            <ListItem onClick={handleIrParaEndereco} button>
              <ListItemIcon><LocationOnIcon
                  sx={{color: '#BF7373'}}/></ListItemIcon>
              <ListItemText primary="Endereços" primaryTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                  color: '#BF7373'
                }
              }}/>
              <ChevronRightIcon sx={{color: '#BF7373'}}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><PersonIcon sx={{color: '#BF7373'}}/></ListItemIcon>
              <ListItemText primary="Perfil" primaryTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                  color: '#BF7373'
                }
              }}/>
              <ChevronRightIcon sx={{color: '#BF7373'}}/>
            </ListItem>
            <Divider/>
            <ListItem button>
              <ListItemIcon><ExitToAppIcon
                  sx={{color: '#BF7373'}}/></ListItemIcon>
              <ListItemText primary="Sair" onClick={handleLogout} primaryTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                  color: '#BF7373'
                }
              }}/>
            </ListItem>
          </List>
        </Box>
      </Drawer>
  );
};

export default Menu;
