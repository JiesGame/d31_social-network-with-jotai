import { Link } from 'react-router-dom';
import { Logout } from './Logout';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user'

export const Navbar = () => {
  const user = useAtom(userAtom);

  return (
    <div className='Navbar'>
      <Link to='/'>Home</Link>
      {!user[0].username && <Link to='login'>Login</Link>}
      {user[0].username && <Link to='profile'>Profile</Link>}
      {!user[0].username && <Link to='register'>Register</Link>}
      {user[0].username && <Logout />}
      {user[0].username ? <p>Profil de : {user[0].username} </p> : <p>Non connecté</p>}
      {console.log(user[0])}
      {user[0].id}
      {user[0].username}
      {user[0].description}
      {user[0].email}
    </div>
  )
}
