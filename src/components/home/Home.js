import React, {useState} from 'react';
import {Container, IconButton} from "@mui/material";
import BarraPesquisa from "../shared/BarraPesquisa";
import Produtos from "./produto/Produtos";
import Menu from "../menu/Menu";
import MenuIcon from "@mui/icons-material/Menu";

const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = (open) => () => {
        setMenuOpen(open);
    };

    return (
        <Container maxWidth="sm">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <BarraPesquisa />
                <IconButton onClick={toggleMenu(true)} style={{ marginLeft: '8px' }}>
                    <MenuIcon />
                </IconButton>
            </div>

            <Produtos />

            <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
        </Container>
    );
};

export default Home;
