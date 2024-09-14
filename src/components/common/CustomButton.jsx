import React from "react";
import Button from "@mui/material/Button";

const CustomButton = (props) => {
  return (
    <Button size="large" {...props} disableElevation>
      {props.children}
    </Button>
  );
};

export default CustomButton;
