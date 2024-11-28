import React, {useState} from "react";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {cadastrar, obterPorLogin} from "../../services/usuarioService";
import {useAlert} from "../shared/alert/AlertProvider";

const initForm = {
  nome: "",
  login: "",
  senha: ""
}

const Registrar = () => {
  const [formulario, setFormulario] = useState(initForm);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState('');
  const showAlert = useAlert();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormulario({...formulario, [name]: value});
  };

  const handleCadastrar = () => {
    if (formulario.senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    cadastrar(formulario);
    showAlert("Produto realizado com sucesso", "success");
  };

  const handleVerificarUsuarioCadastrado = async () => {
    try {
      const usuario = await obterPorLogin(formulario.login);
      if (usuario) {
        setError('');
        showAlert("Login já existente", "error");
      }
    } catch (e) {
      setError('');
      console.log(e);
    }
  }

  return (
      <Container maxWidth="sm" sx={{
        height: "100vh",
        backgroundColor: "#f8f7f6",
        display: "flex",
        alignItems: "center"
      }}>
        <Box
            sx={{
              padding: 3,
              margin: "0 auto",
              textAlign: "center",
              backgroundColor: "#f8f7f6"
            }}
        >
          {/* Logo */}
          <Box mb={4}>
            <img
                src='/imagem/logo.png'
                alt="Aroma Delivery"
                style={{width: "250px"}}
            />
          </Box>

          {/* Título */}
          <Typography
              variant="h6"
              sx={{color: "#BF7373", fontWeight: "bold", mb: 3}}
          >
            CRIE SUA CONTA
          </Typography>

          {error && (
              <Typography color="error" sx={{marginBottom: 2}}>
                {error}
              </Typography>
          )}

          {/* Campos do formulário */}
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
                label="Nome"
                name="nome"
                variant="outlined"
                fullWidth
                required
                inputProps={{ maxLength: 200 }}
                value={formulario.nome}
                onChange={handleChange}
            />
            <TextField
                label="Usuário"
                name="login"
                variant="outlined"
                fullWidth
                required
                value={formulario.login}
                onChange={handleChange}
                onBlur={handleVerificarUsuarioCadastrado}
                inputProps={{ maxLength: 200 }}
            />
            <TextField
                label="Senha"
                name="senha"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={formulario.senha}
                onChange={handleChange}
            />
            <TextField
                label="Confirmar senha"
                name="confirmarSenha"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </Box>

          {/* Botão de Registrar */}
          <Button
              variant="contained"
              fullWidth
              onClick={handleCadastrar}
              sx={{
                backgroundColor: "#BF7373",
                color: "#FFF",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: 8,
                height: 50,
                marginTop: 3,
                "&:hover": {backgroundColor: "#A85959"},
              }}
              disabled={!formulario.nome || !formulario.login || !formulario.senha || !confirmarSenha}
          >
            Cadastre-se
          </Button>

          {/* Termos e Condições */}
          <Typography
              variant="body2"
              sx={{mt: 2, color: "#777", fontSize: "0.9rem"}}
          >
            Ao tocar em "Cadastre-se" você aceita nossos{" "}
            <Link href="/termos" sx={{color: "#BF7373", fontWeight: "bold"}}>
              termos e condições.
            </Link>
          </Typography>

          {/* Link para login */}
          <Typography
              variant="body2"
              sx={{mt: 4, color: "#777", fontSize: "0.9rem"}}
          >
            Já possui conta?{" "}
            <Link href="/login" sx={{color: "#BF7373", fontWeight: "bold"}}>
              Entrar
            </Link>
          </Typography>
        </Box>
      </Container>
  );
};

export default Registrar;
