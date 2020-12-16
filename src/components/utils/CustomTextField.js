import React, { Fragment } from 'react';
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

const CustomTextField = ({values, checked, setChecked, variant, size, shortName, LongName, Format, handleChange, alwaysDisabled}) => {

    return (
        <Fragment>
            <Checkbox
                name={shortName}
                checked={checked[shortName]}
                onChange={(e) =>
                    setChecked({
                        ...checked,
                        [e.target.name]:
                            e.target.checked,
                    })
                }
                inputProps={{
                    "aria-label": "secondary checkbox",
                }}
            />
            <TextField
                disabled={alwaysDisabled ? true : !checked[shortName]}
                size={size}
                variant={variant}
                label={LongName}
                value={values[shortName]}
                onChange={handleChange}
                name={shortName}
                id={shortName}
                InputProps={{
                    inputComponent: Format,
                }}
            />
        </Fragment>
    )
}

export default CustomTextField;