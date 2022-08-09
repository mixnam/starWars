import * as React from "react"
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Character from "./pages/character"
import StarJediWoff from './StarJedi.woff'

const hack = `/${process.env.BASE_NAME}/${StarJediWoff}`

const theme = createTheme({
    typography: {
        fontFamily: 'StarJedi, Arial',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
             @font-face {
              font-family: 'StarJedi';
              src: url(${hack}) format('woff');
              font-weight: 700;
              font-style: normal;
            }       
      `,
        },
    },
});

const queryClient = new QueryClient()

const App: React.FunctionComponent = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter basename={process.env.BASE_NAME}>
                <CssBaseline />
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        <Route path="/" element={
                            <Home />
                        } />
                        <Route path="/character/:id" element={
                            <Character />
                        } />

                    </Routes>
                </QueryClientProvider>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
