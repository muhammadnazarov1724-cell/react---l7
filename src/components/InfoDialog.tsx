import React from 'react'
import { Button, DialogActions, DialogContent, DialogTitle, Drawer } from '@mui/material'

export default function InfoDialog({open,setOpen,user}:any) {
  if (!user) return null;
  return (
    <Drawer open={open} anchor='right'>
        <DialogTitle sx={{color: 'black'}}>Information about User</DialogTitle>
        <DialogContent sx={{padding: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
        <h2 style={{color: 'black'}}>{user.name}</h2>
        <img style={{width: '350px', height: '350px', borderRadius: '50%'}} src={user.avatar} alt="" />
        <h3 style={{color: 'black'}}>Age:{user.age}</h3>
        <p style={{color: 'black'}}>{user.status}</p>
        </DialogContent>
        <DialogActions>
            <Button variant='text' onClick={()=> setOpen(false)}>Close</Button>
        </DialogActions>
    </Drawer>
  )
}
