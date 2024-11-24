import React, {useState} from 'react';
import {Container} from "@mui/material";
import BarraPesquisa from "../shared/BarraPesquisa";
import Produtos from "./produto/Produtos";
import Menu from "../menu/Menu";
import {useAppContext} from "../../context/AppContext";

const Home = () => {
    const [produtos, setProdutos] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(1);
    const {menuOpen, toggleMenu} = useAppContext();

    const handleSetProdutos = (produtos) => {
      setProdutos(produtos);
    }

    return (
        <Container maxWidth="sm">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <BarraPesquisa
                  onHandleSetProdutos={handleSetProdutos}
                  categoriaSelecionada={categoriaSelecionada}
              />
          </div>

          <Produtos
              produtos={produtos}
              onSetProdutos={handleSetProdutos}
              onCategoriaChange={setCategoriaSelecionada}
          />

          <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
        </Container>
    );
};

export default Home;
