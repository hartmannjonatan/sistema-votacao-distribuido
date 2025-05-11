import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
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
import { CandidatoModel } from "../features/votar/votar-model";
import { useForm } from "react-hook-form";
import ConfirmacaoVotoModal from "../components/ModalConfirmacaoVoto";
import { limitarTexto } from "../features/votar/votar-utils";
import { useFetchCandidates } from "../hooks/useFetchCandidates";
import { useVotingContract } from "../hooks/useVotingContract";
import { Navigate } from "react-router-dom";

// Página de votação onde o usuário pode selecionar um candidato e confirmar seu voto.
// Caso o usuário já tenha votado, é redirecionado automaticamente para os resultados.
export default function VotarPage() {
  const { candidates, fetchCandidates } = useFetchCandidates(); // Hook para buscar os candidatos
  const { isVoted } = useVotingContract(); // Verifica se o usuário já votou

  const options = candidates;

  useEffect(() => {
    fetchCandidates(); // Busca os candidatos ao carregar a página
  });

  const [open, setOpen] = useState(false); // Controla abertura do modal de confirmação
  const [candidatoSelecionado, setCandidatoSelecionado] =
    useState<CandidatoModel | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CandidatoModel>();

  const selectedId = watch("id"); // Observa o id do candidato selecionado

  const onSubmit = (data: CandidatoModel) => {
    const candidato = options.find((c) => c.id === data.id);
    setCandidatoSelecionado(candidato || null);
    setOpen(true);
  };

  if (isVoted) {
    return <Navigate to="/resultadoVotacao" replace />; // Redireciona se o usuário já votou
  }

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
        {candidates && candidates.length > 1 ? (
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
                        selectedId === candidato.id &&
                          stylesVotar.selectedOption,
                      ]}
                    >
                      {limitarTexto(candidato?.name)}
                    </Typography>
                  </Box>
                ))}
              </RadioGroup>
              {errors.id && (
                <FormHelperText>{errors.id.message}</FormHelperText>
              )}
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
        ) : (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}
      </Paper>

      <ConfirmacaoVotoModal
        open={open}
        onClose={() => setOpen(false)}
        candidato={candidatoSelecionado}
      />
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
