import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import {obterPorLogin} from "../../services/usuarioService";
import {Container, Typography} from "@mui/material";
import BarraPesquisa from "../shared/BarraPesquisa";
import Produtos from "./produto/Produtos";
import HomeNavigationBar from "./HomeNavigationBar";

const Home = () => {
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const obterUsuario = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const login = decodedToken.sub;
                const response = await obterPorLogin(login);
                setUsuario(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                setError('Erro ao buscar dados do usuário');
            }
        };

        obterUsuario();
    }, [navigate]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container maxWidth="sm">
            <div>
                <Typography>Seja bem vindo, {usuario?.nome}.</Typography>
            </div>
            <BarraPesquisa/>
            <Produtos/>
            <HomeNavigationBar/>
        </Container>
    );
};

export default Home;
