import React from "react";
import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";

const CustomCheckBox = ({ label, checked, onChange, name, color }) => {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={checked}
          onChange={onChange}
          name={name}
          color={color}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckBox;
