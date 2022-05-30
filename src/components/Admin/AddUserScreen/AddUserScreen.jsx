import React, {useState, useEffect} from 'react';
import Leftside from '../LeftSide/Leftside';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../../../actions/userActions'
import { toast } from 'react-toastify';
import Toast from '../../Loading/Toast';


import '../Admin.css';
import './AddUserScreen.css';
import { USER_ADD_RESET } from '../../../constants/userConstants';

export default function AddUserScreen() {
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    closeOnClick: true,
    pauseOnHover: false,
    autoClose: 2000
};
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')

  const { loading: loadingAdd, success: succesUpdated, userAdd: userAdded} = useSelector((state) => state.userAdd)

  useEffect(() => {
    if(userAdded) {
      dispatch({ type: USER_ADD_RESET})
      setName('');
      setPassword('');
      setEmail('');
    }
  }, [dispatch, userAdded, succesUpdated])


  
const submitHandler = (e) => {
  e.preventDefault();
  dispatch(addUser(name, password, email))
  toast.success('User added', ToastObjects);

}
  return (
    <>
      <div className='container'>
    <Leftside />
    <div className='admin-left'>
      <div className='admin-adduser-container'>
        <form onSubmit={submitHandler}>
      <Toast />

          <div className='admin-adduser-inputs'>
            <label>User name</label>
            <input type='text' placeholder='User name' onChange={(e) => setName(e.target.value)}/>
            
          </div>
          <div className='admin-adduser-inputs'>
            <label>User email</label>
            <input type='text' placeholder='User email' onChange={(e) => setEmail(e.target.value)}/>
            
          </div>
          <div className='admin-adduser-inputs'>
            <label>User password</label>
            <input type='text' placeholder='User password' onChange={(e) => setPassword(e.target.value)}/>
            
          </div>
          <div className='admin-adduser-button'>
          <button>Add user</button>
          </div>
          </form>
      </div>
    </div>
    </div>
    </>
  )
}
