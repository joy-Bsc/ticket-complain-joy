import axios from 'axios';
import { getToken, setToken, setUserDetails } from '../helper/SessionHelper';

const BaseURL = 'http://localhost:4000/api/v1';
const AxiosHeader = {headers:{"token":getToken()}}



export function RegistrationUser(name , email , password,role){
    const URL = BaseURL + '/signup';
    const postBody = {name:name,email:email,password:password , role:role}
    return axios.post(URL,postBody)
    .then((res)=>{
        if(res.status === 201){
            return res.data;
        }
    }).catch((err)=>{
        return err.response.data;
    })
}

export function LoginUser(email , password){
    const URL = BaseURL + '/login';
    const postBody = {email:email,password:password}
    return axios.post(URL,postBody)
    .then((res)=>{
        if(res.status === 200){
            setToken(res.data.token);
            setUserDetails(res.data.user);
            return res.data;

        }
    }).catch((err)=>{
        return err.response.data;
    })
}

export function CreateCompliantRequest(userId,title , description ){
    const URL = BaseURL + '/create';
    const postBody = {userId:userId, subject:title , description:description}
    console.log(AxiosHeader);
    return axios.post(URL,postBody,AxiosHeader)
    .then((res)=>{
        if(res.status === 200){
            return res.data;
        }
    }).catch((err)=>{
        return err.response.data;
    })
}

export function GetUserTickets(){
    const URL = BaseURL + '/tickets';
    return axios.get(URL,AxiosHeader)
    .then((res)=>{
        if(res.status === 200){
            return res.data;
        }
    }).catch((err)=>{
        return err.response.data;
    })
}

export function UpdateCompliantRequest(ticketId,title , description ){
    const URL = BaseURL + '/update/'+ticketId;
    const postBody = {ticketId:ticketId,subject:title , description:description}
    return axios.put(URL,postBody,AxiosHeader)
    .then((res)=>{
        if(res.status === 200){
            return res.data;
        }
    }).catch((err)=>{
        return err.response.data;
    })
}

export function DeleteCompliantRequest(ticketId){
    const URL = BaseURL + '/delete/'+ticketId;
    return axios.delete(URL,AxiosHeader)
    .then((res)=>{
        if(res.status === 200){
            return res.data;
        }
    }).catch((err)=>{
        return err.response.data;
    })
}

export function GetAllTickets(){
    const URL = BaseURL + '/allTickets';
    return axios.get(URL,AxiosHeader)
    .then((res)=>{
        if(res.status === 200){
            return res.data;
        }
    }).catch((err)=>{
        return err.response.data;
    })
}

export function UpdateStatusRequest(ticketId,status){
    const URL = BaseURL + '/updateStatus/'+ticketId;
    const postBody = {ticketId:ticketId,status:status}
    return axios.put(URL,postBody,AxiosHeader)
    .then((res)=>{
        if(res.status === 200){
            return res.data;
        }
    }).catch((err)=>{
        return err.response.data;
    })
}
