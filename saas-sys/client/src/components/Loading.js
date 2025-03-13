import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { neutral, success } from "src/theme/colors";


const Loading = () => {
 return (
   <div
     style={{
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       height: '100vh',
       color:"red" 
     }}
   >
   <CircularProgress size={60} sx={{color:success.primary}} />
   </div>
 );
};


export default Loading;
