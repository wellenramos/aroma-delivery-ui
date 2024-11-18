import React, {createContext, useContext, useEffect, useState} from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [carrinhoId, setCarrinhoId] = useState(() => {
    return localStorage.getItem('carrinhoId') || null;
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
  };

  return (
      <AppContext.Provider value={{ carrinhoId, setCarrinhoId, limparCarrinhoId }}>
        {children}
      </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

