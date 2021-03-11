import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone'

import styles from './sass/Drawer.module.scss'

const JournalMain = () => {
  return (
    <Grid className={styles.mainContainer}>
      <Typography paragraph className={styles.mainContent}>
        Select your note
      </Typography>
      <Typography paragraph className={styles.mainContent}>
        or create a new entry!
      </Typography>
      <StarTwoToneIcon className={styles.mainIcon} />
    </Grid>
  )
}

export default JournalMain
