import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const backendApi = import.meta.env.VITE_APP_API_URL;

const ChartStatistic = () => {
  const [chartData, setChartData] = useState({
    labels: ["1", "2", "3"],
    type: "line",
    datasets: [
      {
        label: "Dataset 1",
        data: [1, 2, 3],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Dataset 2",
        data: [1, 2, 3],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgb(201, 203, 207)",
      },
    ],
  });

  useEffect(() => {
    getStatTadarus();
  }, []);

  const getStatTadarus = async () => {
    const response = await axios.get(`${backendApi}/api/tadarus/stats/chart`);
    setChartData({
      labels: response.data.dates,
      type: "line",
      datasets: [
        {
          label: "Ideals",
          data: response.data.ideals,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
        {
          label: "Reals",
          data: response.data.reals,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgb(201, 203, 207)",
        },
      ],
    });
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <h2 style={{ textAlign: "center" }}>Data Statistics Tadarus</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default ChartStatistic;
