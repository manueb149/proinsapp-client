import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    },
}));

const FullWidthTabs = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="relative" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Reportes Generales" {...a11yProps(0)} />
                    <Tab label="Servicios por Región" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <div className="legend">
                        <div className="legend-inner">
                            <div className="serv legend-line">
                                <div className="dot"></div>
                                <div className="label">SERV{" ->"}</div>
                                <div className="description">Cantidad de servicios</div>
                            </div>
                            <div className="svl legend-line">
                                <div className="dot"></div>
                                <div className="label">SVL{" ->"}</div>
                                <div className="description">Cantidad de Servicios de Vehículos Livianos</div>
                            </div>
                            <div className="svp legend-line">
                                <div className="dot"></div>
                                <div className="label">SVP{" ->"}</div>
                                <div className="description">Cantidad de Servicio de Vehículos Pesados</div>
                            </div>
                            <div className="spv legend-line">
                                <div className="dot"></div>
                                <div className="label">SPV{" ->"}</div>
                                <div className="description">Cantidad de Servicios Plan VIP</div>
                            </div>
                            <div className="spb legend-line">
                                <div className="dot"></div>
                                <div className="label">SPB{" ->"}</div>
                                <div className="description">Cantidad de Servicios Plan Básico</div>
                            </div>
                            <div className="spm legend-line">
                                <div className="dot"></div>
                                <div className="label">SPM{" ->"}</div>
                                <div className="description">Cantidad de Servicios Plan Minibus</div>
                            </div>
                            <div className="sd legend-line">
                                <div className="dot"></div>
                                <div className="label">SD{" ->"}</div>
                                <div className="description">Cantidad de Servicios Diurnos</div>
                            </div>
                            <div className="sn legend-line">
                                <div className="dot"></div>
                                <div className="label">SND{" ->"}</div>
                                <div className="description">Cantidad de Servicios Nocturnos</div>
                            </div>
                            <div className="sf legend-line">
                                <div className="dot"></div>
                                <div className="label">SF{" ->"}</div>
                                <div className="description">Cantidad de Servicios Fines de Semana y Feriados</div>
                            </div>
                            <div className="sn legend-line">
                                <div className="dot"></div>
                                <div className="label">SNF{" ->"}</div>
                                <div className="description">Cantidad de Servicios Nocturnos Fines de Semana y Feriados</div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <div className="legend">
                        <div className="legend-inner">
                            <div className="est legend-line">
                                <div className="dot"></div>
                                <div className="label">EST{" ->"}</div>
                                <div className="description">Región Este</div>
                            </div>
                            <div className="sur legend-line">
                                <div className="dot"></div>
                                <div className="label">SUR{" ->"}</div>
                                <div className="description">Región Sur</div>
                            </div>
                            <div className="cib legend-line">
                                <div className="dot"></div>
                                <div className="label">CIB{" ->"}</div>
                                <div className="description">Región Cibao</div>
                            </div>
                            <div className="sdo legend-line">
                                <div className="dot"></div>
                                <div className="label">SDO{" ->"}</div>
                                <div className="description">Santo Domingo</div>
                            </div>
                            <div className="mao legend-line">
                                <div className="dot"></div>
                                <div className="label">MAO{" ->"}</div>
                                <div className="description">Mao</div>
                            </div>
                            <div className="ppl legend-line">
                                <div className="dot"></div>
                                <div className="label">PPL{" ->"}</div>
                                <div className="description">Puerto Plata</div>
                            </div>
                            <div className="moc legend-line">
                                <div className="dot"></div>
                                <div className="label">MOC{" ->"}</div>
                                <div className="description">Moca</div>
                            </div>
                            <div className="ns legend-line">
                                <div className="dot"></div>
                                <div className="label">NS{" ->"}</div>
                                <div className="description">Nagua - Samaná</div>
                            </div>
                            <div className="sfs legend-line">
                                <div className="dot"></div>
                                <div className="label">SFS{" ->"}</div>
                                <div className="description">San Francisco - Salcedo</div>
                            </div>
                            <div className="as legend-line">
                                <div className="dot"></div>
                                <div className="label">AS{" ->"}</div>
                                <div className="description">Asistencias</div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}

export default FullWidthTabs;