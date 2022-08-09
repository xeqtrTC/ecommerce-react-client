import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useLocation}  from 'react-router-dom'
import { useDispatch,  useSelector } from 'react-redux'
import {register} from '../../actions/userActions';
import LoadingBox from '../Loading/LoadingBox';
import Header from '../Header/Header'
import Toast from '../Loading/Toast';
import { toast } from 'react-toastify';


import './Signup.css';
export default function SignupScreen() {
    const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        closeOnClick: true,
        pauseOnHover: false,
        autoClose: 2000
    };
    const Navigate = useNavigate()
    const [confirmPassword, setConfirmPassword ] = useState('');

    const [password, setPassword ] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/'

    const userRegister = useSelector((state) => state.userRegister)
    const { userInfo, error } = userRegister
    console.log(error);
    console.log(userInfo)
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        
        e.preventDefault(); // sprecava reloadovanje stranice
        if(password !== confirmPassword) {
            toast.error('Password do not match', ToastObjects);

        } else {
            dispatch(register(name, email, password))
            
        }
    }
    // useEffect(() => {
    //     if(userInfo) {
    //         Navigate(redirect)
    //     }
    // }, [Navigate, redirect, userInfo])
    return (
        <>
        <Header />
        <div className='signup-container'>
            <Toast />
            <div className='signup-form'>
            <span className='signupalert'>No account? Signup</span>

                <div className='signup-form-inputs'>
                <form onSubmit={submitHandler}>
                    <div className='signup-form-inputs-info'>
                   
                        <label for='username'>Username</label>
                        <br />
                        <input type='text'  id="name" required  onChange={(e) => setName(e.target.value)}/>
                        <br />
                        <label for='username'>Email</label>
                        <br />
                        <input type='text'  id='email' required onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <label for='username'>Password</label>
                        <br />
                        <input type='password'  id='password' required  onChange={(e) => setPassword(e.target.value)}/>
                        <br />
                        <label for='username'>Confirm password</label>
                        <br />
                        <input type='password'  id='confirmPassword' required onChange={(e) => setConfirmPassword (e.target.value)} />
                    </div>
                    <div className='signup-submit'>
                        <div className='signup-error'>
                            {error && <p>{error}</p>}
                        </div>      
                        <div className='signup-error'>
                            {userInfo && <p>{userInfo.message}</p>}
                        </div>                    
                        <div className='submit-signup-button'>
                        <button type='submit'>Signup</button>
                        <Link to='/signin'><span>Already registered? Login</span></Link>
                        </div>
                    </div>
                    </form>
                </div>
            </div>

        </div>

       
        
</>

    )
}