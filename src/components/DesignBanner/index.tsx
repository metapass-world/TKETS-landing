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
import ImpalaJpg from './tameimpala.jpg'

const useStyles = makeStyles((theme) => ({
  titleTextBox: {
    backgroundColor: '#fff',
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
        titleColor: 'rgba(255, 255, 255, 0.9)',
        detailColor: 'rgba(255, 255, 255, 0.8)',
        buttonBackgroundColor: 'rgba(255, 255, 255, 0.2)',
        buttonBackgroundHoverColor: 'rgba(255, 255, 255, 0.3)',
        buttonTextColor: 'rgba(255, 255, 255, 0.8)',
        ticketBackground: '#459ec0'
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
        titleColor: 'rgb(60, 95, 163)',
        detailColor: 'rgba(255, 255, 255, 0.8)',
        buttonBackgroundColor: 'rgba(87, 144, 255, 0.35)',
        buttonBackgroundHoverColor: 'rgba(87, 144, 255, 0.5)',
        buttonTextColor: '#3050C5'
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
        titleColor: 'rgba(253, 123, 236, 0.8)',
        detailColor: 'rgba(255, 255, 255, 0.8)',
        buttonBackgroundColor: 'rgba(253, 123, 236, 0.4)',
        buttonBackgroundHoverColor: 'rgba(253, 123, 236, 0.6)',
        buttonTextColor: 'rgba(234, 214, 231, 0.95)'
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
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box className={ classes.titleTextBox }>
      <Margin>
        <Box >
          <Grid container spacing={xs ? 1 : 5}>
            <Grid item xs={12} lg={4} xl={5}>
              <Box pt={xs ? 0 : 5}>
                asdas
              </Box>
              
            </Grid>
            <Grid item xs={12} lg={8} xl={7}>
              <Grid container spacing={xs ? 2 : 4} style={{paddingLeft: xs ? 0 : 50, paddingRight: xs ? 0 : 50}}>
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
