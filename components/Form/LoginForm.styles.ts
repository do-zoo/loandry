import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  greeting: {
    textAlign: "center",
  },

  input: {
    width: "100%",
  },

  form: {
    width: "100%",
  },
  logo: {
    height: "44px",
  },
}));
