import {
  Signin,
  Signup,
  ForgotCredential,
  ForgotPasspage,
  Resetpassword,
  OTPVerificationpage,
} from "../Views/AuthScreens/index";
import {
  AuthPrivateRoute,
  OtpPrivateRoute,
  ResetPasswordPrivateRoute,
} from "../Views/AuthScreens/PrivateRoute";
import Dashboard from "../Views/HomeScreens/Dasboard";
import DashboardLayout from "../Layout/DashboardLayout";

export const authroute = [
  {
    path: "/",
    element: <AuthPrivateRoute />,
    children: [
      {
        index: true,
        element: <Signin />,
      },
      {
        path: "Signup",
        element: <Signup />,
      },
      {
        path: "forgot_credential",
        element: <ForgotCredential />,
      },
      {
        path: "forgot_password",
        element: <ForgotPasspage />,
      },
    ],
  },
  {
    path: "/otp_verification",
    element: <OtpPrivateRoute />,
    children: [
      {
        index: true,
        element: <OTPVerificationpage />,
      },
    ],
  },
  {
    path: "/reset_password",
    element: <ResetPasswordPrivateRoute />,
    children: [
      {
        index: true,
        element: <Resetpassword />,
      },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
          {
            path:"/dasboard",
            element: <Dashboard />
          }
        ]
    },
];
