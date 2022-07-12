import React, {useEffect, useState} from 'react'
import Header from '../Header/Header';
import { categoryList, searchProducts } from '../../actions/productActions';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import LoadingBox from '../Loading/LoadingBox';
import Footer from '../Footer/Footer';
import Pagination from '../Pagination/Pagination'

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Product from '../Product/Product';


import './SearchScreen.css';
export default function SearchScreen() {
    
    const categoryListasd = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryListasd;
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    // trenutni postovi
    const indexOfLastPost = currentPage * postsPerPage
    const indexofFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = categories?.slice(indexofFirstPost, indexOfLastPost)

    // promjeni stranicu
    const paginate = (pageNumber) => setCurrentPage(pageNumber);




    const dispatch = useDispatch();
    const params = useParams();
    const { category } = params;
    console.log(categories);
    useEffect(() => {
        dispatch(categoryList(category))
        document.body.scrollTo(0, 0); 

    }, [category, dispatch])
    
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
                            currentPosts.map((product) => {
                                return (
                                    <>
                            <div  className='product-treding-products-container' key={product.id}>
                            
                                <div  className='product-trending-products-info'>
                            <div className='product-trending-products-image'>
                                <img src={`https://res.cloudinary.com/htbceqmbf/image/upload/v1657502658/${product.image}`} alt='slika' />
                            </div>
                            <div className='product-trending-products-text'>
                                <span className='product-trending-category'>{product.category}</span>
                                <Link to={`/product/${product.id}`}><span>{product.name}</span></Link>
                                <span className='product-trending-price'>&euro;{product.price}</span>
                                </div>
                            </div>
                        </div>
                        
                        </>
                                )
                            })
                        }

                            </>
                    )
                )
            }
            </div>
            <Pagination postsPerPage={postsPerPage} totalPosts={categories?.length} paginate={paginate} />

        </div>


    <Footer />

    </>
  )
}
