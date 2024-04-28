import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Route, Routes, redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Main from './layers/Main';
import Login from './components/registration/Login';
import './App.css'
import ProtectedRoute from './services/ProtectedRoute';
import PopupComponent from './components/notification/Notification';
function App() {
  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute Component={Main} />
    },
    {
      path: '/login',
      element: <Login />
    }
  ]);

  return (
    // <RouterProvider router={router}>
    // </RouterProvider>
    <PopupComponent/>
  );
}

export default App;
