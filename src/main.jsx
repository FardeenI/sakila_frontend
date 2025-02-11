import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import LandingPage from './LandingPage.jsx'
import FilmsPage from './FilmsPage.jsx'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './NotFoundPage.jsx'

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
    path:'/nonsense',
    element: <App />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
