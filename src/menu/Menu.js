import {Box, Card, CardContent, Typography} from "@mui/material";
import React from "react";

const Menu = () => {
    return(
        <Card sx={{ maxWidth: 'sm', margin: '0 auto', boxShadow: 'none'}}>
            <CardContent sx={{ padding: 0 }}>
                <Box display="flex" justifyContent="center" alignItems="center" padding={2}>
                    <Typography variant="h6" sx={{ color: '#BF7373', fontWeight: 'bold' }}>Menu</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Menu;