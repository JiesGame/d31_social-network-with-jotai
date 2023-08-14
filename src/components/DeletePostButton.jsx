import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

export const DeletePostButton = (props) => {
  const deletePost = () => {
    const token = Cookies.get('token');
    fetch(`http://localhost:8080/api/posts/${props.postID}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  
      }
    })
    .then(() => window.location.reload())
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <button onClick={deletePost}>Supprimer le post</button> 
  )
}

DeletePostButton.propTypes= {
  postID: PropTypes.number
}