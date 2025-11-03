import { useState } from "react";
import { IoIosEyeOff } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { toast } from "sonner";
import { useLogin } from "../_services/auth.service";

const SignIn = () => {
  const [password, setPassword] = useState("securepassword");
  const [email, setEmail] = useState("admin@example.com");
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: login, isPending } = useLogin();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  async function handleSubmit() {
    if (!email || !password) {
      toast.error("email and password are required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      console.log({ email, password });
      await login({ email, password });
    } catch {
      return;
    }
  }
  return (
    <main className="relative flex items-center justify-center min-h-screen bg-white">
      <div className="absolute top-0 left-0 w-full h-max bg-white z-30">
        <img
          src="/favicon.webp"
          alt="OTH Logo"
          className="mb-4 mt-2 ml-4 w-[50px] h-[50px] object-cover"
        />
      </div>
      <section className="w-[500px] p-8 ">
        <h1 className="text-[20px] text-center font-medium mb-6">
          Login to the Admin Panel
        </h1>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="text-[10px] text-[#262626]">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email address"
              className="w-full p-3 border text-[10px] placeholder:font-light border-gray-300 rounded-md outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-[10px] text-[#262626]">
              Password
            </label>
            <div className="relative">
              <div className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer">
                {showPassword ? (
                  <IoEyeOutline onClick={() => setShowPassword(false)} />
                ) : (
                  <IoIosEyeOff onClick={() => setShowPassword(true)} />
                )}
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="password"
                className="w-full p-3 border text-[10px] placeholder:font-light border-gray-300 rounded-md outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 mt-4 bg-[#6A0DAD] cursor-pointer text-white rounded-md shadow-[4px_4px_1px_#FF7F00]"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </div>
      </section>
    </main>
  );
};
export default SignIn;

// test admin credentials
// Email: admin@example.com
// Password: securepassword
