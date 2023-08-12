import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function InfoBars({open,setOpen,text,duration=4000}) {
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }} >
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}
       anchorOrigin={{ vertical:'top', horizontal:'center' }}
 >
        <Alert  onClose={handleClose} severity="info" sx={{ width: '100%' }} >
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}