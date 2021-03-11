import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import RegisterForm from './Form/RegisterForm'

import styles from './sass/Login.module.scss'

const RegisterScreen = () => {
  return (
    <Grid container direction='row' justify='center' alignItems='flex-start'>
      <Grid item>
        <Typography variant='h4' className={styles.title}>
          Quick Journal
        </Typography>
      </Grid>
      <Grid item>
        <RegisterForm />
      </Grid>
    </Grid>
  )
}

export default RegisterScreen
