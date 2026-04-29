import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import NavBar from "@/components/NavBar/NavBar";
import { Toaster } from "sonner";
import { PostsProvider } from "@/context/PostsContext";

export const metadata = {
  title: "Social Stream",
  description:
    "A front-end social media stream built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100">
        <AuthProvider>
          <PostsProvider>
            <div className="w-full pl-4 bg-white md:px-8 lg:px-16 xl:px-32 2xl:px-64">
              <NavBar />
            </div>
            <Toaster richColors position="top-right" />
            <div className="pl-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
              {children}
            </div>
          </PostsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
