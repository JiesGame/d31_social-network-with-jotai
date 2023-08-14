/* eslint-disable react/no-unescaped-entities */

import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user';


export const Profile = () => {
  const user = useAtom(userAtom);
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const token = Cookies.get('token')
    if(token) {
      setConnected(true);
    }
  }, [])
  
  return (
    <>
      <h1>Profil</h1>
      {connected ? 
      <>
        <div>
          <p>Nom d'utilisateur : {user[0].username}</p>
          <p>Adresse mail : {user[0].email}</p>
          <p>Description : {user[0].description !== null ? user[0].description : 'Vous n\'avez pas encore rempli votre description'}</p>
        </div>
        <div>
          <Link to='changeprofile'>Modifier son profil</Link>
          <Outlet />
        </div>
      </>
      :
      <p>Vous n'êtes pas connectés</p>}
    </>
  )
}
