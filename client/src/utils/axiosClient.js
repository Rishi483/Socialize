import axios from 'axios'
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from './localStorageManager';
import { toast } from 'react-toastify';

export const axiosClient=axios.create({
    baseURL:process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials:true
});

axiosClient.interceptors.request.use(
    (request)=>{
        const accessToken=getItem(KEY_ACCESS_TOKEN);
        request.headers['Authorization ']=`Bearer ${accessToken}`
        return request;
    }
)

axiosClient.interceptors.response.use(
    async(response)=>{
        const data=response.data;
        if(data.status==="ok"){
            return response;
        }
        const originalRequest=response.config;
        const statusCode=data.statusCode;
        const error=data.message;

        //generate new access token with refresh token
        if(statusCode==401 && !originalRequest._retry){
            originalRequest._retry=true;
            const response=await axios.create({
                withCredentials:true,
            }).post(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);

            console.log('resopnse from backend',response);
            if(response.data.status==='ok'){
                setItem(KEY_ACCESS_TOKEN,response.data.result.accessToken);
                originalRequest.headers['Authorization']=`Bearer ${response.data.result.accessToken}`;
                return axios(originalRequest);
            }
            else{
                //when refresh token expires, send user to login page
                removeItem(KEY_ACCESS_TOKEN);
                window.location.replace('/#/login','_self');
                return Promise.reject(error);
            }
        }
        toast.error(error);
        return Promise.reject(error);
    }
)