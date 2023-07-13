import React from "react";
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import useFetch from "../../Hooks/useFetch";
import { COMMENT_POST } from "../../api";
import Error from "../Helper/Error";
import styles from "./PhotoCommentsForm.module.css";
const PhotoCommentsForm = (props) => {
  const [comment, setComment] = React.useState("");
  const { request, error, loading } = useFetch();
  const textArea = React.useRef();
  const sendButtonRef = React.useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    const { url, options } = COMMENT_POST(props.id, { comment }, token);
    const { response, json } = await request(url, options);

    if (response.ok) {
      textArea.current.focus();
      setComment("");
      props.setComments((prev) => [...prev, json]);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendButtonRef.current.click();
    }
  }

  return (
    <form
      className={`${styles.form} ${props.single ? styles.single : ""}`}
      onSubmit={handleSubmit}
    >
      <textarea
        style={{ opacity: loading ? ".2" : "1" }}
        disabled={loading ? true : false}
        onKeyDown={handleKeyDown}
        className={styles.textarea}
        ref={textArea}
        name="comment"
        id="comment"
        placeholder="comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></textarea>
      <button className={styles.button} ref={sendButtonRef}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
