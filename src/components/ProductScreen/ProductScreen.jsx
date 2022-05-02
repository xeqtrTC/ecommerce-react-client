import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import './ProductScreen.css';
import { toast } from 'react-toastify';
import Footer from '../Footer/Footer';


import { Link, useParams, useNavigate } from 'react-router-dom';
import MessageBox from '../MessageBox/MessageBox';
import LoadingBox from '../Loading/LoadingBox';
import { PRODUCT_REVIEWADD_RESET } from '../../constants/productConstants';
import Toast from '../Loading/Toast'

import { detailsProduct, editProduct, addReview } from '../../actions/productActions';
import { addToCart } from '../../actions/cartActions'

export default function ProductScreen() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [ review, setReview] = useState('');
  const { id: productId } = useParams(); 
  console.log(productId);
  const userSign = useSelector((state) => state.userSignIn)
  const  {userInfo} = userSign
  console.log(userInfo);
  const [qty, setQty ] = useState(1)
  console.log(review);
  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;
  const reviewList = useSelector((state) => state.reviewAdd);
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    closeOnClick: true,
    pauseOnHover: false,
    autoClose: 2000
};


  const {error: reviewAddError, loading: reviewAddLoading, success: reviewAddSuccess } = reviewList;
  console.log(product)
  
  useEffect(() => {
    if(reviewAddSuccess) {
      dispatch({type: PRODUCT_REVIEWADD_RESET})
      toast.success('Review added', ToastObjects)
    } else {
      setReview('');
      dispatch(editProduct(productId))
    }

  }, [dispatch, productId, reviewAddSuccess])
  
  const addComment = (e) => {
    e.preventDefault();
    dispatch(addReview(productId, review))


  }
  
  const addToCartHandler = () => {
    dispatch(addToCart(productId, qty))
  }
  return (
    <><Header />
      {
        loading ? (
          <LoadingBox />
        ) : (
          error ? (
            <p>{error}</p>
          ) : (
            <>

            <div className='product-screen-container'>
          <div className='product-screen-image'>
          <Toast />

            <span className='product-screen-p-h1'>{product[0].name}</span>
            <div className='product-screen-image-real'>
              <img src={product[0].image} alt='slika' />
            </div>
          </div>
          <div className='product-screen-addtocart'>
              <div className='product-screen-price'>
                  <div className='product-screen-price-info'>
                    <span>&euro; {product[0].price}</span>
                  </div>
                  <div className='product-screen-addtocart-more'>
                    {product[0].countInStock > 0 && (
                      <select value={qty} onChange={(e) => setQty(e.target.value)}>
                      {
                        [...Array(product[0].countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            { x + 1}
                          </option>
                        ))
                      }

                    </select>
                    )}
                    
                    <button onClick={addToCartHandler}>Add to cart</button>
                  </div>
                  <div className='product-screen-description'>
                    <span>{product[0].description}</span>
                  </div>
                  <div className='linebreal-product'></div>
                  <div className='product-screen-productid'>
                    <p>ProductID: {product[0].id}</p>
                    <p>Category: {product[0].category}</p>
                  </div>
              </div>

          </div>
          
      </div>
      <div className='linebreal-product-two '></div>
      <div className='product-screen-review'>
      <div className='product-screen-left'>
        
      {
        product.map((review) => {
          return (
            <>
           
         
           <div className='product-screen-left-text' key={review.id}>
           <p>{review.reviewer_name}</p>

            </div>
          <div className='product-screen-left-user'>
          <p>{review.review}</p>

          </div>
          <div className='linebreal-product-three'></div>

          


        
    </>
          )
        })
      }

      </div>
      <div className='product-screen-right'>

          {
            userInfo ? (
              <>
          <span>Write a review</span>
          <form onSubmit={addComment}>
          <div className='product-screen-textarea'>
            <span>Review </span>
            <textarea   name='review' id='review' onChange={(e) => setReview(e.target.value)}></textarea>
          </div>
          <div className='product-screen-text-area-button'>
              <button type='submit'>Add a review</button>
          </div>
          </form>
          </>
            ) : (
              <span>Please login if you want to add a review.</span>
            )
          }
               </div>

          </div>

      
      <Footer />
    </>
      
          )
        )
      }
         

    </>
  )
}
