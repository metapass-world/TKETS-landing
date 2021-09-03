import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import NumberFormat from 'react-number-format';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { PricingCalculatorInputProps, defaultTicketData } from './types';
import { useStyles } from './styles';

function NumberFormatCustom(props: any) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      // isNumericString
    />
  );
}

function PricingCalculatorInput(props: PricingCalculatorInputProps) {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  const setTicketData = (pricePerTicket: number, numberOfTicketsSold: number, id: number) => {
    var newTicketsData = [...props.ticketData]
    newTicketsData[id] = {pricePerTicket, numberOfTicketsSold}
    props.setTicketData(newTicketsData)
  }

  const addTicketData = () => {
    var newTicketsData = [...props.ticketData]
    newTicketsData.push(defaultTicketData)
    props.setTicketData(newTicketsData)
  }

  const deleteTicketData = (id: any) => {
    var newTicketsData = [...props.ticketData]
    newTicketsData.splice(id, 1)
    props.setTicketData(newTicketsData)
  }

  return (
    <Box className={classes.boxPaper} px={xs ? 2 : 4} py={3} flexShrink={1}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align='left' style={{color: '#424242', fontWeight: 600}} gutterBottom>Use our calculator to compare</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box>
            {props.ticketData.map((data, id) => {
              return <Box mt={id === 0 ? 0 : 2}>
                <Typography variant="subtitle1">
                  Ticket {id + 1}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <TextField 
                    id="outlined-basic" 
                    label="Ticket price" 
                    variant="outlined"
                    value={data.pricePerTicket.toFixed(2)}
                    onChange={(e) => {
                      if (!e.target.value) {
                        setTicketData(0, data.numberOfTicketsSold, id)
                      } else {
                        setTicketData(parseFloat(e.target.value), data.numberOfTicketsSold, id)
                      }
                    }}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon />
                          </InputAdornment>
                        ),
                      }}/>
                  <Box mx={xs ? 1 : 2}>
                    <ClearIcon />
                  </Box>
                  <TextField 
                    id="outlined-basic" 
                    label="Tickets sold" 
                    variant="outlined"
                    value={data.numberOfTicketsSold.toFixed(0)}
                    onChange={(e) => {
                      if (!e.target.value) {
                        setTicketData(data.pricePerTicket, 0, id)
                      } else {
                        setTicketData(data.pricePerTicket, parseInt(e.target.value), id)
                      }
                    }}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                      }}/>
                  {props.ticketData.length !== 1 && <Box ml={xs ? 1 : 2}>
                    <IconButton aria-label="delete" size={xs ? "small" : "medium"} onClick={() => deleteTicketData(id)}>
                      <DeleteIcon />
                    </IconButton> 
                  </Box>}
                </Box>
              </Box>
            })}
            <Box mt={2}>
              <Button variant="outlined" size="large" onClick={addTicketData}>
                Add ticket type
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={props.passCostsOn} onChange={() => props.setPassCostsOn(!props.passCostsOn)} name="pass-fees" />}
                label="Pass fees on to attendees"
              />
              <FormHelperText>
                {
                  props.passCostsOn ? "Any fees will currently be added on top of ticket price" : "You will currently be absorbing any fees"
                }
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={props.requireStamping} onChange={() => props.setRequireStamping(!props.requireStamping)} name="stamping" />}
                label="Require stamping on entry"
              />
              <FormHelperText>Stamping marks a ticket as used on the blockchain, but it also costs network fees. You can still verify a ticket without stamping it.</FormHelperText>
            </Grid>
          </Grid>
        </Grid>

      </Grid>

    </Box>
  )
}

export default PricingCalculatorInput