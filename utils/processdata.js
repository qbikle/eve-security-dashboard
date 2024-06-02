import data from "@/public/eve.json";

export const eventTypesData = {
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
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
    },
  ],
};

export const alertSeverityData = {
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

const allDestPortsData = {
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

export const topDestPortsData = {
  labels: Object.keys(allDestPortsData.datasets[0].data)
    .filter((port) => allDestPortsData.datasets[0].data[port] > 0)
    .sort(
      (a, b) =>
        allDestPortsData.datasets[0].data[b] -
        allDestPortsData.datasets[0].data[a]
    )
    .slice(0, 10),
  datasets: [
    {
      label: "Alert Count",
      data: Object.values(allDestPortsData.datasets[0].data)
        .filter((port) => port > 0)
        .sort((a, b) => b - a)
        .slice(0, 10),
      backgroundColor: "#FF6384",
    },
  ],
};

const colors = [
  "#FF6384", // Red
  "#36A2EB", // Blue
  "#FFCE56", // Yellow
  "#4BC0C0", // Green
  "#9966FF", // Purple
  "#FF9F40", // Orange
];

const processAlertsByCategoryData = (data) => {
  // Get unique categories
  const categories = [
    ...new Set(
      data
        .filter((event) => event.event_type === "alert")
        .map((event) => event.alert.category)
    ),
  ];

  // Map categories to colors
  const categoryColors = categories.map(
    (_, index) => colors[index % colors.length]
  );

  // Calculate data counts per category
  const categoryCounts = data
    .filter((event) => event.event_type === "alert")
    .reduce((acc, event) => {
      const category = event.alert.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

  // Create the dataset with colors
  const datasets = [
    {
      label: "Alerts by Category",
      data: categories.map((category) => categoryCounts[category] || 0),
      backgroundColor: categoryColors,
    },
  ];

  return {
    labels: categories,
    datasets: datasets,
  };
};

export const alertsByCategoryData = processAlertsByCategoryData(data);

export const alertsOverTimeData = {
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

const processData = (data) => {
  // Get unique event types
  const eventTypes = [...new Set(data.map((event) => event.event_type))];

  // Get unique time labels for the x-axis
  const labels = [
    ...new Set(
      data
        .filter((event) => event.timestamp.startsWith("2019-01-02"))
        .map((event) => event.timestamp.slice(11, 16))
    ),
  ].sort();

  // Generate datasets for each event type
  const datasets = eventTypes.map((eventType, index) => {
    const eventData = data
      .filter(
        (event) =>
          event.event_type === eventType &&
          event.timestamp.startsWith("2019-01-02")
      )
      .reduce((acc, event) => {
        const time = event.timestamp.slice(11, 16);
        acc[time] = (acc[time] || 0) + 1;
        return acc;
      }, {});

    // Create the dataset for the current event type
    return {
      label: eventType,
      data: labels.map((label) => eventData[label] || 0),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
    };
  });

  return { labels, datasets };
};

export const eventsOverTimeData = processData(data);

export const topSourceIPsData = {
  labels: [],
  datasets: [
    {
      label: "Alert Count",
      data: [],
      backgroundColor: "#c6ce6b",
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

const top20IPs = sortedIPs.slice(0, 20);

topSourceIPsData.labels = top20IPs;
topSourceIPsData.datasets[0].data = top20IPs.map((ip) => ipCounts[ip]);

export const summaryAlertsData = [
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

export const summaryData = [
  {
    metric: "Total Events",
    value: data.length,
  },
  {
    metric: " Total Unique Source IPs",
    value: new Set(data.map((event) => event.src_ip)).size,
  },
  {
    metric: "Total Unique Source Ports",
    value: new Set(data.map((event) => event.src_port)).size,
  },
  {
    metric: "Most Recent Event",
    value: new Date(
      Math.max(...data.map((event) => new Date(event.timestamp).getTime()))
    ).toLocaleString(),
  },
];

const mostRecentLogs = data
  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  .slice(0, 10);

const processLogs = (data) => {
  return data.map((log) => {
    return {
      date: log.timestamp.slice(0, 10),
      time: log.timestamp.slice(11, 19),
      event_type: log.event_type,
      src_ip: log.src_ip,
      alert_category: log.alert ? log.alert.category : "N/A",
      alert_action: log.alert ? log.alert.action : "N/A",
    };
  });
};

export const logsData = processLogs(mostRecentLogs);

const sortedProcessAlertsBySeverity = (data) => {
  return data
    .filter((event) => event.event_type === "alert")
    .sort((a, b) => b.alert.severity - a.alert.severity)
    .map((event) => {
      return {
        date: event.timestamp.slice(0, 10),
        time: event.timestamp.slice(11, 19),
        flow_id: event.flow_id,
        event_type: event.event_type,
        src_ip: event.src_ip,
        src_port: event.src_port,
        dest_ip: event.dest_ip,
        dest_port: event.dest_port,
        proto: event.proto,
        alert_action: event.alert ? event.alert.action : "N/A",
        signature: event.alert ? event.alert.signature : "N/A",
        category: event.alert ? event.alert.category : "N/A",
        severity: event.alert ? event.alert.severity : "N/A",
      };
    });
};
export const alertsData = sortedProcessAlertsBySeverity(data);

export const topSourcePortsData = {
  labels: [],
  datasets: [
    {
      label: "Alert Count",
      data: [],
      backgroundColor: "#9966ff",
    },
  ],
};

const portCounts = data
  .filter((event) => event.event_type === "alert")
  .reduce((acc, event) => {
    const port = event.src_port;
    acc[port] = (acc[port] || 0) + 1;
    return acc;
  }, {});

const sortedPorts = Object.keys(portCounts).sort(
  (a, b) => portCounts[b] - portCounts[a]
);

const top20Ports = sortedPorts.slice(0, 10);

topSourcePortsData.labels = top20Ports;
topSourcePortsData.datasets[0].data = top20Ports.map(
  (port) => portCounts[port]
);
