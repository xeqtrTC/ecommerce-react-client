import React, { useEffect } from 'react'
import Leftside from '../LeftSide/Leftside';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoadingBox from '../../Loading/LoadingBox';
import Toast from '../../Loading/Toast';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import '../Admin.css';
import './ProductsList.css';
import { listProducts, deleteProduct, listFullProducts } from '../../../actions/productActions';

export default function ProductList(props) {
    const productList = useSelector((state) => state.productListFull)
    const productDelete = useSelector((state) => state.productDelete)
    

    const {error:errorDelete, success: successDelete} = productDelete
    const Navigate = useNavigate();
    const { error, products, loading } = productList;
    console.log(products)
    const dispatch = useDispatch();
    
    const ToastObjects = {
      pauseOnFocusLoss: false,
      draggable: false,
      closeOnClick: true,
      pauseOnHover: false,
      autoClose: 2000
  };
     
    const rows = products?.map((product) => {
      return {
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        countInStock: product.countInStock
      }
    })
    const deleteHandler = (id) => {
      dispatch(deleteProduct(id))
    }
    const editProduct = (id, params) => {
      Navigate(`/editproduct/${id}`, {...params})
    }
  const columns = [
    
    { field: 'id', headerName: 'ID', width: 90},
    { field: 'name', headerName: 'Product name', width: 200},
  { field: 'brand', headerName: 'Brand', width: 130},
  { field: 'category', headerName: 'Category', width: 130},
  { field: 'price', headerName: 'Price', width: 100},
  { field: 'countInStock', headerName: 'countInStock', width: 140},
  { field: 'Action', type:'actions', headerName: 'Action', width: 150, 
    renderCell: (params) => (
      <>
        <Link to={`/editproduct/${params.id}`} params={params}><button className='editButton' >Edit</button></Link>
        <DeleteOutlineIcon onClick={() => deleteHandler(params.id)} className='deleteButton' />
      </>

    )
  }
  ]
  
  useEffect(() => {
    if(successDelete) {
      toast.success('Product has been deleted', ToastObjects)
      dispatch(listFullProducts())

    }else {
      dispatch(listFullProducts())
    }
}, [dispatch, successDelete])
  return (
    <>
        <div className='container'>
            <Leftside />
                <div className='admin-left'>
                  <div className='datagrid-container'>
                    <div className='datagrid-right'>
                      {
                        loading ? (
                          <LoadingBox></LoadingBox>
                        ) : (
                          error ? (
                            <p>{error}</p>
                          ) : ( 
                            <>
                            <Toast />
                          <DataGrid
                          rows={rows}
                          columns={columns}
                          initialState={{
                            pagination: {
                              pageSize: 10,
                            },
                          }}
                          checkboxSelection
                          disableSelectionOnClick
                        />
                        </>
                          )
                     
                          )
                      }
                     </div>
                      </div>
                </div>
        </div>

    </>
  )
}