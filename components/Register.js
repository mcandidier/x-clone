import React from 'react'
import {TextField, Button} from '@mui/material';
import styled from 'styled-components';

import API from '@/libs/api';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/store/user-slice';


function RegisterModal({setOpen, setOpenRegister}) {
  const { handleSubmit, register, formState: { errors }, setError } = useForm();
  const router = useRouter();

  const dispatch = useDispatch();


  const onSubmit = async (data) => {
    console.log('submit');
    try {
      const res = await API.post('accounts/register/', data);
      setCookie(null, 'token', res.data.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });
      dispatch(setCurrentUser(res.data))
      toast.success('Account successfully created')
      router.push('/');
    } catch (err) {
      toast.error('Something went wrong.')
      Object.keys(err.response.data).forEach((field) => {
        setError(field, {
          type: 'remote',
          message: err.response.data[field],
        });
      });
      
    }
  }

  const handleToggle = () => {
    console.log('toggle');
    setOpenRegister(false);
    setOpen(true);
  }
 
  


  return (
    <RegisterModalContainer>
      <div className='h-full'>
          <form onSubmit={handleSubmit(onSubmit)}> 
            <TextField
              fullWidth 
              hiddenLabel
              size="small" 
              placeholder="Username" 
              {...register('username', { required: 'Username is required' })}
              error={!!errors.username}
              helperText={errors.username?.message}
              className='border-neutral-800 border-x-2 text-white mt-5'/>

            <TextField
              {...register('email', {
                 required: 'Email is required',
                 pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Invalid email format',
                  },
                })}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth 
              hiddenLabel 
              size="small"
              type="email"
              placeholder="Email" 
              className='border-neutral-800 border-x-2 text-white mt-5'/>

            <TextField
              type="password"
              fullWidth 
              hiddenLabel
              size="small" 
              placeholder="Password" 
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password?.message}
              className='border-neutral-800 border-x-2 text-white mt-5'/>



              {/* <TextField 
                fullWidth 
                hiddenLabel 
                size="small" 
                placeholder="Email" id="email" 
                name="email"
                type="email"
                className='border-neutral-800 border-x-2 text-white mt-5'/>
             
             
              <TextField 
                fullWidth 
                hiddenLabel 
                size="small" 
                placeholder="Name" id="name" 
                name="username"
                className='border-neutral-800 border-x-2 text-white mt-5'/>
              
              <TextField 
                fullWidth hiddenLabel 
                size="small" 
                placeholder="Password" 
                id="password" 
                name="password"
                className='mt-5 bg-opcatiy-100 text-white  bg-black'/> */}
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