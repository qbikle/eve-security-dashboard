import Graph from "@/Components/UI/Graph";
import SummaryTable from "@/Components/UI/SummaryTable";
import data from "@/public/eve.json";

export default async function HomePage() {
  const eventTypesData = {
    labels: ["alert", "ssh", "dns", "fileinfo", "http"],
    datasets: [
      {
        data: [
          data.filter((event) => event.event_type === "alert").length,
          data.filter((event) => event.event_type === "ssh").length,
          data.filter((event) => event.event_type === "dns").length,
          data.filter((event) => event.event_type === "fileinfo").length,
          data.filter((event) => event.event_type === "http").length,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const alertSeverityData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        data: [
          data.filter((event) => event.alert && event.alert.severity === 1)
            .length,
          data.filter((event) => event.alert && event.alert.severity === 2)
            .length,
          data.filter((event) => event.alert && event.alert.severity === 3)
            .length,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const topDestPortsData = {
    labels: [
      ...new Set(
        data
          .filter((event) => event.event_type === "alert")
          .map((event) => event.dest_port)
      ),
    ],
    datasets: [
      {
        label: "Top Destination Ports",
        data: data
          .filter((event) => event.event_type === "alert")
          .reduce((acc, event) => {
            const port = event.dest_port;
            acc[port] = (acc[port] || 0) + 1;
            return acc;
          }, {}),
        backgroundColor: "#FF6384",
      },
    ],
  };

  const alertsByCategoryData = {
    labels: [
      ...new Set(
        data
          .filter((event) => event.event_type === "alert")
          .map((event) => event.alert.category)
      ),
    ],
    datasets: [
      {
        label: "Alerts by Category",
        data: data
          .filter((event) => event.event_type === "alert")
          .reduce((acc, event) => {
            const category = event.alert.category;
            acc[category] = (acc[category] || 0) + 1;
            return acc;
          }, {}),
        backgroundColor: "#FF6384",
      },
    ],
  };

  const alertsOverTimeData = {
    labels: [
      ...new Set(
        data
          .filter(
            (event) =>
              event.event_type === "alert" &&
              event.timestamp.startsWith("2019-01-02")
          )
          .map((event) => event.timestamp.slice(11, 16))
      ),
    ],
    datasets: [
      {
        label: "Alerts Over Time",
        data: data
          .filter(
            (event) =>
              event.event_type === "alert" &&
              event.timestamp.startsWith("2019-01-02")
          )
          .reduce((acc, event) => {
            const time = event.timestamp.slice(11, 16);
            acc[time] = (acc[time] || 0) + 1;
            return acc;
          }, {}),
        borderColor: "#e6e6e6",

        backgroundColor: "#059bff",
      },
    ],
  };

  const topSourceIPsData = {
    labels: [],
    datasets: [
      {
        label: "Top Source IPs",
        data: [],
        backgroundColor: "#FF6384",
      },
    ],
  };

  const ipCounts = data
    .filter((event) => event.event_type === "alert")
    .reduce((acc, event) => {
      const ip = event.src_ip;
      acc[ip] = (acc[ip] || 0) + 1;
      return acc;
    }, {});

  const sortedIPs = Object.keys(ipCounts).sort(
    (a, b) => ipCounts[b] - ipCounts[a]
  );

  const top5IPs = sortedIPs.slice(0, 10);

  topSourceIPsData.labels = top5IPs;
  topSourceIPsData.datasets[0].data = top5IPs.map((ip) => ipCounts[ip]);

  const summaryData = [
    {
      metric: "Total Alerts",
      value: data.filter((event) => event.event_type === "alert").length,
    },
    {
      metric: "Unique Source IPs",
      value: new Set(data.map((event) => event.src_ip)).size,
    },
    {
      metric: "Unique Destination IPs",
      value: new Set(data.map((event) => event.dest_ip)).size,
    },
    {
      metric: "High Severity Alerts",
      value: data.filter((event) => event.alert && event.alert.severity === 3)
        .length,
    },
  ];

  return (
    <div className="p-4 bg-neutral-900 min-h-screen text-white">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-neutral-800 p-4 rounded-lg">
          <h2 className="text-xl mb-2">Event Types Distribution</h2>
          <Graph data={eventTypesData} type="pie" />
        </div>
        <div className="bg-neutral-800 p-4 rounded-lg">
          <h2 className="text-xl mb-2">Alerts Over Time</h2>
          <div className="flex flex-col justify-center h-full pb-4">
            <Graph data={alertsOverTimeData} type="line" />
          </div>
        </div>
        <div className="bg-neutral-800 p-4 rounded-lg">
          <h2 className="text-xl mb-2">Top Source IPs for Alerts</h2>
          <Graph data={topSourceIPsData} type="bar" />
        </div>
        <div className="bg-neutral-800 p-4 rounded-lg">
          <h2 className="text-xl mb-2">Alert Severity Levels</h2>
          <Graph data={alertSeverityData} type="pie" />
        </div>
        <div className="bg-neutral-800 p-4 rounded-lg">
          <h2 className="text-xl mb-2">Top Destination Ports for Alerts</h2>
          <Graph data={topDestPortsData} type="bar" />
        </div>
        <div className="bg-neutral-800 p-4 rounded-lg">
          <h2 className="text-xl mb-2">Alerts by Category</h2>
          <Graph data={alertsByCategoryData} type="bar" />
        </div>
      </div>
      <div className="bg-neutral-800 p-4 rounded-lg mt-4">
        <h2 className="text-xl mb-2">Summary Statistics</h2>
        <SummaryTable data={summaryData} />
      </div>
    </div>
  );
}
