import { useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import overrides from "./overrides";
import { typography } from "./typography";
import palette from "./palette";

const ThemeProvider = ({ children }) => {
  const memoizedValue = useMemo(
    () => ({
      palette: palette(),
      typography,
      shape: { borderRadius: 3 },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
