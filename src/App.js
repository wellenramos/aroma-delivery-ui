import './App.css';
import {RouterProvider} from "react-router-dom";
import React, {StrictMode} from "react";
import {router} from "./routes";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {AlertProvider} from "./components/shared/alert/AlertProvider";
import {AppContextProvider} from "./context/AppContext";

const theme = createTheme({
    palette: {
        primary: {
            main: '#BF7373',
        },
        secondary: {
            main: '#9e9a9a',
        },
    },
});

function App() {
    return (
        <StrictMode>
            <ThemeProvider theme={theme}>
                <AlertProvider>
                    <CssBaseline />
                    <AppContextProvider>
                        <RouterProvider router={router} />
                    </AppContextProvider>
                </AlertProvider>
            </ThemeProvider>
        </StrictMode>
    );
}

export default App;
