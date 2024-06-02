"use client";
import { Line, Pie, Bar } from "react-chartjs-2";
import "@/Components/UI/ChartSetup";

export default function Graph({ data, type, horizantal }) {
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false, // Important for responsiveness
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false, // Important for responsiveness
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  if (horizantal) {
    barOptions.indexAxis = "y";
  }

  switch (type) {
    case "pie":
      return <Pie data={data} />;
    case "line":
      return <Line options={lineOptions} data={data} />;
    case "bar":
      return <Bar options={barOptions} data={data} />;
    default:
      return null;
  }
}
