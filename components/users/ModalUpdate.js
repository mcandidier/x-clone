import React, { useState} from 'react'
import {TextField, Button} from '@mui/material';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { setCurrentUser } from '@/store/user-slice';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import API from '@/libs/api';

import { toast } from 'react-hot-toast';

function ModalUpdate({setOpen}) {
  const { control, handleSubmit, register, formState: { errors }, setError } = useForm();
  const [selectedDate, setSelectedDate] = useState();

  const handleToggle = () => {
    setOpen(false);
  }
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();

    API.put('/accounts/profile/', data).then( res => {
      toast.success('Profile successfully updated');
      setOpen(false);
    });
  }
 
  return (
    <ModalUpdateContainer>
      <div className='h-full'>
          <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth 
                    hiddenLabel
                    size="small" 
                    placeholder="Bio" 
                    {...register('bio', { required: 'Bio is required' })}
                    error={!!errors.bio}
                    helperText={errors.bio?.message}
                    className='border-neutral-800 border-x-2 text-white mt-2x'/>

                <TextField
                    fullWidth 
                    hiddenLabel
                    size="small" 
                    placeholder="Location" 
                    {...register('location', { required: 'Location is required' })}
                    error={!!errors.location}
                    helperText={errors.location?.message}
                    className='border-neutral-800 border-x-2 text-white mt-2'/>

                <LocalizationProvider dateAdapter={AdapterDateFns}>

                <Controller
                  control={control}
                  name="selectedDate"
                  rules={{ required: 'Date is required' }}
                  fullWidth
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      value={field.value || null}
                      onChange={(value) => field.onChange(value)}
                      renderInput={(params) => <TextField 
                      {...params} 
                      error={errors.selectedDate}
                      helperText={errors.selectedDate?.message}
                      />}
                    />
                  )}
                />
                {errors.selectedDate && <span className='flex flex-row  mt-1 px-4 text-xs error'>{errors.selectedDate.message}</span>}
              </LocalizationProvider>

              <button type='submit' 
                className='rounded-full bg-white mt-4 py-2 px-2 w-full active:scale-90 transition duration-90'>
                  Update
              </button>
          </form>
      </div>
    </ModalUpdateContainer>
  )
}

export default ModalUpdate;


const ModalUpdateContainer = styled.div`
  .MuiInputBase-input {
    &::placeholder {
      color: white;
    }
    border: 1px solid #36454F;
    border-radius: 4px;
    color: white;
    margin-top: 12px;
  }

  .MuiOutlinedInput-root {
    fieldset {
      display: none;
    }
  }

  .MuiIconButton-edgeEnd {
    color: #fff;
  }
  .MuiInputBase-formControl {
    width: 100%;
  }
`