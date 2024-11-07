import './App.css';
import {RouterProvider} from "react-router-dom";
import React, {StrictMode} from "react";
import {router} from "./routes";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

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
                <CssBaseline />
                <RouterProvider router={router} />
            </ThemeProvider>
        </StrictMode>
    );
}

export default App;
