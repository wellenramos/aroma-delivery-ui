import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Header = ({ titulo, onBack, icon }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                backgroundColor: "#BF7373",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                position: "relative",
            }}
        >
            {/* Botão de Voltar (opcional) */}
            {onBack && (
                <IconButton
                    onClick={onBack}
                    sx={{
                        position: "absolute",
                        left: "16px",
                        zIndex: 1,
                        color: "#FFF",
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>
            )}

            {/* Título centralizado */}
            <Typography
                variant="h6"
                sx={{
                    textAlign: "center",
                    flex: 1,
                    fontWeight: "bold",
                    color: "#FFF",
                }}
            >
                {titulo}
            </Typography>

            {/* Ícone adicional (opcional) */}
            {icon && (
                <IconButton
                    onClick={icon.onClick}
                    sx={{
                        position: "absolute",
                        right: "16px",
                        zIndex: 1,
                        color: "#FFF",
                    }}
                >
                    {icon.component}
                </IconButton>
            )}
        </Box>
    );
};

export default Header;
