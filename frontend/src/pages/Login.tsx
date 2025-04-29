import {
  Button,
  Container,
  css,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { MetaMaskIcon } from "../components/MetaMaskIcon";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginFormModel } from "../features/login/login-model";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormModel>();

  const navigate = useNavigate();

  const onSubmit = (data: LoginFormModel) => {
    console.log("Endereço inserido:", data.address);
    localStorage.setItem("userAddress", data.address);
    navigate("/votar");
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={10}
        sx={[stylesLogin.paperContainer, stylesLogin.paper]}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          ChainSAFE-Poll
        </Typography>
        <Typography variant="h6">Enter chain address:</Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            sx={stylesLogin.textField}
            {...register("address", {
              required: "Required field",
            })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={stylesLogin.button}
            startIcon={<MetaMaskIcon />}
          >
            Login with MetaMask
          </Button>
        </form>
      </Paper>
    </Container>
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
    margin-bottom: 1rem;
    width: 90%;
    input {
      background-color: white;
      font-size: 1.4rem;
      text-align: center;
    }
  `,
  form: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
