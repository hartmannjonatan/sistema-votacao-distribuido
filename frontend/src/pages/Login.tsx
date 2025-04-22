import {
  Button,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";

export function Login() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        style={{ marginTop: "2rem", textAlign: "center" }}
      >
        <Typography variant="h4" gutterBottom>
          Projeto React + TypeScript + MUI
        </Typography>
        <Typography variant="body1">Você clicou {count} vezes</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCount((c) => c + 1)}
          style={{ marginTop: "1rem" }}
        >
          Clique aqui
        </Button>
      </Container>
    </ThemeProvider>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
});
