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
import './ReviewList.css';
import { listProducts, deleteProduct, listFullProducts, listOfReview, deleteReview} from '../../../actions/productActions';

export default function ReviewListScreen(props) {
    const reviewList = useSelector((state) => state.reviewList)
    const reviewDelete = useSelector((state) => state.reviewDelete)
    

    const {error:errorDelete, success: successDelete} = reviewDelete
    const Navigate = useNavigate();
    const { error, reviews, loading } = reviewList;
    const dispatch = useDispatch();
    
    const ToastObjects = {
      pauseOnFocusLoss: false,
      draggable: false,
      closeOnClick: true,
      pauseOnHover: false,
      autoClose: 2000
  };
     
    const rows = reviews?.map((review) => {
      return {
        id: review.review_id,
        product_ID: review.product_id,
        review: review.review,
        reviewer_name: review.reviewer_name,
        review_date: review.review_date,
      }
    })
    const deleteHandler = (id) => {
      dispatch(deleteReview(id))
    }
  const columns = [
    
    { field: 'id', headerName: 'ID', width: 90},
    { field: 'product_ID', headerName: 'Product ID', width: 130},
  { field: 'review', headerName: 'Review', width: 250},
  { field: 'reviewer_name', headerName: 'Rewiever name', width: 130},
  { field: 'review_date', headerName: 'Date', width: 150},
  { field: 'Action', type:'actions', headerName: 'Action', width: 150, 
    renderCell: (params) => (
      <>
        <DeleteOutlineIcon onClick={() => deleteHandler(params.id)} className='deleteButton' />
      </>

    )
  }
  ]
  
  useEffect(() => {
    if(successDelete) {
      toast.success('Review has been deleted', ToastObjects)
    }else {
      dispatch(listOfReview())
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