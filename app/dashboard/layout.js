import Navbar from "@/Components/navbar";
import Image from "next/image";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <div>
        <Navbar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
