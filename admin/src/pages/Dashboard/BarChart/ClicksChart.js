import React from "react";
import { Bar } from "react-chartjs-2";

function ClickChart() {
  const data = [12, 19, 3, 5, 2, 3, 12, 195, 2, 3, 12, 19];
  const labelsArr = [47, 52, 67, 58, 9, 50, 47, 52, 67, 58, 47];
  return (
    <div>
      <h1 style={{ color: "grey", padding: "20px 0px 30px" }}>
        Total ClickChart
      </h1>
      <Bar
        data={{
          labels: labelsArr,
          datasets: [
            {
              label: "This Week",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderRadius: 5,
              hoverBorderRadius: 0,
              borderColor: [
                "rgba(255, 99, 132, 0.37)",
                "rgba(54, 162, 235, 0.37)",
                "rgba(255, 206, 86, 0.37)",
                "rgba(75, 192, 192, 0.37)",
                "rgba(153, 102, 255, 0.37)",
                "rgba(255, 159, 64, 0.37)",
                "rgba(255, 99, 132, 0.37)",
                "rgba(54, 162, 235, 0.37)",
                "rgba(255, 206, 86, 0.37)",
                "rgba(75, 192, 192, 0.37)",
                "rgba(153, 102, 255, 0.37)",
                "rgba(255, 159, 64, 0.37)",
              ],
              borderWidth: 1,
            },
            {
              label: "Previous Week",
              data: [47, 52, 67, 58, 9, 50, 47, 52, 67, 58, 9, 50],
              backgroundColor: "rgba(43,71,196,0.37)",
              borderColor: "red",
              hoverBackgroundColor: "tomato",
              hoverBorderRadius: 10,
            },
          ],
        }}
        // height={150}
        // width={120}
        options={{
          maintainAspectRatio: true,
          // scales: {
          //   yAxes: [
          //     {
          //       ticks: {
          //         beginAtZero: true,
          //       },
          //     },
          //   ],
          // },
          // legend: {
          //   labels: {
          //     fontSize: 15,
          //   },
          // },
        }}
      />
    </div>
  );
}

export default ClickChart;
