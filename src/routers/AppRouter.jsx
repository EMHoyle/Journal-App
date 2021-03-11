import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { firebase } from '../redux/firebase/firebase-config'
import { login } from '../redux/actions/auth'
import { startLoadingNotes } from '../redux/actions/notes'
import AuthRouter from './AuthRouter'
import JournalScreen from '../components/journal/JournalScreen'
import LoadingScreen from '../components/loading/LoadingScreen'
import PrivateRouter from './PrivateRouter'
import PublicRouter from './PublicRouter'

const AppRouter = () => {
  const dispatch = useDispatch()

  const [checking, setChecking] = useState(true)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName))
        setIsLogged(true)
        dispatch(startLoadingNotes(user.uid))
      } else {
        setIsLogged(false)
      }
      setChecking(false)
    })
  }, [dispatch, setChecking, setIsLogged])

  if (checking) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <Switch>
        <PublicRouter
          path='/auth'
          component={AuthRouter}
          isAuthenticated={isLogged}
        />
        <PrivateRouter
          exact
          path='/'
          component={JournalScreen}
          isAuthenticated={isLogged}
        />

        <Redirect to='/auth/login' />
      </Switch>
    </Router>
  )
}

export default AppRouter
