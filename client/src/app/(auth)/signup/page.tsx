"use client";
import { GlowEffect } from "@/components/ui/glow-effect";
import { useAuth } from "@/store/useAuthStore";
import { ISignUpForm } from "@/types/types";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageCircleIcon,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<ISignUpForm>({
    name: "",
    email: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-base-100 text-base-content">
      {/* Card Wrapper */}
      <div className="relative flex items-center justify-center w-full max-w-6xl h-144 md:h-160 ">
        <GlowEffect duration={10} mode="colorShift" className="z-20" />

        {/* Card Content */}
        <div className="z-30 flex flex-col w-full h-full rounded-2xl bg-base-200 md:flex-row">
          {/* Left Column: Form */}
          <div className="flex items-center justify-center p-8 md:w-1/2 md:border-r border-base-300">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="mb-8 text-center">
                <MessageCircleIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h2 className="mb-2 text-2xl font-bold">Create Account</h2>
                <p className="text-base-content/60">
                  Sign up for a new account
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="font-medium label-text">Full Name</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                      <User className="w-5 h-5 text-base-content/40" />
                    </div>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full pl-10 input input-bordered border-base-300 focus:border-primary"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="font-medium label-text">Email</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                      <Mail className="w-5 h-5 text-base-content/40" />
                    </div>
                    <input
                      type="email"
                      placeholder="johndoe@gmail.com"
                      className="w-full pl-10 input input-bordered border-base-300 focus:border-primary"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="font-medium label-text">Password</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                      <Lock className="w-5 h-5 text-base-content/40" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 input input-bordered border-base-300 focus:border-primary"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 z-10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-base-content/40" />
                      ) : (
                        <Eye className="w-5 h-5 text-base-content/40" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full btn btn-primary"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center text-sm">
                <Link
                  href="/login"
                  className="font-semibold px-4 py-2 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors text-base-content/80 hover:text-primary hover:underline"
                >
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Image with Grid Background */}
          <div
            className="relative hidden w-full h-full md:flex md:w-1/2 rounded-r-2xl overflow-hidden bg-base-300/30"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          >
            <Image
              src="/signup-page.png"
              alt="Animation"
              fill
              className="object-cover "
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
