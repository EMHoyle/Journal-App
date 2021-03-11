import React from 'react'
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import Sidebar from '../journal/Sidebar'
import NotesMain from './NotesMain'

import styles from '../journal/Drawer/sass/Drawer.module.scss'

const drawerWidth = 300

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#222',
    color: '#a663cc',
    borderBottom: '1px solid #a663cc',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      backgroundColor: '#222',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    backgroundColor: '#222',
    borderRight: '0.01rem solid #a663cc',
    width: drawerWidth,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '0.2rem',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#222',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#a663cc',
      outline: '1px solid slategrey',
    },
  },
}))

const NotesAppbar = (props) => {
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <div>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' noWrap className={styles.title}>
            My Notes
          </Typography>
        </Toolbar>
        <NotesMain />
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Sidebar handleDrawerToggle={handleDrawerToggle} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            <Sidebar handleDrawerToggle={handleDrawerToggle} />
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}

export default NotesAppbar
