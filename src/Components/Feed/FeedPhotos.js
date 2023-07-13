import React from "react";
import FeedPhotosItem from "./FeedPhotosItem";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import styles from "./FeedPhotos.module.css";
const FeedPhotos = ({ setInfinite, page, setModalPhoto, user }) => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 6;
      const { url, options } = PHOTOS_GET({
        page: page,
        total: total,
        user: user,
      });
      const { response, json } = await request(url, options);
      if (response && response.ok && json.length < total) {
        setInfinite(false);
      }
    }
    fetchPhotos();
  }, [request, page, setInfinite, user]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <>
        <ul className={`${styles.feed} animeLeft`}>
          {data.map((photo, index) => (
            <FeedPhotosItem
              key={index}
              photo={photo}
              setModalPhoto={setModalPhoto}
            />
          ))}
        </ul>
      </>
    );
  else return null;
};

export default FeedPhotos;
