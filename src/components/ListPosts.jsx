import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useSelector } from "react-redux";
import { DeletePostButton } from "./DeletePostButton";

export const ListPosts = () => {
  const [postsNumber, setPostsNumber] = useState('')
  const [dataPosts, setDataPosts] = useState([]);
  const userId = useSelector((state) => state.user.value.id);

  useEffect(() => {
    const token = Cookies.get('token');
    fetch('http://localhost:8080/api/posts?populate=user', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,         
      },
    })
    .then(response => response.json())
    .then(data => {
      setPostsNumber(data.meta.pagination.total),
      setDataPosts(data.data.map(post =>
        <div key={post.id}>
          <p>{post.attributes.text}</p>
          <p>Ecrit par {post.attributes.user.data.attributes.username}</p>
          {userId == post.attributes.user.data.id && <DeletePostButton postId={post.id} /> }

        </div>
      ))
      
    })
    .catch(error => {
      console.error(error);
    });
  }, [])

  return (
    <>
      <h2>Liste des posts</h2>
      <p>Il y a actuellement {postsNumber} posts.</p>
      {dataPosts}
    </>
  )
}
