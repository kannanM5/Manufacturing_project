import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import ErrorElement from "../Error/ErrorElement";
import ListOfProducts from "../Views/HomeScreens/ListOfProducts";
import Prepareinscepectionreport from "../Views/HomeScreens/Prepareinscepectionreport";
import LineInspectionReport from "../Views/HomeScreens/Reports/LineInspectionReport";
import Incominginspectionreport from "../Views/HomeScreens/Reports/Incominginspectionreport";
import Settingapprovalreport from "../Views/HomeScreens/Reports/Settingapprovalreport";
import Finalinspectionreport from "../Views/HomeScreens/Reports/Finalinspectionreport";
import InpectionCriteria from "../Views/HomeScreens/InspectionCriteria";
import Export from "../Views/HomeScreens/Export";
import ChangePassword from "../Views/Profile/ChangePassword";
import EmployeeList from "../Views/HomeScreens/EmployeeList";
import Dashboard from "../Views/HomeScreens/Dashboard";
import ViewReports from "../Views/HomeScreens/Reports/ViewReports";
import SavedData from "../Views/HomeScreens/SavedData";
import { authroute } from "./AuthRouting";
import {
  DashboardPrivateRoute,
  EmployeePrivateRoute,
} from "../Views/AuthScreens/PrivateRoute";

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
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
      {
        element: <EmployeePrivateRoute />,
        children: [
          {
            path: "/product_list",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <ListOfProducts />,
              },
            ],
          },
        ],
      },

      {
        element: <EmployeePrivateRoute />,
        children: [
          {
            path: "/inspection_criteria",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <InpectionCriteria />,
              },
            ],
          },
        ],
      },

      {
        path: "export_page",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Export />,
          },
          {
            path: "view_reports",
            element: <ViewReports />,
          },
        ],
      },
      {
        path: "prepare_inspection_report",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Prepareinscepectionreport />,
          },
        ],
      },
      {
        path: "/incoming_inspection_report",
        element: <Incominginspectionreport />,
      },
      {
        path: "setting_approval_report",
        element: <Settingapprovalreport />,
      },
      {
        path: "line_inspection_report",
        element: <LineInspectionReport />,
      },

      {
        path: "final_inspection_report",
        element: <Finalinspectionreport />,
      },
      {
        element: <EmployeePrivateRoute />,
        children: [
          {
            path: "/change_password",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <ChangePassword />,
              },
            ],
          },
        ],
      },
      {
        element: <EmployeePrivateRoute />,
        children: [
          {
            path: "/employee_list",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <EmployeeList />,
              },
            ],
          },
        ],
      },
      {
        path: "saved_logs",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <SavedData />,
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
