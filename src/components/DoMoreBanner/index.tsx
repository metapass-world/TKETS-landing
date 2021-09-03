import React from 'react'
import Margin from '../../hooks'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import BackgroundImage from './banner_bg.png';
import BackgroundImageSM from './banner_bg_sm.png';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';

const useStyles = makeStyles((theme) => ({
  titleTextBox: {
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.up('md')]: {
      backgroundImage: `url(${BackgroundImage})`,
      paddingTop: 200,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
    },
    [theme.breakpoints.between('sm','md')]: {
      backgroundImage: `url(${BackgroundImage})`,
      paddingTop: 100,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      backgroundImage: `url(${BackgroundImageSM})`,
      paddingTop: 100,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
    },
  },
  boxPaper: {
    backgroundColor: 'white',
    boxShadow: '0px 10px 15px 0px rgba(0,0,0,0.2)',
    borderRadius: theme.shape.borderRadius
  },
  boxBody: {
    color: '#616161',
    textAlign: 'center'
  }
}));

function DoMoreBanner() {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box className={ classes.titleTextBox }>
      <Margin>
        <Box>
          <Typography variant="h3" align={sm ? 'left' : 'center'} style={{fontWeight: 600, color: '#424242'}} gutterBottom>Do more with your tickets</Typography>
          <Typography variant="h6" align={sm ? 'left' : 'center'} style={{color: '#616161'}}>
            From large multi-day events, to virtual online classes and personal gatherings, we've got you covered on all fronts
          </Typography>
        </Box>
        <Box mt={sm ? 5 : 15} color='#424242'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Box className={classes.boxPaper} p={4} alignItems="center" justifyContent="center" display="flex" flexDirection="column">
                <Box borderRadius="50%" style={{background: "linear-gradient(90deg, rgba(89,190,255,1) 0%, rgba(180,109,255,1) 100%)"}} width={50} height={50} color="white" alignItems="center" display="flex" justifyContent="center" mb={1}>
                  <LockOpenIcon />
                </Box>
                <Typography variant="h6" align='center' style={{fontWeight: 500}} gutterBottom>Permissionless and decentralised</Typography>
                <Typography className={classes.boxBody} variant="body1" gutterBottom>
                  This means that <i>anyone</i> can use this platform. 
                  As long as you have a wallet, you can create an event or purchase tickets.
                  There is no platform-required KYC at all.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Box className={classes.boxPaper} p={4} alignItems="center" justifyContent="center" display="flex" flexDirection="column">
                <Box borderRadius="50%" style={{background: "linear-gradient(90deg, rgba(255,89,218,1) 0%, rgba(255,187,109,1) 100%)"}} width={50} height={50} color="white" alignItems="center" display="flex" justifyContent="center" mb={1}>
                  <VpnKeyIcon />
                </Box>
                <Typography variant="h6" align='center' style={{fontWeight: 500}} gutterBottom>Your keys, your tickets</Typography>
                <Typography className={classes.boxBody} variant="body1" gutterBottom>
                  True ownership for all your tickets, secured by the THETA blockchain.
                  There are no admin keys, and there never will be.
                  No one can take your tickets away from you.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Box className={classes.boxPaper} p={4} alignItems="center" justifyContent="center" display="flex" flexDirection="column">
                <Box borderRadius="50%" style={{background: "linear-gradient(90deg, rgba(240,229,71,1) 0%, rgba(127,210,116,1) 100%)"}} width={50} height={50} color="white" alignItems="center" display="flex" justifyContent="center" mb={1}>
                  <AttachMoneyIcon />
                </Box>
                <Typography variant="h6" align='center' style={{fontWeight: 500}} gutterBottom>Direct payments</Typography>
                <Typography className={classes.boxBody} variant="body1" gutterBottom>
                  For event organisers, each ticket is minted as a separate smart contract that you own, 
                  and every ticket purchase locks the funds directly into the contract.
                  This means that after the event ends, you can withdraw your funds immediately, no need
                  for any other approval.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Box className={classes.boxPaper} p={4} alignItems="center" justifyContent="center" display="flex" flexDirection="column">
                <Box borderRadius="50%" style={{background: "linear-gradient(90deg, rgba(77,219,115,1) 0%, rgba(71,133,224,1) 100%)"}} width={50} height={50} color="white" alignItems="center" display="flex" justifyContent="center" mb={1}>
                  <LocalActivityIcon />
                </Box>
                <Typography variant="h6" align='center' style={{fontWeight: 500}} gutterBottom>Smarter tickets</Typography>
                <Typography className={classes.boxBody} variant="body1" gutterBottom>
                  Fine tune your ticket settings to prevent scalping.
                  You can control how many tickets each wallet can hold, set resell price limits, 
                  earn commission rates on each ticket resell, and more.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Margin>
    </Box>
    
    
  )
}

export default DoMoreBanner
