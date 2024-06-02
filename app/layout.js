import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eve Security",
  description:
    "Eve Security is a network security tool that helps you detect threats and respond to incidents.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>{children}</div>
      </body>
    </html>
  );
}
