import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  useTheme,
  Avatar,
  Box,
} from "@mui/material";

const CustomSelect = ({
  label,
  fieldName,
  value,
  onBlur,
  onChange,
  error,
  helperText,
  options,
  placeholder,
  isImg,
  size,
  ...props
}) => {
  return (
    <FormControl fullWidth error={error} size={size}>
      {label && (
        <InputLabel
          htmlFor={`outlined-adornment-${fieldName}`}
          sx={
            size === "small"
              ? {
                  fontSize: "0.78rem",
                  transform: "translate(14px, 10px) scale(1)",
                  "&.MuiInputLabel-shrink": {
                    transform: "translate(14px, -6px) scale(0.78)",
                  },
                }
              : {}
          }
        >
          {label}
        </InputLabel>
      )}
      <Select
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "grey.400",
          },
          "& .MuiSelect-select": {
            padding: isImg ? "10px" : "",
          },
        }}
        value={value}
        label={label}
        name={fieldName}
        onBlur={onBlur}
        onChange={onChange}
        fullWidth
        {...props}
      >
        {placeholder && (
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {!isImg && option.label}
            {isImg && (
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Avatar
                  src={option?.profileImage || "/src/assets/img/user.png"}
                />{" "}
                {option.label}
              </Box>
            )}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;
