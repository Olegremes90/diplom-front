import React, {useState} from 'react';
import axios from "axios";
import '../../styles/login.css'
import Header from "../header/Header";
import Footer from "../footer/Footer";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const[username, setUsername] = useState()
    const[password, setPassword] = useState()
    const[error, setError] = useState('')
      const headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json',

        }
     const LogIn = (e)=>{
        e.preventDefault()
        const state ={
            'username': username,
            'password': password
        }
          axios.post(`http://127.0.0.1:8000/auth/token/login/`, state, {headers}).then((data) =>{
              localStorage.setItem('access_Token', data.data.auth_token)
          navigate('/')})
              .catch((error)=>{
                  setError(error)
              })


    }

    const handlePasswordChange =(event) =>{
        const value = event.target.value;
        setPassword(value);



    }
    return (
        <div>
            <Header/>
            <form className='forma-login' action='#' method='post' onSubmit={LogIn}>
                <div className='container-content'>
                <h1>Вxод</h1>

                <label>Введите логин</label>
                <p><input className='username' type='text' value={username} onChange={e=>setUsername(e.target.value)} /></p>

                <label>Введите пароль</label>
                <p><input className='username' type='password' value={password} onChange={handlePasswordChange}/></p>
                    {error?<span className='error'>Введeны неверные данные. Повторите попытку.</span>:<div></div>}
            <button className='button-login' disabled={!username||!password}>Войти</button>
                </div>
            </form>
            <Footer/>
        </div>
    );
};

export default Login;