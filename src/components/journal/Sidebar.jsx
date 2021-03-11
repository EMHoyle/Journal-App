import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../redux/actions/auth'
import { startNewNote } from '../../redux/actions/notes'
import { Button, Grid, Typography } from '@material-ui/core'
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone'
import DateRangeTwoToneIcon from '@material-ui/icons/DateRangeTwoTone'
import JournalEntries from './JournalEntries'

import styles from './sass/Journal.module.scss'

const Sidebar = ({ handleDrawerToggle }) => {
  const dispatch = useDispatch()

  const { name } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(startLogout())
  }

  const handleAdd = () => {
    dispatch(startNewNote())
    handleDrawerToggle()
  }

  return (
    <div style={{ backgroundColor: '#222', height: 'auto' }}>
      <Grid container className={styles.content}>
        <Grid item className={styles.container}>
          <StarTwoToneIcon />
          <Typography>{name}</Typography>
        </Grid>
        <Grid item>
          <Button className={styles.btn} onClick={handleLogout}>
            Logout
          </Button>
        </Grid>
      </Grid>
      <div className={styles.entryContainer} onClick={handleAdd}>
        <DateRangeTwoToneIcon className={styles.icon} />
        <Typography className={styles.title}>New Entry</Typography>
      </div>
      <JournalEntries handleDrawerToggle={handleDrawerToggle} />
    </div>
  )
}

export default Sidebar
