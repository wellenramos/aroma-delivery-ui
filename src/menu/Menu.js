// MenuDrawer.js
import React, {useState} from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PaymentIcon from "@mui/icons-material/Payment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {useNavigate} from "react-router-dom";

const Menu = ({menuOpen, toggleMenu}) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu(false)}>
        <Box sx={{width: 300}} role="presentation" onClick={toggleMenu(false)}
             onKeyDown={toggleMenu(false)}>
          <Box display="flex" justifyContent="center" alignItems="center"
               padding={2} borderBottom={1} borderColor="divider">
            <Typography variant="h6"
                        sx={{color: '#BF7373', fontWeight: 'bold'}}>Menu
              Principal</Typography>
          </Box>
          <List>
            <ListItem button>
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
            <ListItem button>
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
            <ListItem button>
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
            <ListItem button>
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
