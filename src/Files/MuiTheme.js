import { createMuiTheme } from "@material-ui/core";
import { green, orange } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     main: "#6A00F4",
  //     light: "#964afac5",
  //   },
  //   secondary: {
  //     main: "#DB00B6",
  //     light: " #ff39de",
  //   },
  //   background: {
  //     default: "#f4f5fd",
  //   },
  // },

  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: "5px 0 9px 0 rgba(0,0,0,.15)",
      },
    },
  },
});
