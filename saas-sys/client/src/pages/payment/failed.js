import { useCallback, useMemo, useState, useEffect } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';


const Page = () => {


 

  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center', // Horizontal centering
      alignItems: 'center',     // Vertical centering
      height: '100vh',          // This makes the container take up the full viewport height
    }}
  >
    <Box
      sx={{
        width: 600,
        height: 500,
        backgroundColor: 'white',
        
      }}
    >
      <Container>
        <div>
            <div style={{display:"flex",justifyContent:"center",marginTop:"10%"}}>
                <div style={{borderRadius:"200px",height:"200px", width:"200px", background: "#F8FAF5",display:"flex",justifyContent:"center", }}>
                {/* <ClearIcon sx={{fontSize:"8rem",padding:"20px",mt:"15%",color: "red"}}/> */}
                <h1 style={{fontSize:"3rem",padding:"20px",mt:"20%",color: "red"}}>Oops!</h1>
                </div>
            </div>
            <div style={{display:"flex",justifyContent:"center",marginTop:"1%"}}>
                <div><h1 style={{color: "red",}}>Failed</h1></div>
            </div>
            <div style={{display:"flex",justifyContent:"center",marginTop:"-4%"}}>
                <p style={{color: "#404F5E",textAlign:"center"}}> your purchase request is failed;<br /> please try again!</p>
            </div>
        </div>
      </Container>
    </Box>
  </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
