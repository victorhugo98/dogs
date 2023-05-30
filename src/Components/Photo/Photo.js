import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../../api";
import PhotoContent from "./PhotoContent";
import Error from "../Helper/Error";
import Head from "../Helper/Head";
const Photo = () => {
  const { id } = useParams();
  const { request, data, loading, error } = useFetch();
  
  React.useEffect(() => {
    const { url } = PHOTO_GET(id);
    const { response } = request(url);
  }, [request, id]);

  if (error) return <Error error={error} />;
  if (loading) return loading;
  if (data)
    return (
      <section className="container mainContainer">
        <Head titulo={data.photo.title} />

        <PhotoContent data={data} single={true} />
      </section>
    );
  else return null;
};

export default Photo;
