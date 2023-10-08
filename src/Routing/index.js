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
import { authroute } from "./AuthRouting";
import { managementRoute } from "./ManagementRoute";
import ProfileLayout from "../Layout/ProfileLayout";
import ListOfProducts from "../Views/HomeScreens/ListOfProducts";
import EmptyPage from "../Views/HomeScreens/Dasboard";
import LineInspectionReport from "../Views/HomeScreens/LineInspectionReport";
import EditinscepectionReprt from "../Views/HomeScreens/EditinscepectionReprt"
import Prepareinscepectionreport from "../Views/HomeScreens/Prepareinscepectionreport"

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
   {
    path: "/dasboard",
    element: <DashboardLayout />,
    children: [
          {
            index:true,
            element: <EmptyPage />
          }
        ]
    },
    {
      element: <DashboardLayout />,
      children: [
            {
              path: "/product_list",
              element: <ListOfProducts />
            },
            {
              path: "/LineInspectionReport",
              element: <LineInspectionReport />,
            },
            {
              path: "/EditinscepectionReprt",
              element: <EditinscepectionReprt />,
             },
             {
              path: "/Prepareinscepectionreport",
              element: <Prepareinscepectionreport />,
              },
                      
          ]
      },   
    
      
  {
    path: "*",
    element: <ErrorElement />,
  },
];
