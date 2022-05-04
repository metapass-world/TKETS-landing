import React, {useState} from 'react'
import Margin from '../../hooks'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ImageTicket, { TicketProps } from './ImageTicket';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles((theme) => ({
  titleTextBox: {
    backgroundRepeat: 'no-repeat',
    background: `linear-gradient(0deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.8) 80%), url(https://tkets-io.s3.us-east-2.amazonaws.com/static/design_banner_bg.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    transition: 'box-shadow 0.5s',
    willChange: 'transform'
  },
  boxBody : {
    color: '#616161',
  },
  emailFormTextSize:{
    fontSize:50
  },
  subscribeButton: {
    color: '#fff',
    backgroundColor: 'rgba(71, 160, 249, 0.5)',
    '&:hover': {
      backgroundColor: 'rgba(71, 160, 249, 0.9)',
    },
  }
}));

const NEWSLETTER_URL = "https://f027c022.sibforms.com/serve/MUIEAGseA6FOM3_Gk8nXhu13oV6C1jwm9FIzJD3VVf4dunDIL-Vz7ebEbAHmXSog8qBswdPG6gDtgvz-y8nJZYZI37zyPNXITy6x1_Nfy9h3aTjzfr9leb9yl7_K54pk1Bv8uS3mX62sWk3FxhdxnER5H7dFxWe_Appeok7h9fy8UV_rbOcJNyVK6q6quGEwc6aQe93gMUKe9uoh"

const ticketDemos = [
  {
    type: 'image',
    style: {
      colors: {
        titleColor: {
          red: 0,
          green: 92,
          blue: 172,
          alpha: 1
        },
        detailColor: {
          red: 0,
          blue: 0,
          green: 0,
          alpha: 1
        },
        buttonBackgroundColor: {
          red: 180,
          green: 211,
          blue: 238,
          alpha: 0.6
        },
        buttonBackgroundHoverColor: {
          red: 126,
          green: 187,
          blue: 240,
          alpha: 0.7
        },
        buttonTextColor: {
          red: 7,
          green: 89,
          blue: 160,
          alpha: 1
        },
        ticketBackground: {
          red: 254,
          green: 254,
          blue: 254,
          alpha: 1
        }
      }, 
      image: 'https://tkets-io.s3.us-east-2.amazonaws.com/static/monet.gif',
      gutterLeft: true,
      fullWidthBackground: false  
    },
    metadata: {
      eventName: 'Monet Alive! 2021',
      eventLocation: 'Hyde Park,\nLondon',
      eventDatetime: '9:00 AM, 18 August 2021',
      ticketType: 'All Day Pass'
    },
  },
  {
    type: 'image',
    style: {
      colors: {
        titleColor: {
          red: 60,
          green: 95,
          blue: 163,
          alpha: 1
        },
        detailColor: {
          red: 255,
          green: 255,
          blue: 255,
          alpha: 0.8
        },
        buttonBackgroundColor: {
          red: 179,
          green: 198,
          blue: 233,
          alpha: 0.6
        },
        buttonBackgroundHoverColor: {
          red: 132,
          green: 166,
          blue: 229,
          alpha: 0.7
        },
        buttonTextColor: {
          red: 48,
          green: 80,
          blue: 197,
          alpha: 1
        }
      }, 
      image: 'https://tkets-io.s3.us-east-2.amazonaws.com/static/popline.gif',
      gutterLeft: true,
      fullWidthBackground: true
    },
    metadata: {
      eventName: 'Popline Bling London',
      eventLocation: 'Crystal Palace Park - London',
      eventDatetime: '8:15 PM, 28 November 2021',
      ticketType: 'General Admission'
    },  
  },
  {
    type: 'image',
    style: {
      colors: {
        titleColor: {
          red: 253,
          green: 123,
          blue: 236,
          alpha: 0.8
        },
        detailColor: {
          red: 255,
          green: 255,
          blue: 255,
          alpha: 0.8
        },
        buttonBackgroundColor: {
          red: 253,
          green: 123,
          blue: 236,
          alpha: 0.4
        },
        buttonBackgroundHoverColor: {
          red: 253,
          green: 123,
          blue: 236,
          alpha: 0.6
        },
        buttonTextColor: {
          red: 234,
          green: 214,
          blue: 231,
          alpha: 0.95
        }
      }, 
      image: 'https://tkets-io.s3.us-east-2.amazonaws.com/static/starwars.gif',
      gutterLeft: false,
      fullWidthBackground: true  
    },
    metadata: {
      eventName: 'Star Wars: The Marathon',
      eventLocation: 'Trafalgar Square,\nLondon WC2N 5DN',
      eventDatetime: '5:00 PM, 15 November 2022',
      ticketType: 'General Admission'
    },
  },
] as TicketProps[]

const validateEmail = (email : string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function DesignBanner() {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [attributionOpen, setAttributionOpen] = useState(false)
  return (
    <Box className={ classes.titleTextBox }>
      <Margin>
        <Box >
          <Grid container spacing={sm ? 1 : 5}>
            <Grid item xs={12} lg={4} xl={5}>
              <Typography variant="h3" align='left' style={{color: '#424242', fontWeight: 600}} gutterBottom>Engage your audience with custom NFTs</Typography>
              <Grid container spacing={3} component={Box} py={3}>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <img src={'https://tkets-io.s3.us-east-2.amazonaws.com/static/collectible.png'} width={50} alt="collectible"/>
                    </Box>
                    <Box ml={2}>
                      <Typography variant="h6" align='left' style={{color: '#424242', fontWeight: 500}} gutterBottom>Create highly collectible experiences</Typography>
                      <Typography className={classes.boxBody} variant="body1" gutterBottom>
                        Collect, trade all your NFT tickets, or simply keep them as a one-of-a-kind memorabilia for your experiences.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <img src={'https://tkets-io.s3.us-east-2.amazonaws.com/static/media.png'} width={50} alt="media formats"/>
                    </Box>
                    <Box ml={2}>
                      <Typography variant="h6" align='left' style={{color: '#424242', fontWeight: 500}} gutterBottom>Support for multiple media types</Typography>
                      <Typography className={classes.boxBody} variant="body1" gutterBottom>
                        Embed images, GIFs, audio and more into your tickets.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <img src={'https://tkets-io.s3.us-east-2.amazonaws.com/static/ipfs.png'} width={50} alt="IPFS"/>
                    </Box>
                    <Box ml={2}>
                      <Typography variant="h6" align='left' style={{color: '#424242', fontWeight: 500}} gutterBottom>Decentralised storage</Typography>
                      <Typography className={classes.boxBody} variant="body1" gutterBottom>
                        Stored on IPFS, making your NFT media always available and immutable. Once THETA Edge Storage is released, we will also implement support for that.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={8} xl={7}>
              <Grid container spacing={sm ? 2 : 4} style={{paddingLeft: sm ? 0 : 50, paddingRight: sm ? 0 : 50}}>
                {ticketDemos.map(ticket => (
                  <Grid item xs={12}>
                    <ImageTicket type={ticket.type} style={ticket.style} metadata={ticket.metadata}/>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Margin>
      <Margin>
        <Box mt={2}>
          <Typography variant="h3" align='center' style={{color: '#424242', fontWeight: 600}} gutterBottom>Sign up to our newsletter</Typography>
          <Typography variant="h5" align='center' style={{color: '#424242', fontWeight: 400}} gutterBottom>or contact us at <a href="mailto:hello@metapass.world" style={{color: '#29A6F9', textDecoration: 'none'}}>hello@metapass.world</a></Typography>
          <Grid container spacing={3} component={Box} pt={3}>
            <Grid md={2} />
            <Grid item xs={12} md={8}>
              <form id="sib-form" method="POST" action={NEWSLETTER_URL}
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!validateEmail(email)) {
                      setError(true);
                    } else {
                      var bodyFormData = new FormData();
                      bodyFormData.append('EMAIL', email);
                      bodyFormData.append('OPT_IN', '1');
                      axios.post(
                        NEWSLETTER_URL, 
                        bodyFormData, 
                        {
                          headers: { 'content-type': undefined }
                        }
                      ).finally(() => {
                        setSuccess(true)
                      })
                    }
                  }}>
                <Box display="flex">
                  <TextField 
                    type="text" 
                    id="EMAIL" 
                    name="EMAIL"
                    placeholder="Your email address" 
                    variant="outlined" 
                    fullWidth={true} 
                    inputProps={{style: {fontSize: xs ? 20 : 40}}} 
                    value={email} 
                    onChange={(event) => {
                      setError(false); 
                      setSuccess(false);
                      setEmail(event.target.value);
                    }}
                    error={error}/>
                  <Box ml={xs ? 1 : 3} alignItems="center" display="flex">
                    <Button className={classes.subscribeButton} variant="contained" style={{fontSize: xs ? 20 : 30}} disableElevation={true} type="submit">
                      Subscribe
                    </Button>
                  </Box>
                  
                  
                </Box>
              </form>
              {
                success && <Box mt={3}>
                  <Alert severity="success">
                    <AlertTitle>Success!</AlertTitle>
                    Thank you for signing up! Be sure to support us on the ongoing Theta Network Q3 2021 Hackthon too!
                  </Alert>
                </Box>
              }
            </Grid>
          </Grid>
        </Box>
        <Box mt={5}>
          <Box display="flex" justifyContent="center">
            <Box>
              <IconButton aria-label="twitter" href="https://twitter.com/metapass_world" target="_blank">
                <TwitterIcon fontSize="large" />
              </IconButton>
            </Box>
            <Box ml={2}>
              <IconButton aria-label="github" href="https://github.com/tkets-io" target="_blank">
                <GitHubIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
          <Box mt={5}>
            <Typography variant="subtitle1" align='center' style={{color: '#424242'}} gutterBottom>&copy; 2022, Metapass. All rights reserved.</Typography>
            <Typography variant="subtitle1" align='center' style={{color: '#424242'}} gutterBottom><a href="javascript:void(0)" onClick={() => setAttributionOpen(true)}>Attributions</a></Typography>
            <Dialog onClose={() => setAttributionOpen(false)} aria-labelledby="customized-dialog-title" open={attributionOpen}>
              <DialogTitle id="customized-dialog-title">
                Attributions
              </DialogTitle>
              <DialogContent dividers>
                <Typography gutterBottom>
                  <a href="https://www.pinterest.com/pin/315885361345504104/">Drake GIFs from the 6</a><br/>
                  <a href="https://www.artstation.com/artwork/1n5aJK">Galaxy Far Far Away</a><br/>
                  <a href="https://www.pinterest.com/pin/466896686350034574/">Famous Artist Animated Painting Gifs</a><br/>
                  <a href="https://musichistoryingifs.com/post/34300769261/2010-kanye-west-releases-my-beautiful-dark">music history in gifs</a><br/>
                  <a href="https://www.freepik.com/vectors/technology">Technology vector created by vectorpouch - www.freepik.com</a><br/>
                  <a href="https://media.pitchfork.com/photos/5d656b501ce1350009a5d8e3/1:1/w_320/bigthief_twohands.jpg">Big Thief Two Hands Album Art</a>
                </Typography>
              </DialogContent>
            </Dialog>
          </Box>
          
        </Box>
      </Margin>
    </Box>
  )
}

export default DesignBanner
