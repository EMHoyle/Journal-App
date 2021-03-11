import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, TextField } from '@material-ui/core'
import { useForm } from '../../hooks/useForm'
import { activeNote } from '../../redux/actions/notes'
import NotesBar from './NotesBar'

import styles from './sass/Notes.module.scss'

const NotesMain = () => {
  const dispatch = useDispatch()
  const { active: note } = useSelector((state) => state.notes)
  const [formValues, handleInputChange, reset] = useForm(note)

  const { body, title } = formValues

  const activeId = useRef(note.id)

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note)
      activeId.current = note.id
    }
  }, [note, reset])

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }))
  }, [dispatch, formValues])

  return (
    <main>
      <Grid className={styles.mainContainer}>
        <Grid className={styles.mainContent}>
          <NotesBar />
          <Grid className={styles.notesContent}>
            <TextField
              autoComplete='off'
              variant='standard'
              margin='dense'
              fullWidth
              inputProps={{ className: styles.notesTitleInput }}
              id='title'
              placeholder='Some awesome title'
              name='title'
              type='text'
              value={title}
              onChange={handleInputChange}
            />

            <textarea
              placeholder='What happened today'
              className={styles.notesTextArea}
              name='body'
              value={body}
              onChange={handleInputChange}
            ></textarea>
          </Grid>
          {note.url && (
            <Grid className={styles.notesImage}>
              <img src={note.url} alt='imagen' />
            </Grid>
          )}
        </Grid>
      </Grid>
    </main>
  )
}

export default NotesMain
