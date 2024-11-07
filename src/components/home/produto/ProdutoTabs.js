import React from 'react';
import { Tabs, Tab } from '@mui/material';

const ProdutoTabs = ({onObterProdutos}) => {
    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onObterProdutos(newValue);
    };

    return (
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            sx={{ marginBottom: 2 }}
        >
            <Tab label="Tradicionais" value={1}/>
            <Tab label="Especiais" value={2}/>
            <Tab label="Gelados" value={3}/>
        </Tabs>
    );
};

export default ProdutoTabs;
