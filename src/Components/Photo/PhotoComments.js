import React from "react";
import styles from "./PhotoComments.module.css";
import { UserContext } from "../../Context/UserContext";
import PhotoCommentsForm from "./PhotoCommentsForm";
const PhotoComments = (props) => {
  const [comments, setComments] = React.useState(() => props.comments);
  const { login } = React.useContext(UserContext);
  const commentsList = React.useRef();

  React.useEffect(() => {
    const height = commentsList.current.scrollHeight;
    commentsList.current.scrollTo({ top: height });
  }, []);

  return (
    <>
      <ul
        ref={commentsList}
        className={`${styles.comment} ${props.single ? styles.single : ""}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span> {comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && (
        <PhotoCommentsForm
          comments={comments}
          id={props.id}
          setComments={setComments}
          single={props.single}
        />
      )}
    </>
  );
};

export default PhotoComments;
