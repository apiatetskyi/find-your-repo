import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import UISelect from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

let initailLabelId = 1;

const Select = ({
  onChange = () => {},
  options = [{ value: "no_value", label: "None" }],
  defaultOption = 0,
  label = "",
}) => {
  const getLabelId = () => {
    return ++initailLabelId;
  };

  const labelId = `label-id-${getLabelId()}`;

  return (
    options.length && (
      <FormControl fullWidth>
        <InputLabel shrink variant="outlined" id={labelId}>
          {label}
        </InputLabel>
        <UISelect
          defaultValue={options[defaultOption].value}
          type="select"
          variant="outlined"
          labelId={labelId}
          label={label}
          displayEmpty
          onChange={onChange}
        >
          {options.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </UISelect>
      </FormControl>
    )
  );
};

export default Select;
