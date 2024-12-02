import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import {
    obterAdicionais,
    obterProdutoPorId,
    salvarProduto,
} from "../../../services/produtoService";
import { useAlert } from "../../shared/alert/AlertProvider";

const Produto = () => {
    const [produto, setProduto] = useState({
        nome: "",
        descricao: "",
        preco: "",
        categoriaId: "",
        adicionais: [],
    });

    const [adicionaisOpcoes, setAdicionaisOpcoes] = useState([]);
    const [errors, setErrors] = useState({ nome: "", preco: "", categoriaId: "" });
    const showAlert = useAlert();
    const navigate = useNavigate();
    const { produtoId } = useParams();

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

    useEffect(() => {
        if (produtoId) {
            const fetchProduto = async () => {
                try {
                    const { data } = await obterProdutoPorId(produtoId);
                    setProduto({
                        ...data,
                        categoriaId: data.categoria?.id || "",
                        adicionais: data.adicionais || [],
                    });
                } catch (error) {
                    showAlert("Erro ao carregar o produto", "error");
                }
            };

            fetchProduto();
        }
    }, [produtoId]);

    const handleVoltarHome = () => navigate("/admin");

    const handleChange = (field, value) => {
        setProduto((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleBlur = (field) => {
        const value = produto[field];
        let error = "";

        if (field === "nome" && !value.trim()) {
            error = "Nome do produto é obrigatório";
        }

        if (field === "preco" && (!value || parseFloat(value) <= 0)) {
            error = "Preço deve ser maior que zero";
        }

        if (field === "categoriaId" && !value) {
            error = "Categoria é obrigatória";
        }

        setErrors((prev) => ({ ...prev, [field]: error }));
    };

    const validateForm = () => {
        return (
            produto.nome.trim() &&
            produto.preco &&
            parseFloat(produto.preco) > 0 &&
            produto.categoriaId &&
            !Object.values(errors).some((error) => error)
        );
    };

    const handleSalvarProduto = async () => {
        if (!validateForm()) {
            showAlert("Por favor, corrija os erros no formulário", "error");
            return;
        }

        const command = {
            ...produto,
            preco: parseFloat(produto.preco).toFixed(2),
            categoriaId: parseInt(produto.categoriaId),
            adicionais: produto.adicionais.map((adicional) => adicional.id),
        };

        try {
            await salvarProduto(command);
            navigate("/admin/produtos");
            showAlert("Produto salvo com sucesso!", "success");
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
                        onBlur={() => handleBlur("nome")}
                        error={!!errors.nome}
                        helperText={errors.nome}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Descrição"
                        multiline
                        rows={3}
                        variant="outlined"
                        value={produto.descricao}
                        onChange={(e) => handleChange("descricao", e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Preço"
                        type="number"
                        inputProps={{ min: 0, step: 0.01 }}
                        value={produto.preco}
                        onChange={(e) => handleChange("preco", e.target.value)}
                        onBlur={() => handleBlur("preco")}
                        error={!!errors.preco}
                        helperText={errors.preco}
                        required
                        sx={{ mb: 2 }}
                    />

                    <FormControl fullWidth sx={{ mb: 2 }} required>
                        <InputLabel id="label-categoria">Categoria</InputLabel>
                        <Select
                            labelId="label-categoria"
                            label="Categoria"
                            value={produto.categoriaId}
                            onChange={(e) => handleChange("categoriaId", e.target.value)}
                            onBlur={() => handleBlur("categoriaId")}
                            error={!!errors.categoriaId}
                        >
                            <MenuItem value="1">Tradicionais</MenuItem>
                            <MenuItem value="2">Especiais</MenuItem>
                            <MenuItem value="3">Gelados</MenuItem>
                        </Select>
                        {errors.categoriaId && (
                            <Typography color="error" variant="body2">
                                {errors.categoriaId}
                            </Typography>
                        )}
                    </FormControl>

                    <Autocomplete
                        multiple
                        options={adicionaisOpcoes}
                        getOptionLabel={(option) => option.nome}
                        value={produto.adicionais}
                        onChange={(event, newValue) => handleChange("adicionais", newValue)}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Adicionais" />
                        )}
                        sx={{ mb: 2 }}
                    />

                    <Box display="flex" flexDirection="column" gap={2} mt={3}>
                        <Button
                            variant="contained"
                            onClick={handleSalvarProduto}
                            disabled={!validateForm()}
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
