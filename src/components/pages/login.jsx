import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  console.log(watch("email"));
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* This is the form wrapper because i am going to create a shadow box
      around it to make it seem like it is on a background */}
      <div className=" flex justify-between shadow-xl overflow-hidden w-full lg:w-[80%]">
        <div className="flex flex-col items-center p-2">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-gray-600">
              Login to your Deborah's App Account
            </p>
          </div>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className=" block text-md font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                {...register("email", { required: true })}
              />
              {errors.email && <span>Email is required</span>}
            </div>

            <div>
              <label className="block text-md font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                {...register("password", { required: true })}
              />
              {errors.password && <span>Password is required</span>}
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent 
              rounded-md shadow-sm text-md font-medium text-white bg-blue-600 hover:bg-purple-500
              "
            >
              Login
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
                Login with Google
              </button>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <NavLink
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign Up
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
      <footer className="w-full text-center p-4 bg-gray-100">
        <p className="text-sm text-gray-600">
          By clicking continue, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </footer>
    </div>
  );
}

export default Login;
