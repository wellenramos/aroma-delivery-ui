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
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PaymentIcon from "@mui/icons-material/Payment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {useAppContext} from "../../../context/AppContext";
import {obterPorLogin} from "../../../services/usuarioService";
import Header from "../../Header";

const Menu = ({menuOpen, toggleMenu}) => {

  const [usuario, setUsuario] = useState();
  const navigate = useNavigate();
  let { limparCarrinhoId } = useAppContext();

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
    limparCarrinhoId()
    navigate('/login');
  }

  const handleIrParaMeusPedidos = () => {
    navigate('/home/meus-pedidos');
  }

  const handleIrParaEndereco = () => {
    navigate('/home/enderecos');
  }

  const handleIrParaFavoritos = () => {
    navigate('/home/favoritos');
  }

  const handleIrParaPagamento = () => {
    navigate('/home/pagamento');
  }

  return (
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu(false)}>
        <Box sx={{width: 300}} role="presentation" onClick={toggleMenu(false)}
             onKeyDown={toggleMenu(false)}>
          <Header
              titulo={usuario?.nome}
          />
          <List>
            <ListItem onClick={handleIrParaMeusPedidos} button>
              <ListItemIcon><ShoppingBagIcon
                  sx={{color: '#BF7373'}}/></ListItemIcon>
              <ListItemText primary="Pedidos" primaryTypographyProps={{
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
