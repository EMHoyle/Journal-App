import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import LoginForm from './Form/LoginForm'

import styles from './sass/Login.module.scss'

const LoginScreen = () => {
  return (
    <Grid container direction='row' justify='center' alignItems='flex-start'>
      <Grid item>
        <Typography variant='h4' className={styles.title}>
          Quick Journal
        </Typography>
      </Grid>
      <Grid item>
        <LoginForm />
      </Grid>
    </Grid>
  )
}

export default LoginScreen
