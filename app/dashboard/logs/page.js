import LogTable from "@/Components/UI/LogsTable";
import { logsTableData } from "@/utils/processdata";
import Image from "next/image";

export default function Page() {
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
            <LogTable data={logsTableData} />
          </div>
        </div>
      </main>
    </>
  );
}
