import { useForm, Controller } from "react-hook-form";
import { AdminRegisterFormValues } from "../../../frontend/src/types/Types";
import * as apiClient from "../../../frontend/src/apiClient";
import { useAuth } from "../../../frontend/src/contexts/AuthProvider";
import { Link } from "react-router";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./phone-number.css";

const RegisterPage = () => {
  const { login } = useAuth();

  const form = useForm<AdminRegisterFormValues>({
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    mode: "onChange",
  });

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = form;

  const onSubmit = async (values: AdminRegisterFormValues) => {
    try {
      const response = await apiClient.registerAdmin(values);
      const result = await response.json();
      if (!response.ok) {
        //
        console.log(result.message);
        return;
      }

      login(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-136px)] container">
      <div className="h-full flex flex-col items-center justify-center">
        <div className="min-w-[400px] px-10 py-6 rounded-md bg-light-200/50 text-dark-100 dark:text-primary-100 dark:bg-dark-400">
          <h1 className="text-xl font-semibold my-5">Sign Up as Seller</h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            {/* Username Input */}
            <div className="w-full flex flex-col gap-1">
              <input
                className="w-full py-1 px-3 rounded-md border-2 placeholder:text-dark-400 dark:placeholder:text-primary-400 border-transparent focus:border-secondary-100 outline-none bg-light-300 dark:bg-light-400/20 focus:bg-light-200/20"
                type="text"
                id="username"
                placeholder="Username"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is required",
                  },
                  validate: (value) => {
                    return value.trim().length >= 3 || "Enter a valide name";
                  },
                })}
              />
              <span className="place-self-end text-sm font-semibold text-red-500">
                {errors?.username?.message}
              </span>
            </div>
            {/* Email Input */}
            <div className="w-full flex flex-col gap-1">
              <input
                className="w-full py-1 px-3 rounded-md border-2 placeholder:text-dark-400 dark:placeholder:text-primary-400 border-transparent focus:border-secondary-100 outline-none bg-light-300 dark:bg-light-400/20 focus:bg-light-200/20"
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
              <span className="place-self-end text-sm font-semibold text-red-500">
                {errors?.email?.message}
              </span>
            </div>
            {/* Phone Number Input */}
            <div className="w-full flex flex-col gap-1 bg-transparent text-black">
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                rules={{ required: "Phone number is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <PhoneInput
                      containerClass="number-container"
                      inputClass="number-input"
                      buttonClass="number-button"
                      {...field}
                      country={"us"} // Default country
                      onChange={(value) => field.onChange(value)}
                      placeholder="Phone number"
                    />
                    {error && (
                      <span className="place-self-end text-sm font-semibold text-red-500">
                        {error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            {/* Password Input */}
            <div className="w-full flex flex-col gap-1">
              <input
                className="w-full py-1 px-3 rounded-md border-2 placeholder:text-dark-400 dark:placeholder:text-primary-400 border-transparent focus:border-secondary-100 outline-none bg-light-300 dark:bg-light-400/20 focus:bg-light-200/20"
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
              <span className="place-self-end text-sm font-semibold text-red-500">
                {errors?.password?.message}
              </span>
            </div>
            {/* Login Button */}
            <button className="w-full py-1 rounded-md bg-third-100 text-black" type="submit">
              Sign Up
            </button>
          </form>
          {/* Registeration Link */}
          <p className="text-sm mt-5">
            You already have an account?{" "}
            <Link to="/login" className="text-third-100">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
