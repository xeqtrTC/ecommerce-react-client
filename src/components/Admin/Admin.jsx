import React from 'react'
import './Admin.css';
import Leftside from './LeftSide/Leftside';
import HomeAdmin from './Home/HomeAdmin';
export default function Admin() {
  return (
      <>
      <div className='container'>
    <Leftside />
    <div className='admin-left'>
      <HomeAdmin />
    </div>
    </div>
    </>
  )
}
