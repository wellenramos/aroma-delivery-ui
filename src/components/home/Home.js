import React, {useState} from 'react';
import {Container} from "@mui/material";
import BarraPesquisa from "../shared/BarraPesquisa";
import Produtos from "./produto/Produtos";

const Home = () => {
    const [error, setError] = useState(null);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container maxWidth="sm">
            <BarraPesquisa/>
            <Produtos/>
        </Container>
    );
};

export default Home;
