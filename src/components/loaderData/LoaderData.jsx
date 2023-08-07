import React, { useState, useEffect } from 'react';
import { CircularProgress, Fade, FormLabel, TextField } from '@mui/material';
function LoaderData() {   

  return (
    <div className='bg-black opacity-60 flex justify-center items-center absolute top-0 left-0 z-50 h-[100vh] w-[100vw]'>    
        <Fade
    in={true}
   
    style={{
      transitionDelay: '80ms',
      
    }}
    unmountOnExit
  >
    <CircularProgress  color='primary' size={60}  />
  </Fade></div>
  )
}

export default LoaderData