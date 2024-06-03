import Link from "next/link";

export default function SpotlightPreview() {
  return (
    <div className="flex w-full justify-center py-52">
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Eve <br /> is made for you.
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Analyse your network traffic, detect threats and respond to incidents
          with Eve Security.
        </p>
        <div className="flex justify-center">
          <Link href="/dashboard">
            <button className="mt-8 px-6 py-3 bg-gradient-to-r from-neutral-50 to-neutral-400 text-neutral-900 rounded-md font-semibold text-lg hover:from-neutral-100 hover:to-neutral-300 hover:text-neutral-900 transition-all duration-300 ease-in-out">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
