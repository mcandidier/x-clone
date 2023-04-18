import React, { useState} from 'react'
import CommonDialog from '@/components/Modal';
import LoginModal from '../components/LoginModal';
import RegisterModal from '@/components/Register';

function Login() {
    const [open, setOpen] = useState(true)
    const [openRegister, setOpenRegister] = useState(false)
    const handleOpen = () => {
      setOpen(true)
    }
  return (
    <>
        <CommonDialog setOpen={setOpen} open={open} title='Login' size='xs' component={<LoginModal setOpen={setOpen} setOpenRegister={setOpenRegister}/>}></CommonDialog>
        <CommonDialog setOpen={setOpenRegister} open={openRegister} title='Register' size='xs' component={<RegisterModal setOpen={setOpen} setOpenRegister={setOpenRegister}/>}></CommonDialog>
    </>
    )
}

export default Login;