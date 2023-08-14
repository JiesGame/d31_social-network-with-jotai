/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user';

export const Register = () => {
  const [inputs, setInputs] = useState({});
  const [user,dispatch] = useAtom(userAtom);
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const loginAfterRegister = () => {
    const data = {
      identifier: inputs.username,
      password: inputs.password
    };
    fetch('http://localhost:8080/api/auth/local', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      Cookies.set('token', data.jwt, { expires: 7 })
      Cookies.set('username', data.user.username, { expires: 7 })
      Cookies.set('email', data.user.email, { expires: 7 })
      Cookies.set('description', data.user.description, { expires: 7 })
      Cookies.set('id', data.user.id, { expires: 7 })
      dispatch({
        type:"update",
        data:{
          username: data.user.username,
          email: data.user.email,
          description: data.user.description,
          id: data.user.id
        }
      });
      console.log('Connexion réussie !')
    })
    .catch(error => {
      console.error(error);
    });
    navigate('../');
  }
    
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password
    };
    fetch('http://localhost:8080/api/auth/local/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => response && console.log('Inscription réussie !'))
    .catch(error => {
      console.error(error);
    });
    loginAfterRegister();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username :
        <input 
          type="text" 
          name="username" 
          value={inputs.username || ""} 
          onChange={handleChange}
        />
        </label>
        <label>Email:
        <input 
          type="email" 
          name="email" 
          value={inputs.email || ""} 
          onChange={handleChange}
        />
        </label>
        <label>Password:
        <input 
          type="password" 
          name="password" 
          value={inputs.password || ""} 
          onChange={handleChange}
        />
        </label>
        <input type="submit" value="S'inscrire" />
      </form>
    </>
  )
}
