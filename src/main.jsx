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

const router = createBrowserRouter([
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
        path: "/appointment/:id",
        element: <AppointmentBooking></AppointmentBooking>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
