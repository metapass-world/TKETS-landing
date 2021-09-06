import React from 'react'
import BackgroundImage from './title_bg.png';
import BackgroundImageSM from './title_bg_sm.png';
import TitleMockup1 from './title_mockup_1.png';
import TitleMockup2 from './title_mockup_2.png';
import './index.css';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { TextLoop } from "react-text-loop-next";
import { useSpring, animated } from 'react-spring'

const useStyles = makeStyles((theme) => ({
  titleTextBox: {
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.up('lg')]: {
      backgroundImage: `url(${BackgroundImage})`,
      paddingTop: '40vh',
      paddingBottom: '20vh',
      paddingLeft: '10%',
      backgroundSize: 'cover',
      backgroundPosition: 'right',
    },
    [theme.breakpoints.only('md')]: {
      backgroundImage: `url(${BackgroundImage})`,
      paddingTop: '40vh',
      paddingBottom: '20vh',
      paddingLeft: 70,
      backgroundSize: 'cover',
      backgroundPosition: 'right',
    },
    [theme.breakpoints.down('sm')]: {
      backgroundImage: `url(${BackgroundImage})`,
      paddingTop: 'calc(150px + 50%)',
      paddingBottom: '10%',
      paddingLeft: 50,
      backgroundSize: 'contain',
      backgroundPosition: 'top',
    },
    [theme.breakpoints.down('xs')]: {
      backgroundImage: `url(${BackgroundImageSM})`,
      paddingTop: 'calc(150px + 50%)',
      paddingBottom: '10%',
      paddingLeft: 30,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
    },
  },
  imageMockup1: {
    position: 'absolute',
    transform: 'translateY(-50%)',
    boxShadow: '0px 9px 22px 2px rgba(0,0,0,0.3)',
    [theme.breakpoints.up('lg')]: {
      borderRadius: 20, 
      width: "40%",
      top: "30vh", 
      right: "10%"
    },
    [theme.breakpoints.only('md')]: {
      borderRadius: 20, 
      width: "45%",
      top: "33vh", 
      right: 70
    },
    [theme.breakpoints.down('sm')]: {
      transform: 'none',
      borderRadius: 10, 
      top: 120, 
      left: "12%",
      width: '80%'
    },
    transition: 'box-shadow 0.5s',
    willChange: 'transform'
  },
  imageMockup2: {
    position: 'absolute',
    transform: 'translateY(-50%)',
    boxShadow: '0px 9px 22px 2px rgba(0,0,0,0.3)',
    transition: 'box-shadow 0.5s',
    willChange: 'transform',
    [theme.breakpoints.up('lg')]: {
      borderRadius: 15, 
      width: "12%",
      top: "28vh", 
      right: "40%"
    },
    [theme.breakpoints.only('md')]: {
      borderRadius: 15, 
      width: "13%",
      top: "31vh", 
      right: "calc(70px + 35%)"
    },
    [theme.breakpoints.down('sm')]: {
      borderRadius: 10, 
      transform: 'none',
      top: 100, 
      left: "8%",
      width: '22%'
    },
  },
  titleText: {
    margin: 0,
    [theme.breakpoints.up('lg')]: {
      fontSize: '36pt'
    },
    [theme.breakpoints.only('md')]: {
      fontSize: '24pt'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '30pt'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '26pt'
    },
  },
  textGradient1: {
    backgroundColor: 'rgb(80,172,255)',
    backgroundImage: 'linear-gradient(22deg, rgba(80,172,255,1) 0%, rgba(179,64,255,1) 100%)'
  },
  textGradient2: {
    backgroundColor: 'rgb(80,139,255)',
    backgroundImage: 'linear-gradient(22deg, rgba(80,139,255,1) 0%, rgba(224,64,255,1) 100%)'
  },
  textGradient3: {
    backgroundColor: 'rgb(80,104,255)',
    backgroundImage: 'linear-gradient(22deg, rgba(80,104,255,1) 0%, rgba(255,64,244,1) 100%)'
  },
  textGradient4: {
    backgroundColor: 'rgb(106,80,255)',
    backgroundImage: 'linear-gradient(22deg, rgba(106,80,255,1) 0%, rgba(255,64,183,1) 100%)'
  },
  textGradient5: {
    backgroundColor: 'rgb(135,80,255)',
    backgroundImage: 'linear-gradient(22deg, rgba(135,80,255,1) 0%, rgba(255,64,142,1) 100%)'
  },
}));

const calc = (x: number, y: number) => [-(y - window.innerHeight / 2) / 90, (x - window.innerWidth / 2) / 90, 1]
const calc2 = (x: number, y: number) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x: number, y: number, s: number) => `perspective(60vh) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

function TitleBanner() {
  const classes = useStyles();
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 10, tension: 350, friction: 100 } }))
  const [props2, set2] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 10, tension: 350, friction: 100 } }))

  return (
    <Box>
      <Box className={classes.titleTextBox}>
        <h2 className={classes.titleText}>
          We're building the<br/>
          <TextLoop interval={1500}>
              <span className={`${classes.textGradient1} gradientText`}>most secure</span>
              <span className={`${classes.textGradient2} gradientText`}>first permissionless</span>
              <span className={`${classes.textGradient3} gradientText`}>most decentralised</span>
              <span className={`${classes.textGradient4} gradientText`}>most transparent</span>
              <span className={`${classes.textGradient5} gradientText`}>cheapest</span>
              <span className={`${classes.textGradient4} gradientText`}>most engaging</span>
              <span className={`${classes.textGradient3} gradientText`}>fastest</span>
              <span className={`${classes.textGradient2} gradientText`}>most energy efficient</span>
          </TextLoop><br/>
          NFT ticketing platform
        </h2>
      </Box>
      <Box>
        <animated.img 
          src={TitleMockup1} alt="Mockup 1" className={classes.imageMockup1} 
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.to(trans) }}/>
        <animated.img src={TitleMockup2} alt="Mockup 2" className={classes.imageMockup2}
          onMouseMove={({ clientX: x, clientY: y }) => set2({ xys: calc2(x, y) })}
          onMouseLeave={() => set2({ xys: [0, 0, 1] })}
          style={{ transform: props2.xys.to(trans) }}/>
      </Box>
      

    </Box>
  )
}

export default TitleBanner
