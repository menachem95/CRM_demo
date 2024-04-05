import { Paper, Typography, Button, Box, List, ListItem, ListItemIcon, ListItemText, Popover } from "@mui/material";
import React, { FC } from "react";

import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface PopoverProps {

}

const CustomPopover: FC<PopoverProps> = () => {
  return (
    // <Popover
    //   open={open}
    //   anchorEl={anchorEl}
    //   onClose={handleClose}
    //   anchorOrigin={{
    //     vertical: 'bottom',
    //     horizontal: 'center',
    //   }}
    //   transformOrigin={{
    //     vertical: 'top',
    //     horizontal: 'center',
    //   }}
    //   sx={{
    //     '.MuiPopover-paper': {
    //       p: 2,
    //       maxWidth: 300,
    //     },
    //   }}
    // >
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <AccountCircleIcon color="action" sx={{ mr: 1 }} />
        <Box>
          <Typography variant="subtitle1">Yoni Levy</Typography>
          <Typography variant="caption" display="block" gutterBottom>
            customer
          </Typography>
        </Box>
      </Box>
      <List dense>
        <ListItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Email" secondary="test@test.com" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary="Phone" secondary="058-9662754" />
        </ListItem>
      </List>
      <Button
        variant="contained"
        sx={{
          mt: 1,
          mr: 1,
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
        startIcon={<MoreHorizIcon />}
      >
        More details
      </Button>
      <Button
        variant="outlined"
        sx={{
          mt: 1,
          mr: 1,
          borderColor: 'primary.main',
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.light',
          },
        }}
      >
        Create a Deal
      </Button>
      <Button
        variant="outlined"
        sx={{
          mt: 1,
          borderColor: 'primary.main',
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.light',
          },
        }}
      >
        Schedule a meeting
      </Button>
      </>
    // </Popover>
  );
};

export default CustomPopover;
