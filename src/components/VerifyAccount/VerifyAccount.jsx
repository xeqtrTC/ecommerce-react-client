import React from 'react'
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useParams } from 'react-router-dom';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import './VerifyAccount.css';
export default function VerifyAccount() {
    const params = useParams();
    console.log(params);
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
            </div>
        <Footer />
    </>
  )
}
