import Navbar from "@/Components/navbar";

export default function Layout({ children }) {
  return (
    <div id="__next" className="flex flex-col md:flex-row min-h-screen w-full">
      <div>
        <Navbar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
