import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import  AccountCircleIcon  from '@mui/icons-material/AccountCircle';
import  IconButton  from '@mui/material/IconButton';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

    function logout(){
        localStorage.removeItem('authenticated');
        useNavigate('/');
      }

    return(
        <AppBar sx={{backgroundColor:"#BECE31"}}>
            <Toolbar sx={{display:'flex', justifyContent:"flex-end"}}>
                <IconButton color="inherit" onClick={logout}>
                    <AccountCircleIcon fontSize="large" />
                </IconButton>
            </Toolbar>
        </AppBar>
    )

}

export default Header;