/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { useAtom } from "jotai/react";
import { userAtom } from "../atoms/user";

export const LikeButton = (props) => {
  const [userLike, setUserLike] = useState(false);
  const token = Cookies.get('token');
  const user = useAtom(userAtom);

  useEffect(() => {
    fetch(`http://localhost:8080/api/posts/${props.postID}?populate=*`,{
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
      throw new Error("La liste des likes n'a pas pu être récupéré!");
    })
    .then(data => {
      data.data.attributes.users_likes.data.map(userlike => (userlike.id == user[0].id) && setUserLike(true))
    })
  }, [])
  const likePost = () => {
    fetch(`http://localhost:8080/api/posts/${props.postID}?populate=*`,{
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
      throw new Error("La liste des likes n'a pas pu être récupéré!");
    })
    .then(data => {
      data.data.attributes.users_likes.data.map(userlike => (userlike.id == user[0].id) && setUserLike(true))
      const currentUsersLikes = data.data.attributes.users_likes.data.map(user => user.id.toString());
      console.log(currentUsersLikes)
      const newUsersLikes = 
        userLike ?
        currentUsersLikes.filter(userID => userID !== user[0].id) :
        [...currentUsersLikes, user[0].id.toString()];
      const dataLike = {
        "data": {
        like: !userLike ? props.like + 1 : props.like - 1,
        users_likes: newUsersLikes
        }
      }
      fetch(`http://localhost:8080/api/posts/${props.postID}`,{
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,         
        },
        body: JSON.stringify(dataLike)
      })
      .then(() => window.location.reload())
    }) 
  }

  return (
    <>
    {userLike ?
    <button onClick={likePost}>Je n'aime plus</button> 
    :
    <button onClick={likePost}>J'aime</button>
    }
    </>
  )
}

LikeButton.propTypes= {
  postID: PropTypes.number,
  like: PropTypes.number
}