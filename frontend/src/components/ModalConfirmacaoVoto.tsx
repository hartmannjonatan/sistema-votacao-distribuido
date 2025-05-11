import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  css,
  Box,
  CircularProgress,
} from "@mui/material";
import { CandidatoModel } from "../features/votar/votar-model";
import { limitarTexto } from "../features/votar/votar-utils";
import { useNavigate } from "react-router-dom";
import { useVote } from "../hooks/useVote";

interface ConfirmacaoVotoModalProps {
  open: boolean;
  onClose: () => void;
  candidato?: CandidatoModel | null;
}

// Componente de modal de confirmação de voto que exibe os dados do candidato selecionado
// e permite confirmar ou cancelar a ação de votação.
export default function ConfirmacaoVotoModal({
  open,
  onClose,
  candidato,
}: ConfirmacaoVotoModalProps) {
  const navigate = useNavigate(); // Hook para navegação entre rotas

  const { vote } = useVote(); // Hook customizado que executa a lógica de voto

  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para controlar o carregamento

  const onClickConfirm = async () => {
    setIsLoading(true);
    await vote(candidato?.id!!); // Executa a função de voto com o ID do candidato
    setIsLoading(false);
    navigate("/resultadoVotacao");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: stylesConfirmacao.dialog,
      }}
    >
      <DialogTitle>
        <Typography fontWeight="bold" gutterBottom>
          Confirm vote:
        </Typography>
      </DialogTitle>
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4} mb={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DialogContent sx={stylesConfirmacao.dialogContent}>
            <Box sx={stylesConfirmacao.imagemWrapper}>
              <Box sx={stylesConfirmacao.boxImagem}>
                <img
                  src={candidato?.urlImage}
                  alt="candidato"
                  style={stylesConfirmacao.imagem}
                />
              </Box>
            </Box>
            <Typography sx={stylesConfirmacao.contentText}>
              <strong>{limitarTexto(candidato?.name, 300)}</strong>
            </Typography>
          </DialogContent>
          <DialogActions sx={stylesConfirmacao.boxBotoes}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              sx={stylesConfirmacao.button}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={stylesConfirmacao.button}
              onClick={onClickConfirm}
            >
              Confirm
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

const stylesConfirmacao = {
  dialog: css`
    background-color: #dae1ff;
    border-radius: 30px;
    align-items: center;
    justify-content: flex-start;
    width: 35rem;
    border-radius: 16px;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
  `,
  imagemWrapper: css`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  `,
  boxImagem: css`
    width: 10rem;
    height: 10rem;
    border-radius: 16px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 1px solid black;
  `,
  imagem: {
    width: "95%",
    height: "auto",
    borderRadius: "16px",
  },
  button: css`
    height: 2.5rem;
    width: 40%;
    text-transform: none;
    border-radius: 5px;
  `,
  boxBotoes: css`
    justify-content: space-between;
    width: 70%;
  `,
  dialogContent: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  contentText: css`
    font-size: 1.5rem;
    text-align: center;
    padding: 0.8rem;
    width: 73%;
    background-color: white;
    border-radius: 10px;
  `,
};
