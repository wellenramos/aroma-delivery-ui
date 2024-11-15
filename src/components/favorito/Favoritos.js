import React from 'react';
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    IconButton,
    Avatar,
    Box,
    Divider, CardContent, Card
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Header from "../Header";

const favoriteItems = [
    {
        id: 1,
        name: "Cappuccino Clássico",
        description: "Espresso, leite vaporizado, espuma de leite",
        imageUrl: "https://link-para-imagem.com/imagem1.png",
    },
    {
        id: 2,
        name: "Cappuccino Clássico",
        description: "Espresso, leite vaporizado, espuma de leite",
        imageUrl: "https://link-para-imagem.com/imagem2.png",
    },
    // Adicione mais itens conforme necessário
];

const Favoritos = () => {
    return (
        <Card sx={{ maxWidth: 'sm', margin: '0 auto', boxShadow: 'none'}} >
            <CardContent sx={{ padding: 0 }}>
                <Header
                    titulo='Favoritos'
                />
                <Box padding={2}>
                    <List>
                        {favoriteItems.map((item) => (
                            <ListItem
                                key={item.id}
                                disableGutters
                                secondaryAction={
                                    <IconButton edge="end" aria-label="favorite" color="secondary">
                                        <FavoriteIcon sx={{color: '#BF7373'}}/>
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar src={item.imageUrl} alt={item.name}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name}
                                    secondary={item.description}
                                    primaryTypographyProps={{style: {fontWeight: 'bold'}}}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Favoritos;

