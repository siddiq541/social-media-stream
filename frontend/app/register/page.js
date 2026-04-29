"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import PublicRoute from "@/components/PublicRoute";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [registerData, setRegisterData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await register(registerData);
      toast.success("Account created successfully");
      router.push("/login");
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";

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
            className="mx-auto overflow-hidden bg-white shadow row rounded-4"
            style={{ maxWidth: "1100px" }}
          >
            <div className="p-5 col-md-6 text-dark">
              <h4 className="mb-4 text-primary fw-bold">Social Stream</h4>

              <h6 className="fw-bold">Create your account</h6>
              <p className="mb-4 text-secondary small">Join us today</p>

              {error && <div className="py-2 alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control rounded-pill ring-1 ring-primary ring-opacity-50"
                    placeholder="Your name"
                    value={registerData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control rounded-pill ring-1 ring-primary ring-opacity-50"
                    placeholder="Username"
                    value={registerData.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control rounded-pill ring-1 ring-primary ring-opacity-50"
                    placeholder="email@example.com"
                    value={registerData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control rounded-pill ring-1 ring-primary ring-opacity-50"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-100 rounded-3"
                >
                  {loading ? "Creating account..." : "Register"}
                </button>
              </form>

              <p className="mt-4 text-center text-secondary small">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary text-decoration-none"
                >
                  Login
                </Link>
              </p>
            </div>

            <div className="p-5 text-white col-md-6 bg-primary d-none d-md-flex flex-column align-items-center justify-content-center">
              <div className="px-3 py-1 mb-3 bg-white text-dark rounded-pill small">
                🚀 Join
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

              <h6 className="text-center fw-bold">
                Start sharing your moments
              </h6>
              <p className="text-center opacity-75 small">
                Create posts, connect, and engage with others.
              </p>
            </div>
          </div>
        </div>
      </main>
    </PublicRoute>
  );
}
