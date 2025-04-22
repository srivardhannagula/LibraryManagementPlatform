import{useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
 
const ProtectedRoute=({role,children})=>{
    const navigate =useNavigate();
    const token =localStorage.getItem("token");
    if(!token) { navigate("/");
        return null;}
    const decoded=jwtDecode(token);
    console.log(decoded.role);
    if(decoded.role!==role){ navigate("/");
        return null;}
        return children;
};
export default ProtectedRoute;