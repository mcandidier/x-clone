import React from 'react'
import {TextField, Button} from '@mui/material';
import styled from 'styled-components';

function RegisterModal({setOpen, setOpenRegister}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  }

  const handleToggle = () => {
    console.log('toggle');
    setOpenRegister(false);
    setOpen(true);
  }
 
  return (
    <RegisterModalContainer>
      <div className='h-full'>
          <form onSubmit={handleSubmit}> 
              <TextField 
                fullWidth 
                hiddenLabel 
                size="small" 
                placeholder="Email" id="email" 
                className='border-neutral-800 border-x-2 text-white mt-5'/>
              <TextField 
                fullWidth 
                hiddenLabel 
                size="small" 
                placeholder="Name" id="name" 
                className='border-neutral-800 border-x-2 text-white mt-5'/>
              <TextField 
                fullWidth hiddenLabel 
                size="small" 
                placeholder="Password" 
                id="password" 
                className='mt-5 bg-opcatiy-100 text-white  bg-black'/>
              <button type='submit' className='rounded-full bg-white mt-10 py-2 px-2 w-full active:scale-90 transition duration-90'>Create</button>
          </form>
      </div>

      <div className='footer-content text-neutral-400 text-center mt-4 py-3'>
        <p>Already had an account?  
          <span
            onClick={handleToggle} className='text-white cursor-pointer hover:underline inline px-2'>Login</span></p>
      </div>
    </RegisterModalContainer>
  )
}

export default RegisterModal

const RegisterModalContainer = styled.div`
  .MuiInputBase-input {
    &::placeholder {
      color: white;
    }
    border: 1px solid #36454F;
    border-radius: 4px;
    color: white;
  }

  .MuiOutlinedInput-root {
    fieldset {
      display: none;
    }
  }
`