import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useAtom } from "jotai/react";
import { userAtom } from "../atoms/user";
import { DetailPost } from "./DetailPost";

export const ListPosts = () => {
  const [postsNumber, setPostsNumber] = useState('')
  const [dataPosts, setDataPosts] = useState([]);
  const user = useAtom(userAtom);

  useEffect(() => {
    const token = Cookies.get('token');
    fetch('http://localhost:8080/api/posts?populate=user', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,         
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("La liste des posts n'a pas pu être récupéré!");
    })
    .then(data => {
      setPostsNumber(data.meta.pagination.total),
      setDataPosts(data.data.map(post =>
        <DetailPost 
          key={post.id}
          post={post}
          userID={user[0].id}
        />
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
