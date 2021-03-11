import React from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import JournalEntry from './JournalEntry'

import styles from './sass/Journal.module.scss'

const JournalEntries = ({ handleDrawerToggle }) => {
  const { notes } = useSelector((state) => state.notes)

  return (
    <Grid className={styles.entries}>
      {notes.map((note) => (
        <JournalEntry
          handleDrawerToggle={handleDrawerToggle}
          key={note.id}
          {...note}
        />
      ))}
    </Grid>
  )
}

export default JournalEntries
