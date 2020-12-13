import React, { Fragment } from 'react';
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

const CustomTextField = ({values, checked, setChecked, shortName, LongName, Format, handleChange}) => {

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
                disabled={!checked[shortName]}
                size="small"
                variant="outlined"
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