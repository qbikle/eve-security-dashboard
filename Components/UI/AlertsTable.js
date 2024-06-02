import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function AlertsTable({ data: alertsData }) {
  const [sortColumn, setSortColumn] = useState("severity");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(alertsData);

  const handleSort = (column) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = alertsData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(term)
      )
    );
    setFilteredData(filtered);
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  const getSortIcon = (column) => {
    if (sortColumn === column) {
      if (sortDirection === "asc") {
        return <i className="fas fa-sort-up"></i>;
      } else {
        return <i className="fas fa-sort-down"></i>;
      }
    }
    return <i className="fas fa-sort"></i>;
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
        className="m-4 p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div className="max-w-[76vw] max-h-[60vh] overflow-y-auto overflow-x-auto border-t">
        <table className="bg-gray-900 w-full text-white">
          <thead>
            <tr>
              <th
                className="py-2 text-left px-4 cursor-pointer"
                onClick={() => handleSort("severity")}
              >
                Severity {getSortIcon("severity")}
              </th>
              <th
                className="py-2 text-left px-4 cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Date {getSortIcon("date")}
              </th>
              <th
                className="py-2 text-left px-4 cursor-pointer"
                onClick={() => handleSort("time")}
              >
                Time {getSortIcon("time")}
              </th>
              <th
                className="py-2 text-left px-4 cursor-pointer"
                onClick={() => handleSort("flow_id")}
              >
                Flow ID {getSortIcon("flow_id")}
              </th>
              <th
                className="py-2 text-left px-4 cursor-pointer"
                onClick={() => handleSort("event_type")}
              >
                Event Type {getSortIcon("event_type")}
              </th>
              <th
                className="py-2 text-left px-4 cursor-pointer"
                onClick={() => handleSort("src_ip")}
              >
                Source IP {getSortIcon("src_ip")}
              </th>
              <th
                className="py-2 text-left px-4 cursor-pointer"
                onClick={() => handleSort("src_port")}
              >
                Source Port {getSortIcon("src_port")}
              </th>
              <th
                className="py-2 text-left px-4 cursor-pointer"
                onClick={() => handleSort("dest_ip")}
              >
                Destination IP {getSortIcon("dest_ip")}
              </th>
              <th
                className="py-2 text-left px-4 cursor-pointer"
                onClick={() => handleSort("dest_port")}
              >
                Destination Port {getSortIcon("dest_port")}
              </th>
              <th
                className="py-2 text-left px-4 cursor-pointer"
                onClick={() => handleSort("proto")}
              >
                Protocol {getSortIcon("proto")}
              </th>
              <th
                className="py-2 text-left px-4 cursor-pointer"
                onClick={() => handleSort("alert_action")}
              >
                Alert Action {getSortIcon("alert_action")}
              </th>
              <th
                className="py-2 text-left px-4 cursor-pointer"
                onClick={() => handleSort("signature")}
              >
                Signature {getSortIcon("signature")}
              </th>
              <th
                className="py-2 text-left px-4 cursor-pointer"
                onClick={() => handleSort("category")}
              >
                Category {getSortIcon("category")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="py-2 px-4">{item.severity}</td>
                <td className="py-2 px-4">{item.date}</td>
                <td className="py-2 px-4">{item.time}</td>
                <td className="py-2 px-4">{item.flow_id}</td>
                <td className="py-2 px-4">{item.event_type}</td>
                <td className="py-2 px-4">{item.src_ip}</td>
                <td className="py-2 px-4">{item.src_port}</td>
                <td className="py-2 px-4">{item.dest_ip}</td>
                <td className="py-2 px-4">{item.dest_port}</td>
                <td className="py-2 px-4">{item.proto}</td>
                <td className="py-2 px-4">{item.alert_action}</td>
                <td className="py-2 px-4">{item.signature}</td>
                <td className="py-2 px-4">{item.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
