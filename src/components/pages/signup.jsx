import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { FcGoogle } from "react-icons/fc";
import FormFooter from "./feature_modules/formfooter";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  // const watchPassword = watch("password");
  // const watchConfirmPassword = watch("confirmPassword");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" flex justify-between shadow-xl overflow-hidden w-full lg:w-[80%]">
        <div className="flex flex-col items-center p-2">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Join Deborah's App
            </h1>
            <p className="mt-2 text-gray-600">
              Signup to enjoy the best of Deborah's App
            </p>
          </div>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className=" block text-md font-medium mb-2">
                {" "}
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                {...register("name", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div>
              <label className=" block text-md font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div>
              <label className="block text-md font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <div>
              <label className="block text-md font-medium mb-2">
                {" "}
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}

              {/* {errors.password && <span>{errors.password.message}</span>} */}
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent 
              rounded-md shadow-sm text-md font-medium text-white bg-blue-600 hover:bg-purple-500
              "
            >
              Signup
            </button>
          </form>
          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white">Or</span>
              </div>
            </div>
            <div className="mt-6">
              <button
                className="w-full flex items-center justify-center gap-2
               py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium 
               text-gray-700 bg-white hover:bg-blue-50"
              >
                <FcGoogle className="h-5 w-5" />
                Signup with Google
              </button>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              Already have a user?{" "}
              <NavLink
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Login
              </NavLink>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <img
            src="/images/login_img.jpg"
            alt="Login illustration"
            className="w-full max-w-md h-auto"
            loading="lazy"
          />
        </div>
      </div>
      {/* Footer for the form */}
      <FormFooter />
    </div>
  );
}

export default Signup;
