import React from "react";
import style from './FeedPhotosItem.module.css'
import Image from "../Helper/Image";

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  function handleClick() {
    setModalPhoto(photo);

  }

  return (
    <li className={style.photo} onClick={handleClick}>
      <Image photo={photo } />
      <span>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
