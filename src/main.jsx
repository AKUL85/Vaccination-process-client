import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./RootFile/Main";
import LandingPage from "./RootFile/LandingPage";

import VaccineCard from "./pages/VaccineCard";
import FindVaccine from "./pages/FindVaccine";
import VaccineDetails from "./pages/VaccineDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AppointmentBooking from "./pages/AppointmentBooking";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashBoard";
import UserDashboard from "./pages/UserDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import Dashboard from "./component/Dashboard";


const router = createBrowserRouter(
  
  
  [
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <LandingPage></LandingPage>,
      },
      {
        path: "/vaccine-card",
        element: <VaccineCard></VaccineCard>,
      },
      {
        path: "/find-vaccine",
        element: <FindVaccine></FindVaccine>,
      },
      {
        path: "/vaccine/:_id",
        element: <VaccineDetails></VaccineDetails>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/appointment/:_id",
        element: (
          // <ProtectedRoute>
            <AppointmentBooking></AppointmentBooking>
          // </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          // <ProtectedRoute>
            
            <Dashboard></Dashboard>
          // </ProtectedRoute>
        ),
      },
      // {
      //   path: "/user-dashboard",
      //   element: <UserDashboard></UserDashboard>,
      // },
      // {
      //   path: "/staff-dashboard",
      //   element: <StaffDashboard></StaffDashboard>,
      // },
      // {
      //   path: "/admin-dashboard",
      //   element: <AdminDashboard></AdminDashboard>,
      // },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
