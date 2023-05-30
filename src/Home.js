import React from "react";
import Feed from "./Components/Feed/Feed";
import Head from "./Components/Helper/Head";

const Home = () => {

  return (
    <section className="container mainContainer">
      <Head titulo="Fotos" descricao="Página Home do site" />

      <Feed />
    </section>
  );
};

export default Home;
