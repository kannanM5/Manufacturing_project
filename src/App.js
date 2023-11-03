import { RouterProvider, createHashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Indexroute } from "./Routing/index";
import { ThemeProvider, createTheme } from "@mui/material";
import InstanceBase from "./Routing/InstanceBase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "./Store/Storage/Cookie";
import { handleStoreUserData } from "./Store/Reducers/LoginReducer";

function App() {
  const dispatch = useDispatch();
  const theme = createTheme({
    palette: {
      primary: { main: "#f25922" },
      secondary: { main: "#1a2c41" },
    },
  });

  const router = createHashRouter(Indexroute, { basename: "/" });
  const hendleCheckUserData = async () => {
    const cookieData = getCookie("vt_enterprise_login");
    if (cookieData) {
      dispatch(handleStoreUserData(cookieData?.data));
      // handleGetEmployeeDetails();
    }
  };
  useEffect(() => {
    hendleCheckUserData();
  }, []);
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
      {/* <ThemeProvider theme={theme}> */}
      {/* <InstanceBase /> */}
      <RouterProvider router={router} />
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
