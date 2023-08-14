import { DeletePostButton } from "./DeletePostButton";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { LikeButton } from "./LikeButton";

export const DetailPost = (props) => {
  const username = props.post.attributes.user.data.attributes.username;
  const text = props.post.attributes.text;
  const postID = props.post.id;
  const postUserID = props.post.attributes.user.data.id;
  const like = props.post.attributes.like

  return (
    <div key={postID}>
      <p>{text}</p>
      <p>Ecrit par <Link to={`user/${username}`}>{username}</Link></p>
      <p>Nombre de like : {like ? like : 0}</p>
      <LikeButton postID={postID} like={like}/>
      {props.userID == postUserID && <DeletePostButton postID={postID} />}
      <p>---------</p>
    </div>
  )
}

DetailPost.propTypes= {
  userID: PropTypes.string,
  post: PropTypes.object
}