import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackBar = ({ openSB, handleCloseSB, severity, notification }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={openSB}
        autoHideDuration={2000}
        onClose={handleCloseSB}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseSB} severity={severity}>
          {notification}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SnackBar;
