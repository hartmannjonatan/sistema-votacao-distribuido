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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Box sx={styles.background}>
          <VotingContractProvider>
            <AppRoutes />
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
