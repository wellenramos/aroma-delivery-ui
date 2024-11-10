import React, {useState} from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    IconButton,
    Divider, TextField, Button
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Perfil = () => {

    const [nome, setNome] = useState('Wellen Ramos');
    const [email, setEmail] = useState('exemplo@gmail.com');
    const [endereco, setEndereco] = useState('Quadra 22, Setor Leste, Gama DF');
    const [senha, setSenha] = useState('********');

    const handleUpdate = (e) => {
        e.preventDefault();
        // lógica de atualização
        console.log({ nome, email, endereco, senha });
    };

    const navigate = useNavigate();

    const handleVoltarPerfil = () => {
        navigate('/perfil');
    }

    return(
        <Card sx={{ maxWidth: 'sm', margin: '0 auto', boxShadow: 'none'}}>
            <CardContent sx={{ padding: 0 }}>
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
                    <IconButton onClick={handleVoltarPerfil}>
                        <ArrowBackIcon color="primary" />
                    </IconButton>
                    <Typography variant="h6" sx={{ color: '#BF7373', fontWeight: 'bold' }}>Perfil</Typography>
                    <Box width="48px" />
                </Box>
                <Divider />
                <Box display="flex" justifyContent="center" alignItems="center" padding={2}>
                    <Avatar src="https://via.placeholder.com/100" alt="Foto do Perfil" sx={{ width: 100, height: 100 }} />
                    <IconButton sx={{ marginLeft: -4, marginTop: 4, backgroundColor: '#BF7373', color: 'white' }}>
                        <EditIcon />
                    </IconButton>
                </Box>
                <Box component="form" onSubmit={handleUpdate} padding={2}>
                    <TextField
                        label="Nome"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <TextField
                        label="E-mail"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Endereço de Entrega"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                    />
                    <TextField
                        label="Senha"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <Box paddingTop={2}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ backgroundColor: '#BF7373', color: '#FFF', fontWeight: 'bold', borderRadius: '8px' }}
                        >
                            Atualizar Perfil
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Perfil;

