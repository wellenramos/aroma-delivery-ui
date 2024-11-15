import React, {useState} from 'react';
import {Box, Link, TextField, Typography} from '@mui/material';
import {Entrar, LoginContainer, LogoBox} from "./style";
import {autenticar} from "../../services/authService";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const {data} = await autenticar(login, senha);

            if (data.token) {
                localStorage.setItem('token', data.token);
                setError('');
                navigate('/');
            }
        } catch (error) {
            setError('Usuário ou senha incorretos.');
        }
    };

    return (
        <LoginContainer maxWidth="xs">
            <LogoBox>
                {/* Logo */}
                <Box mb={4}>
                    <img
                        src='/imagem/logo.png'
                        alt="Aroma Delivery"
                        style={{ width: "250px", height: "auto" }}
                    />
                </Box>
            </LogoBox>
            {error && (
                <Typography color="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Typography>
            )}
            <form onSubmit={handleLogin}>
                <TextField
                    label="Usuário"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    InputProps={{
                        style: { borderRadius: 10 }
                    }}
                />
                <TextField
                    label="Senha"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    InputProps={{
                        style: { borderRadius: 10 }
                    }}
                />
                <Entrar variant="contained" fullWidth type="submit">
                    Começar
                </Entrar>
            </form>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
                Não tem nenhuma conta?{' '}
                <Link href="/usuario" sx={{ color: '#a05252', fontWeight: 'bold' }}>
                    Registrar
                </Link>
            </Typography>
        </LoginContainer>
    );
};

export default Login;