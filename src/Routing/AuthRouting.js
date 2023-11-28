import { AuthPrivateRoute } from "../Views/AuthScreens/PrivateRoute";
import Signin from "../Views/AuthScreens/Signin";

export const authroute = [
  {
    path: "/",
    element: <AuthPrivateRoute />,
    children: [
      {
        index: true,
        element: <Signin />,
      },
    ],
  },
];
