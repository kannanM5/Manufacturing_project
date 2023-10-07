import {
  DashboardPrivateRoute,
  WorkOrderPrivateRoute,
} from "../Views/AuthScreens/PrivateRoute";
import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import ManagementLayout from "../Layout/ManagementLayout";
// import Dashboard from "../Views/HomeScreens/Dashboard";
// import Profile from "../Views/HomeScreens/UserProfile/Profile";
// import ChangePassword from "../Views/HomeScreens/UserProfile/ChangePassword";
import ErrorElement from "../Error/ErrorElement";
import { ReportRoutes } from "./ReportRoutes";
import { authroute } from "./AuthRouting";
import { managementRoute } from "./ManagementRoute";
import ProfileLayout from "../Layout/ProfileLayout";
import ListOfProducts from "../Views/HomeScreens/ListOfProducts";
import EmptyPage from "../Views/HomeScreens/Dasboard";
import LineInspectionReport from "../Views/HomeScreens/LineInspectionReport";

export const Indexroute = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        children: authroute,
      },
    ],
  },
  {
    element: <DashboardPrivateRoute />,
    children: [
      {
        path: "Workorder",
        element: <DashboardLayout />,
        children: [
          {
            element: <WorkOrderPrivateRoute />,
            // children: [
            //   {
            //     index: true,
            //     path: "Workorderlist",
            //     element: <WorkOrderList />,
            //   },
            // ],
          },
        ],
      },
      {
        // path: "report",
        // element: <DashboardLayout />,
        // children: [
        //   // {
        //   //   path: "/report",
        //   //   element: <ManagementLayout type={2} />,
        //   //   children: ReportRoutes,
        //   // },
        // ],
      },

      {
        path: "/dasboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <EmptyPage />,
          },
          {
            path: "product_list",
            element: <ListOfProducts />,
          },
          {
            path: "LineInspectionReport",
            element: <LineInspectionReport />,
          },
          {
            path: "management",
            element: <ManagementLayout type={1} />,
            children: managementRoute,
          },

          {
            path: "profile",
            element: <ProfileLayout />,
            children: [
              // {
              //   path: "my_profile",
              //   element: <Profile />,
              // },
              // {
              //   path: "change_password",
              //   element: <ChangePassword />,
              // },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorElement />,
  },
];
