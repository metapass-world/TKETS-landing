import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  titleTextBox: {
    backgroundColor: '#fff',
  },
  boxBody : {
    color: '#616161',
  },
  boxPaper: {
    backgroundColor: 'white',
    boxShadow: '0px 10px 15px 0px rgba(0,0,0,0.2)',
    borderRadius: theme.shape.borderRadius
  },
}));

export const tabsStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: theme.spacing(1) + 5,
    background: '#ffffff',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 0,
    minHeight: 35,
  },
  indicator: {
    height: '100%',
    borderRadius: theme.spacing(1),
    backgroundColor: 'rgba(175, 222, 248, 0.3)',
  },
}));

export const tabItemStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: 2,
    marginRight: 2,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 0,
    paddingBottom: 0,
    minWidth: 100,
    minHeight: 35,
  },
  wrapper: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#005585',
  },
}));