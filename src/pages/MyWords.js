import React, { useEffect, useState } from 'react';
import Flashcards from '../components/Flashcards';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Snackbar,
  Stack,
  Grid,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StyleIcon from '@mui/icons-material/Style';
import QuizIcon from '@mui/icons-material/Quiz';

function MyWords() {
  const [palavra, setPalavra] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [palavras, setPalavras] = useState([]);
  const [mostrarFlashcards, setMostrarFlashcards] = useState(false);

  useEffect(() => {
    const palavrasSalvas = JSON.parse(localStorage.getItem('myWords') || '[]');
    setPalavras(palavrasSalvas);
  }, []);

  const adicionarPalavra = () => {
    if (palavra.trim()) {
      const palavrasSalvas = JSON.parse(localStorage.getItem('myWords') || '[]');
      palavrasSalvas.push(palavra);
      localStorage.setItem('myWords', JSON.stringify(palavrasSalvas));
      setPalavras(palavrasSalvas);
      setPalavra('');
      setMensagem('Palavra adicionada!');
    }
  };

  const removerPalavra = (indice) => {
    const novasPalavras = [...palavras];
    novasPalavras.splice(indice, 1);
    localStorage.setItem('myWords', JSON.stringify(novasPalavras));
    setPalavras(novasPalavras);
    setMensagem('Palavra removida!');
  };

  const handleCloseSnackbar = () => setMensagem('');

  return (
    <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', py: 6 }}>
      {/* Título centralizado */}
      <Typography
        variant="h3"
        fontWeight={900}
        align="center"
        sx={{ mb: 1, fontFamily: 'Montserrat, Poppins, Arial, sans-serif' }}
      >
        Minhas Palavras
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Gerencie e pratique seu vocabulário
      </Typography>

      {/* Formulário de adicionar palavra */}
      <Box
        component="form"
        onSubmit={e => {
          e.preventDefault();
          adicionarPalavra();
        }}
        display="flex"
        justifyContent="center"
        gap={2}
        mb={4}
      >
        <TextField
          variant="outlined"
          size="medium"
          value={palavra}
          onChange={e => setPalavra(e.target.value)}
          placeholder="Digite uma palavra em inglês"
          sx={{ maxWidth: 400, flex: 1, bgcolor: '#fafbfc', borderRadius: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            px: 4,
            borderRadius: 3,
            fontWeight: 700,
            fontSize: 16,
            boxShadow: 2,
            textTransform: 'none',
          }}
        >
          Adicionar
        </Button>
      </Box>

      {/* Botão de flashcards */}
      <Box display="flex" justifyContent="center" mb={mostrarFlashcards ? 2 : 4}>
        <Button
          variant={mostrarFlashcards ? "outlined" : "contained"}
          startIcon={<QuizIcon />}
          onClick={() => setMostrarFlashcards(!mostrarFlashcards)}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 700,
            fontSize: 16,
            boxShadow: mostrarFlashcards ? 'none' : 2,
            textTransform: 'none',
            bgcolor: mostrarFlashcards ? '#fff' : 'primary.main',
            color: mostrarFlashcards ? 'primary.main' : '#fff',
            border: mostrarFlashcards ? '2px solid #1976d2' : 'none',
            '&:hover': {
              bgcolor: mostrarFlashcards ? '#f5faff' : 'primary.dark',
              color: 'primary.main',
            },
          }}
        >
          {mostrarFlashcards ? 'Fechar Flashcards' : 'Praticar com Flashcards'}
        </Button>
      </Box>

      {/* Flashcards - agora logo abaixo do botão */}
      {mostrarFlashcards && (
        <Flashcards palavras={palavras} />
      )}

      {/* Lista de palavras */}
      <Grid container spacing={3} justifyContent="center">
        {palavras.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" align="center">
              Nenhuma palavra cadastrada ainda.
            </Typography>
          </Grid>
        )}
        {palavras.map((p, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card
              elevation={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 3,
                py: 2,
                borderRadius: 3,
                bgcolor: '#fff',
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)',
              }}
            >
              {/* Imagem ilustrativa opcional */}
              {/* <Box
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: '#f5f5f5',
                  borderRadius: 2,
                  mr: 3,
                  background: 'url(/img/flashcard.svg) center/cover no-repeat'
                }}
              /> */}
              <Box flex={1}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                  {p}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Clique no ícone para remover esta palavra.
                </Typography>
              </Box>
              <CardActions>
                <IconButton color="error" onClick={() => removerPalavra(i)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar para feedback */}
      <Snackbar
        open={!!mensagem}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={mensagem}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}

export default MyWords;