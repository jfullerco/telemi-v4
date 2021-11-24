import React, { useContext } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { StateProvider, stateContext } from './Contexts/stateContext'
import { FieldProvider } from './Contexts/fieldContext'
import { AuthProvider } from './Contexts/AuthContext'
import Hello from './Pages/Hello'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import Register from './Pages/Register'
import NavBar from './Components/NavBar'
import AddCompany from './Pages/Companies/AddCompany'
import NotFound from './Components/NotFound'
import Admin from './Pages/Admin/Admin'
import Search from './Pages/Search'

export default function App() {
  
  const user = useContext(stateContext)
  
  return (
    <StateProvider>
    <AuthProvider>
      <FieldProvider>
      <Router>
      <NavBar />
          <Routes>
            
            <Route exact path="/"  element={<Hello />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/addcompany" element={<AddCompany />} />
            <Route path="/settings" element={<Admin />} />
            <Route path="/search" element={<Search />} />
            
            <Route element={<NotFound />} />
            </Routes>
    </Router>
    </FieldProvider>
    </AuthProvider>
    </StateProvider>
  );
}
