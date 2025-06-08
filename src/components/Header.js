import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Button, Stack } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

// Importe a fonte no index.html ou use sx={{ fontFamily: 'Montserrat, sans-serif' }}
function Header() {
  return (
    <AppBar
      position="fixed"
      elevation={4}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
        minHeight: 64,
        justifyContent: 'center',
      }}
    >
      <Toolbar sx={{ minHeight: 64, width: '100%', px: 2 }}>
        {/* Logo ou ícone */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <MenuBookIcon sx={{ fontSize: 32, color: '#fff', mr: 1 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              letterSpacing: 1,
              color: '#fff',
              fontFamily: 'Montserrat, Poppins, Arial, sans-serif',
            }}
          >
            English Study
          </Typography>
        </Box>

        {/* Menu de navegação */}
        <Stack direction="row" spacing={2} sx={{ flex: 1, justifyContent: 'center' }}>
          <Button color="inherit" sx={{ fontWeight: 700, textTransform: 'none' }}>Home</Button>
          <Button color="inherit" sx={{ fontWeight: 700, textTransform: 'none' }}>Estudo</Button>
          <Button color="inherit" sx={{ fontWeight: 700, textTransform: 'none' }}>Exercícios</Button>
          <Button color="inherit" sx={{ fontWeight: 700, textTransform: 'none' }}>Favoritos</Button>
          <Button color="inherit" sx={{ fontWeight: 700, textTransform: 'none' }}>Dicionário</Button>
        </Stack>

        {/* Ícones à direita */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
