import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import ManagementLayout from "../Layout/ManagementLayout";
import ErrorElement from "../Error/ErrorElement";
import { authroute } from "./AuthRouting";
import ListOfProducts from "../Views/HomeScreens/ListOfProducts";
import EmptyPage from "../Views/HomeScreens/Dasboard";
import Prepareinscepectionreport from "../Views/HomeScreens/Prepareinscepectionreport"
import Incominginspectionreport from "../Views/HomeScreens/Incominginspectionreport"
import Settingapprovalreport from "../Views/HomeScreens/Settingapprovalreport"
import Finalinspectionreport from "../Views/HomeScreens/Finalinspectionreport"
import InpectionCriteria from "../Views/HomeScreens/InspectionCriteria"

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
      element: <DashboardLayout />,
      children: [
            {
              path: "/product_list",
              element: <ListOfProducts />
            },
          
             {
              path:"inspection_criteria",
              element:<InpectionCriteria/>
             },
             {
              path: "/Prepareinscepectionreport",
              element: <ManagementLayout />,
              children:[
                {
                  index:true,
                  element: <Prepareinscepectionreport />
                },
                {
                  path:"incoming_inspection_report",
                  element: <Incominginspectionreport />
                },
                {
                  path:"setting_approval_report",
                  element: <Settingapprovalreport />
                },
                {
                  path:"line_inspection_report",
                  element: <Prepareinscepectionreport />
                },
                
                {
                  path:"final_inspection_report",
                  element: <Finalinspectionreport />
                }
              ]
             },
                      
          ]
      },   
    
      
  {
    path: "*",
    element: <ErrorElement />,
  },
 
];
