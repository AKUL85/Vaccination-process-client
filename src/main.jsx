import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Main from './RootFile/Main';
import LandingPage from './RootFile/LandingPage';

import VaccineCard from './pages/VaccineCard';
import FindVaccine from './pages/FindVaccine';
import VaccineDetails from './pages/VaccineDetails';
import Signup from './pages/Signup';
import Login from './pages/Login';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:"/",
        element:<LandingPage></LandingPage>
      },{
        path:"/vaccine-card",
        element:<VaccineCard></VaccineCard>
    },{
      path:'/find-vaccine',
      element:<FindVaccine></FindVaccine>
    },{
      path:'/vaccine/:id',
      element:<VaccineDetails></VaccineDetails>
    },{
      path:'/signup',
      element:<Signup></Signup>
    },{
      path:"/login",
      element:<Login></Login>
    }
    ]
  },
  
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
