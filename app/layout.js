import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";

export const metadata = {
  title: "Social Stream",
  description:
    "A front-end social media stream built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <div className="w-full px-4 bg-white md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <NavBar />
        </div>
        <div className="px-4 bg-slate-100 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          {children}
        </div>
      </body>
    </html>
  );
}
