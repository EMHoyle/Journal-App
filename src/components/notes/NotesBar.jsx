import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  startDeleting,
  startSaveNote,
  startUploading,
} from '../../redux/actions/notes'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core'
import moment from 'moment'

import styles from './sass/Notes.module.scss'

const NotesBar = () => {
  const dispatch = useDispatch()
  const { active: note, date } = useSelector((state) => state.notes)
  const notesDate = moment(date)
  const inputFile = useRef(null)

  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = () => {
    setOpen(true)
    dispatch(startSaveNote(note))
  }

  const handlePictureUpload = () => {
    inputFile.current.click()
  }

  const handleDelete = () => {
    dispatch(startDeleting(note.id))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      dispatch(startUploading(file))
    }
  }

  return (
    <Grid container className={styles.noteBar}>
      <Grid item>
        <Typography className={styles.title}>
          {notesDate.format('ddd, MMMM Do YYYY')}
        </Typography>
      </Grid>
      <input
        ref={inputFile}
        id='fileSelector'
        type='file'
        name='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Grid item>
        <Button
          onClick={handlePictureUpload}
          variant='outlined'
          className={styles.btnNote}
        >
          Picture
        </Button>
        <Button
          onClick={handleSave}
          variant='outlined'
          className={styles.btnNote}
        >
          Save
        </Button>
        <Button
          onClick={handleDelete}
          className={styles.btnDelete}
          variant='outlined'
        >
          Delete
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle className={styles.dialogTitle} id='alert-dialog-title'>
            {note.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              className={styles.dialogText}
              id='alert-dialog-description'
            >
              The note was <span style={{ color: 'green' }}>SAVED</span>{' '}
              successfully!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              className={styles.dialogBtn}
              autoFocus
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default NotesBar
