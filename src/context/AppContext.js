import React, {createContext, useContext, useEffect, useState} from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [carrinhoId, setCarrinhoId] = useState(() => {
    return localStorage.getItem('carrinhoId') || null;
  });

  useEffect(() => {
    localStorage.setItem('carrinhoId', carrinhoId);
  }, [carrinhoId]);

  return (
      <AppContext.Provider value={{ carrinhoId, setCarrinhoId }}>
        {children}
      </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

