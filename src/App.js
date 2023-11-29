import { RouterProvider, createHashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Indexroute } from "./Routing/index";
import InstanceBase from "./Routing/InstanceBase";

function App() {
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
      <InstanceBase />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
