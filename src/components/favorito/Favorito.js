import React from 'react';
import { Container, List, ListItem, ListItemAvatar, ListItemText, Typography, IconButton, Avatar, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeNavigationBar from "../home/HomeNavigationBar";

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

const Favorites = () => {
    return (
        <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#BF7373', marginBottom: 2 }}>
                Favoritos
            </Typography>
            <Box sx={{ width: '100%' }}>
                <List>
                    {favoriteItems.map((item) => (
                        <ListItem
                            key={item.id}
                            disableGutters
                            secondaryAction={
                                <IconButton edge="end" aria-label="favorite" color="secondary">
                                    <FavoriteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar src={item.imageUrl} alt={item.name} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.name}
                                secondary={item.description}
                                primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <HomeNavigationBar/>
        </Container>
    );
};

export default Favorites;

