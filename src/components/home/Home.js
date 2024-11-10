import React, {useState} from 'react';
import {Container, IconButton} from "@mui/material";
import BarraPesquisa from "../shared/BarraPesquisa";
import Produtos from "./produto/Produtos";
import Menu from "../../menu/Menu";
import MenuIcon from "@mui/icons-material/Menu";

const Home = () => {
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // Função para abrir/fechar o menu
    const toggleMenu = (open) => () => {
        setMenuOpen(open);
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container maxWidth="sm">
            {/* Ícone do Menu ao lado da barra de pesquisa */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <BarraPesquisa />
                <IconButton onClick={toggleMenu(true)} style={{ marginLeft: '8px' }}>
                    <MenuIcon />
                </IconButton>
            </div>

            <Produtos />

            {/* Menu Lateral */}
            <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
        </Container>
    );
};

export default Home;
