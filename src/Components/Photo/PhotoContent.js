import React from "react";
import styles from "./PhotoContent.module.css";
import { Link } from "react-router-dom";
import PhotoComments from "./PhotoComments";
import { UserContext } from "../../Context/UserContext";
import PhotoDelete from "./PhotoDelete";
import Image from "../Helper/Image";

const PhotoContent = ({ data, single, setModalPhoto }) => {
  const { photo, comments } = data;
  const user = React.useContext(UserContext);

  React.useEffect(() => {
    function handleCloseModalByEsc(e) {
      if (e.key !== "Escape") return;
      else {
        setModalPhoto(null);
      }
    }
    window.addEventListener("keyup", handleCloseModalByEsc);
    return () => {
      window.removeEventListener("keyup", handleCloseModalByEsc);
    };
  }, [setModalPhoto]);

  React.useEffect(() => {
    if (!single) {
      const currentTop = window.scrollY;
      function stopScroll() {
        window.scrollTo({ top: currentTop });
      }

      window.addEventListener("scroll", stopScroll);

      return () => {
        window.removeEventListener("scroll", stopScroll);
      };
    }
  }, []);

  return (
    <div className={`${styles.photo} ${single ? styles.single : null}`}>
      <div className={styles.img}>
        <Image photo={photo} />
      </div>

      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user.data && data.photo.author === user.data.nome ? (
              <PhotoDelete id={data.photo.id} />
            ) : (
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}

            <span className={styles.visualizacoes}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>

          <ul className={styles.attributes}>
            <li>{photo.peso} Kg</li>
            <li>
              {photo.idade} {photo.idade > 1 ? "anos" : "ano"}{" "}
            </li>
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} single={single} />
    </div>
  );
};

export default PhotoContent;
