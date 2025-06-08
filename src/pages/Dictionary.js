import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Dictionary() {
  const [termo, setTermo] = useState('');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscar = async (e) => {
    e.preventDefault();
    if (!termo.trim()) return;
    setLoading(true);
    setResultado(null);

    // Simulação de busca (substitua pela sua lógica real)
    setTimeout(() => {
      setResultado({
        palavra: termo,
        significado: 'Significado de exemplo para "' + termo + '".',
        exemplos: ['Exemplo de uso 1.', 'Exemplo de uso 2.'],
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', py: 6 }}>
      <Typography
        variant="h3"
        fontWeight={900}
        align="center"
        sx={{ mb: 1, fontFamily: 'Montserrat, Poppins, Arial, sans-serif' }}
      >
        Dicionário
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Consulte definições e exemplos de palavras em inglês
      </Typography>

      <Box
        component="form"
        onSubmit={buscar}
        display="flex"
        justifyContent="center"
        gap={2}
        mb={4}
      >
        <TextField
          variant="outlined"
          size="medium"
          value={termo}
          onChange={e => setTermo(e.target.value)}
          placeholder="Digite uma palavra em inglês"
          sx={{ maxWidth: 400, flex: 1, bgcolor: '#fafbfc', borderRadius: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          disabled={loading}
          sx={{
            px: 4,
            borderRadius: 3,
            fontWeight: 700,
            fontSize: 16,
            boxShadow: 2,
            textTransform: 'none',
            minHeight: 48,
            minWidth: 160,
          }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : 'Buscar'}
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" mt={3}>
        {resultado && (
          <Card
            elevation={2}
            sx={{
              width: '100%',
              maxWidth: 700,
              borderRadius: 3,
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)',
              p: { xs: 2, sm: 4 },
              bgcolor: '#fff',
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                {resultado.palavra}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {resultado.significado}
              </Typography>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                Exemplos:
              </Typography>
              <Stack spacing={1}>
                {resultado.exemplos.map((ex, idx) => (
                  <Typography key={idx} variant="body2" color="text.secondary">
                    {ex}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}

export default Dictionary;