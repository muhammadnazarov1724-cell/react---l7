import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import z from 'zod'
import { postUser } from '../store/dataSlice'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const userSchema = z.object({
    name: z.string().min(3, 'Ваше имя должно быть не менее 3 бука'),
    age: z.coerce.number().min(10, 'Вам должно быть не менее 10 слов'),
    avatar: z.string().optional(),
    status: z.string().nonempty()
})

type UserFormInputs = z.infer<typeof userSchema>

export default function AddDialog({open,setOpen}) {

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
            status: 'true',
        },
    })


    const onsubmit = async (data: UserFormInputs) => {
        await dispatch(postUser(data));
        reset()
        setOpen(false)
    }

  return (
<Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onsubmit)} id="add-user-form" style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '8px' }}>
          
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

        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
        <Button type="submit" form="add-user-form" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
