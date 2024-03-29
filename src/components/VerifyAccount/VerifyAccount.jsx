import React from 'react'
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import './VerifyAccount.css';
import { emailVerification } from '../../actions/userActions';
import { useSelect } from '@mui/base';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';



export default function VerifyAccount() {
    const {token} = useParams();
    console.log(token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isLoading, success, isError} = useSelector((state) => state.emailVerificationUser);
    console.log(isLoading, success, isLoading);
    useEffect(() => {
        dispatch(emailVerification(token));
    }, [dispatch, emailVerification])

    return (
    <>
        <Header />
            <div className='verify-container'>
                <div className='verify-icon'>
                    <CheckCircleOutlinedIcon />
                </div>
                <div className='borderline'></div>
                <div className='verify-text'>
                    <p>Your email has been activated, you can login now.</p>

                </div>
                <div className='verfiy-link'>
                    <p>Please login </p> <Link to='/signin'> here</Link>
                </div>

            </div>
        <Footer />
    </>
  )
}
