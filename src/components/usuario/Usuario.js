import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Link,
    Divider,
} from "@mui/material";

const Usuario = () => {
    const [form, setForm] = useState({
        usuario: "",
        senha: "",
        confirmarSenha: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = () => {
        if (form.senha !== form.confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }
        alert("Usuario realizado com sucesso!");
    };

    return (
        <Box
            sx={{
                padding: 3,
                maxWidth: 400,
                margin: "0 auto",
                textAlign: "center",
            }}
        >
            {/* Logo */}
            <Box mb={4}>
                <img
                    src='/imagem/logo.png'
                    alt="Aroma Delivery"
                    style={{ width: "200px", height: "auto" }}
                />
            </Box>

            {/* Título */}
            <Typography
                variant="h6"
                sx={{ color: "#BF7373", fontWeight: "bold", mb: 3 }}
            >
                CRIE SUA CONTA
            </Typography>

            {/* Campos do formulário */}
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Usuário"
                    name="usuario"
                    variant="outlined"
                    fullWidth
                    value={form.usuario}
                    onChange={handleChange}
                    sx={{
                        "& .MuiInputBase-root": { height: 45 },
                    }}
                />
                <TextField
                    label="Senha"
                    name="senha"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={form.senha}
                    onChange={handleChange}
                    sx={{
                        "& .MuiInputBase-root": { height: 45 },
                    }}
                />
                <TextField
                    label="Confirmar senha"
                    name="confirmarSenha"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={form.confirmarSenha}
                    onChange={handleChange}
                    sx={{
                        "& .MuiInputBase-root": { height: 45 },
                    }}
                />
            </Box>

            {/* Botão de Usuario */}
            <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                sx={{
                    backgroundColor: "#BF7373",
                    color: "#FFF",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: 8,
                    height: 50,
                    marginTop: 3,
                    "&:hover": { backgroundColor: "#A85959" },
                }}
                disabled={!form.usuario || !form.senha || !form.confirmarSenha}
            >
                Cadastre-se
            </Button>

            {/* Termos e Condições */}
            <Typography
                variant="body2"
                sx={{ mt: 2, color: "#777", fontSize: "0.9rem" }}
            >
                Ao tocar em "Cadastre-se" você aceita nossos{" "}
                <Link href="/termos" sx={{ color: "#BF7373", fontWeight: "bold" }}>
                    termos e condições.
                </Link>
            </Typography>

            {/* Link para login */}
            <Typography
                variant="body2"
                sx={{ mt: 4, color: "#777", fontSize: "0.9rem" }}
            >
                Já possui conta?{" "}
                <Link href="/login" sx={{ color: "#BF7373", fontWeight: "bold" }}>
                    Entrar
                </Link>
            </Typography>
        </Box>
    );
};

export default Usuario;
