import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useLocation}  from 'react-router-dom'
import { useDispatch,  useSelector } from 'react-redux'
import Header from '../Header/Header'
import './Login.css';
import {signin} from '../../actions/userActions';
import LoadingBox from '../Loading/LoadingBox';
import Footer from '../Footer/Footer';

export default function LoginScreen() {
    const Navigate = useNavigate()

    const [password, setPassword ] = useState('');
    const [name, setName] = useState('');

    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/'

    const userSignIn = useSelector((state) => state.userSignIn)
    const { userInfo, error } = userSignIn
    console.log(userInfo, error)

    const dispatch = useDispatch()
    const submitHandler = (e) => {
        
        e.preventDefault(); // sprecava reloadovanje stranice
        dispatch(signin(name, password))
    }
    useEffect(() => {
        if(userInfo) {
            Navigate(redirect)
        }
    }, [Navigate, redirect, userInfo])
    return (
        <>
        <Header />
            <div className='loginscreen-container'>
                <div className='loginscreen-loginform'>
                    <div className='loginscreen-info'>
                        <p className='singinspan'>Sign in</p>
                        <p className='signinpara'>Sign in to your account using email and password provided during registration.</p>
                    </div>
                    <div className='loginscreen-inputs'>
                        {
                            error && 
                                 <div className='loginscreen-error'>
                                    <span>{error}</span>
                                 </div> 
                        }
                        <form onSubmit={submitHandler}>
                        
                        <input type='text' placeholder='Username' name="username" onChange={(e) => setName(e.target.value)} />
                        <input type='password' placeholder='Password' name="password" onChange={(e) => setPassword(e.target.value)}/>

                        <button type='submit'>Sign in</button>

                        <span className='loginaccount'>Don't have an account? <Link to='/signup'>Sign up</Link></span>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
    </>
    )
}