import React, { useEffect } from 'react'
import Leftside from '../LeftSide/Leftside';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { listOrder } from '../../../actions/orderActions';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoadingBox from '../../Loading/LoadingBox';
import Toast from '../../Loading/Toast';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import '../Admin.css';
import './OrderScreen.css';

export default function OrderScreenList() {
  const dispatch = useDispatch();
  const orderListAll = useSelector((state) => state.orderList);

  const { loading, error, orders} = orderListAll
    
  const rows = orders?.map((order) => {
    return {
      id: order.id,
      name: order.name,
      productID: order.product,
      Fullname: order.fullName,
      Username: order.user_name,
      date: order.date
    }
  })
  const columns = [
    
    { field: 'id', headerName: 'ID', width: 90},
    { field: 'name', headerName: 'Product name', width: 200},
  { field: 'productID', headerName: 'Product(id)', width: 90},
  { field: 'Fullname', headerName: 'Name of user', width: 150},
  { field: 'Username', headerName: 'Username', width: 140},
  { field: 'date', headerName: 'Date', width: 200},
  { field: 'Action', type:'actions', headerName: 'Action', width: 150, 
    renderCell: (params) => (
      <>
        <Link to={`/orderdetails/${params.id}`} params={params}><button className='editButton' >Detalji</button></Link>
      </>

    )
  }
  
  ]
  useEffect(() => {
    dispatch(listOrder());
  }, [dispatch])
  
  return (
    <>
        <div className='container'>
            <Leftside />
                <div className='admin-left'>
                    <div className='order-container'>
                      <div className='order-box'>
                        {
                          loading ? (
                            <LoadingBox></LoadingBox>
                          ) : (
                            error ? (
                              <p>{error}</p>
                            ) : (
                              <DataGrid 
                      
                                columns={columns}
                                rows={rows}
                        
                                initialState={{
                                  pagination: {
                                    pageSize: 15,
                                  },
                                }}
                                checkboxSelection
                                disableSelectionOnClick
                        />
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