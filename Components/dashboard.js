"use client";
import Image from "next/image";
import Graph from "@/Components/UI/Graph";
import SummaryTable from "@/Components/UI/SummaryTable";
import {
  eventTypesData,
  alertsByCategoryData,
  summaryData,
  eventsOverTimeData,
  logsData,
} from "@/utils/processdata";
import CountUp from "react-countup";

export function Dashboard() {
  return (
    <>
      <div className="flex-1">
        <header className="flex h-16 mx-2 mt-8 md:mt-0 items-center justify-center md:justify-between md:border-b md:rounded-none md:mx-0 rounded-lg px-6 bg-gray-900 md:dark:bg-gray-950">
          <div className="text-2xl font-semibold text-gray-800 dark:text-white">
            Security Dashboard
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
            <h1 className="text-3xl font-semibold mb-4">Summary Statistics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 bg-gray-900 p-3 rounded-xl">
              {summaryData.map((item) => (
                <div
                  key={item.metric}
                  className="bg-gray-950 p-4 rounded-lg text-center"
                >
                  <h2 className="text-xl mb-2">{item.metric}</h2>
                  {typeof item.value === "number" ? (
                    <CountUp
                      className="text-3xl font-semibold"
                      start={0}
                      end={item.value}
                      duration={2.5}
                    />
                  ) : (
                    <span className="text-3xl font-semibold">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="bg-gray-900 p-4 rounded-lg max-h-[630px]">
              <h2 className="text-xl mb-2">Event Types Distribution</h2>
              <Graph data={eventTypesData} type="pie" />
            </div>
            <div className="bg-gray-900 p-4 rounded-lg block md:hidden lg:block max-h-[630px]">
              <h2 className="text-xl mb-2">Alerts by Category</h2>
              <div className="flex h-full py-12">
                <Graph data={alertsByCategoryData} type="bar" />
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg hidden md:block lg:hidden  max-w-[500px] max-h-[500px]">
              <h2 className="text-xl mb-2">Alerts by Category</h2>
              <div className="flex h-full py-12">
                <Graph
                  data={alertsByCategoryData}
                  horizantal={true}
                  type="bar"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg my-4">
            <h2 className="text-xl mb-2">Events Over Time</h2>
            <div className="flex flex-col justify-center h-full pb-4">
              <Graph data={eventsOverTimeData} type="line" />
            </div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg mt-4">
            <h2 className="text-xl mb-2">Summary Statistics</h2>
            <h3 className="text-gray-400">Most Recent Logs</h3>
            <div className="flex">
              <table className="bg-gray-900 w-full text-white">
                <thead>
                  <tr>
                    <th className="py-2 text-left">Date</th>
                    <th className="py-2 text-left">Time</th>
                    <th className="py-2 text-left">Event</th>
                    <th className="py-2 text-left">Source IP</th>
                    <th className="py-2 text-left">Category</th>
                    <th className="py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {logsData.map((item, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="py-2">{item.date}</td>
                      <td className="py-2">{item.time}</td>
                      <td className="py-2">{item.event_type}</td>
                      <td className="py-2">{item.src_ip}</td>
                      <td className="py-2">{item.alert_category}</td>
                      <td className="py-2">{item.alert_action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
