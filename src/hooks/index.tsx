import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 100,
    paddingBottom: 100,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '10%',
      paddingRight: '10%'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      paddingLeft: 50,
      paddingRight: 50
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 30,
      paddingRight: 30
    },
  },
}));

function Margin(props: Props) {
  const { children } = props
  const classes = useStyles()
  
  return (
    <Box className={classes.root}>
      {children}
    </Box>
  )
}

export default Margin
