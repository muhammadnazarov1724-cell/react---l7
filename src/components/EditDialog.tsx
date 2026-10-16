import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import z from 'zod'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { putUser } from '../store/dataSlice';



const userSchema = z.object({
    name: z.string().min(3, 'Имя должно быть не менее 2 символов'),
    age: z.coerce.number().min(10, 'Вам должно быть не менее 18 лет'),
    avatar: z.string().optional(),
    status: z.string().nonempty('Выберите статус')
})

type UserFormsInputs = z.infer<typeof userSchema>;

export default function EditDialog({open,setOpen,user}) {

  let dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      age: '',
      avatar: '',
      status: '',
    },
  })

  useEffect(()=> {
    if(user) {
      reset({
        name: user.name || '',
        age: user.age || '',
        avatar: user.avatar || '',
        status: user.status || '',
      })
    }
  }, [user, reset])

  const onsubmit = async (data: UserFormsInputs) => {
    if(!user?.id) return;
    dispatch(putUser({id: user.id, ...data})),
    setOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onsubmit)} id="edit-user-form" style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '8px' }}>
          
          <div>
            <input placeholder="Name..." {...register('name')} />
            {errors.name && <div style={{ color: 'red', fontSize: '12px' }}>{errors.name.message}</div>}
          </div>

          <div>
            <input type="number" placeholder="Age..." {...register('age')} />
            {errors.age && <div style={{ color: 'red', fontSize: '12px' }}>{errors.age.message}</div>}
          </div>

          <div>
            <input placeholder="Avatar URL..." {...register('avatar')} />
          </div>

          <div>
            <select {...register('status')}>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            {errors.status && <div style={{ color: 'red', fontSize: '12px' }}>{errors.status.message}</div>}
          </div>
      <DialogActions>
        <Button type='button' onClick={()=> setOpen(false)}>Close</Button>
        <Button type="submit" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
        </form>
      </DialogContent>
    </Dialog>  )
}
