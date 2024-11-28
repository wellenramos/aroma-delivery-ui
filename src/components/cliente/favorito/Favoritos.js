import React, {useEffect, useState} from 'react';
import {Box, Card, CardContent, Divider, Typography} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useNavigate} from "react-router-dom";
import {useAlert} from "../../shared/alert/AlertProvider";
import {obterFavoritos} from "../../../services/favoritoService";
import Header from "../../Header";

const Favoritos = () => {

    const [favoritos, setFavoritos] = useState([]);

    const navigate = useNavigate();
    const showAlert = useAlert();

    const fetchFavoritos = async () => {
        try {
            const { data } = await obterFavoritos();
                setFavoritos(data);
        } catch (error) {
            showAlert("Erro ao buscar favoritos", "error");
        }
    };

    useEffect( () => {
        fetchFavoritos();
    }, []);

    const handleVoltarHome = () => {
        navigate("/home");
    };

    return (
        <Card sx={{ maxWidth: 'md', margin: '0 auto', boxShadow: 'none' }}>
            <CardContent sx={{ padding: 0 }}>
                <Header
                    titulo="Meus favoritos"
                    onBack={handleVoltarHome}
                />
                <Divider/>
                <CardContent sx={{padding: 0}}>
                    <Box sx={{padding: 2}}>
                        {favoritos.length === 0 ? (
                            <Typography variant="body1" sx={{textAlign: 'center', color: '#BF7373', marginTop: 2}}>
                                Nenhum resultado encontrado.
                            </Typography>
                        ) : (
                            favoritos.map((favorito) => (
                                <Box key={favorito.id} mb={2} sx={{width: '100%', paddingX: 2}}>
                                    <Box display="column" alignItems="center">
                                        <Box display="flex" alignItems="center">
                                            <FavoriteIcon sx={{color: "red"}} fontSize="small"/>
                                            <Typography variant="body1" sx={{marginLeft: '5px'}}>
                                                {favorito.nome}
                                            </Typography>
                                        </Box>
                                        <Box flexGrow={1}>
                                            <Typography variant="body2">
                                                {favorito.descricao}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider/>
                                </Box>
                            ))
                    )}
                </Box>
            </CardContent>
        </CardContent>
    </Card>
);
};

export default Favoritos;

