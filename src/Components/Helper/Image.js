import React from "react";
import styles from "./Image.module.css";

const Image = ({ photo }) => {
  const [skeleton, setSkeleton] = React.useState(true);
  function handleLoad(e) {
    setSkeleton(false);
    e.target.style.opacity = 1;
  }
  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img
        onLoad={handleLoad}
        className={styles.img}
        src={photo.src}
        alt={photo.title}
      />
    </div>
  );
};

export default Image;
