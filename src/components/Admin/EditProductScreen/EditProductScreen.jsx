import React, { useState, useEffect } from 'react';
import Toast from '../../Loading/Toast';
import Leftside from '../LeftSide/Leftside';
import Axios from 'axios';
import UploadIcon from '@mui/icons-material/Upload';
import { useNavigate, useParams, useLocation} from 'react-router-dom';
import { useSelector, useDispatch }  from 'react-redux';
import { detailsProduct, editProduct, updateProduct, } from '../../../actions/productActions';
import './EditProductScreen.css';
import '../Admin.css'
import 'react-toastify/dist/ReactToastify.css';
import { PRODUCT_UPDATE_RESET } from '../../../constants/productConstants';
import LoadingBox from '../../Loading/LoadingBox';
import { toast } from 'react-toastify';

export default function EditProductScreen(props) {
    const params = useParams();
    const { id: productId } = params;
    const Navigate = useNavigate();
    const dispatch = useDispatch();


    const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        closeOnClick: true,
        pauseOnHover: false,
        autoClose: 2000
    };



    const productEdit = useSelector((state) => state.productEdit);
    const { loading, error, product } = productEdit;
    console.log(product);

    const productUpdate = useSelector((state) => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate;
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice ] = useState(0);
    const [ image, setImage ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ countInStock, setCountInStock ] = useState(0);
    const [brand, setBrand ] = useState('');
    const [ description, setDescription ] = useState('');

    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo } = userSignIn;
    const uploadfileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
         try {
            const { data } = await Axios.post('/api/uploads/', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            console.log(data);
            console.log(data);
            setImage(data);
            setLoadingUpload(false);
         } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
         }
    }
useEffect(() => {
    if(successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        toast.success('Product has been changed', ToastObjects)
    } else if(!product){
        dispatch(editProduct(productId))
    }  else {
        setName(product[0].name);
        setPrice(product[0].price);
        setImage(product[0].image)
        setCategory(product[0].category);
        setCountInStock(product[0].countInStock);
        setBrand(product[0].brand);
        setDescription(product[0].description);
    }
        
}, [dispatch, product, successUpdate, productId])

const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: productId, name, image, price, category, countInStock,brand, description}))
}
    return (
    <>
        <div className='container'>
            <Leftside />
                <div className='admin-left'>
                    <div className='editproduct-container'>
                        {
                            loading  ? (
                                <LoadingBox></LoadingBox>
                            ) : (
                                error ? (
                                    <p>{error}</p>
                                ) : (
                                    <>
                                    <form onSubmit={submitHandler}>
                                    <Toast />

                                    <div className='editproduct-info'>
                                    
                            <div className='editproduct-details'>
                                
                                <div className='editproduct-image'>
                                    <img src={`https://res.cloudinary.com/htbceqmbf/image/upload/v1657502658/${image}`} alt='slika' />
                                    <span>{name}</span>
                                </div>
                                <div className='editproduct-product'>
                                    <span className='editproduct-id'>id:</span>
                                    <span>{productId}</span>
                                </div>
                                <div className='editproduct-product'>
                                    <span className='editproduct-id'>brand:</span>
                                    <span>{brand}</span>
                                </div>
                                <div className='editproduct-product'>
                                    <span className='editproduct-id'>category:</span>
                                    <span>{category}</span>
                                </div>
                                <div className='editproduct-product'>
                                    <span className='editproduct-id'>price:</span>
                                    <span>{price}$</span>         
                                </div>
                                <div className='editproduct-product'>
                                    <span className='editproduct-id'>instock:</span>
                                    <span>{countInStock}</span>       
                                </div>
                            </div>
                            <div className='editproduct-update'>
                                    
                                <div className='editproduct-update-info'>
                                       
                                
                                    <div className='editproduct-update-inputs'>
                                        <input type='text' name='name' value={name}  onChange={(e) => setName(e.target.value)}/>                                    
                                    </div>
                                    <div className='editproduct-update-inputs'>
                                        <input type='text' name='brand' value={brand} onChange={(e) => setBrand(e.target.value)}/>                                    
                                    </div>
                                    <div className='editproduct-update-inputs'>
                                        <input type='text' name='category' value={category} onChange={(e) => setCategory(e.target.value)} />                                    
                                    </div>
                                    <div className='editproduct-update-inputs'>
                                        <input type='text' name='price' value={price} onChange={(e) => setPrice(e.target.value)}/>                                    
                                    </div>
                                    <div className='editproduct-update-inputs'>
                                        <input type='text' name='countInStock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />                                    
                                    </div>
                                    <div className='editproduct-update-inputs'>
                                        <input type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />                                    
                                    </div>
                                </div>
                                <div className='editproduct-update-image'>
                                    <div className='edit-img'>
                                    
                                    <img src={`https://res.cloudinary.com/htbceqmbf/image/upload/v1657502658/${image}`}  alt='slika'/>
                                    <label for='file'>
                                       <UploadIcon />
                                    </label>
                                        <input onChange={uploadfileHandler} name='image' id='file' type='file' style={{display: "none"}}/>
                                    { loadingUpload && <LoadingBox></LoadingBox>}
                                        {errorUpload && (
                                        <p>{errorUpload}</p>
                                    )}
                                    </div>
                                </div>
                                <div className='editproduct-update-button'>
                                <button>Change</button>
                                </div>
                            </div>
                            
                            
                        </div>
                        </form>
                        </>
                                )
                            )
                        }
                    </div>
                </div>
        </div>

    </>
  )
    }