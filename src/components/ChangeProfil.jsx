import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const ChangeProfil = () => {
  const initialValues = {username:Cookies.get('username'), description:Cookies.get('description')}
  const [inputs, setInputs] = useState(initialValues);
  const [user, dispatch] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    const data = {
      username: inputs.username,
      description: inputs.description,
    };
    fetch(`http://localhost:8080/api/users/${user.id}`, {
      method: 'put',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(({...data, username:inputs.username, description:inputs.description}))
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Le profil n'a pas pu être modifié !");
    })
    .then(response => {
      console.log(response && 'Le profil à été modifié !')
      dispatch({
        type:"update",
        data:{username: inputs.username, description: inputs.description}
      }),
      Cookies.set('username', inputs.username),
      Cookies.set('description', inputs.description),
      navigate('../../profile')
    })
    .catch(error => {
      console.error(error);
    });
  }

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}));
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
        <br />
        <label>Description:
        <textarea 
          rows="4" 
          name="description" 
          value={inputs.description || ""} 
          onChange={handleChange}
        />
        </label>
        <br />
        <input type="submit" value="Modifier le profil" />
      </form>
    </>
  )
}
