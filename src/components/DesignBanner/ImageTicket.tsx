import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import { useSpring, animated } from 'react-spring'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import { TicketColors, TicketMetadata, ImageTicketStyleProps, RGBA } from './types'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const toColor = (rgba: RGBA) => {
  return `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`
}

const useStyles = makeStyles((theme) => ({
  ticketWrapper: {
    filter: 'drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.3))'
  },
  ticketRoot: {
    width: '100%',
    borderRadius: '30px 20px 20px 30px',
    display: 'block',
    maskImage: `radial-gradient(circle at left, transparent 6px, #bbb 7px)`,
    maskSize: '100% 20px',
    maskPosition: 'left center',
    maskRepeat: 'repeat-y',
    [theme.breakpoints.up('xs')]: {
      height: '180px',
      background: (props: TicketProps) => {
        if (props.style.fullWidthBackground) {
          return `linear-gradient(90deg, rgba(255,255,255,0) 50%, rgba(255,255,255,0.35) 100%), url("${props.style.image}")`;
        }
        const ticketBackground = props.style.colors.ticketBackground ? toColor(props.style.colors.ticketBackground) : '#fff';
        return `${ticketBackground}`;
      },
    },
    [theme.breakpoints.down('xs')]: {
      height: '220px',
      background: (props: TicketProps) => {
        if (props.style.fullWidthBackground) {
          return `linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%), url("${props.style.image}")`;
        }
        const ticketBackground = props.style.colors.ticketBackground ? toColor(props.style.colors.ticketBackground) : '#fff';
        return `linear-gradient(90deg, ${ticketBackground} 20%, rgba(255,255,255,0) 120%), url("${props.style.image}")`;
      },
    },
  },
  buttonRoot: {
    color: (props: TicketProps) => toColor(props.style.colors.buttonTextColor),
    backgroundColor: (props: TicketProps) => toColor(props.style.colors.buttonBackgroundColor),
    fontWeight: 600,
    marginLeft: 10,
    '&:hover': {
      backgroundColor: (props: TicketProps) => toColor(props.style.colors.buttonBackgroundHoverColor),
    },
  },
  gutterBackground: {
    background: (props: TicketProps) => {
      const ticketBackground = props.style.colors.ticketBackground ? toColor(props.style.colors.ticketBackground) : '#fff';
      return `linear-gradient(90deg, rgba(255,255,255,0) 30%, ${ticketBackground} 110%), url("${props.style.image}")`
    },
  },
  detailsBody: {
    color: (props: TicketProps) => toColor(props.style.colors.detailColor)
  },
  titleBody: {
    color: (props: TicketProps) => toColor(props.style.colors.titleColor), 
    fontWeight: 600
  }
}));

const calc = (x: number, y: number) => [-(y - window.innerHeight / 2) / 400, (x - window.innerWidth / 2) / 400, 1]
const trans = (x: number, y: number, s: number) => `perspective(60vh) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export interface TicketProps {
  type: string;
  style: ImageTicketStyleProps;
  metadata: TicketMetadata;
}

function ImageTicket(props: TicketProps) {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  const { style, metadata } = props
  console.log(props)
  const classes = useStyles(props)
  const [springProps, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 10, tension: 350, friction: 100 } }))

  return (
    <animated.div 
          className={classes.ticketWrapper} 
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: springProps.xys.to(trans) }}>
            <Box className={classes.ticketRoot} style={{backgroundRepeat: 'no-repeat', backgroundSize: "cover", backgroundPosition: props.style.fullWidthBackground && !style.gutterLeft ? "center" : "left"}}>
              {!xs ? 
                // non XS Style:
                <Grid container style={{height: "100%"}}>
                  {
                    style.gutterLeft && <Grid item xs={3} className={!style.fullWidthBackground ? classes.gutterBackground : ""} style={{backgroundSize: "cover", backgroundPosition: "center"}}>
                      </Grid>
                  }
                  <Grid item xs={style.gutterLeft ? 4 : 5} component={Box} py={2}>
                    <Box pl={style.gutterLeft ? 2 : 3} display="flex" flexDirection="column" height="100%">
                      <Box flexGrow={1}>
                        <Typography variant="h5" align={'left'} className={classes.detailsBody} style={{fontWeight: 500}} gutterBottom>
                          {metadata.ticketType}
                        </Typography>
                        <Typography variant="body2" align={'left'} className={classes.detailsBody} style={{fontWeight: 100}}>
                          {metadata.eventLocation}
                        </Typography>
                        <Typography variant="body2" align={'left'} className={classes.detailsBody} style={{fontWeight: 500}}>
                          {metadata.eventDatetime}
                        </Typography> 
                      </Box>
                      <Box display="flex" alignItems="center" pb={1}>
                        <LocalActivityIcon className={classes.detailsBody} />
                        <Box ml={1}>
                          <Typography variant="body1" align={'left'} className={classes.detailsBody} style={{fontWeight: 400}}>
                            Valid
                          </Typography>
                        </Box>
                        
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={style.gutterLeft ? 5 : 7} component={Box} style={{height: "100%"}} py={2}>
                    <Box pr={3} display="flex" flexDirection="column" height="100%">
                      <Box flexGrow={1}>
                        <Typography variant="h4" align={'right'} className={classes.titleBody}>
                          {metadata.eventName}
                        </Typography>
                      </Box>
                      <Box alignSelf="flex-end">
                        <IconButton aria-label="more">
                          <MoreVertIcon style={{color: toColor(props.style.colors.detailColor)}} />
                        </IconButton>
                        <Button variant="contained" disableElevation className={classes.buttonRoot}>
                          Check In
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid> : 
                // XS Style:
                <Grid container style={{height: "100%"}}>
                  <Grid item xs={12} component={Box} pt={2} px={3}>
                    <Box display="flex" flexDirection="column">
                      <Box flexGrow={1}>
                        <Typography variant="h4" className={classes.titleBody}>
                          {metadata.eventName}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} component={Box} px={3}>
                    <Box display="flex" flexDirection="column">
                      <Box flexGrow={1}>
                        <Typography variant="h5" align={'left'} className={classes.detailsBody} style={{fontWeight: 500}} gutterBottom>
                          {metadata.ticketType}
                        </Typography>
                        <Typography variant="body2" align={'left'} className={classes.detailsBody} style={{fontWeight: 100}}>
                          {metadata.eventLocation}
                        </Typography>
                        <Typography variant="body2" align={'left'} className={classes.detailsBody} style={{fontWeight: 500}}>
                          {metadata.eventDatetime}
                        </Typography> 
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} component={Box} px={3}>
                    <Box display="flex" flexDirection="row" >
                      <Box display="flex" alignItems="center" pb={1} flexGrow={1} style={{margin: "auto", padding: 0}}>
                        <LocalActivityIcon className={classes.detailsBody} />
                        <Box ml={1}>
                          <Typography variant="body1" align={'left'} className={classes.detailsBody} style={{fontWeight: 400}}>
                            Valid
                          </Typography>
                        </Box>
                        
                      </Box>
                      <Box alignSelf="flex-end">
                        <IconButton aria-label="more">
                          <MoreVertIcon style={{color: toColor(props.style.colors.detailColor)}} />
                        </IconButton>
                        <Button variant="contained" disableElevation className={classes.buttonRoot}>
                          Check In
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              }
              
            </Box>
    </animated.div>
    
  )
}

export default ImageTicket