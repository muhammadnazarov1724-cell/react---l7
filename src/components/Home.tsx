import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from '../store/dataSlice'
import { Button, CircularProgress,TextField, FormControl, InputLabel, Select, MenuItem, Stack, } from '@mui/material'
import AddDialog from './AddDialog'
import EditDialog from './EditDialog'
import InfoDialog from './InfoDialog'

export default function Home() {

    let {data,loading} = useSelector((state)=> state.data)
    let dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [info, setInfo] = useState(false)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    useEffect(()=> {
        dispatch(getUsers())
    },[])

        const filteredData = data.filter((user: any) => {

    const matchesSearch = user.name?.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.status === true) ||
      (statusFilter === 'inactive' && user.status === false)

    return matchesSearch && matchesStatus
  })

  return (
   <>
   <Button variant='contained' onClick={()=> setOpen(true)}>+ Add User</Button>
       <Stack direction="row" spacing={2} sx={{ mb: 4, maxWidth: 600 }}>
        <TextField
          label="Search by name..."
          variant="standard"
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />

        <FormControl fullWidth sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Stack>
       <div style={{display: 'flex', flexWrap: 'wrap', padding: '40px', gap: '20px', justifyContent: 'center'}}>
        {loading ? <CircularProgress/> : filteredData?.map((user) => {
            return <div key={user.id} style={{width: '250px', border: '1px solid #ccc', padding: '20px', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img style={{width: '100px', height: '100px', borderRadius: '50%'}} src={user.avatar} alt="" />
                <h3>{user.name}</h3>
                <h4>{user.age}</h4>
                <p>{user.status ? 'Active' : 'Inactive'}</p>
                <Button variant='outlined' onClick={()=> dispatch(deleteUser(user.id))}>Delete</Button>
                <Button variant='outlined' onClick={()=> setEditOpen(user)}>Edit</Button>
                <Button variant='outlined' onClick={()=> setInfo(true)}>Info</Button>
         </div>
        })}
    </div>

    <AddDialog open={open} setOpen={setOpen}/>
    <EditDialog open={editOpen} setOpen={setEditOpen} user={editOpen}/>
    <InfoDialog open={info} setOpen={setInfo} user={info}/>

   </>
  )
}



