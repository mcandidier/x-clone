import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function CommonDialog({open, setOpen, component:Component, title, size}) {

  const handleOnClose = (e, reason) => {
    if(reason === 'backdropClick') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  return (
    <div>
      <Dialog  open={open} 
        fullWidth
        maxWidth={size} 
        onClose={handleOnClose}
        className='bg-neutral-700 bg-opacity-70'> 
        <DialogTitle id={title} className='bg-black'>
          <span className='text-white'>{title}</span>
        </DialogTitle>
        <DialogContent className='bg-black'>
          {Component}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CommonDialog