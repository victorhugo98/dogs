import React from "react";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import { PASSWORD_RESET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import {useNavigate} from "react-router-dom";
import Head from "../Helper/Head";

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState(null);
  const [key, setKey] = React.useState(null);
  const password = useForm("password");
  const { request, loading, error } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { response, json } = await request(url, options);
      if (response.ok) {
        navigate('/conta')
      }
    }
  }

  return (
    <section className="animeLeft">
      <Head titulo="Resete a senha" />

      <h1 className="title">Resete a senha </h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      {error && <Error error={error} />}
    </section>
  );
};

export default LoginPasswordReset;
