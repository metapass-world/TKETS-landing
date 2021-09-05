import React from 'react'
import Margin from '../../hooks'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ImageTicket, { TicketProps } from './ImageTicket';
import StarwarsGif from './starwars.gif'
import PoplineGif from './popline.gif'
import MonetGif from './monet.gif'
import BackgroundImage from './banner_bg.png';

const useStyles = makeStyles((theme) => ({
  titleTextBox: {
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.up('md')]: {
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    [theme.breakpoints.between('sm','md')]: {
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: 'contain',
      backgroundPosition: 'top',
    },
    transition: 'box-shadow 0.5s',
    willChange: 'transform'
  },
  boxBody : {
    color: '#616161',
  }
}));

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
      image: MonetGif,
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
      image: PoplineGif,
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
      image: StarwarsGif,
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

function DesignBanner() {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box className={ classes.titleTextBox }>
      <Margin>
        <Box >
          <Grid container spacing={sm ? 1 : 5}>
            <Grid item xs={12} lg={4} xl={5}>
              <Box>
                <Typography variant="h3" align='left' style={{color: '#424242', fontWeight: 600}} gutterBottom>Engage your audience with custom NFTs</Typography>
                <Typography className={classes.boxBody} variant="h6" style={{fontWeight: 400}} >
                  Embed images, GIFs or audio files
                </Typography>
                <Typography className={classes.boxBody} variant="h6" style={{fontWeight: 500}} >
                  No service fees
                </Typography>
                <Typography className={classes.boxBody} variant="h6" style={{fontWeight: 500}} >
                  No payment processing fees
                </Typography>
              </Box>
              
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
    </Box>
  )
}

export default DesignBanner
