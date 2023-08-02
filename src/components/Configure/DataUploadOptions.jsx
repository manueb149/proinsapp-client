import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function DialogSelect({aseguradora, setAseguradora, plan, setPlan}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleChangeAseg = (event) => {
        setAseguradora(event.target.value || '');
    };
    const handleChangePlan = (event) => {
        setPlan(event.target.value || '');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>Abrir Opciones</Button>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Escoja las opciones</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="demo-dialog-native">Aseguradora</InputLabel>
                            <Select
                                native
                                value={aseguradora}
                                onChange={handleChangeAseg}
                                input={<Input id="demo-dialog-native" />}
                            >
                                <option aria-label="" value="" />
                                <option value={"LA-INTERNACIONAL"}>La Internacional</option>
                                <option value={"FIHOGAR"}>Fihogar</option>
                                <option value={"FUTURO"}>Futuro</option>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">Plan</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={plan}
                                onChange={handleChangePlan}
                                input={<Input />}
                            >
                                <MenuItem value="">
                                    <em></em>
                                </MenuItem>
                                <MenuItem value={"PLAN-VIP"}>Plan VIP</MenuItem>
                                <MenuItem value={"PLAN-MINIBUS"}>Plan Minibus</MenuItem>
                                <MenuItem value={"PLAN-BASICO"}>Plan Básico</MenuItem>
                                <MenuItem value={"PLAN-VIP-SD"}>Plan VIP - SD</MenuItem>
                                <MenuItem value={"PLAN-VIP-STGO"}>Plan VIP - STGO</MenuItem>
                                <MenuItem value={"PLAN-BASICO-MINI-SD"}>Plan Básico Mini - SD</MenuItem>
                                <MenuItem value={"PLAN-BASICO-LIVIANO-SD"}>Plan Básico Liviano - SD</MenuItem>
                                <MenuItem value={"PLAN-BASICO-LIVIANO-STGO"}>Plan Básico Liviano - STGO</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
