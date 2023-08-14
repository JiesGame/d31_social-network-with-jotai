/* eslint-disable react/no-unescaped-entities */

import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom'


export const Profile = () => {
  const username = useSelector((state) => state.user.value.username);
  const email = useSelector((state) => state.user.value.email);
  const description = useSelector((state) => state.user.value.description);
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
          <p>Nom d'utilisateur : {username}</p>
          <p>Adresse mail : {email}</p>
          <p>Description : {description !== null ? description : 'Vous n\'avez pas encore rempli votre description'}</p>
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
