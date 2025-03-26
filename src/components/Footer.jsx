import React from 'react';
import Box from '@mui/material/Box';

const Footer = () => {
    return(
        <Box 
        component="footer" 
        sx={{
            backgroundColor:"#BECE31",
            width:"100%",
            height:"30px",
            position:"fixed",
            bottom:"0",
        }}
        />
    )
}

export default Footer;