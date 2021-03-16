import React from 'react';
import DateFnsUtils from '@date-io/moment'; // choose your lib
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import "moment/locale/es-do";

const MaterialUIPickers = ({ selectedDate, handleDateChange, label, MaxDate }) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                maxDate={MaxDate ? new Date() : false}
                onLoadedData={handleDateChange}
                className="date-picker"
                format="MMMM DD yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                label={label ? label : "Fecha del incidente"}
            />
        </MuiPickersUtilsProvider>
    );
}

export default MaterialUIPickers;
