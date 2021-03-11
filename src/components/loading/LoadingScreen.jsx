import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import styles from './sass/Loading.module.scss'

const LoadingScreen = () => {
  return (
    <>
      <Grid className={styles.loader}>
        <span />
      </Grid>
      <Grid>
        <Typography className={styles.title}>Loading</Typography>
      </Grid>
    </>
  )
}

export default LoadingScreen
