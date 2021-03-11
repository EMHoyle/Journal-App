import React from 'react'
import { useDispatch } from 'react-redux'
import { activeNote } from '../../redux/actions/notes'
import { Grid, Typography } from '@material-ui/core'
import moment from 'moment'

import styles from './sass/Entry.module.scss'

const JournalEntry = ({ id, body, date, title, url, handleDrawerToggle }) => {
  const dispatch = useDispatch()

  const noteDate = moment(date)

  const handleEntryActive = () => {
    dispatch(activeNote(id, { body, date, title, url }))
    handleDrawerToggle()
  }

  return (
    <div
      onClick={handleEntryActive}
      className='animate__animated animate__bounce'
    >
      <Grid className={styles.entry}>
        {url && (
          <Grid
            className={styles.picture}
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${url})`,
            }}
          />
        )}

        <Grid className={styles.body}>
          <Typography className={styles.title}>{title}</Typography>
          <Typography className={styles.content}>{body}</Typography>
        </Grid>

        <Grid className={styles.dateBox}>
          <Typography className={styles.day}>
            {noteDate.format('dddd')}
          </Typography>
          <Typography className={styles.date}>
            {noteDate.format('Do')}
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default JournalEntry
