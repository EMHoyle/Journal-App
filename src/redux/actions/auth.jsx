import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { finishLoading, startLoading } from './ui'
import { notesLogout } from './notes'
import { types } from '../types/types'
import Swal from 'sweetalert2'

//Login

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading())
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
      .catch((e) => {
        Swal.fire('Error', e.message, 'error')
      })
      .finally(() => {
        dispatch(finishLoading())
      })
  }
}

export const startRegister = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name })
        dispatch(login(user.uid, user.displayName))
      })
      .catch((e) => {
        Swal.fire('Error', e.message, 'error')
      })
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
  }
}

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
})

//Logout

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut()

    dispatch(logout())
    dispatch(notesLogout())
  }
}

export const logout = () => ({
  type: types.logout,
})
