"use client";
import Image from "next/image";
import Graph from "@/Components/UI/Graph";
import CountUp from "react-countup";
import {
  summaryAlertsData,
  topSourceIPsData,
  alertSeverityData,
  topDestPortsData,
  alertsData,
  topSourcePortsData,
} from "@/utils/processdata";
import AlertsTable from "@/Components/UI/AlertsTable";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Page() {
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
    <>
      <div className="flex-1">
        <header className="flex h-16 mx-2 mt-8 md:mt-0 items-center justify-center md:justify-between md:border-b md:rounded-none md:mx-0 rounded-lg px-6 bg-gray-900 md:dark:bg-gray-950">
          <div className="text-2xl font-semibold text-gray-800 dark:text-white">
            Alerts
          </div>
          <div className="flex items-center space-x-4">
            <button className="rounded-full" size="icon" variant="ghost">
              <Image
                alt="Avatar"
                className="rounded-full bg-white hidden md:block"
                height="32"
                src="/next.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <span className="sr-only">User menu</span>
            </button>
          </div>
        </header>
      </div>
      <main className="p-6">
        <div className="p-4 bg-gray-950 min-h-screen text-white">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 bg-gray-900 p-3 rounded-xl">
              {summaryAlertsData.map((item) => (
                <div
                  key={item.metric}
                  className="bg-gray-950 p-4 rounded-lg text-center"
                >
                  <h2 className="text-xl mb-2">{item.metric}</h2>
                  <CountUp
                    className="text-3xl font-semibold"
                    start={0}
                    end={item.value}
                    duration={2.5}
                  ></CountUp>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="bg-gray-900 p-4 rounded-lg block md:hidden lg:block max-h-[630px]">
              <h2 className="text-xl mb-2">
                Top Source IP Addreses for Alerts
              </h2>
              <div className="flex h-full py-12">
                <Graph data={topSourceIPsData} type="bar" />
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg hidden md:block lg:hidden  max-w-[500px] max-h-[500px]">
              <h2 className="text-xl mb-2">
                Top Source IP Addreses for Alerts
              </h2>
              <div className="flex h-full py-12">
                <Graph data={topSourceIPsData} horizantal={true} type="bar" />
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <h2 className="text-xl mb-2">Alert Severity Levels</h2>
              <Graph data={alertSeverityData} type="pie" />
            </div>
            <div className="bg-gray-900 p-4 rounded-lg block md:hidden lg:block max-h-[630px]">
              <h2 className="text-xl mb-2">Top Destination Ports for Alerts</h2>
              <div className="flex h-full py-12">
                <Graph data={topDestPortsData} type="bar" />
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg hidden md:block lg:hidden  max-w-[500px] max-h-[500px]">
              <h2 className="text-xl mb-2">Top Destination Ports for Alerts</h2>
              <div className="flex h-full py-12">
                <Graph data={topDestPortsData} horizantal={true} type="bar" />
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg block md:hidden lg:block max-h-[630px]">
              <h2 className="text-xl mb-2">Top Destination IPs for Alerts</h2>
              <div className="flex h-full py-12">
                <Graph data={topSourcePortsData} type="bar" />
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg hidden md:block lg:hidden  max-w-[500px] max-h-[500px]">
              <h2 className="text-xl mb-2">Top Destination IPs for Alerts</h2>
              <div className="flex h-full py-12">
                <Graph data={topSourcePortsData} horizantal={true} type="bar" />
              </div>
            </div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg mt-4">
            <h2 className="text-3xl mb-2">Summary Statistics</h2>
            <h3 className="text-gray-400 text-lg">Alert Logs</h3>
            {/* <AlertsTable data={alertsData} /> */}
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
          </div>
        </div>
      </main>
    </>
  );
}
