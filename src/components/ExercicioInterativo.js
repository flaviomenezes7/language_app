import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Paper } from '@mui/material';

function extrairJson(texto) {
  const match = texto.match(/\{[\s\S]*\}/);
  if (match) {
    return match[0];
  }
  return null;
}

function ExercicioInterativo({ exercicioJson }) {
  const [respostas, setRespostas] = useState({});
  const [feedback, setFeedback] = useState({});
  const [enviando, setEnviando] = useState(false);

  let exercicio;
  try {
    const jsonString = extrairJson(exercicioJson);
    exercicio = JSON.parse(jsonString);
  } catch (e) {
    return <div>Erro ao interpretar o exercício.</div>;
  }

  if (!exercicio.questoes || !Array.isArray(exercicio.questoes)) {
    return <div>Exercício inválido ou não encontrado.</div>;
  }

  const handleChange = (idx, value) => {
    setRespostas({ ...respostas, [idx]: value });
  };

  const enviarRespostas = async () => {
    setEnviando(true);
    const novoFeedback = {};
    for (let idx = 0; idx < exercicio.questoes.length; idx++) {
      const questao = exercicio.questoes[idx];
      const resposta = respostas[idx];
      const res = await fetch('http://localhost:5000/api/corrigir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questao, resposta }),
      });
      const data = await res.json();
      novoFeedback[idx] = data;
    }
    setFeedback(novoFeedback);
    setEnviando(false);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        {exercicio.titulo}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {exercicio.descricao}
      </Typography>
      {exercicio.questoes.map((q, idx) => (
        <Paper
          key={idx}
          elevation={feedback[idx] ? 3 : 1}
          sx={{
            mb: 3,
            p: 2,
            border: feedback[idx]
              ? feedback[idx].correta
                ? '2px solid #22c55e'
                : '2px solid #ef4444'
              : 'none',
            background: feedback[idx]
              ? feedback[idx].correta
                ? '#e0ffe6'
                : '#ffe0e0'
              : '#fff'
          }}
        >
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>
              {q.pergunta || q.frase}
            </FormLabel>
            {q.tipo === 'multipla_escolha' ? (
              <RadioGroup
                name={`q${idx}`}
                value={respostas[idx] ?? ''}
                onChange={e => handleChange(idx, e.target.value)}
              >
                {q.alternativas.map((alt, i) => (
                  <FormControlLabel
                    key={i}
                    value={String(i)}
                    control={<Radio disabled={!!feedback[idx]} />}
                    label={alt}
                    sx={{ mb: 0.5 }}
                  />
                ))}
              </RadioGroup>
            ) : (
              <TextField
                multiline
                minRows={2}
                fullWidth
                value={respostas[idx] || ''}
                onChange={e => handleChange(idx, e.target.value)}
                disabled={!!feedback[idx]}
                sx={{ mt: 1 }}
              />
            )}
          </FormControl>
          {feedback[idx] && (
            <Typography
              sx={{
                mt: 2,
                color: feedback[idx].correta ? '#22c55e' : '#ef4444',
                fontWeight: 'bold'
              }}
            >
              {feedback[idx].correta
                ? 'Correto!'
                : (
                  <>
                    Incorreto.
                    <Typography sx={{ fontWeight: 'normal', color: '#b91c1c', mt: 1 }}>
                      {feedback[idx].explicacao}
                    </Typography>
                  </>
                )
              }
            </Typography>
          )}
        </Paper>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={enviarRespostas}
        disabled={enviando || Object.keys(feedback).length === exercicio.questoes.length}
        sx={{ mt: 2, fontWeight: 'bold', fontSize: 16 }}
      >
        {enviando ? 'Enviando...' : 'Enviar Respostas'}
      </Button>
    </Box>
  );
}

export default ExercicioInterativo;