import logo from './logo.svg';
import './App.css';
import data from './data';
import Product from './components/Product/Product';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductScreen from './components/ProductScreen/ProductScreen';
import HomeScreen from './components/HomeScreen/HomeScreen';
import CartScreen from './components/CartScreen/CartScreen.jsx';
import { useSelector } from 'react-redux';
import LoginScreen from './components/Login/Login';
import SignupScreen from './components/Signup/Signup';
import CheckoutScreen from './components/Checkout/CheckoutScreen';
import PaymentScreen from './components/Payment/PaymentScreen';
import OrderScreen from './components/Order/OrderScreen';
import AdminRoute from './components/Routes/AdminRoute';
import SearchScreen from './components/SearchScreen/SearchScreen';
import SearchAllProducts from './components/SearchScreen/SearchAllproducts';

import Admin, {Private} from './components/Admin/Admin';
import UserList from './components/Admin/UsersList/UserList';
import EditUserScreen from './components/Admin/EditUserScreen/EditUserScreen';
import AddUserScreen from './components/Admin/AddUserScreen/AddUserScreen';
import EditProductScreen from './components/Admin/EditProductScreen/EditProductScreen';
import ProductsList from './components/Admin/ProductsList/ProductsList';
import AddProductScreen from './components/Admin/AddProductScreen/AddProductScreen';
import OrderScreenList from './components/Admin/OrderScreen/OrderScreen';
import OrderDetails from './components/Admin/OrderScreenDetails/OrderDetails';
import CategoriesScreen from './components/Admin/CategoriesScreen/CategoriesScreen';
import ReviewListScreen from './components/Admin/ReviewScreen/ReviewList';
import SearchProductsInput from './components/SearchScreen/SearchProductsInput';

function App() {

 
  return (
    <BrowserRouter>
    
        <Routes>
        <Route path='/cart/:id' element={<CartScreen />}></Route>
        <Route path='/cart' element={<CartScreen />}></Route>
        <Route path='/search' element={<SearchAllProducts />}></Route>
        <Route path='/search/:category' element={<SearchScreen />}></Route>
        <Route path='/search/query/:keyword' element={<SearchProductsInput />}></Route>
        <Route path='/product/:id' element={<ProductScreen />} exact></Route>
        <Route path='/signin/' element={<LoginScreen />}></Route>
        <Route path='/signup' element={<SignupScreen />}></Route>
        <Route path='/shipping' element={<CheckoutScreen />}></Route>
        <Route path='/order' element={<OrderScreen />}></Route>



        <Route path='/admin' element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path='/users' element={<AdminRoute><UserList /></AdminRoute>} />
        <Route path='/edituser/:id' element={<AdminRoute><EditUserScreen /></AdminRoute>} />
        <Route path='/adduser' element={<AdminRoute><AddUserScreen /></AdminRoute>} />
        <Route path='/editproduct/:id' element={<AdminRoute>< EditProductScreen/></AdminRoute>} />
        <Route path='/orderlist' element={<AdminRoute>< OrderScreenList/></AdminRoute>} />
        <Route path='/orderdetails/:id' element={<AdminRoute>< OrderDetails/></AdminRoute>} />
        <Route path='/categorieslist' element={<AdminRoute>< CategoriesScreen/></AdminRoute>} />
        <Route path='/reviewlist' element={<AdminRoute> <ReviewListScreen /></AdminRoute>} />
        <Route path='/addproduct' element={<AdminRoute><AddProductScreen /></AdminRoute>} />
        <Route path='/editproduct/:id' element={<AdminRoute><EditProductScreen /></AdminRoute>} />
        <Route path='/productslist' element={<AdminRoute><ProductsList /></AdminRoute>} />

        <Route path='/' element={<HomeScreen />} exact></Route>
        </Routes>
    
    
    </BrowserRouter>
  );
}

export default App;

