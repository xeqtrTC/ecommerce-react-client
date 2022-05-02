import React from 'react'

export default function Checkout(props) {
  return (
    <div className='row checkout-steps'>
        <div className={props.step1 ? 'active' : ''}>Ulogujte se</div>
        <div className={props.step1 ? 'active' : ''}>Shipping</div>
        <div className={props.step1 ? 'active' : ''}>Ulogujte se</div>
        <div className={props.step1 ? 'active' : ''}>Ulogujte se</div>
        <div className={props.step1 ? 'active' : ''}>Ulogujte se</div>



    </div>
  )
}
