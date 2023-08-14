import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export const User = () => {
  const { username } = useParams();
  const [profil, setProfil] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = Cookies.get('token');
    fetch(`http://localhost:8080/api/users/?filters[username][$eq]=${username}`, {
      method: 'get',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    })
    .then(response => response.json())
    .then(data => setProfil(data[0]))
    .then(
      fetch(`http://localhost:8080/api/posts?filters[user][username][$eq]=${username}`, {
        method: 'get',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      })
      .then(response => response.json())
      .then(data => 
        setPosts(data.data.map(post =>
        <div key={post.id}>{post.attributes.text} publié le : {post.attributes.publishedAt}</div>
        ))
      )
      .catch(error => {
        console.error(error);
      })
      )
      .catch(error => {
        console.error(error);
      }
    )
  },[username])
  return (
    <>
      <h1>Profil de {profil.username}</h1>
      <div>
        <p>Email: {profil.email}</p>
        <p>Description: {profil.description ? profil.description : "Cet utilisateur n'a pas encore écrit sa description. "}</p>
        <h2>Liste de ses posts</h2>
        {posts}
      </div>

    </>
  )
}
