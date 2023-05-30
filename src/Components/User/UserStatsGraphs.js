import React from "react";
import styles from "./UserStatsGraphs.module.css";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";
function UserStatsGraphs({ data }) {
  const [graph, setGraph] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    if (data.length) {
      let soma = 0;
      for (let index = 0; index < data.length; index++) {
        soma = soma + Number(data[index].acessos);
      }
      setTotal(soma);
    }

    const graphData = data.map((el) => {
      return {
        x: el.title,
        y: Number(el.acessos),
      };
    });
    setGraph(graphData);
  }, [data]);

  return (
    <section className={`animeLeft ${styles.graph}`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos:{total}</p>
      </div>
      {data.length ?  (
        <>
          <div className={`${styles.graphItem}`}>
            <VictoryPie
              data={graph}
              innerRadius={50}
              padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
              style={{
                data: { fillOpacity: 0.9, stroke: "#fff", strokeWidth: 2 },
                labels: { fontSize: 14, fill: "#333" },
              }}
            />
          </div>

          <div className={`${styles.graphItem}`}>
            <VictoryChart>
              <VictoryBar data={graph} alignment="start"></VictoryBar>
            </VictoryChart>
          </div>
        </>
      ) : null}
    </section>
  );
}

export default UserStatsGraphs;
