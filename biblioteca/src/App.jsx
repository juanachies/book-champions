import Login from "./components/auth/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router";
import NotFound from "./components/ui/notFound/NotFound";
import { useState } from "react";
import Protected from "./components/routing/Protected";
import { ToastContainer } from "react-toastify";
import Register from "./components/auth/register/Register";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path='/register' element={<Register/>}/>
          <Route element={<Protected />}>
            <Route 
              path="/library/*"
              element={
                <>
                  <Dashboard/>
                  <ToastContainer/>
                </>
              }
            />
          </Route>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;