import React from 'react'
import Margin from '../../hooks'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TwitterIcon from '@material-ui/icons/Twitter'

const useStyles = makeStyles((theme) => ({
  titleBox: {
    backgroundColor: '#359ec6',
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

function TeamBanner() {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box>
      <Margin>
        <Box>
          <Typography variant="h3" align={sm ? 'left' : 'center'} style={{fontWeight: 600, color: '#424242'}} gutterBottom>Our Team</Typography>
          {/* <Typography variant="h6" align={sm ? 'left' : 'center'} style={{color: '#616161'}}>
            From large multi-day events, to virtual online classes and personal gatherings, we've got you covered on all fronts
          </Typography> */}
        </Box>
        <Box px={lg ? 0 : 200} mt={sm ? 5 : 10} color='#424242' maxWidth={1000} style={{margin: 'auto'}}>
          <Grid container spacing={5}>
            {/* <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box p={4} alignItems="center" justifyContent="center" display="flex" flexDirection="column">
                <Box pb={3}>
                  <Avatar alt="Peter Brown" src="https://tkets-io.s3.us-east-2.amazonaws.com/static/peter.jpg" style={{width: 96, height: 96}}/>
                </Box>
                <Typography variant="h6" align='center' style={{fontWeight: 500}} gutterBottom>Peter Brown</Typography>
                <Typography className={classes.boxBody} variant="button" gutterBottom style={{fontWeight: 800, color: '#359ec6'}}>
                  CEO
                </Typography>
                <Typography className={classes.boxBody} variant="body1" gutterBottom>
                  6+ Years Product, Cloud Infrastructure, Naval Special Operations, Mission Team Manager
                </Typography>
                <Box pt={1}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <IconButton target="_blank" href="https://www.linkedin.com/in/peter-brown-13a30785/">
                        <LinkedInIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <Box p={4} alignItems="center" justifyContent="center" display="flex" flexDirection="column">
                <Box pb={3}>
                  <Avatar alt="Kev Katona" src="https://tkets-io.s3.us-east-2.amazonaws.com/static/kevin.jpg" style={{width: 96, height: 96}}/>
                </Box>
                <Typography variant="h6" align='center' style={{fontWeight: 500}} gutterBottom>Kevin Katona</Typography>
                <Typography className={classes.boxBody} variant="button" gutterBottom style={{fontWeight: 800, color: '#359ec6'}}>
                  CEO
                </Typography>
                <Typography className={classes.boxBody} variant="body1" gutterBottom>
                  4+ Years Founder Experience, 2+ Years Microsoft R&amp;D, 4+ Years Game Development
                </Typography>
                <Box pt={1}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <IconButton target="_blank" href="https://www.linkedin.com/in/kevkatona/">
                        <LinkedInIcon />
                      </IconButton>
                    </Grid>
                    {/* <Grid item>
                      <IconButton>
                        <TwitterIcon />
                      </IconButton>
                    </Grid> */}
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box p={4} alignItems="center" justifyContent="center" display="flex" flexDirection="column">
                <Box pb={3}>
                  <Avatar alt="Richard Xiong" src="https://tkets-io.s3.us-east-2.amazonaws.com/static/richard.jpg" style={{width: 96, height: 96}}/>
                </Box>
                <Typography variant="h6" align='center' style={{fontWeight: 500}} gutterBottom>Richard Xiong</Typography>
                <Typography className={classes.boxBody} variant="button" gutterBottom style={{fontWeight: 800, color: '#359ec6'}}>
                  CTO
                </Typography>
                <Typography className={classes.boxBody} variant="body1" gutterBottom>
                  4+ Years Software Engineer, 2+ Years Solidity Dev, Multi-Hackathon Winner
                </Typography>
                <Box pt={1}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <IconButton target="_blank" href="https://www.linkedin.com/in/richhardry/">
                        <LinkedInIcon />
                      </IconButton>
                    </Grid>
                    {/* <Grid item>
                      <IconButton>
                        <TwitterIcon />
                      </IconButton>
                    </Grid> */}
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Margin>
    </Box>
    
    
  )
}

export default TeamBanner
