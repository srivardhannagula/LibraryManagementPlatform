import axios from 'axios';
const instance=axios.create({baseURL:'https://libraryplatformbackend-production.up.railway.app/api'});
instance.interceptors.request.use(
    configure=>{
        const token =localStorage.getItem('token');
        if(token) configure.headers.Authorization=`Bearer ${token}`;
        return configure;
    });

export default instance;