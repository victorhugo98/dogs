import React from "react";
import useForm from "../../Hooks/useForm";
import Input from "../../Components/Forms/Input";
import Button from "../../Components/Forms/Button";
import styles from "./UserPhotoPost.module.css";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../../api";
import Error from "../Helper/Error";
import { useNavigate } from "react-router-dom";

const UserPhotoPost = () => {
  const nome = useForm();
  const idade = useForm("number");
  const peso = useForm("number");
  const [img, setImg] = React.useState({});
  const { error, loading, data, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate("/conta");
  }, [navigate, data]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", img.raw);
    formData.append("nome", nome.value);
    formData.append("idade", idade.value);
    formData.append("peso", peso.value);
    const token = window.localStorage.getItem("token");
    const { url, options } = PHOTO_POST(formData, token);
    const { response, json } = await request(url, options);
    console.log(json)
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="Nome" {...nome} />
        <Input label="Idade" type="text" name="idade" {...idade} />
        <Input label="Peso" type="text" name="peso" {...peso} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Postar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{
              backgroundImage: `url(${img.preview})`,
            }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
