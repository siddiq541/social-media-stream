"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import PublicRoute from "@/components/PublicRoute";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await login(credentials);
      toast.success("Logged in successfully");
      router.push("/");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicRoute>
      <main className="bg-slate-100 min-vh-100 d-flex align-items-center justify-content-center">
        <div className="container">
          <div
            className="mx-auto overflow-hidden shadow bg-light row rounded-4"
            style={{ maxWidth: "1100px" }}
          >
            <div className="p-5 col-md-6 text-dark">
              <h4 className="mb-4 text-primary fw-bold">Social Stream</h4>

              <h6 className="fw-bold">Log in to your account</h6>
              <p className="mb-4 text-secondary small">Welcome back</p>

              {error && <div className="py-2 alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3 ">
                  <label className="form-label small">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className=" form-control rounded-pill ring-1 ring-primary ring-opacity-50"
                    placeholder="email@example.com"
                    value={credentials.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label small">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control rounded-pill ring-1 ring-primary ring-opacity-50"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4 text-end">
                  <span className="text-primary small">Forgot Password?</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-100 rounded-3"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <p className="mt-4 text-center text-secondary small">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary text-decoration-none"
                >
                  Create Account
                </Link>
              </p>
            </div>

            <div className="p-5 text-white col-md-6 bg-primary d-none d-md-flex flex-column align-items-center justify-content-center">
              <div className="px-3 py-1 mb-3 bg-white text-dark rounded-pill small">
                💬 Connect
              </div>

              <div
                className="mb-4 overflow-hidden rounded-circle"
                style={{ width: "170px", height: "170px" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400"
                  alt="Friends"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>

              <h6 className="text-center fw-bold">Connect with friends</h6>
              <p className="text-center opacity-75 small">
                Share memories with friends and the world.
              </p>
            </div>
          </div>
        </div>
      </main>
    </PublicRoute>
  );
}
