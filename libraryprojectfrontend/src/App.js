import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
   return (
      
      <Routes>
        <Route path="/" element={<Login/>} ></Route>
        <Route path="/admin/dashboard"
        element={
          <ProtectedRoute role="ROLE_ADMIN">
            {console.log("Admin")}
            <AdminDashboard></AdminDashboard>
          </ProtectedRoute>
        }
     />
     <Route path="/user/dashboard"
     element={
      <ProtectedRoute role="ROLE_USER">
        <UserDashboard></UserDashboard>
      </ProtectedRoute>
     }/>
     
      </Routes>
      
  );
}

export default App;
