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
import { listProducts, deleteProduct, listFullProducts } from '../../actions/productActions';



import './SearchAllProducts.css';
export default function SearchAllProducts() {
    const productList = useSelector((state) => state.productListFull)
    const { error, loading, products } = productList;
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    // trenutni postovi
    const indexOfLastPost = currentPage * postsPerPage
    const indexofFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = products?.slice(indexofFirstPost, indexOfLastPost)
    console.log(indexofFirstPost)
    console.log(indexOfLastPost)

    // promjeni stranicu
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listFullProducts())
    }, [dispatch])
    
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
                                    <div  className='product-treding-products-container'>

                                    <div  key={product.id}className='product-trending-products-info'>
              <                 div   className='product-trending-products-image'>
                                    <img src={product.image} alt='slika' />
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
        <Pagination postsPerPage={postsPerPage} totalPosts={products?.length} paginate={paginate} />

    </div>
    <Footer />
    </>
  )
}
