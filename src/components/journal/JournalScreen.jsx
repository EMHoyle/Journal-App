import React from 'react'
import { Grid } from '@material-ui/core'
import JournalDrawer from './Drawer/JournalDrawer'

const JournalScreen = () => {
  return (
    <Grid>
      <Grid item>
        <JournalDrawer />
      </Grid>
    </Grid>
  )
}

export default JournalScreen
