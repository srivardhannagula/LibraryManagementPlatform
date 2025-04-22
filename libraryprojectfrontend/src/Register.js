import { useState } from 'react';
import axios from './axiosConfig';
 

function Register(){
    const[form,setForm]=useState({username:"",password:"",role:"ROLE_USER"})
    const handleChange=e=>setForm({...form,[e.target.name]:e.target.value});
    const handleSubmit=  e=>{
        e.preventDefault();
        axios.post("/auth/register",form);
        alert("Registration Succesful");
    } 

return (
    <center> 
    <form onSubmit={handleSubmit}>
        <input name="username" onChange={handleChange} placeholder='Username'/>
        <br></br>
        <input name="password" type='password' onChange={handleChange} placeholder='Password'/><br></br>
        <select name="role" onChange={handleChange}>
            <option>ROLE_USER</option>
            <option>ROLE_ADMIN</option>
        </select>
        <br></br>
        <button type='submit'>Register</button>
    </form>
    </center>

);}
export default Register;