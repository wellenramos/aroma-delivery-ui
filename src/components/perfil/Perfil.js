import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    IconButton,
    Divider
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Perfil = () => {

    const navigate = useNavigate();

    const handleVoltarHome = () => {
        navigate('/');
    }

    const handleEditar = () => {
        navigate('/perfil/1')
    }

    return(
        <Card sx={{ maxWidth: 'sm', margin: '0 auto', boxShadow: 'none'}}>
            <CardContent sx={{ padding: 0 }}>
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
                    <IconButton onClick={handleVoltarHome}>
                        <ArrowBackIcon color="primary" />
                    </IconButton>
                    <Typography variant="h6" sx={{ color: '#BF7373', fontWeight: 'bold' }}>Perfil</Typography>
                    <IconButton onClick={handleEditar}>
                        <EditIcon color="primary" />
                    </IconButton>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="center" alignItems="center" padding={2}>
                    <Avatar src="https://via.placeholder.com/100" alt="Foto do Perfil" sx={{ width: 100, height: 100 }} />
                </Box>
                <Box textAlign="center" padding={2}>
                    <Typography variant="subtitle1" sx={{ color: '#BF7373', fontWeight: 'bold' }}>Wellen Ramos</Typography>
                </Box>
                {/* Informações de Perfil */}
                <Box sx={{ width: '100%', paddingX: 2 }}>

                    {/* E-mail */}
                    <Box display="flex" alignItems="flex-start" marginBottom={3}>
                        <EmailIcon sx={{ color: '#BF7373', marginRight: 1 }} />
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#BF7373' }}>E-mail</Typography>
                            <Typography variant="body2" color="textSecondary">exemplo@gmail.com</Typography>
                        </Box>
                    </Box>

                    {/* Endereço de Entrega */}
                    <Box display="flex" alignItems="flex-start" marginBottom={3}>
                        <LocationOnIcon sx={{ color: '#BF7373', marginRight: 1 }} />
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#BF7373' }}>Endereço de Entrega</Typography>
                            <Typography variant="body2" color="textSecondary">Quadra 22, Setor Leste, Gama DF</Typography>
                        </Box>
                    </Box>

                    {/* Senha */}
                    <Box display="flex" alignItems="flex-start" marginBottom={3}>
                        <LockIcon sx={{ color: '#BF7373', marginRight: 1 }} />
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#BF7373' }}>Senha</Typography>
                            <Typography variant="body2" color="textSecondary">*********</Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Perfil;
