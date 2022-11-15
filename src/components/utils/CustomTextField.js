import React, { Fragment } from 'react';
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

const CustomTextField = ({ values, setValues, checked, setChecked, variant, size, shortName, LongName, Format, handleChange, alwaysDisabled, noValue, noCheck, rightCheckBox }) => {

    return (
        <Fragment>
            {!rightCheckBox
                ?
                <Checkbox
                    name={shortName}
                    checked={noCheck ? true : shortName === "TH" || shortName ==="SNR" ? values[shortName] : checked[shortName]}
                    onChange={(e) => {
                        setChecked({
                            ...checked,
                            [e.target.name]:
                                e.target.checked,
                        })
                        if (e.target.name === "TH" || e.target.name === "SNR") {
                            setValues({
                                ...values,
                                [e.target.name]: e.target.checked
                            })
                        }
                    }}
                    inputProps={{
                        "aria-label": "secondary checkbox",
                    }}
                />
                : null}
            <TextField
                disabled={alwaysDisabled ? true : !checked[shortName]}
                size={size}
                variant={variant}
                label={LongName}
                value={noValue ? "" : values[shortName]}
                onChange={handleChange}
                name={shortName}
                id={shortName}
                InputProps={{
                    inputComponent: Format,
                }}
            />
            {rightCheckBox
                ?
                <Checkbox
                    name={shortName}
                    checked={noCheck ? true : shortName === "TH" ? values[shortName] : checked[shortName]}
                    onChange={(e) => {
                        setChecked({
                            ...checked,
                            [e.target.name]:
                                e.target.checked,
                        })
                        if (e.target.name === "TH") {
                            setValues({
                                ...values,
                                TH: e.target.checked
                            })
                        }
                    }}
                    inputProps={{
                        "aria-label": "secondary checkbox",
                    }}
                />
                : null}
        </Fragment>
    )
}

export default CustomTextField;