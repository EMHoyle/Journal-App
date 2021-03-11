import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../../hooks/useForm'
import { removeError, setError } from '../../../redux/actions/ui'
import { startRegister } from '../../../redux/actions/auth'

import { Button, Grid, TextField } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import validator from 'validator'

import styles from './sass/Form.module.scss'

const RegisterForm = () => {
  const dispatch = useDispatch()

  const { msgError } = useSelector((state) => state.ui)

  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formValues

  const handleRegister = (e) => {
    e.preventDefault()
    if (formValid()) {
      dispatch(startRegister(email, password, name))
    }
  }

  const formValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Name is required'))
      return false
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'))
      return false
    } else if (password !== password2 || password <= 2) {
      dispatch(
        setError(
          'Password should be at least 6 characters and match each other'
        )
      )
      return false
    }

    dispatch(removeError())
    return true
  }

  return (
    <Grid>
      <form className='animate__animated fadeIn' onSubmit={handleRegister}>
        {msgError && (
          <Grid style={{ margin: '1rem 0' }}>
            <Alert variant='outlined' severity='error'>
              {msgError}
            </Alert>
          </Grid>
        )}
        <TextField
          InputProps={{
            className: styles.input,
          }}
          InputLabelProps={{ className: styles.label }}
          autoComplete='off'
          variant='outlined'
          margin='normal'
          fullWidth
          id='name'
          label='Name'
          name='name'
          type='text'
          value={name}
          onChange={handleInputChange}
        />
        <TextField
          InputProps={{
            className: styles.input,
          }}
          InputLabelProps={{ className: styles.label }}
          autoComplete='off'
          variant='outlined'
          margin='normal'
          fullWidth
          id='email'
          label='Email'
          name='email'
          type='text'
          value={email}
          onChange={handleInputChange}
        />
        <TextField
          InputProps={{
            className: styles.input,
          }}
          InputLabelProps={{ className: styles.label }}
          autoComplete='off'
          variant='outlined'
          margin='normal'
          fullWidth
          id='password'
          label='Password'
          name='password'
          type='password'
          value={password}
          onChange={handleInputChange}
        />
        <TextField
          InputProps={{
            className: styles.input,
          }}
          InputLabelProps={{ className: styles.label }}
          autoComplete='off'
          variant='outlined'
          margin='normal'
          fullWidth
          id='password2'
          label='Confirm Password'
          name='password2'
          type='password'
          value={password2}
          onChange={handleInputChange}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          className={styles.btnRegister}
        >
          Register
        </Button>
        <Link className={styles.link} to='/auth/login'>
          Already registered?
        </Link>
      </form>
    </Grid>
  )
}

export default RegisterForm
