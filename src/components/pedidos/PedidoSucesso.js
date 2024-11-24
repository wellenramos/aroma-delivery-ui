import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PedidoSucesso = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center",
                backgroundColor: "#FFFFFF",
                padding: 2,
            }}
        >
            <IconButton
                sx={{
                    backgroundColor: "#BF7373",
                    color: "#FFFFFF",
                    width: 80,
                    height: 80,
                    marginBottom: 2,
                    "&:hover": { backgroundColor: "#BF7373" },
                }}
            >
                <CheckCircleIcon sx={{ fontSize: 50 }} />
            </IconButton>

            <Typography variant="h5" sx={{ color: "#BF7373", fontWeight: "bold" }}>
                Sucesso!
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    color: "#757575",
                    marginTop: 1,
                    fontSize: "16px",
                }}
            >
                Seu pedido foi realizado com sucesso! Aroma Delivery agradece sua preferência!
            </Typography>
        </Box>
    );
};

export default PedidoSucesso;