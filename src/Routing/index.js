import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import ErrorElement from "../Error/ErrorElement";
import { authroute } from "./AuthRouting";
import ListOfProducts from "../Views/HomeScreens/ListOfProducts";
import Prepareinscepectionreport from "../Views/HomeScreens/Prepareinscepectionreport";
import LineInspectionReport from "../Views/HomeScreens/LineInspectionReport";
import Incominginspectionreport from "../Views/HomeScreens/Incominginspectionreport";
import Settingapprovalreport from "../Views/HomeScreens/Settingapprovalreport";
import Finalinspectionreport from "../Views/HomeScreens/Finalinspectionreport";
import InpectionCriteria from "../Views/HomeScreens/InspectionCriteria";
import Export from "../Views/HomeScreens/Export";
import ChangePassword from "../Views/Profile/ChangePassword";
import EmployeeList from "../Views/HomeScreens/EmployeeList";
import { DashboardPrivateRoute } from "../Views/AuthScreens/PrivateRoute";
import Dashboard from "../Views/HomeScreens/Dashboard";
import SavedData from "../Views/HomeScreens/SavedData";
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
        path: "/product_list",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <ListOfProducts />,
          },
        ],
      },
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
      {
        path: "export_page",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Export />,
          },
        ],
      },
      {
        path: "Prepareinscepectionreport",
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
        path: "/change_password",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <ChangePassword />,
          },
        ],
      },
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
  // {
  //   path: "/dasboard",
  //   element: <DashboardPrivateRoute />,
  //   children: [
  //     {
  //       element: <DashboardLayout />,
  //       children:[
  //         {
  //           index:true,
  //           element: <EmptyPage />
  //         }
  //       ]
  //     },
  //   ]
  // },
  // {
  //   element: <DashboardPrivateRoute />,
  //   children: [
  //      {
  //       path: "/product_list",
  //       element: <DashboardLayout />,
  //       children: [

  //         {
  //           index:true,
  //           element: <ListOfProducts />,
  //         },
  //         {
  //           path: "LineInspectionReport",
  //           element: <LineInspectionReport />,
  //         },
  //         {
  //           path: "management",
  //           element: <ManagementLayout type={1} />,
  //           children: managementRoute,
  //         },

  //       ],
  //     },
  //   ],
  // },
  // {
  //   element: <DashboardLayout />,
  //   children: [
  //     {
  //       path: "/product_list",
  //       element: <ListOfProducts />,
  //     },

  //     {
  //       path: "inspection_criteria",
  //       element: <InpectionCriteria />,
  //     },
  //     {
  //       path: "export_page",
  //       element: <Export />,
  //     },
  //     {
  //       path: "/Prepareinscepectionreport",
  //       element: <ManagementLayout />,
  //       children: [
  //         {
  //           index: true,
  //           element: <Prepareinscepectionreport />,
  //         },
  //         {
  //           path: "incoming_inspection_report",
  //           element: <Incominginspectionreport />,
  //         },
  //         {
  //           path: "setting_approval_report",
  //           element: <Settingapprovalreport />,
  //         },
  //         {
  //           path: "line_inspection_report",
  //           element: <LineInspectionReport />,
  //         },

  //         {
  //           path: "final_inspection_report",
  //           element: <Finalinspectionreport />,
  //         },
  //       ],
  //     },
  //     {
  //       path: "/change_password",
  //       element: <ChangePassword />,
  //     },
  //     {
  //       path: "/employee_list",
  //       element: <EmployeeList />,
  //     },
  //   ],
  // },

  {
    path: "*",
    element: <ErrorElement />,
  },
];
