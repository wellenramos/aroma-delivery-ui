import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Box,
    TextField,
    Button,
    Autocomplete,
    Divider, InputLabel, FormControl, MenuItem, Select,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from "../../Header";

const Cadastro = () => {
    const [adicionais, setAdicionais] = useState([]);
    const [categoria, setCategoria] = useState('');
    // const [imagem, setImagem] = useState(null);
    const navigate = useNavigate();

    const handleVoltarHome = () => {
        navigate('/');
    };

    const adicionaisOpcoes = [
        { label: 'Chantilly', preco: 5.0 },
        { label: 'Caramelo', preco: 5.0 },
        { label: 'Canela', preco: 5.0 },
    ];

    // const handleImagemUpload = (event) => {
    //     setImagem(event.target.files[0]);
    // };

    return (
        <Card sx={{ maxWidth: 'sm', margin: '0 auto', boxShadow: 'none' }}>
            <CardContent sx={{ padding: 0 }}>
                {/* Header */}
                <Header
                    titulo='Cadastro'
                    onBack={handleVoltarHome}
                />
                <Divider />

                {/* Formulário */}
                <Box padding={3}>
                    <TextField
                        fullWidth
                        label="Nome"
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Descrição"
                        multiline
                        rows={3}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Preço"
                        type="number"
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    {/* Categoria */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Categoria</InputLabel>
                        <Select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            label="Categoria"
                        >
                            <MenuItem value="Tradicionais">Tradicionais</MenuItem>
                            <MenuItem value="Especiais">Especiais</MenuItem>
                            <MenuItem value="Gelados">Gelados</MenuItem>
                        </Select>
                    </FormControl>

                    {/*/!* Upload de Imagem *!/*/}
                    {/*<Box display="flex" alignItems="center" sx={{ mb: 2 }}>*/}
                    {/*    <Button*/}
                    {/*        variant="contained"*/}
                    {/*        component="label"*/}
                    {/*        startIcon={<AddPhotoAlternateIcon />}*/}
                    {/*        sx={{*/}
                    {/*            backgroundColor: '#BF7373',*/}
                    {/*            color: '#FFF',*/}
                    {/*            textTransform: 'none',*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        Imagem*/}
                    {/*        <input type="file" hidden onChange={handleImagemUpload} />*/}
                    {/*    </Button>*/}
                    {/*    {imagem && (*/}
                    {/*        <Typography sx={{ ml: 2, color: '#777' }}>*/}
                    {/*            {imagem.name}*/}
                    {/*        </Typography>*/}
                    {/*    )}*/}
                    {/*</Box>*/}

                    {/* Adicionais */}
                    <Autocomplete
                        multiple
                        options={adicionaisOpcoes}
                        getOptionLabel={(option) => option.label}
                        value={adicionais}
                        onChange={(event, newValue) => setAdicionais(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Adicionais" />
                        )}
                        sx={{ mb: 2 }}
                    />

                    {/* Botões */}
                    <Box display="flex" flexDirection="column" gap={2} mt={3}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#BF7373',
                                color: '#FFF',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                borderRadius: '8px',
                            }}
                        >
                            Salvar
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#BF7373',
                                color: '#FFF',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                borderRadius: '8px',
                            }}
                        >
                            Publicar
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Cadastro;
