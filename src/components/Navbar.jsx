import { Link } from 'react-router-dom';
import { Logout } from './Logout';
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const username = useSelector((state) => state.user.value.username);

  return (
    <div className='Navbar'>
      <Link to='/'>Home</Link>
      {!username && <Link to='login'>Login</Link>}
      {username && <Link to='profile'>Profile</Link>}
      {!username && <Link to='register'>Register</Link>}
      {username && <Logout />}
      {username ? <p>Profil de : {username} </p> : <p>Non connecté</p>}
    </div>
  )
}
