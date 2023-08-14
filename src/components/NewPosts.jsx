import { useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useAtom } from "jotai/react";
import { userAtom } from "../atoms/user";

export const NewPosts = () => {
  const [message, setMessage] = useState('');
  const userId = useSelector((state) => state.user.value.id);
  const user = useAtom(userAtom)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    const objectData = {
      data: {
        text: message,
        user: userId
    }}
    fetch('http://localhost:8080/api/posts', {
      method: 'post',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(objectData)
    })
    .then(response => response.json())
    .then(() => {window.location.reload()})
    .catch(error => {
      console.error(error);
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Message :
        <textarea 
          rows='3' 
          name="message" 
          value={message || ""} 
          onChange={handleChange}
        />
        </label>
        <input type="submit" value="Poster" />
      </form>
    </>
  )
}
