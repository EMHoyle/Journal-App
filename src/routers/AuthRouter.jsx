import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import LoginScreen from '../components/auth/LoginScreen'
import RegisterScreen from '../components/auth/RegisterScreen'

import styles from './sass/Routers.module.scss'

const AuthRouter = () => {
  return (
    <Grid className={styles.main}>
      <Grid className={styles.container}>
        <Switch>
          <Route path='/auth/login' component={LoginScreen} />
          <Route path='/auth/register' component={RegisterScreen} />

          <Redirect to='/auth/login' />
        </Switch>
      </Grid>
    </Grid>
  )
}

export default AuthRouter
