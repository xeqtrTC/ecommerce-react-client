import React, { useEffect } from 'react'
import Leftside from '../LeftSide/Leftside';
import { DataGrid } from '@mui/x-data-grid';
import { Link }  from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector, useDispatch } from 'react-redux';
import { usersList, deleteUser } from '../../../actions/userActions';
import LoadingBox from '../../Loading/LoadingBox';
import Toast from '../../Loading/Toast';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';



import '../Admin.css';
import './UserList.css';

export default function Userlist() {
  const dispatch = useDispatch();

  const usersState = useSelector((state) => state.usersList);
  const userDel = useSelector((state) => state.userDelete);
  const { error: errorDelete, success: successDelete} = userDel
  const { loading, error, users } = usersState;

  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    closeOnClick: true,
    pauseOnHover: false,
    autoClose: 2000
};


  
  const rows = users?.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }
  })

    const deleteHandler = (id) => {
      dispatch(deleteUser(id))
    }

  
  const columns = [
    
  { field: 'id', headerName: 'ID', width: 90},
  { field: 'name', headerName: 'User',width: 200},
  { field: 'email', headerName: 'Email', width: 200},
  { field: 'isAdmin', headerName: 'IsAdmin', width: 130},
  { field: 'date', headerName: 'Date', width: 100},
  { field: 'action', type:'actions', headerName: 'Action', width: 150, 
    renderCell: (params) => (
        <> 
          <Link to={`/edituser/${params.id}`}> <button className='editButton'>Edit</button></Link>
          <DeleteOutlineIcon onClick={() => deleteHandler(params.id)} className='deleteButton' />
        </>
    )
  }
  ]




  useEffect(() => {
    if(successDelete) {
      toast.success('User has been deleted', ToastObjects)
      dispatch(usersList())

    } else {
      dispatch(usersList())
    }
  }, [dispatch,successDelete])

  return (
    <>
        <div className='container'>
            <Leftside />
                <div className='admin-left'>
                  <div className='datagrid-container'>
                    {
                      loading ? (
                        <LoadingBox></LoadingBox>
                      ) : (
                        error ? (
                          <p>{error}</p>
                        ) : (
                          <div className='datagrid-right'>
                            <Toast/>
                            <DataGrid
                              columns={columns}
                              rows={rows}
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
