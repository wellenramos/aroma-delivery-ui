import {
  Box,
  Button, Checkbox, FormControlLabel,
  FormControlLabel as RadioLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material";
import InputMask from "react-input-mask";
import React, {useState} from "react";

const Cartao = ({ openModal, onCloseModal, onSalvarCartao }) => {
  const [errors, setErrors] = useState({});
  const [cartao, setCartao] = useState({
    tipo: "Crédito",
    numero: "",
    titular: "",
    validade: "",
    cvv: "",
    principal: true
  });

  const handleChange = (field) => (e) => {
    setCartao((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSalvarCartao = () => {
    if (formularioPossuiErros()) return;
    const command = {
      titular: cartao.titular,
      tipo: cartao.tipo,
      numero: cartao.numero,
      cvv: cartao.cvv,
      principal: cartao.principal,
      validadeMes: cartao.validade.split("/")[0],
      validadeAno:cartao.validade.split("/")[1],
    };
    onSalvarCartao(command);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCartao((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const formularioPossuiErros = () => {
    const newErrors = {};

    if (!cartao.numero) newErrors.numero = "Número do cartão é obrigatório";
    if (!cartao.titular) newErrors.titular = "Nome do titular é obrigatório";
    if (!cartao.validade) newErrors.validade = "Validade é obrigatória";
    if (!cartao.cvv) newErrors.cvv = "CVV é obrigatório";

    if (cartao.validade && !/^(0[1-9]|1[0-2])\/\d{4}$/.test(cartao.validade)) {
      newErrors.validade = "Validade deve estar no formato MM/AAAA";
    }

    if (cartao.cvv && cartao.cvv.length < 3) {
      newErrors.cvv = "CVV deve ter 3 dígitos";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return true;
    }
    return false;
  }

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
          <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "#BF7373" }}
          >
            Adicionar Cartão
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Tipo do cartão
          </Typography>
          <RadioGroup
              value={cartao.tipo}
              onChange={handleChange("tipo")}
              row
          >
            <RadioLabel value="Crédito" control={<Radio color="primary" />} label="Crédito" />
            <RadioLabel value="Débito" control={<Radio color="primary" />} label="Débito" />
          </RadioGroup>

          <TextField
              required
              sx={{ mt: 2 }}
              label="Número do cartão"
              value={cartao.numero}
              onChange={handleChange("numero")}
              inputProps={{ maxLength: 20 }}
              variant="outlined"
              fullWidth
              error={!!errors.numero}
              helperText={errors.numero}
          />

          <TextField
              required
              sx={{ mt: 2 }}
              label="Nome do titular"
              value={cartao.titular}
              onChange={handleChange("titular")}
              inputProps={{ maxLength: 100 }}
              variant="outlined"
              fullWidth
              error={!!errors.titular}
              helperText={errors.titular}
          />

          <InputMask
              mask="99/9999"
              value={cartao.validade}
              onChange={handleChange("validade")}
              placeholder="MM/AAAA"
          >
            {(inputProps) => (
                <TextField
                    required
                    {...inputProps}
                    sx={{ mt: 2 }}
                    label="Validade (MM/AAAA)"
                    variant="outlined"
                    fullWidth
                    error={!!errors.validade}
                    helperText={errors.validade}
                />
            )}
          </InputMask>

          <TextField
              required
              sx={{ mt: 2 }}
              label="CVV"
              value={cartao.cvv}
              onChange={handleChange("cvv")}
              variant="outlined"
              inputProps={{ maxLength: 3 }}
              error={!!errors.cvv}
              helperText={errors.cvv}
              fullWidth
          />

          <Box display="flex" mt={2}>
            <FormControlLabel
                control={
                  <Checkbox
                      name="principal"
                      checked={cartao.principal}
                      onChange={handleCheckboxChange}
                  />
                }
                label="Principal"
            />
          </Box>

          <Box mt={4}>
            <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  backgroundColor: "primary",
                  color: "#FFF",
                  fontWeight: "bold",
                  borderRadius: "8px"
                }}
                onClick={handleSalvarCartao}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>
  );
};

export default Cartao;
