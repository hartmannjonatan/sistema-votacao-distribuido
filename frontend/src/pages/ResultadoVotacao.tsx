import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Typography, Paper, Container, css } from "@mui/material";
import { stylesLogin } from "./Login";
import { useFetchCandidates } from "../hooks/useFetchCandidates";
import { useVotingContract } from "../hooks/useVotingContract";
import { Navigate } from "react-router-dom";

const cores = ["#f54e68", "#7b5cf5", "#00e676", "#ffee58"];

export default function ResultadoVotacao() {
  const { isVoted } = useVotingContract();
  const { candidates, fetchCandidates } = useFetchCandidates();

  useEffect(() => {
    fetchCandidates();
  });

  const totalVotos = candidates.reduce(
    (sum, candidato) => sum + candidato.voteCount,
    0
  );

  const data = candidates.map((candidato, index) => ({
    name: candidato.name.split(" ")[0],
    votos: candidato.voteCount,
    percent: ((candidato.voteCount / totalVotos) * 100).toFixed(2),
    fill: cores[index % cores.length],
  }));

  if (!isVoted) {
    return <Navigate to="/votar" replace />;
  }

  return (
    <Container maxWidth="md">
      <Paper
        elevation={10}
        sx={[stylesLogin.paperContainer, stylesResultado.paper]}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          ChainSAFE-Poll
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={400}
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            paddingTop: "1rem",
          }}
        >
          <BarChart data={data} barSize={80}>
            <YAxis
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
              tick={{ fontSize: 14 }}
            />
            <XAxis dataKey="name" tick={{ fontSize: 14 }} />
            <Tooltip formatter={(value) => [`${value}%`, "Porcentagem"]} />
            <Bar
              dataKey="percent"
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            ></Bar>
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  );
}

const stylesResultado = {
  paper: css`
    min-height: 40rem;
  `,
};
