import React, {createContext, useContext, useEffect, useState} from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [carrinhoId, setCarrinhoId] = useState(() => {
    return localStorage.getItem('carrinhoId') || null;
  });

  const [pedidoId, setPedidoId] = useState(() => {
    return localStorage.getItem('pedidoId') || null;
  });

  useEffect(() => {
    if (carrinhoId === null) {
      localStorage.removeItem('carrinhoId');
    } else {
      localStorage.setItem('carrinhoId', carrinhoId);
    }
  }, [carrinhoId]);

  const limparCarrinhoId = () => {
    setCarrinhoId(null);
    localStorage.removeItem('carrinhoId');
  };

  const limparPedido = () => {
    localStorage.removeItem('pedidoId');
  };


  const limparToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const toggleMenu = (open) => () => {
    setMenuOpen(open);
  };

  return (
      <AppContext.Provider value={{
        carrinhoId,
        setCarrinhoId,
        limparCarrinhoId,
        limparPedido,
        limparToken,
        pedidoId,
        setPedidoId,
        menuOpen,
        setMenuOpen,
        toggleMenu
      }}>
        {children}
      </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

