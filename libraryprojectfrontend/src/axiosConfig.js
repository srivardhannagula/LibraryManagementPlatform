import axios from 'axios';
const instance=axios.create({baseURL:'http://localhost:8080/api'});
instance.interceptors.request.use(
    configure=>{
        const token =localStorage.getItem('token');
        if(token) configure.headers.Authorization=`Bearer ${token}`;
        return configure;
    });

export default instance;