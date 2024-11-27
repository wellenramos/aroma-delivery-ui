import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    Modal,
    TextField,
    Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from 'react-router-dom';
import {consultarEnderecoPorCep} from "../../../services/enderecoService";
import {useAlert} from "../../shared/alert/AlertProvider";

const enderecoInit = {
    cep: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    principal: true,
}

const Endereco = ({openModal, onCloseModal, onSalvarEndereco, enderecoEdicao}) => {
    const [endereco, setEndereco] = useState(enderecoInit);

    const showAlert = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        if (enderecoEdicao) {
            setEndereco(enderecoEdicao);
        } else {
            setEndereco(enderecoInit);
        }
    }, [enderecoEdicao])

    const handleVoltar = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEndereco((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEndereco((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleConsultarEnderecoPorCep = async () => {
        if (endereco.cep.length < 8) {
            showAlert("CEP inválido", "error");
            resetarCampos();
            return;
        }

        if (endereco.cep) {
            try {
                const { data } = await consultarEnderecoPorCep(endereco.cep);
                setEndereco((prev) => ({
                    ...prev,
                    bairro: data.bairro || '',
                    cidade: data.cidade || '',
                    estado: data.estado || '',
                }));
            } catch (error) {
                showAlert("Erro ao consultar o CEP", "error");
            }
        }
    };

    const resetarCampos = () => {
        setEndereco(enderecoInit);
    };

    const handleSalvar = async () => {
        onSalvarEndereco(endereco);
    };

    return (
        <Modal open={openModal} onClose={onCloseModal}>
            <Box
                sx={{
                    backgroundColor: "#FFF",
                    padding: 4,
                    borderRadius: 2,
                    maxWidth: 500,
                    margin: "50px auto",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
                }}
            >
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <IconButton onClick={handleVoltar}>
                        <ArrowBackIcon color="primary" />
                    </IconButton>
                    <Typography variant="h6" sx={{ color: '#BF7373', fontWeight: 'bold' }}>
                        Endereço
                    </Typography>
                    <Box width="40px" />
                </Box>
                <Divider />

                <Box mt={2}>
                    {/* CEP e Número na mesma linha */}
                    <Box display="flex" gap={2} mb={2}>
                        <TextField
                            label="CEP"
                            name="cep"
                            variant="outlined"
                            fullWidth
                            value={endereco.cep}
                            onChange={handleChange}
                            onBlur={handleConsultarEnderecoPorCep}
                            sx={{ mt: 1 }}
                        />
                        <TextField
                            label="Número"
                            name="numero"
                            variant="outlined"
                            fullWidth
                            value={endereco.numero}
                            onChange={handleChange}
                            sx={{ mt: 1 }}
                        />
                    </Box>

                    {[
                        { label: 'Complemento', name: 'complemento' },
                        { label: 'Bairro', name: 'bairro' },
                    ].map((field, index) => (
                        <Box key={index} mb={2}>
                            <TextField
                                label={field.label}
                                name={field.name}
                                variant="outlined"
                                fullWidth
                                value={endereco[field.name]}
                                onChange={handleChange}
                                sx={{ mt: 1 }}
                            />
                        </Box>
                    ))}

                    {/* Cidade e Estado na mesma linha */}
                    <Box display="flex" gap={2} mt={2}>
                        <TextField
                            label="Cidade"
                            name="cidade"
                            variant="outlined"
                            fullWidth
                            value={endereco.cidade}
                            onChange={handleChange}
                            sx={{ mt: 1 }}
                        />
                        <TextField
                            label="Estado"
                            name="estado"
                            variant="outlined"
                            fullWidth
                            value={endereco.estado}
                            onChange={handleChange}
                            sx={{ mt: 1 }}
                        />
                    </Box>

                    <Box display="flex" mt={2}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="principal"
                                    checked={endereco.principal}
                                    onChange={handleCheckboxChange}
                                />
                            }
                            label="Principal"
                        />
                    </Box>
                </Box>

                {/* Botão de Salvar */}
                <Box paddingTop={2}>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ backgroundColor: '#BF7373', color: '#FFF', fontWeight: 'bold', borderRadius: '8px' }}
                        onClick={handleSalvar}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default Endereco;
