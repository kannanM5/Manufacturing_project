import {
  Signin,
  Signup,
  ForgotCredential,
  ForgotPasspage,
  Forgotorgpage,
  Resetpassword,
  Orgmustcopypage,
  OTPVerificationpage,
} from "../Views/AuthScreens/index";
import {
  AuthPrivateRoute,
  OtpPrivateRoute,
  ResetPasswordPrivateRoute,
} from "../Views/AuthScreens/PrivateRoute";

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

      {
        path: "forgot_Org",

        element: <Forgotorgpage />,
      },

      {
        path: "orgcode_instruction",
        element: <Orgmustcopypage />,
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
];
