// import React,{ useState,useEffect } from "react";
// import {useNavigate} from "react-router-dom";
// import {jwtDecode} from "jwt-decode"
// import axios from "../axiosConfig";
// function Login(){
//     const[isLogin,setIsLogin]=useState(true);
//     const [form,setForm]=useState({username:"",password:"",role:""});
//     const navigate=useNavigate();
//     // useEffect(()=>{
//     //     const token=localStorage.getItem("token");
//     //     if(token){
//     //         try{
//     //             const decoded=jwtDecode(token);
//     //             const role=decoded.role;
//     ////             if(role=="ROLE_ADMIN"){
//     //                 navigate("/admin/dashboard");
//     //             }
//     //             else if(role=="ROLE_USER"){
//     //                 navigate("/user/dashboard");
//     //             }
//     //         }
//     //         catch{
//     //             localStorage.removeItem("token");
//     //         }
//     //     }
//     // },[]);
//     const handleChange= e=>setForm({...form,[e.target.name]:e.target.value});
//     const handleSubmit= async (e)=>{
//         e.preventDefault();
//         if(isLogin){
//         try{
//         const response= await axios.post("/auth/login",{
//             username:form.username,
//             password:form.password,
//         });
//         if(response.data&&response.data.token){
//         const token=response.data.token;
//         console.log(token);
//         localStorage.setItem("token",token);
//         const decoded=jwtDecode(token);
//         console.log(decoded);
//         const role=decoded.role;
//         console.log(role);
//         if(role==="ROLE_ADMIN"){
//             console.log("AdminDashboard")
//             navigate("/admin/dashboard");
//             }
//         else if(role==="ROLE_USER"){
//             navigate("/user/dashboard");
//             }
//         }
//         else{
//             alert("Login Failed");
//         }
//     }
//         catch(error){
//             alert("Login Failed");
//         }
//        }
//        else{
//         try{
//             await axios.post("/auth/register",{
//             username:form.username,
//             password:form.password,
//             role:form.role,
//             });
//             alert("registered successfully!Please Login.");
//             setIsLogin(true);
//     }
//        catch(error){
//         alert("Registration Failed");
//        }
//     }
//     };

// return(
//     <center> 
//     <div>
//       <h2>{isLogin?'Login':'Register'} </h2>
//       <form onSubmit={handleSubmit}>
//         <input name="username" onChange={handleChange} placeholder='Username' required/>
//         <br></br>
//         <input name="password" type='password' onChange={handleChange} placeholder='Password' required/><br></br>
//         {!isLogin&&(<select name="role" onChange={handleChange}>
//             <option>ROLE_USER</option>
//             <option>ROLE_ADMIN</option>
//         </select>)}
//         <br></br>
//         <button type='submit'>{isLogin?'Login':'Register'}</button>
//     </form>
      
//       <p>
//         {isLogin?"Dont have an account?":"Already have an account?"}
//         <button onClick={()=>setIsLogin(!isLogin)}>{isLogin?'Register':'Login'}</button>
//       </p>
//     </div>
//     </center>
// );
// }
// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "../axiosConfig";

// Material UI imports
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", password: "", role: "" });
  const navigate = useNavigate();
  const theme=useTheme();
  const isMobile=useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet=useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {

    e.preventDefault();
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const specialCharRegex = /[@$!%*?&]/g;
    const specialCharMatch = form.password.match(specialCharRegex);
    if(!isLogin&&!passwordRegex.test(form.password)){
      alert("Password must be at least 8 characters long and contain at least one letter, one number, and one special character.");
      return;
    }
    if (isLogin) {
      try {
        const response = await axios.post("/auth/login", {
          username: form.username.trim(),
          password: form.password,
        });
        if (response.data && response.data.token) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          const decoded = jwtDecode(token);
          const role = decoded.role;
          if (role === "ROLE_ADMIN") navigate("/admin/dashboard");
          else if (role === "ROLE_USER") navigate("/user/dashboard");
        } else {
          alert("Login Failed");
        }
      } catch (error) {
        alert("Login Failed");
      }
    } else {
      try {
        await axios.post("/auth/register", {
          username: form.username.trim(),
          password: form.password,
          role: form.role,
        });
        alert("Registered successfully! Please Login.");
        setIsLogin(true);
      } catch (error) {
        alert("Registration Failed");
      }
    }
  };

  return (
    
    <Box
      sx={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        justifyContent: "center",
        padding:isMobile?2:4,
      }}
    >
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
      <Grid item xs={12} sm={10} md={6}  
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color:"#FFA500",
      }}
    >
      <Typography
        variant={isMobile ?"h5":"h3"}
          
        sx={{ fontWeight: "bold",mb:2 }}
      >
        Welcome to Library!
      </Typography>

      <Typography
        variant="body2"
         
        sx={{ color: "#ccc", mt: 2, maxWidth: 400 }}
      >
        Explore a world of knowledge — discover, read, and manage your books with ease.
      </Typography>
    </Grid>
    <Grid item xs={12} md={6}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 400,
          bgcolor: "#1e1e1e",
          color: "white",
          border: "1px solid #FFA500",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h4" align="center" sx={{ color: "#FFA500", mb: 3 }}>
          {isLogin ? "Login" : "Register"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="username"
            label="Username"
            variant="outlined"
            onChange={handleChange}
            required
            sx={{
              mb: 2,
              input: { color: "white" },
              label: { color: "#FFA500" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#FFA500" },
                "&:hover fieldset": { borderColor: "#FFA500" },
                "&.Mui-focused fieldset": { borderColor: "#FFA500" },
              },
            }}
          />
          <TextField
            fullWidth
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            onChange={handleChange}
            required
            sx={{
              mb: 2,
              input: { color: "white" },
              label: { color: "#FFA500" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#FFA500" },
                "&:hover fieldset": { borderColor: "#FFA500" },
                "&.Mui-focused fieldset": { borderColor: "#FFA500" },
              },
            }}
          />

          {!isLogin && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: "#FFA500" }}>Role</InputLabel>
              <Select
                name="role"
                onChange={handleChange}
                value={form.role}
                sx={{
                  color: "white",
                  "& .MuiSelect-icon": { color: "#FFA500" },
                }}
              >
                <MenuItem value="ROLE_USER">User</MenuItem>
                <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
              </Select>
            </FormControl>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ bgcolor: "#FFA500", color: "black", mb: 2 }}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>

        <Typography align="center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </Typography>
        <Button
          fullWidth
          onClick={() => setIsLogin(!isLogin)}
          sx={{
            mt: 1,
            color: "#FFA500",
            border: "1px solid #FFA500",
          }}
        >
          {isLogin ? "Register" : "Login"}
        </Button>
      </Paper>
      </Grid>
      </Grid>
    </Box>
  );
}

export default Login;

