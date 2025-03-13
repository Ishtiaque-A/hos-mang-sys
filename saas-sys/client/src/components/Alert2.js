import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = ({ open, onClose, message }) => {
 return (
   <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
     <MuiAlert onClose={onClose} variant="filled" severity="error" sx={{ width: '100%' }}>
       {message}
     </MuiAlert>
   </Snackbar>
 );
};


export default Alert;
