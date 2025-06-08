import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Alert,
} from '@mui/material';

function Flashcards({ palavras = [] }) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [opcoes, setOpcoes] = useState([]);
  const [indiceCorreta, setIndiceCorreta] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [resposta, setResposta] = useState(null);
  const [indiceEscolhido, setIndiceEscolhido] = useState(null);
  const [mensagem, setMensagem] = useState('');

  // Busca opções para a palavra atual
  useEffect(() => {
    if (palavras.length === 0 || indiceAtual >= palavras.length) return;
    const buscarOpcoes = async () => {
      setCarregando(true);
      setOpcoes([]);
      setResposta(null);
      setIndiceEscolhido(null);
      setMensagem('');
      try {
        console.log('[LOG] Buscando opções para:', palavras[indiceAtual]);
        const resp = await fetch('/api/flashcard_opcoes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ palavra: palavras[indiceAtual] }),
        });
        const data = await resp.json();
        console.log('[LOG] Resposta recebida:', data);
        if (data.opcoes && typeof data.correta === 'number') {
          setOpcoes(data.opcoes);
          setIndiceCorreta(data.correta);
        } else {
          setMensagem('Não foi possível gerar as opções.');
        }
      } catch (e) {
        console.error('[ERRO] Falha ao buscar opções:', e);
        setMensagem('Erro ao buscar opções.');
      }
      setCarregando(false);
    };
    buscarOpcoes();
  }, [indiceAtual, palavras]);

  const verificarResposta = async (indice) => {
    setIndiceEscolhido(indice);
    const resp = await fetch('/api/verificar_flashcard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ indice_escolhido: indice, indice_correto: indiceCorreta }),
    });
    const data = await resp.json();
    setResposta(data);
    setMensagem(data.explicacao);
  };

  const proximoFlashcard = () => {
    setIndiceAtual((prev) => prev + 1);
    setOpcoes([]);
    setResposta(null);
    setIndiceEscolhido(null);
    setMensagem('');
  };

  if (palavras.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <Typography>Adicione palavras para praticar com flashcards.</Typography>
      </Box>
    );
  }

  if (indiceAtual >= palavras.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <Card sx={{ minWidth: 350, maxWidth: 420, p: 2, borderRadius: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
              Parabéns!
            </Typography>
            <Typography align="center" sx={{ mb: 2 }}>
              Você concluiu todos os flashcards das suas palavras.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setIndiceAtual(0)}
              fullWidth
            >
              Praticar Novamente
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
      <Card sx={{ minWidth: 350, maxWidth: 420, p: 2, borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} align="center" sx={{ mb: 2 }}>
            Flashcards
          </Typography>
          <Typography align="center" sx={{ mb: 2 }}>
            Palavra {indiceAtual + 1} de {palavras.length}
          </Typography>
          <Typography align="center" sx={{ mb: 2 }}>
            Qual é a tradução correta para <b>{palavras[indiceAtual]}</b>?
          </Typography>
          {carregando ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
              <CircularProgress />
            </Box>
          ) : opcoes.length > 0 ? (
            <>
              <Stack spacing={2}>
                {opcoes.map((op, idx) => (
                  <Button
                    key={idx}
                    variant={indiceEscolhido === idx ? 'contained' : 'outlined'}
                    color={
                      resposta && indiceEscolhido === idx
                        ? resposta.correta
                          ? 'success'
                          : 'error'
                        : 'primary'
                    }
                    onClick={() => verificarResposta(idx)}
                    disabled={!!resposta}
                  >
                    {op}
                  </Button>
                ))}
              </Stack>
              {resposta && (
                <Alert
                  severity={resposta.correta ? 'success' : 'warning'}
                  sx={{ mt: 3, fontWeight: 700 }}
                >
                  {mensagem}
                </Alert>
              )}
              {resposta && (
                <Button
                  sx={{ mt: 3 }}
                  variant="contained"
                  onClick={proximoFlashcard}
                  fullWidth
                >
                  Próxima Palavra
                </Button>
              )}
            </>
          ) : (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Nenhuma opção disponível para esta palavra. Tente novamente ou adicione outra palavra.
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Flashcards;