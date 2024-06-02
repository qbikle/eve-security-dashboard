"use client";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const currentRoute = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div id="__next" className="flex flex-col md:flex-row min-h-screen w-full">
      <div>
        <div className="flex flex-col md:h-full md:justify-start justify-center w-full md:w-64 md:border-r bg-gray-300 dark:bg-gray-950 lg:block border-b">
          <div className="flex h-16 items-center justify-between border-b-2 md:border-b px-6">
            <Link href="/">
              <div className="text-lg font-semibold text-white">
                Eve Security
              </div>
            </Link>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`${
                  isMenuOpen ? "bg-gray-700" : "bg-gray-900"
                } rounded-full p-2`}
                aria-label="Toggle menu"
              >
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
          <nav
            className={`md:mt-6 transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "max-h-screen"
                : "max-h-0 overflow-hidden md:max-h-screen"
            }`}
          >
            <div className="space-y-1 px-3">
              <NavLink
                href="/dashboard"
                text="Overview"
                icon={<HomeIcon />}
                className={
                  currentRoute === "/dashboard"
                    ? "bg-gray-800 md:bg-gray-800"
                    : "bg-gray-900 md:bg-gray-950"
                }
              />
              <NavLink
                href="/dashboard/logs"
                text="Logs"
                icon={<FileTextIcon />}
                className={
                  currentRoute === "/dashboard/logs"
                    ? "bg-gray-800 md:bg-gray-800"
                    : "bg-gray-900 md:bg-gray-950"
                }
              />
              <NavLink
                href="/dashboard/alerts"
                text="Alerts"
                icon={<BellIcon />}
                className={
                  currentRoute === "/dashboard/alerts"
                    ? "bg-gray-800 md:bg-gray-800"
                    : "bg-gray-900 md:bg-gray-950"
                }
              />
              <NavLink
                href="#"
                text="Settings"
                icon={<SettingsIcon />}
                className={
                  currentRoute === "/settings"
                    ? "bg-gray-800 md:bg-gray-800"
                    : "bg-gray-900 md:bg-gray-950"
                }
              />
            </div>
          </nav>
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

function NavLink({ href, text, icon, className }) {
  return (
    <Link href={href}>
      <div
        className={`flex my-4 justify-center md:justify-start items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800 text-gray-950 md:hover:bg-gray-700 dark:text-gray-200 md:dark:hover:bg-gray-800 dark:hover:text-gray-50 ${className}`}
      >
        {icon}
        <span className="ml-2">{text}</span>
      </div>
    </Link>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function FileTextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
