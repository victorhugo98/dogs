import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import styles from "./LoginForm.module.css";
import stylesBtn from "../Forms/Button.module.css";

const LoginForm = () => {
  const { userLogin, error, loading } = React.useContext(UserContext);

  const username = useForm();
  const password = useForm();

  async function handleSubmit(e) {
    e.preventDefault();
    if(username.validate() && password.validate())
    userLogin(username.value, password.value);
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="usename" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {<Error error={error} />}
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        {" "}
        Perdeu a senha?{" "}
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? cadastre-se no site</p>
      </div>
      <Link className={stylesBtn.button} to="/login/criar">
        {" "}
        Cadastro
      </Link>
    </section>
  );
};

export default LoginForm;
