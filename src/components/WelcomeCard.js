import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const features = [
  {
    icon: <StarIcon sx={{ color: '#FFD600', fontSize: 32 }} />,
    title: 'Minhas Palavras',
    description: "Cadastre e gerencie seu próprio vocabulário.",
  },
  {
    icon: <AssignmentIcon sx={{ color: '#43A047', fontSize: 32 }} />,
    title: 'Exercícios',
    description: "Gere exercícios interativos adaptados ao seu nível e pratique quantas vezes quiser.",
  },
  {
    icon: <TrendingUpIcon sx={{ color: '#1976d2', fontSize: 32 }} />,
    title: 'Progresso',
    description: "Veja seu histórico e avance no seu aprendizado!",
  },
];

function WelcomeCard() {
  return (
    <Card
      sx={{
        maxWidth: 1100,
        width: '100%',
        boxShadow: 8,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: '#fafbfc',
      }}
    >
      {/* Degradê sutil no topo */}
      <Box
        sx={{
          height: 8,
          width: '100%',
          background: 'linear-gradient(90deg, #1976d2 0%, #43A047 50%, #FFD600 100%)',
        }}
      />
      <CardContent>
        {/* Título aprimorado */}
        <Box sx={{ mb: 2, mt: 1 }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontWeight: 900,
              fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
              color: '#1976d2',
              letterSpacing: 2,
              textTransform: 'uppercase',
              lineHeight: 1.1,
              mb: 0,
            }}
          >
            Bem-vindo ao
          </Typography>
          <Typography
            variant="h1"
            align="center"
            sx={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontWeight: 900,
              fontSize: { xs: '2.8rem', sm: '3.8rem', md: '4.2rem' },
              color: '#43A047',
              letterSpacing: 3,
              textTransform: 'uppercase',
              lineHeight: 1.05,
              mt: -1,
              mb: 1,
              textShadow: '0 2px 8px #0001',
            }}
          >
            Language App
          </Typography>
        </Box>
        <Typography
          variant="body1"
          align="center"
          sx={{
            mb: 4,
            color: '#555',
            fontFamily: 'Roboto, Arial, sans-serif',
          }}
        >
          Aprenda inglês de forma <b>personalizada</b> e <b>eficiente</b>. Adicione palavras, pratique com exercícios inteligentes e acompanhe seu progresso.
        </Typography>
        <Grid container spacing={3} justifyContent="center" sx={{ mb: 2 }}>
          {features.map((item, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: '#fff',
                  borderRadius: 3,
                  boxShadow: 1,
                  height: 150, // altura fixa para todas as caixas
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'box-shadow 0.2s',
                  border: '1px solid #eee',
                  '&:hover': {
                    boxShadow: 4,
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: '#fff',
                    mb: 1,
                    width: 48,
                    height: 48,
                    border: '2px solid #e0e0e0',
                    boxShadow: 1,
                  }}
                >
                  {item.icon}
                </Avatar>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5, color: '#222', fontSize: 16 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ fontSize: 13 }}>
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 2,
            color: 'text.secondary',
            fontFamily: 'Roboto, Arial, sans-serif',
          }}
        >
          Use o menu lateral para navegar pelas funcionalidades do app.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default WelcomeCard;