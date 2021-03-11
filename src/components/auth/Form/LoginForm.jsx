import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../../redux/actions/ui'
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from '../../../redux/actions/auth'
import { useForm } from '../../../hooks/useForm'

import { Button, Divider, Grid, TextField, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import validator from 'validator'

import styles from './sass/Form.module.scss'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { loading, msgError } = useSelector((state) => state.ui)

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  })

  const handleLogin = (e) => {
    e.preventDefault()
    if (formValid()) {
      dispatch(startLoginEmailPassword(email, password))
    }
  }

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin())
  }

  const formValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'))
      return false
    } else if (password <= 2) {
      dispatch(
        setError('Password is not valid. Should be at least 6 characters')
      )
      return false
    }

    dispatch(removeError())
    return true
  }

  const { email, password } = formValues
  return (
    <Grid>
      <form onSubmit={handleLogin}>
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
          required={true}
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
          required={true}
          fullWidth
          id='password'
          label='Password'
          name='password'
          type='password'
          value={password}
          onChange={handleInputChange}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          className={styles.button}
          disabled={loading}
        >
          Login
        </Button>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          className={styles.container}
        >
          <Divider className={styles.divider} />
          <Typography className={styles.text}>Or</Typography>
          <Divider className={styles.divider} />
        </Grid>
        <Grid className={styles.googleBtn}>
          <div onClick={handleGoogleLogin}>
            <Grid className={styles.googleIWrapper}>
              <img
                className={styles.googleIcon}
                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                alt='google button'
              />
            </Grid>
            <p className={styles.btnText}>
              <b>Sign in with google</b>
            </p>
          </div>
        </Grid>
        <Link className={styles.link} to='/auth/register'>
          Create new account
        </Link>
      </form>
    </Grid>
  )
}

export default LoginForm
