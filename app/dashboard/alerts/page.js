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

export default function Page() {
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
            <AlertsTable data={alertsData} />
          </div>
        </div>
      </main>
    </>
  );
}
