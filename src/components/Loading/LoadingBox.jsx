import React from 'react'

import './LoadingBox.css';

export default function LoadingBox() {
  return (
    <div>
        <div className='loading-frame-over'></div>
    </div>
  )
}








// {cartItems.length === 0? 
//   <p> Korpa je prazna. <Link to='/'>Vratite se na pocetnu stranicu</Link></p>

// :(
//   <ul>

//       {
//       cartItems.map((item) => {
//         return (
//           <li key={item.product}>
//             <div className='row-bottom'>
//               <div>
//                 <img src={item.image} alt={item.name} className='small' />
//               </div>
//               <div className='min-30'>
//                 <Link to={`/product/${item.product}`}>{item.name}</Link>
//               </div>
//               <div className='row-qty'>
//                 <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
//                   {[...Array(item.countInStock).keys()].map((x) => (
//                     <option key={x + 1} value={x + 1}>
//                       {x + 1}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className='price-cart'>
//                 &euro;{item.price}
//               </div>
//               <div className='delete-cart'>
//                 <button type='button' onClick={() => removeFromCartHandler(item.product)}>Izbrisi</button>
//               </div>
//             </div>
//           </li>
//         );
//       })
      
//     }
//   </ul>
// )  

// }  