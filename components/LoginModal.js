import axios from 'axios';
import React, { useState} from 'react'
import {TextField, Button} from '@mui/material';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { setCurrentUser } from '@/store/user-slice';
import { useDispatch } from 'react-redux';

function LoginModal({setOpen, setOpenRegister}) {
  const [hasError, setHasError]  = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();


  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/accounts/login/",
        {
          username: e.target.username.value,
          password: e.target.password.value,
        }
      );
      const token = res.data.token;
      setCookie(null, 'token', token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });

      dispatch(setCurrentUser(res.data));

      setHasError(false);
      setOpen(false);

      // redirect the user to the dashboard page
      router.push('/');
    } catch (err) {
      setHasError(true);
    }
  }

  const handleToggle = () => {
    setOpen(false);
    setOpenRegister(true);
  }
 
  return (
    <LoginModalContainer>
      <div className='h-full'>
          <form onSubmit={handleSubmit}> 
              <TextField 
                name="username" 
                fullWidth 
                hiddenLabel 
                size="small" 
                placeholder="Username" 
                required
                type={'text'}
                className='border-neutral-800 border-x-2 text-white '/>
              <TextField 
                name="password" 
                fullWidth 
                hiddenLabel 
                size="small" 
                placeholder="Password" 
                required
                type='password'
                className='mt-5 bg-opcatiy-100 text-white  bg-black'/>

              { hasError && 
                <p className='text-lime-600 text-sm mt-4'>Wrong password. Try again or click Forgot password to reset it.</p>
              }
              <button type='submit' 
                className='rounded-full bg-white mt-4 py-2 px-2 w-full active:scale-90 transition duration-90'>
                  Signin
              </button>
          </form>
      </div>

      <div className='footer-content text-neutral-400 text-center mt-4 py-3'>
        <p>First time using twitter?  
          <span
            onClick={handleToggle} className='text-white cursor-pointer hover:underline inline px-2'>Create an account</span></p>
      </div>
    </LoginModalContainer>
  )
}

export default LoginModal

const LoginModalContainer = styled.div`
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