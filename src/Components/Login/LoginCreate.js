import React from "react";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import { USER_POST } from "../../api";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm("password");
  const { userLogin } = React.useContext(UserContext);
  const navigate = useNavigate();
  const { request, loading, error } = useFetch();

  async function handleSubmit(e) {
    e.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    if (username.validate() && email.validate() && password.validate()) {
      const {response} = await request(url, options);

      if (response.ok) {
        userLogin(username.value, password.value);
        navigate("conta");
      }
    }
  }

  return (
    <section className="animeLeft">
      <Head titulo="Crie sua conta" />

      <h1 className="title">Criar conta</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="usename" {...username} />
        <Input label="Email" type="text" name="Email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}

        {error ? <Error error={error} /> : null}
      </form>
    </section>
  );
};

export default LoginCreate;
