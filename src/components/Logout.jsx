import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user'

export const Logout = () => {

  const navigate = useNavigate();
  const [user, dispatch] = useAtom(userAtom);
  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('email');
    Cookies.remove('description');
    Cookies.remove('id');
    Cookies.remove('username');
    dispatch({
      type:"update",
      data:{username: "", description: "", email:"", id:""}
    })
    navigate('login');
  }
  return (
    <button onClick={logout}>Logout</button>
  )
}
