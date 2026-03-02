import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import TaskPage from "./Pages/TaskPage/TaskPage";
import ProtectedRoute from './components/ProtectedRoutes';
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
    {/* for notification onces the sumbit the data success or not */}
    <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: "8px",
            background: "#fff",
            color: "#333",
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/project/:projectId/tasks" element={<TaskPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
