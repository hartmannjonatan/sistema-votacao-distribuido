import {
  Box,
  Button,
  Container,
  css,
  FormControl,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { stylesLogin } from "./Login";
import { useState } from "react";

export default function VotarPage() {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const [selected, setSelected] = useState("");
  return (
    <>
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={[stylesLogin.paperContainer, stylesVotar.paper]}
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            ChainSAFE-Poll
          </Typography>
          <Typography variant="h6">Choose your candidate:</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {options.map((opt) => (
                <Box
                  key={opt}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "35rem",

                    borderRadius: 2,
                    marginTop: 1,
                    px: 2,
                    py: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => setSelected(opt)}
                >
                  <Radio
                    checked={selected === opt}
                    onChange={() => setSelected(opt)}
                    value={opt}
                    color="primary"
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                      ml: 1,
                      backgroundColor: "white",
                      width: "100%",
                      height: "100%",
                      padding: 2,
                      borderRadius: "10px",
                      textAlign: "left",
                    }}
                  >
                    {opt}
                  </Typography>
                </Box>
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            component={Link}
            to="/votar"
            fullWidth
            variant="contained"
            sx={stylesVotar.button}
          >
            Vote
          </Button>
        </Paper>
      </Container>
    </>
  );
}

const stylesVotar = {
  paper: css`
    min-height: 40rem;
  `,
  radio: css`
    width: 20rem;
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
