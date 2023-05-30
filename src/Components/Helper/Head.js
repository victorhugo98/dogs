import React from "react";

function Head({ titulo, descricao }) {
  React.useEffect(() => {
    const title = document.querySelector(["title"]);
    title.innerText = `${titulo} | Dogs`;
    const description = document.querySelector('meta[name="description"]');
    description.content = descricao || "";
  }, [titulo, descricao]);
  return <></>;
}

export default Head;
