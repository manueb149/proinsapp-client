import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


const Row = ({ row, user, permitedUsers }) => {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.asegurado}
                </TableCell>
                <TableCell align="right">{row.poliza}</TableCell>
                <TableCell align="right">{row.chassis}</TableCell>
                <TableCell align="right">{row.cedula}</TableCell>
                <TableCell align="right">{row.assistances}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Histórico
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Fecha</TableCell>
                                        <TableCell>Gruero</TableCell>
                                        <TableCell>Aseguradora</TableCell>
                                        <TableCell align="right">Usuario</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => {
                                        if (permitedUsers.includes(user.name.toUpperCase())) {
                                            return (
                                                <TableRow key={historyRow._id}>
                                                    <TableCell component="th" scope="row"> {historyRow.fechaSiniestro}</TableCell>
                                                    <TableCell>{historyRow.datosGruero.gruaDeServicio}</TableCell>
                                                    <TableCell>{historyRow.aseguradora}</TableCell>
                                                    <TableCell align="right">{historyRow.user}</TableCell>
                                                </TableRow>
                                            )
                                        } else {
                                            if (historyRow.user.toUpperCase() === user.name.toUpperCase()) {
                                                return (
                                                    <TableRow key={historyRow._id}>
                                                        <TableCell component="th" scope="row"> {historyRow.fechaSiniestro}</TableCell>
                                                        <TableCell>{historyRow.datosGruero.gruaDeServicio}</TableCell>
                                                        <TableCell>{historyRow.aseguradora}</TableCell>
                                                        <TableCell align="right">{historyRow.user}</TableCell>
                                                    </TableRow>
                                                )
                                            } else {
                                                return null
                                            }
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


const CollapsibleTable = ({ rows = [], user, permitedUsers }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead style={{ borderRadius: "0px" }}>
                    <TableRow>
                        <TableCell />
                        <TableCell>Asegurado</TableCell>
                        <TableCell align="right">Póliza</TableCell>
                        <TableCell align="right">Chassis</TableCell>
                        <TableCell align="right">Cédula</TableCell>
                        <TableCell align="right">Asistencias</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row._id} row={row} user={user} permitedUsers={permitedUsers} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CollapsibleTable
