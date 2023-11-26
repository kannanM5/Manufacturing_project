import { RouterProvider, createHashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Indexroute } from "./Routing/index";
import { ThemeProvider, createTheme } from "@mui/material";
import InstanceBase from "./Routing/InstanceBase";

function App() {
  const theme = createTheme({
    palette: {
      primary: { main: "#0000FF" },
      secondary: { main: "#1a2c41" },
    },
  });

  const router = createHashRouter(Indexroute, { basename: "/" });
  return (
    <>
      <Toaster
        position="top-center"
        containerStyle={{
          top: 70,
          left: 20,
          right: 20,
        }}
        toastOptions={{
          style: {
            borderRadius: "10px",
            color: "black",
          },
        }}
      />
      <ThemeProvider theme={theme}>
        <InstanceBase />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
