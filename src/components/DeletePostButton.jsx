import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

export const DeletePostButton = (props) => {
  const deletePost = () => {
    const token = Cookies.get('token');
    fetch(`http://localhost:1337/api/posts/${props.postId}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  
      }
    })
    .then(console.log('Le post à bien été supprimé !'))
    .then(() => {window.location.reload()})
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <button onClick={deletePost}>Supprimer le post</button> 
  )
}

DeletePostButton.propTypes= {
  postId: PropTypes.number
}