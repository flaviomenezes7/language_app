import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';

const drawerWidth = 220;

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'My Words', icon: <BookIcon />, path: '/my-words' },
  { text: 'Exercises', icon: <AssignmentIcon />, path: '/exercises' },
  { text: 'Dictionary', icon: <MenuBookIcon />, path: '/dicionario' },
  { text: 'About', icon: <InfoIcon />, path: '/about' },
];

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map(item => (
          <ListItem button component={Link} to={item.path} key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;