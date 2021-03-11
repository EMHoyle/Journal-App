import { fileUpload } from '../../helpers/fileUpload'
import { loadNotes } from '../../helpers/loadNotes'
import { dataB } from '../firebase/firebase-config'
import { types } from '../types/types'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }

    const document = await dataB.collection(`${uid}/journal/notes`).add(newNote)

    dispatch(activeNote(document.id, newNote))
    dispatch(addNewNote(document.id, newNote))
  }
}

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
})

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
})

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
  }
}

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
})

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    if (!note.url) {
      delete note.url
    }

    const noteToFirestore = { ...note }
    delete noteToFirestore.id

    await dataB.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)
    dispatch(refreshNote(note.id, noteToFirestore))
  }
}

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: { id, note: { id, ...note } },
})

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes

    const fileUrl = await fileUpload(file)
    activeNote.url = fileUrl

    dispatch(startSaveNote(activeNote))
  }
}

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    await dataB.doc(`${uid}/journal/notes/${id}`).delete()

    dispatch(deleteNote(id))
  }
}

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
})

export const notesLogout = () => ({
  type: types.notesLogoutCleaning,
})
