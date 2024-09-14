import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { SearchOutlined, Visibility, VisibilityOff } from "@mui/icons-material";

const CustomTextField = (props) => {
  const {
    label,
    fieldName,
    type = "text",
    value,
    onBlur,
    onChange,
    error,
    helperText,
    isSearch,
    readOnly,
    size,
    ...restProps
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (event) => {
    const { value } = event.target;
    if (type === "number" && value < 1) {
      onChange({ ...event, target: { ...event.target, value: "" } });
    } else {
      onChange(event);
    }
  };

  return (
    <FormControl
      fullWidth
      error={error}
      sx={{ background: "white" }}
      variant="outlined"
      size={size}
    >
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
      <OutlinedInput
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "grey.400",
          },
        }}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        value={value}
        name={fieldName}
        onBlur={onBlur}
        onChange={handleChange}
        label={label}
        readOnly={readOnly || false}
        {...(type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {})}
        {...(isSearch
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }
          : {})}
        {...(type === "number"
          ? {
              inputProps: {
                min: 1,
              },
            }
          : {})}
        {...restProps}
      />
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CustomTextField;
