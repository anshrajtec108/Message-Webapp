import React, { useState } from 'react'
import './css.css'
import { useDispatch } from "react-redux";
import { makePostRequest } from '../../services/api';
import { saveLogin, saveUserDetails } from '../../store/reducers/currentUser';
import {useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Login() {
    let dispatch = useDispatch()
    const [contactNo, setContactNo]=useState("")
    const [password,setPassword]=useState("")
    const navigator=useNavigate()
    const handelFormSubmit=async(e)=>{
        try {
            console.log('login submit');
            e.preventDefault()
            let sendData={
                "contactNo": parseInt(contactNo),
                "password": password
                }
            const res=await makePostRequest('/users/login',{},sendData,{})
            console.log(res.statusCode);
            if (res.statusCode <=200){
            dispatch(saveUserDetails(res.data?.user))
            dispatch(saveLogin(true))
                localStorage.setItem('Contect', parseInt(contactNo));
                localStorage.setItem('isLogin',true)
                 Cookies.set('accessToken', res.data?.accessToken);
                return navigator('/');
            }
        } catch (error) {
            console.log("error from login ",error);
            alert(error)
        }
    }
  return (
    <div style={{margin:'50px'}}>
          <div className="container">
              <form className="form" onSubmit={(e)=>handelFormSubmit(e)}>
                  <p className="title">Login Form</p>
                  <input placeholder="Contact-No " className="username input" type="text" onChange={(e) => setContactNo(e.target.value)} />
                      <input placeholder="Password" className="password input" type="password" onChange={(e)=>setPassword(e.target.value)} />
                          <button className="btn" type="submit">Login</button>
                      </form>
                  </div>
    </div>
  )
}

export default Login
