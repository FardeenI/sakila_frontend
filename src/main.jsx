import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LandingPage from './LandingPage.jsx'
import FilmsPage from './FilmsPage.jsx'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './NotFoundPage.jsx'
import Scrap from './scrap.jsx'
import CustomersPaginationSearchTable from './CustomersPaginationSearchTable.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <LandingPage />,
    errorElement: <NotFoundPage /> 
  },
  {
    path:'/films',
    element: <FilmsPage />
  },
  {
    path:'/customers',
    element: <CustomersPaginationSearchTable />
  },
  {
    path:'/scrap',
    element: <Scrap />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
