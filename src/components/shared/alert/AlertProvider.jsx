import React, {createContext, useCallback, useContext, useState} from "react";
import Alert from "./Alert";

const AlertContext = createContext();

export const AlertProvider = ({children}) => {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((message, type = "info", duration = 3000) => {
    setAlert({message, type, duration});
    setTimeout(() => setAlert(null), duration);
  }, []);

  return (
      <AlertContext.Provider value={showAlert}>
        {children}
        {alert && (
            <Alert
                message={alert.message}
                type={alert.type}
                duration={alert.duration}
                onClose={() => setAlert(null)}
            />
        )}
      </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
