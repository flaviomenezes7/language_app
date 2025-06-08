import React, { useState } from 'react';
import { gerarExercicioGeral } from '../services/ia';
import ExercicioInterativo from '../components/ExercicioInterativo';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

function Exercises() {
  const [nivel, setNivel] = useState('A1');
  const [quantidade, setQuantidade] = useState(3);
  const [exercicios, setExercicios] = useState({});
  const [loading, setLoading] = useState(false);
  const [exercicioKey, setExercicioKey] = useState(0);

  async function gerarExerciciosPorNivel(nivel, quantidade) {
    setLoading(true);
    const resposta = await gerarExercicioGeral(nivel, quantidade);
    setExercicios({ gerais: resposta });
    setExercicioKey(prev => prev + 1); // força o reset do componente filho
    setLoading(false);
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', py: 6 }}>
      {/* Título centralizado */}
      <Typography
        variant="h3"
        fontWeight={900}
        align="center"
        sx={{ mb: 1, fontFamily: 'Montserrat, Poppins, Arial, sans-serif' }}
      >
        Exercícios Gerais
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Pratique seu inglês com exercícios personalizados
      </Typography>

      {/* Formulário de seleção */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        mb={4}
        flexWrap="wrap"
        component="form"
        onSubmit={e => {
          e.preventDefault();
          gerarExerciciosPorNivel(nivel, quantidade);
        }}
      >
        <FormControl sx={{ minWidth: 140 }} size="medium">
          <InputLabel id="nivel-label">Nível</InputLabel>
          <Select
            labelId="nivel-label"
            value={nivel}
            label="Nível"
            onChange={e => setNivel(e.target.value)}
          >
            <MenuItem value="A1">A1 (Iniciante)</MenuItem>
            <MenuItem value="A2">A2 (Básico)</MenuItem>
            <MenuItem value="B1">B1 (Intermediário)</MenuItem>
            <MenuItem value="B2">B2 (Intermediário Avançado)</MenuItem>
            <MenuItem value="C1">C1 (Avançado)</MenuItem>
            <MenuItem value="C2">C2 (Proficiente)</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Quantidade"
          type="number"
          size="medium"
          inputProps={{ min: 1, max: 10 }}
          value={quantidade}
          onChange={e => setQuantidade(Number(e.target.value))}
          sx={{ width: 130, bgcolor: '#fafbfc', borderRadius: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<FitnessCenterIcon />}
          disabled={loading}
          sx={{
            px: 4,
            borderRadius: 3,
            fontWeight: 700,
            fontSize: 16,
            boxShadow: 2,
            textTransform: 'none',
            minHeight: 48,
            minWidth: 180,
            background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
            color: '#fff',
            '&:hover': {
              background: 'linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)',
            },
          }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : 'Gerar Exercícios'}
        </Button>
      </Box>

      {/* Exibição dos exercícios */}
      <Box display="flex" justifyContent="center" mt={3}>
        {exercicios.gerais && (
          <Card
            elevation={2}
            sx={{
              width: '100%',
              maxWidth: 900,
              borderRadius: 3,
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)',
              p: { xs: 2, sm: 4 },
              bgcolor: '#fff',
            }}
          >
            <CardContent>
              <ExercicioInterativo
                exercicioJson={exercicios.gerais}
                key={exercicioKey}
              />
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}

export default Exercises;