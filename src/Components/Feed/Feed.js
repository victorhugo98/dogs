import React from "react";
import FeedPhotos from "./FeedPhotos";
import FeedModal from "./FeedModal";
const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);

  React.useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (infinite) {
        const currentHeight = window.scrollY;
        const pageHeight = document.body.offsetHeight - window.innerHeight;
        if (currentHeight > pageHeight * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          window.setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }
    window.addEventListener("wheel", infiniteScroll);
    window.addEventListener("scroll", infiniteScroll);

    return () => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [infinite]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}

      {pages.map((page) => {
        return (
          <FeedPhotos
            page={page}
            key={page}
            setModalPhoto={setModalPhoto}
            user={user}
            setInfinite={setInfinite}
          />
        );
      })}
    </div>
  );
};

export default Feed;
