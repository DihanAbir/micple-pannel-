import React from "react";
import { Line } from "react-chartjs-2";

function SearchChart() {
  const data = [12, 19, 3, 5, 2, 3, 12, 9, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12];
  const labelsArr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1,
  ];
  // const monthdays = 25;
  // const labelsArr = [];

  // for (let i = 0; i <= monthdays; i++) {
  //   labelsArr.push(i);
  // }

  // console.log(`labelsArr`, labelsArr);

  return (
    <div>
      <h1 style={{ color: "grey", padding: "20px 0px 30px" }}>Total Search</h1>

      <Line
        data={{
          labels: labelsArr,
          datasets: [
            {
              label: "Search View",
              data: data,
              backgroundColor: ["#F79272"],
              borderColor: ["#F59C52"],
              borderWidth: 1,
            },
          ],
        }}
        // height={150}
        // width={120}
        options={{
          maintainAspectRatio: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 15,
            },
          },
        }}
      />
    </div>
  );
}

export default SearchChart;
