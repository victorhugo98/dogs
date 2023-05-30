import React from "react";
import { useParams } from "react-router-dom";
import Feed from "../Feed/Feed";
import Head from "../Helper/Head";

const UserProfile = () => {
  const user = useParams();

  return (
    <section className="container mainContainer">
      <Head titulo={user.user} descricao={`Pefil do ${user.user}`} />
      <h1 className="title">{user.user}</h1>
      <Feed user={user.user} />
    </section>
  );
};

export default UserProfile;
