import {
  Button,
  Container,
  css,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { MetaMaskIcon } from "../components/MetaMaskIcon";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <Container maxWidth="md">
        <Paper elevation={10} sx={stylesLogin.paper}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            ChainSAFE-Poll
          </Typography>
          <Typography variant="h6">Enter chain address:</Typography>
          <TextField sx={stylesLogin.textField} />
          <Button
            component={Link}
            to="/votar"
            fullWidth
            variant="contained"
            sx={stylesLogin.button}
            startIcon={<MetaMaskIcon />}
          >
            Login with MetaMask
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export const stylesLogin = {
  paperContainer: css`
    box-shadow: -12px 0 4px rgba(0, 0, 0, 0.2), 0 12px 4px rgba(0, 0, 0, 0.2);
    border: 1px solid black;
    border-radius: 50px;
    padding: 4rem;
    background-color: #dae1ff;
    text-align: center;
  `,
  paper: css`
    min-height: 28rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  `,
  textField: css`
    background-color: white;
    margin-bottom: 1rem;
    width: 90%;
    input {
      font-size: 1.4rem;
      text-align: center;
    }
  `,
  button: css`
    height: 2.5rem;
    width: 32%;
    text-transform: none;
    background-color: white;
    border-radius: 5px;
    color: black;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  `,
};
