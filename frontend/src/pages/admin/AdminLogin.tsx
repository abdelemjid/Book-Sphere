import { useForm } from "react-hook-form";
import { LoginFormValues } from "../../types/Types";
import { Link } from "react-router";
import * as apiClient from "../../apiClient";
import { useAuth } from "../../contexts/AuthProvider";

const AdminLoginPage = () => {
  const { login } = useAuth();
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = async (values: LoginFormValues) => {
    const response = await apiClient.loginAdmin(values);
    const result = await response.json();
    if (!response.ok) {
      console.log(result.message);
      return;
    }

    console.log(result.message);
    login(true);
  };

  return (
    <div className="w-full h-[calc(100vh-136px)] container">
      <div className="h-full flex flex-col items-center justify-center">
        <div className="min-w-[400px] px-10 py-6 rounded-md bg-light-200/50 text-dark-100 dark:text-primary-100 dark:bg-dark-400">
          <h1 className="text-xl font-semibold my-5">Admin Login</h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="w-full flex flex-col gap-1">
              <input
                className="w-full py-1 px-3 rounded-md border-2 placeholder:text-secondary-400 border-transparent focus:border-secondary-100 outline-none bg-light-300 dark:bg-light-400/20 focus:bg-light-200/20"
                type="email"
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email address is required",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <span className="place-self-end text-xs font-semibold text-red-500">
                {errors?.email?.message}
              </span>
            </div>
            {/* Password Input */}
            <div className="w-full flex flex-col gap-1">
              <input
                className="w-full py-1 px-3 rounded-md border-2 placeholder:text-secondary-400 border-transparent focus:border-secondary-100 outline-none bg-light-300 dark:bg-light-400/20 focus:bg-light-200/20"
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  validate: (value: string) => {
                    return value.length >= 8 || "Password must contains 8 characters or more";
                  },
                })}
              />
              <span className="place-self-end text-xs font-semibold text-red-500">
                {errors?.password?.message}
              </span>
            </div>
            {/* Login Button */}
            <button className="w-full py-1 rounded-md bg-third-100" type="submit">
              Login
            </button>
          </form>
          {/* Registeration Link */}
          <p className="text-sm mt-5">
            You don't have account?{" "}
            <Link to="/admin/register" className="text-third-100">
              Create Admin Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
