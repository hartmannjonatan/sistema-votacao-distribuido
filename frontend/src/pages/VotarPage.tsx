import React from "react";
import {
  Box,
  Button,
  Container,
  css,
  FormControl,
  FormHelperText,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { stylesLogin } from "./Login";
import { CandidatoModel, candidatosFakes } from "../features/votar/votar-model";
import { useForm } from "react-hook-form";

export default function VotarPage() {
  const options = candidatosFakes;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CandidatoModel>();

  const selectedId = watch("id");

  const onSubmit = (data: CandidatoModel) => {
    const candidato = options.find((c) => c.id === data.id);
    console.log("Candidato selecionado:", candidato);
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={10}
        sx={[stylesLogin.paperContainer, stylesVotar.paper]}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          ChainSAFE-Poll
        </Typography>
        <Typography variant="h6">Choose your candidate:</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl component="fieldset" error={!!errors.id}>
            <RadioGroup
              value={selectedId || ""}
              onChange={(e) => setValue("id", Number(e.target.value))}
            >
              {options.map((candidato) => (
                <Box
                  key={candidato.id}
                  sx={stylesVotar.optionBox}
                  onClick={() => setValue("id", candidato.id)}
                >
                  <Radio
                    value={candidato.id}
                    checked={selectedId === candidato.id}
                    {...register("id", { required: "Required field" })}
                    color="primary"
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={[
                      stylesVotar.optionLabel,
                      selectedId === candidato.id && stylesVotar.selectedOption,
                    ]}
                  >
                    {candidato.name}
                  </Typography>
                </Box>
              ))}
            </RadioGroup>
            {errors.id && <FormHelperText>{errors.id.message}</FormHelperText>}
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={stylesVotar.button}
          >
            Vote
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

const stylesVotar = {
  paper: css`
    min-height: 40rem;
  `,
  optionBox: css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 35rem;
    border-radius: 16px;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
  `,
  optionLabel: css`
    margin-left: 0.5rem;
    background-color: white;
    width: 100%;
    padding: 1rem;
    border-radius: 10px;
    text-align: left;
  `,
  selectedOption: css`
    border: 1px solid black;
  `,
  button: css`
    height: 2.5rem;
    width: 25%;
    text-transform: none;
    background-color: white;
    border-radius: 5px;
    color: black;
    margin: 0 auto;
    margin-top: 2rem;
  `,
};
