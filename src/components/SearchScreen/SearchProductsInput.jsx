import React, {useEffect} from 'react'
import Header from '../Header/Header';
import { categoryList, searchProducts } from '../../actions/productActions';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import LoadingBox from '../Loading/LoadingBox';
import Footer from '../Footer/Footer';

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Product from '../Product/Product';

import './SearchProductsInput.css';


export default function SearchProductsInput({match}) {
    const dispatch = useDispatch();
    const params = useParams();
    const { keyword } = params
    const searchList = useSelector((state) => state.search);
    const { loading, error, keyword: keywordList } = searchList

    useEffect(() => {
        dispatch(searchProducts(keyword))
    }, [dispatch, keyword])

    useEffect(() => {
        document.body.scrollTo(0, 0); 

    }, [])
    
  return (
      <>
      <Header />
    <div className='search-container'>
        <div className='search-one'>
            {
                loading ? (
                    <LoadingBox></LoadingBox>
                ) : (
                    error ? (
                        <p>{error}</p>
                    ) : (
                        <>
                        {
                            keywordList.map((product) => {
                                return (
                                    <div  className='product-treding-products-container' key={product.id}>
                                    <div  className='product-trending-products-info'>
              <                 div   className='product-trending-products-image'>
                                    <img src={`https://res.cloudinary.com/htbceqmbf/image/upload/v1657502658/${product.image}`} alt='slika' />
                                </div>
                            <div className='product-trending-products-text'>
                                <span className='product-trending-category'>{product.category}</span>
                                <Link to={`/product/${product.id}`}><span>{product.name}</span></Link>
                                <span className='product-trending-price'>&euro;{product.price}</span>
                                </div>
                            </div>
                        </div>
                                )

                                
                            })
                        }
                        
                            </>
                    )
                )
            }

        </div>
    </div>
    </>
  )
}
