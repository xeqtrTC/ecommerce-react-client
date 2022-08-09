import React, { useState, useEffect } from 'react'
import Leftside from '../LeftSide/Leftside';
import { toast } from 'react-toastify';
import Axios from 'axios';
import Toast from '../../Loading/Toast';
import LoadingBox from '../../Loading/LoadingBox';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, listProducts } from '../../../actions/productActions';
import './AddProductScreen.css';
import '../Admin.css';
import 'react-toastify/dist/ReactToastify.css';

import { PRODUCT_CREATE_RESET } from '../../../constants/productConstants';
export default function AddProductScreen() {

    const dispatch = useDispatch();
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState("");
    const [brand, setBrand] = useState('')


    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    console.log(image)
  
   console.log(selectedFile);

    const uploadImage = async (e, base64EncodedImage) => {
        const fileImage = e.target.files[0];
        console.log('aesaeaseas')
        console.log(fileImage);
        setSelectedFile(fileImage);
        setFileInputState(e.target.value);
        console.log(fileInputState)
        const reader = new FileReader();

        reader.readAsDataURL(fileImage);
        reader.onloadend = () => {
            setImage(reader.result);
        }
        reader.onerror = () => {
            console.error('errorrr')
        }
        console.log(reader);
        try {
            await Axios.post('https://evening-bayou-13792.herokuapp.com/upload/',  {data: image} , {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
           setFileInputState('');
           setImage('');

        } catch (error) {
            console.log(error);

        }
    }






    const saveFile = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
      };

    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo } = userSignIn;

    
    const uploadfileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        
        bodyFormData.append('name', file.name);

        setLoadingUpload(true);
         try {
            const { data } = await Axios.post('https://evening-bayou-13792.herokuapp.com/upload/', bodyFormData, {
               
            })
            console.log(data);
            const { public_id } = data;
            setImageName(public_id);
            console.log(public_id);
            setLoadingUpload(false);
         } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
         }
    }


   
    const Navigate = useNavigate();
    const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        closeOnClick: true,
        pauseOnHover: false,
        autoClose: 2000
    };

    
    const productCreate = useSelector((state) => state.productCreate)
    console.log(productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate
    console.log(createdProduct);
    
    useEffect(() => {
        if(createdProduct) {
            dispatch({ type: PRODUCT_CREATE_RESET})
        setName('');
        setDescription('');
        setPrice('');
        setCountInStock('');
        setImageName('');
        setCategory('');
        setBrand('');
        }
    }, [createdProduct, dispatch, successCreate])
    const handleSubmit = (e) => {
        console.log(imageName)
        e.preventDefault();
        dispatch(createProduct(name, description, countInStock, price, category, brand, imageName ));
        toast.success('Product has been added', ToastObjects);

    }
  return (
    <>
    <div className='container'>
  <Leftside />
  <div className='admin-left'>
    <div className='addproduct-container'>
    <form onSubmit={handleSubmit}>
       <div className='addproduct-info'>
           <Toast />
           <div className='addproduct-details'>
            
           <span>Add new product</span>

              <div className='addproduct-add-details'>
                  <label>Image</label>
                  <input name='image' type='file' id='imageFile' value={fileInputState} onChange={uploadfileHandler} />
                { loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && (
                    <p>{errorUpload}</p>
                )}
              </div>
              <div className='addproduct-add-details'>
                  <label>Name</label>
                  <input name='name' type='text'  required onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='addproduct-add-details'>
                  <label>Brend</label>
                  <input name='brend' type='text' required onChange={(e) => setBrand(e.target.value)}  />
              </div>
              <div className='addproduct-add-details'>
                  <label>Category</label>
                  <input name='category' type='text'required onChange={(e) => setCategory(e.target.value)} />
              </div>
            </div>
            <div className='addproduct-rest'>
                <div className='addproduct-price'>
                    <label>Price</label>
                    <input name='price' type='text'  required onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className='addproduct-qty'>
                    <label>Count in stock</label>
                    <input name='countInStock' required type='text' onChange={(e) => setCountInStock(e.target.value)}  />
                </div>
                <div className='addproduct-desc'>
                    <label>Description</label>
                    <input name='description' required type='text' onChange={(e) => setDescription(e.target.value)}  />
                </div>
            </div>
            <div className='addproduct-button'>
            <button >Add</button>
            </div>
            
       </div>
       </form>
    </div>
  </div>
  </div>
  </>
  )
}
