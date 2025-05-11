import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Box, css, CssBaseline } from "@mui/material";
import { VotingContractProvider } from "./hooks/useVotingContract";

const theme = createTheme({
  typography: {
    fontFamily: `"Lucida Sans Unicode", "Lucida Grande", sans-serif`,
  },
});

// Componente raiz da aplicação.
// Aplica o tema personalizado, configura o roteamento e fornece o contexto do contrato de votação.
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* Habilita o roteamento com base em URL */}
        <CssBaseline />
        {/* Normaliza estilos base para consistência entre navegadores */}
        <Box sx={styles.background}>
          <VotingContractProvider>
            {/* Fornece o contexto de autenticação/metamask */}
            <AppRoutes />
            {/* Define e renderiza as rotas da aplicação */}
          </VotingContractProvider>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const styles = {
  background: css`
    background-color: #a5b3f3;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

export default App;
