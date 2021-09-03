import React, { useState, useEffect } from 'react'
import Margin from '../../hooks'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { PricingCalculatorData, PricingCalculatorResult, defaultTicketData, ComparisonData } from './types';
import { useStyles, tabsStyles, tabItemStyles } from './styles';
import PricingCalculatorSummary from './PricingCalculatorSummary';
import PriceComparisonChart from './PricingComparisonChart';
import PricingCalculatorInput from './PricingCalculatorInput';

const calculateTKETSFees = (ticketData: PricingCalculatorData[], passCostsOn: boolean, requireStamping: boolean, tfuelPrice: number) => {
  const gasPrice = 0.000004 * tfuelPrice
  const ticketSCCreationFees = ticketData.length * 2735116 * gasPrice
  const eventCreationFee = 146270 * gasPrice
  const ticketCountReducer = (previousValue: number, currentValue: PricingCalculatorData) => previousValue + currentValue.numberOfTicketsSold;
  const totalTickets = ticketData.reduce(ticketCountReducer, 0)
  const fixedCostsPerTicket = (ticketSCCreationFees + eventCreationFee) / totalTickets

  var ticketMintingFees = 0;
  var stampingCosts = 0;
  var actualTicketPrices = [];

  const ticketMintFeePerTicket = 126826 * gasPrice;
  const ticketStampFeePerTicket = 46618 * gasPrice

  for (const ticketType of ticketData) {
    ticketMintingFees += ticketType.numberOfTicketsSold * ticketMintFeePerTicket;
    if (requireStamping) {
      stampingCosts += ticketType.numberOfTicketsSold * ticketMintFeePerTicket;
    }
    if (passCostsOn) {
      actualTicketPrices.push(ticketType.pricePerTicket + ticketMintFeePerTicket + (requireStamping ? ticketStampFeePerTicket : 0) + fixedCostsPerTicket)
    } else {
      actualTicketPrices.push(ticketType.pricePerTicket)
    }
  }

  var payoutAmount;

  const payoutReducer = (previousValue: number, currentValue: PricingCalculatorData) => previousValue + currentValue.numberOfTicketsSold * currentValue.pricePerTicket;
  if (passCostsOn) {
    payoutAmount = ticketData.reduce(payoutReducer, 0)
  } else {
    payoutAmount = ticketData.reduce(payoutReducer, 0) - ticketSCCreationFees - eventCreationFee - ticketMintingFees - stampingCosts
  }

  return {
    actualTicketPrices: actualTicketPrices,
    payout: payoutAmount,
    costs: {
      ['Event Creation Fee']: {
        value: eventCreationFee,
        numTimes: 1,
        tfuelValue: eventCreationFee / tfuelPrice
      },
      ['Ticket Smart Contract Creation Fees']:  {
        value: ticketSCCreationFees,
        numTimes: ticketData.length,
        tfuelValue: ticketSCCreationFees / tfuelPrice
      },
      ['Ticket Minting Fees']: {
        value: ticketMintingFees,
        numTimes: totalTickets,
        tfuelValue: ticketMintingFees / tfuelPrice
      },
      ['Ticket Stamping Fees']: {
        value: stampingCosts,
        numTimes: requireStamping ? totalTickets : 0,
        tfuelValue: stampingCosts / tfuelPrice
      },
    }
  } as PricingCalculatorResult
}

const calculateGenericFees = (ticketData: PricingCalculatorData[], passCostsOn: boolean, serviceFlatFeePerTicket: number, servicePercentFeePerTicket: number, maxFeePerTicket: undefined | number) => {
  var actualTicketPrices = [];

  var payoutAmount = 0;

  var serviceAndProcessingFees = 0;

  for (const ticketType of ticketData) {
    if (ticketType.pricePerTicket === 0) {
      actualTicketPrices.push(0)
      payoutAmount += 0
      continue
    }

    const perTicketFees = serviceFlatFeePerTicket + servicePercentFeePerTicket * ticketType.pricePerTicket
    const cappedPerTicketFees = (maxFeePerTicket && maxFeePerTicket < perTicketFees) ? maxFeePerTicket : parseFloat(perTicketFees.toFixed(2))

    serviceAndProcessingFees += cappedPerTicketFees * ticketType.numberOfTicketsSold

    const actualTicketPrice = passCostsOn ? ticketType.pricePerTicket + cappedPerTicketFees : ticketType.pricePerTicket
    actualTicketPrices.push(actualTicketPrice)

    payoutAmount += (actualTicketPrice - cappedPerTicketFees) * ticketType.numberOfTicketsSold
  }

  return {
    actualTicketPrices: actualTicketPrices,
    payout: payoutAmount,
    costs: {
      ['Service and Processing Fees']: {
        value: serviceAndProcessingFees
      },
    }
  } as PricingCalculatorResult
}

const eventSitesToCompare = [
  {
    name: 'Eventbrite Essential', 
    serviceFlatFeePerTicket: 0.79,
    servicePercentFeePerTicket: 0.045,
    maxFeePerTicket: undefined
  }, 
  {
    name: 'Eventbrite Professional', 
    serviceFlatFeePerTicket: 1.59,
    servicePercentFeePerTicket: 0.06,
    maxFeePerTicket: undefined
  }, 
  {
    name: 'TicketTailor', 
    serviceFlatFeePerTicket: 0.65,
    servicePercentFeePerTicket: 0.00,
    maxFeePerTicket: undefined
  }, 
  {
    name: 'Billetto', 
    serviceFlatFeePerTicket: 0.83,
    servicePercentFeePerTicket: 0.03,
    maxFeePerTicket: 13.75
  }, 
  {
    name: 'Xing Events', 
    serviceFlatFeePerTicket: 0.99,
    servicePercentFeePerTicket: 0.039,
    maxFeePerTicket: undefined
  },
  {
    name: 'Universe', 
    serviceFlatFeePerTicket: 0.79,
    servicePercentFeePerTicket: 0.02,
    maxFeePerTicket: 19.95
  }
]

const PriceComparisonTabs = [
  'Total costs', 'Payouts',
]

function PricingBanner() {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const [ticketData, setTicketData] = useState([defaultTicketData] as PricingCalculatorData[]);
  const [requireStamping, setRequireStamping] = useState(false);
  const [passCostsOn, setPassCostsOn] = useState(false);
  const [tfuelPrice, setTfuelPrice] = useState(undefined as number | undefined);
  const [comparisonData, setComparisonData] = useState([] as ComparisonData[])

  // tab control
  const [tabIndex, setTabIndex] = useState(0)
  const useTabStyle = tabsStyles()
  const useTabItemStyle = tabItemStyles();

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=theta-fuel&vs_currencies=usd')
      .then(res => {
        setTfuelPrice(parseFloat(res.data['theta-fuel']['usd']));
      })
  }, [])

  useEffect(() => {
    if (tfuelPrice) {
      var newComparisonData = []
      const estimatedTKETSFee = calculateTKETSFees(ticketData, passCostsOn, requireStamping, tfuelPrice)
      newComparisonData.push({name: 'TKETS', data: estimatedTKETSFee})
      
      for (const eventSite of eventSitesToCompare) {
        if ((eventSite.name === 'Eventbrite Essential' && ticketData.length > 1) || (eventSite.name === 'Eventbrite Professional' && ticketData.length === 1)) {
          continue
        }

        const estimatedSiteFee = calculateGenericFees(ticketData, passCostsOn, eventSite.serviceFlatFeePerTicket, eventSite.servicePercentFeePerTicket, eventSite.maxFeePerTicket)
        newComparisonData.push({name: eventSite.name, data: estimatedSiteFee})
      }

      setComparisonData(newComparisonData)
    }
  }, [ticketData, requireStamping, passCostsOn, tfuelPrice])

  return (
    <Box className={ classes.titleTextBox }>
      <Margin>
        <Box >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography variant="h3" align='left' style={{color: '#424242', fontWeight: 600}} gutterBottom>The lowest fees you've ever seen</Typography>
              <Typography className={classes.boxBody} variant="h6" style={{fontWeight: 400}} >
                You only pay network fees (which are <i>ridiculously</i> low!)
              </Typography>
              <Typography className={classes.boxBody} variant="h6" style={{fontWeight: 500}} >
                No service fees
              </Typography>
              <Typography className={classes.boxBody} variant="h6" style={{fontWeight: 500}} >
                No payment processing fees
              </Typography>
              <Box mt={5} display="flex">
                <PricingCalculatorInput ticketData={ticketData} setTicketData={setTicketData} passCostsOn={passCostsOn} setPassCostsOn={setPassCostsOn} requireStamping={requireStamping} setRequireStamping={setRequireStamping} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <PricingCalculatorSummary data={comparisonData.find(e => e.name === 'TKETS')}/>
              <Box py={3} display="flex" alignItems="center" justifyContent="center">
                <Tabs
                  classes={useTabStyle}
                  value={tabIndex}
                  onChange={(e, index) => setTabIndex(index)}
                >
                  {PriceComparisonTabs.map(_tab => <Tab classes={useTabItemStyle} label={_tab}/>)}
                </Tabs>
              </Box>
              
              <PriceComparisonChart comparisonData={comparisonData} showPayoutGraph={tabIndex === 1} />
            </Grid>
          </Grid>
        </Box>
      </Margin>
    </Box>
    
    
  )
}

export default PricingBanner
