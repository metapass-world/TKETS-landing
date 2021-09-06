import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { ComparisonData } from './types'
import { useStyles } from './styles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ReactComponent as TfuelLogo } from './theta-fuel-tfuel-logo.svg'

function PricingCalculatorCostsDialog(props: {open: boolean, handleClose: () => void, data: ComparisonData | undefined}) {

  const { open, handleClose, data } = props

  const rows = data ? Object.keys(data.data.costs).map(key => {
    return {
      name: key,
      cost: data.data.costs[key]
    }
  }) : []

  var totalTfuelCost = 0;
  var totalUSDCost = 0;
  
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="breakdown-dialog-title" open={open}>
        <DialogTitle id="breakdown-dialog-title">
          Costs breakdown*
        </DialogTitle>
        <DialogContent dividers>
          <TableContainer component={Box}>
            <Table aria-label="costs table" size="small" >
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">TFUEL Cost</TableCell>
                  <TableCell align="right">USD Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  totalTfuelCost += row.cost.tfuelValue!
                  totalUSDCost += row.cost.value
                  return <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name} ({row.cost.numTimes!}x)
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" justifyContent="flex-end">
                        {row.cost.tfuelValue!.toFixed(4)}
                        <TfuelLogo height={20} style={{marginLeft: 5}}/>
                      </Box>
                    </TableCell>
                    <TableCell align="right">${row.cost.value.toFixed(2)}</TableCell>
                  </TableRow>
                })}
                <TableRow key={'total'}>
                  <TableCell component="th" scope="row">
                    <b>Total</b>
                  </TableCell>
                  <TableCell align="right">
                    <Box display="flex" alignItems="center" justifyContent="flex-end">
                      <b>{totalTfuelCost.toFixed(4)}</b>
                      <TfuelLogo height={20} style={{marginLeft: 5}}/>
                    </Box>
                  </TableCell>
                  <TableCell align="right"><b>${totalUSDCost.toFixed(2)}</b></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box mx={2} mt={1}>
            <Typography variant="caption" gutterBottom>
              *The TFUEL cost estimations are based on the current TFUEL price and the latest implementations of our smart contracts, and may be subject to change in the future.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary" size="large">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function PricingCalculatorSummary(props: {data: ComparisonData | undefined}) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { data } = props

  return <Box>
    <PricingCalculatorCostsDialog open={open} handleClose={handleClose} data={data}/>
    <Box>
      <Typography className={classes.boxBody} variant="h6" align='center' style={{fontWeight: 400}} gutterBottom>
        Your estimated payout:
      </Typography>
    </Box>
    <Box>
      <Typography variant="h3" align='center' style={{color: '#424242', fontWeight: 600}} gutterBottom>${data ? data.data.payout.toFixed(2) : 0}</Typography>
    </Box>
    <Box justifyContent="center" display="flex">
      <Button variant="outlined" onClick={handleClickOpen}>
        Costs breakdown
      </Button>
    </Box>
    <Box mt={3}>
      <Typography className={classes.boxBody} variant="body1" align='center' style={{fontWeight: 400}} gutterBottom>
        Attendees pay:
      </Typography>
    </Box>
    <Box>
      {
        data && 
        data.data.actualTicketPrices.map((ticket, id) => 
          <Typography variant="h6" align='center' style={{color: '#424242', fontWeight: 400}}>Ticket {id + 1}: <b style={{fontWeight: 500}}>${ticket.toFixed(2)}</b></Typography>
        )
      }
    </Box>
  </Box>
}

export default PricingCalculatorSummary