import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeProfile } from '../store';

export const Logout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('email');
    Cookies.remove('description');
    Cookies.remove('id');
    Cookies.remove('username');
    dispatch(
      changeProfile({
        username:'',
        email:'',
        description:'',
        id:''
      })
    )
    navigate('login');
  }
  return (
    <button onClick={logout}>Logout</button>
  )
}
