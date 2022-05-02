import React, { useEffect, useState } from 'react'
import Leftside from '../LeftSide/Leftside';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editUser, updateUser } from '../../../actions/userActions';
import { toast } from 'react-toastify';
import LoadingBox from '../../Loading/LoadingBox';

import Toast from '../../Loading/Toast';
import 'react-toastify/dist/ReactToastify.css';







import './EditUserScreen.css';
import '../Admin.css';
import { USER_UPDATE_RESET } from '../../../constants/userConstants';
export default function EditUserScreen() {
    const params = useParams();
    const { id } = params;
    const userrr = useSelector((state) => state.userEdit);
    const { error, loading, user} = userrr;
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin ] = useState(0);
    const [date, setDate ] = useState('')

    const userUp = useSelector((state) => state.userUpdate);

    const { loading: LoadingUpdate, success: successUpdate } = userUp;
    const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        closeOnClick: true,
        pauseOnHover: false,
        autoClose: 2000
    };

useEffect(() => {
    if(successUpdate) {
        dispatch({ type: USER_UPDATE_RESET})
        toast.success('User has been updated', ToastObjects)
    } else if(!user){
        dispatch(editUser(id))
    } else {
        setName(user[0].name)
        setEmail(user[0].email);
        setPassword(user[0].password);
        setIsAdmin(user[0].isAdmin);
        setDate(user[0].date)
    
    }
}, [dispatch, user,successUpdate,  id])

const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, name, email, password, isAdmin}))
}

  return (
    <>
        <div className='container'>
            <Leftside />
                <div className='admin-left'>
                <div className='admin-edituser'>
                <Toast />
                    {
                        loading ? (
                            <LoadingBox></LoadingBox>
                        ) : (
                            error ? (
                                <p>{error}</p>
                            ) : (
                                <>
                        <form onSubmit={submitHandler}>
                        <div className='admin-edituser-title'>
                            <h4>User settings</h4>  
                            <Link to='/adduser'><button>Add new user</button></Link>
                        </div>
                        <div className='admin-user-container'>
                        <div className='admin-details'>
                            <span className='user-title'>Details of user</span>
                            <ul>
                                <li className='admin-li'><PersonIcon className='admin-img' /> <span>{name} </span></li>
                                <li className='admin-li'><MailOutlineIcon /><span>{email}</span>  </li>
                                <li className='admin-li'><SecurityIcon /> <span>{isAdmin}</span> </li>
                                <li className='admin-li'><AccessTimeIcon /> <span>{date}</span> </li>
                            </ul>
                        </div>
                        <div className='admin-edit'>
                            
                            
                            <div className='admin-user-left'>
                            <span>User settings</span>
                            <div className='admin-edit-name'>
                                <label>User name</label>
                                <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />    
                            </div>
                            <div className='admin-edit-name'>
                                <label>User email</label>
                                <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />    
                            </div>
                            <div className='admin-edit-name'>
                                <label>User password </label>
                                <input type='text' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />    
                            </div>
                            <div className='admin-edit-name'>
                                <label>Make this user an admin</label>
                                <input type='text' name='isAdmin' value={isAdmin} onChange={(e) => setIsAdmin(e.target.value)}/>    
                                
                            </div>
                            </div>
                            <div className='admin-user-right'>
                                <button >Change</button>    
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
