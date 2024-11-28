import React, {useEffect, useState} from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {obterPorLogin} from "../../../services/usuarioService";
import Header from "../../Header";

const Menu = ({menuOpen, toggleMenu}) => {

  const [usuario, setUsuario] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const obterUsuario = async () => {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const login = decodedToken.sub;
      const {data} = await obterPorLogin(login);
      setUsuario(data);
    };
    obterUsuario();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login', { replace: true });
  }

  const handleIrParaProdutos = () => {
    navigate('/admin/produtos');
  }


  return (
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu(false)}>
        <Box sx={{width: 300}} role="presentation" onClick={toggleMenu(false)}
             onKeyDown={toggleMenu(false)}>
          <Header
              titulo={usuario?.nome}
          />
          <List>
            <ListItem onClick={handleIrParaProdutos} button>
              <ListItemIcon><Inventory2Icon
                  sx={{color: '#BF7373'}}/></ListItemIcon>
              <ListItemText primary="Produtos" primaryTypographyProps={{
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
