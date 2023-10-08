import { RouterProvider, createHashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Indexroute } from "./Routing/index";
import { ThemeProvider, createTheme } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: { main: "#f25922" },
      secondary: { main: "#1a2c41" },
    },
  });
  const router = createHashRouter(Indexroute, { basename: "/" });

  return (
    <>
      <Toaster
        position="bottom-center"
        containerStyle={{
          top: 20,
          left: 20,
          bottom: 60,
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
        <RouterProvider router={router} />
      </ThemeProvider>
    

    </>
  );
}

export default App;
