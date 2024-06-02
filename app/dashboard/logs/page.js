"use client";
import { logsTableData } from "@/utils/processdata";
import Image from "next/image";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Modal from "react-modal";

Modal.setAppElement("#__next");

export default function Page() {
  const [sortColumn, setSortColumn] = useState("severity");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(logsTableData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSort = (column) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = logsTableData.filter((item) =>
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

  const handleRowClick = (event) => {
    setSelectedEvent(event.fullEvent);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="flex-1">
        <header className="flex h-16 mx-2 mt-8 md:mt-0 items-center justify-center md:justify-between md:border-b md:rounded-none md:mx-0 rounded-lg px-6 bg-gray-900 md:dark:bg-gray-950">
          <div className="text-2xl font-semibold text-gray-800 dark:text-white">
            Logs
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
          <div className="bg-gray-900 p-4 rounded-lg mt-4">
            <div className="flex justify-center text-center text-3xl">
              Recorded Logs
            </div>
            {/* <LogTable data={logsTableData} /> */}
            <div className="flex flex-col">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search..."
                className="m-4 p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="max-w-[76vw] max-h-[70vh] overflow-y-auto overflow-x-auto border-t">
                <table className="bg-gray-900 w-full text-white">
                  <thead>
                    <tr>
                      <th className="py-2 text-left px-4">Sr. No.</th>
                      <th
                        className="py-2 text-left px-4 cursor-pointer"
                        onClick={() => handleSort("flow_id")}
                      >
                        Flow ID {getSortIcon("flow_id")}
                      </th>
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
                        onClick={() => handleSort("dest_ip")}
                      >
                        Destination IP {getSortIcon("dest_ip")}
                      </th>
                      <th
                        className="py-2 text-left px-4 cursor-pointer"
                        onClick={() => handleSort("alert_action")}
                      >
                        Alert Action {getSortIcon("alert_action")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-700 cursor-pointer"
                        onClick={() => handleRowClick(item)}
                      >
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{item.flow_id}</td>
                        <td className="py-2 px-4">{item.severity}</td>
                        <td className="py-2 px-4">{item.date}</td>
                        <td className="py-2 px-4">{item.time}</td>
                        <td className="py-2 px-4">{item.event_type}</td>
                        <td className="py-2 px-4">{item.src_ip}</td>
                        <td className="py-2 px-4">{item.dest_ip}</td>
                        <td className="py-2 px-4">{item.alert_action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Event Details"
                className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg w-[90vw] md:w-[70vw] h-[80vh] md:h-[70vh] mx-auto mt-10 text-white shadow-lg overflow-auto"
                overlayClassName="bg-gray-900 bg-opacity-75 fixed inset-0 flex justify-center items-center"
              >
                {selectedEvent && (
                  <div className="flex flex-col justify-center items-center h-full">
                    <h2 className="text-xl md:text-3xl mb-4 md:mb-6 font-bold">
                      Event Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 w-full max-w-4xl">
                      <div className="flex justify-start gap-2">
                        <p className="col-span-2">
                          <strong className="font-semibold">Date</strong>{" "}
                          {selectedEvent.timestamp.split("T")[0]}
                        </p>
                        <p className="col-span-2">
                          <strong className="font-semibold">Time</strong>{" "}
                          {selectedEvent.timestamp.split("T")[1].split(".")[0]}
                        </p>
                      </div>

                      <p>
                        <strong className="font-semibold">Flow ID:</strong>{" "}
                        {selectedEvent.flow_id}
                      </p>
                      {selectedEvent.in_iface && (
                        <p>
                          <strong className="font-semibold">Interface:</strong>{" "}
                          {selectedEvent.in_iface}
                        </p>
                      )}
                      <p>
                        <strong className="font-semibold">Event Type:</strong>{" "}
                        {selectedEvent.event_type}
                      </p>
                      <p>
                        <strong className="font-semibold">Source IP:</strong>{" "}
                        {selectedEvent.src_ip}
                      </p>
                      <p>
                        <strong className="font-semibold">Source Port:</strong>{" "}
                        {selectedEvent.src_port}
                      </p>
                      <p>
                        <strong className="font-semibold">
                          Destination IP:
                        </strong>{" "}
                        {selectedEvent.dest_ip}
                      </p>
                      <p>
                        <strong className="font-semibold">
                          Destination Port:
                        </strong>{" "}
                        {selectedEvent.dest_port}
                      </p>
                      <p>
                        <strong className="font-semibold">Protocol:</strong>{" "}
                        {selectedEvent.proto}
                      </p>
                      {selectedEvent.event_type === "alert" &&
                        selectedEvent.alert && (
                          <>
                            <p className="col-span-2">
                              <strong className="font-semibold">
                                Alert Action:
                              </strong>{" "}
                              {selectedEvent.alert.action}
                            </p>
                            <p>
                              <strong className="font-semibold">
                                Signature:
                              </strong>{" "}
                              {selectedEvent.alert.signature}
                            </p>
                            <p>
                              <strong className="font-semibold">
                                Category:
                              </strong>{" "}
                              {selectedEvent.alert.category}
                            </p>
                            <p>
                              <strong className="font-semibold">
                                Severity:
                              </strong>{" "}
                              {selectedEvent.alert.severity}
                            </p>
                          </>
                        )}
                      {selectedEvent.event_type === "http" &&
                        selectedEvent.http && (
                          <>
                            <p className="col-span-2">
                              <strong className="font-semibold">
                                Hostname:
                              </strong>{" "}
                              {selectedEvent.http.hostname}
                            </p>
                            <p className="col-span-2">
                              <strong className="font-semibold">URL:</strong>{" "}
                              {selectedEvent.http.url}
                            </p>
                            <p className="col-span-2">
                              <strong className="font-semibold">
                                User Agent:
                              </strong>{" "}
                              {selectedEvent.http.http_user_agent}
                            </p>
                            <p>
                              <strong className="font-semibold">
                                Content Type:
                              </strong>{" "}
                              {selectedEvent.http.http_content_type}
                            </p>
                            <p>
                              <strong className="font-semibold">Method:</strong>{" "}
                              {selectedEvent.http.http_method}
                            </p>
                            <p>
                              <strong className="font-semibold">
                                Protocol:
                              </strong>{" "}
                              {selectedEvent.http.protocol}
                            </p>
                            <p>
                              <strong className="font-semibold">Status:</strong>{" "}
                              {selectedEvent.http.status}
                            </p>
                            <p>
                              <strong className="font-semibold">Length:</strong>{" "}
                              {selectedEvent.http.length}
                            </p>
                          </>
                        )}
                      {selectedEvent.event_type === "ssh" &&
                        selectedEvent.ssh && (
                          <>
                            <p>
                              <strong className="font-semibold">
                                Client Protocol Version:
                              </strong>{" "}
                              {selectedEvent.ssh.client.proto_version}
                            </p>
                            <p>
                              <strong className="font-semibold">
                                Client Software Version:
                              </strong>{" "}
                              {selectedEvent.ssh.client.software_version}
                            </p>
                            <p>
                              <strong className="font-semibold">
                                Server Protocol Version:
                              </strong>{" "}
                              {selectedEvent.ssh.server.proto_version}
                            </p>
                            <p>
                              <strong className="font-semibold">
                                Server Software Version:
                              </strong>{" "}
                              {selectedEvent.ssh.server.software_version}
                            </p>
                          </>
                        )}
                      {selectedEvent.event_type === "fileinfo" &&
                        selectedEvent.fileinfo && (
                          <>
                            <p className="col-span-2">
                              <strong className="font-semibold">
                                Filename:
                              </strong>{" "}
                              {selectedEvent.fileinfo.filename}
                            </p>
                            <p>
                              <strong className="font-semibold">State:</strong>{" "}
                              {selectedEvent.fileinfo.state}
                            </p>
                            <p>
                              <strong className="font-semibold">Stored:</strong>{" "}
                              {selectedEvent.fileinfo.stored ? "Yes" : "No"}
                            </p>
                            <p>
                              <strong className="font-semibold">Size:</strong>{" "}
                              {selectedEvent.fileinfo.size}
                            </p>
                          </>
                        )}
                      {selectedEvent.event_type === "dns" &&
                        selectedEvent.dns && (
                          <>
                            <p>
                              <strong className="font-semibold">
                                DNS Type:
                              </strong>{" "}
                              {selectedEvent.dns.type}
                            </p>
                            <p>
                              <strong className="font-semibold">ID:</strong>{" "}
                              {selectedEvent.dns.id}
                            </p>
                            <p>
                              <strong className="font-semibold">
                                RR Name:
                              </strong>{" "}
                              {selectedEvent.dns.rrname}
                            </p>
                            <p>
                              <strong className="font-semibold">
                                RR Type:
                              </strong>{" "}
                              {selectedEvent.dns.rrtype}
                            </p>
                          </>
                        )}
                    </div>

                    <button
                      onClick={closeModal}
                      className="mt-6 bg-blue-500 hover:bg-blue-600 transition p-2 rounded"
                    >
                      Close
                    </button>
                  </div>
                )}
              </Modal>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
