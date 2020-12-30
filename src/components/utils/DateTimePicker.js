import React from 'react';
import DateFnsUtils from '@date-io/moment'; // choose your lib
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import "moment/locale/es-do";

const MaterialUIPickers = ({ selectedDate, handleDateChange }) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
                onLoadedData={handleDateChange}
                className="date-picker"
                value={selectedDate}
                onChange={handleDateChange}
                label="Fecha del incidente"
            />
        </MuiPickersUtilsProvider>
    );
}

export default MaterialUIPickers;
