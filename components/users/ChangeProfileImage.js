import React, { useState}from 'react';
import { Button, Avatar } from '@mui/material';
import API from '@/libs/api';

import { useDispatch } from 'react-redux';
import { setProfileImage } from '@/store/user-slice';
import { toast } from 'react-hot-toast';


function ChangeProfileImage({setOpen, mutate}) {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  const dispatch = useDispatch();

  const handleImageUpload = (event) => {
    const raw_file = event.target.files[0];
    
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };

    if (raw_file) {
      setFile(raw_file);
      reader.readAsDataURL(raw_file);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', file);

    // Making API post request to upload user image
    API.put('/profile/image/', {'avatar': file}, config)
    .then((response) => {
      // Handle the API response as needed
      setOpen(false);
      toast.success('Profile image has changed successfully.');
      mutate();
    })
    .catch((error) => {
      // Handle any errors that occurred during the API request
      toast.error('Something went wrong.')
    });
  }
  

  return (
    <form enctype="multipart/form-data"  onSubmit={(e) => handleSubmit(e)}>
      {image ? (
        <Avatar src={image} alt="Profile Image" />
      ) : (
        <Avatar /> 
      )}
      <input
        accept="image/*"
        id="profile-image-upload"
        type="file"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      { !image &&
        <label htmlFor="profile-image-upload">
        <Button variant="contained" 
        component="span">
          Upload Image
        </Button>
      </label>
      }
       <Button type="submit" variant="contained" color="primary" disabled={!file}>
        Submit
      </Button>
    </form>
  )
}

export default ChangeProfileImage