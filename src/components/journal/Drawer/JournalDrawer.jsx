import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import JournalAppbar from './JournalAppbar'
import NotesAppbar from '../../notes/NotesAppbar'

import styles from './sass/Drawer.module.scss'

const JournalDrawer = () => {
  const { active } = useSelector((state) => state.notes)

  return (
    <Grid className={styles.root}>
      {active ? <NotesAppbar /> : <JournalAppbar />}
    </Grid>
  )
}

JournalDrawer.propTypes = {
  window: PropTypes.func,
}

export default JournalDrawer
