import React from "react";
import Head from "../Helper/Head";
import useFetch from "../../Hooks/useFetch";
import { GET_STATS } from "../../api";
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";
const UserStatsGraphs = React.lazy(() => import("./UserStatsGraphs"));

const UserStats = () => {
  const { data, loading, error, request } = useFetch();
  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    async function getData() {
      const { url, options } = GET_STATS(token);
      const { response, json } = await request(url, options);
    }
    getData();
  }, []);
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <React.Suspense fallback={<div></div>}>
        <Head titulo="Estatísticas" />
        <UserStatsGraphs data={data } />
      </React.Suspense>
    );
  else return null;
};

export default UserStats;
