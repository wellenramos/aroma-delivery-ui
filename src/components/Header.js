import React from "react";
import {Box, IconButton, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Header = ({ titulo, onBack, onFavorite, favorito }) => {
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

            {onFavorite && (
                <IconButton
                    onClick={onFavorite}
                    sx={{
                        position: "absolute",
                        right: "16px",
                        zIndex: 1,
                        color: "#FFF"
                    }}
                >
                  {favorito ? <FavoriteIcon /> : <FavoriteBorderIcon/>}
                </IconButton>
            )}
        </Box>
    );
};

export default Header;
