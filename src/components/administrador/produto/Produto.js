import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Header from "../../Header";
import {obterAdicionais, salvarProduto} from "../../../services/produtoService";
import {useAlert} from "../../shared/alert/AlertProvider";

const Produto = () => {
    const [produto, setProduto] = useState({
        nome: "",
        descricao: "",
        preco: "",
        categoriaId: "",
        adicionais: [],
    });

    const [adicionaisOpcoes, setAdicionaisOpcoes] = useState([]);
    const showAlert = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdicionais = async () => {
            try {
                const { data } = await obterAdicionais();
                setAdicionaisOpcoes(data);
            } catch (error) {
                showAlert("Erro ao buscar adicionais", "error");
            }
        };

        fetchAdicionais();
    }, []);

    const handleVoltarHome = () => navigate("/admin");

    const handleChange = (field, value) => {
        setProduto((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSalvarProduto = async () => {
        const command = {
            ...produto,
            preco: parseFloat(produto.preco),
            categoriaId: parseInt(produto.categoriaId),
            adicionais: produto.adicionais.map((adicional) => adicional.id),
        };

        try {
            const { data } = await salvarProduto(command);

            if (data) {
                navigate("/admin/produtos");
            }
        } catch (error) {
            showAlert("Erro ao salvar o produto", "error");
        }
    };

    return (
        <Card sx={{ maxWidth: "md", margin: "0 auto", boxShadow: "none", mt: 3 }}>
            <CardContent sx={{ padding: 0 }}>
                <Header titulo="Cadastrar Produto" onBack={handleVoltarHome} />
                <Divider />

                <Box padding={3}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
                        Informações do Produto
                    </Typography>

                    <TextField
                        fullWidth
                        label="Nome do Produto"
                        variant="outlined"
                        placeholder="Digite o nome do produto"
                        value={produto.nome}
                        onChange={(e) => handleChange("nome", e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Descrição"
                        multiline
                        rows={3}
                        variant="outlined"
                        placeholder="Descreva o produto brevemente"
                        value={produto.descricao}
                        onChange={(e) => handleChange("descricao", e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Preço"
                        type="number"
                        variant="outlined"
                        placeholder="Informe o preço"
                        inputProps={{ min: 0 }}
                        value={produto.preco}
                        onChange={(e) => handleChange("preco", e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Categoria</InputLabel>
                        <Select
                            value={produto.categoriaId}
                            onChange={(e) => handleChange("categoriaId", e.target.value)}
                            label="Categoria"
                        >
                            <MenuItem value="1">Tradicionais</MenuItem>
                            <MenuItem value="2">Especiais</MenuItem>
                            <MenuItem value="3">Gelados</MenuItem>
                        </Select>
                    </FormControl>

                    <Autocomplete
                        multiple
                        options={adicionaisOpcoes}
                        getOptionLabel={(option) => option.nome}
                        value={produto.adicionais}
                        onChange={(event, newValue) => handleChange("adicionais", newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Adicionais"
                                placeholder="Selecione adicionais"
                            />
                        )}
                        sx={{ mb: 2 }}
                    />

                    <Box display="flex" flexDirection="column" gap={2} mt={3}>
                        <Button
                            variant="contained"
                            onClick={handleSalvarProduto}
                            sx={{
                                backgroundColor: "#BF7373",
                                color: "#FFF",
                                fontWeight: "bold",
                                textTransform: "none",
                                borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "#A14A4A",
                                },
                            }}
                        >
                            Salvar
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Produto;
