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
import './CategoriesScreen.css';
import { listProducts, deleteProduct } from '../../../actions/productActions';

export default function CategoriesScreen(props) {
    const dispatch = useDispatch();

    const categoriesListasd = useSelector((state) => state.categoriesList);

    const { loading, error, categories } = categoriesListasd;
    console.log(categories);
    
    const ToastObjects = {
      pauseOnFocusLoss: false,
      draggable: false,
      closeOnClick: true,
      pauseOnHover: false,
      autoClose: 2000
  };
     
    

   
  const columns = [
    
    { field: 'id', headerName: 'ID', width: 90},
    { field: 'category', headerName: 'Category name', width: 200},
  { field: 'Action', type:'actions', headerName: 'Action', width: 150, 
    renderCell: (params) => (
      <>
        <DeleteOutlineIcon onClick={() => (params.id)} className='deleteButton' />
      </>

    )
  }
  ]
  
  useEffect(() => {
  }, [dispatch])
  return (
    <>
        <div className='container'>
            <Leftside />
                <div className='admin-left'>
                  <div className='categories-container'>
                    { loading ? (
                        <LoadingBox></LoadingBox>
                    ) : (
                        error ? (
                            <p>{error}</p>
                        ) : (
                            <div className='categories-right'>
                            <Toast />
                          <DataGrid
                          columns={columns}
                          initialState={{
                            pagination: {
                              pageSize: 10,
                            },
                          }}
                          checkboxSelection
                          disableSelectionOnClick
                        />                         
                     </div>
                        )
                    )
                }
                      </div>
                </div>
        </div>

    </>
  )
}