import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";

type TLoginForm = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate()
  const [loginUser, { isLoading }] = useLoginMutation();
  if (isLoading) {
    toast.loading("Logging in...", { id: "login" });
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>();

  const onSubmit: SubmitHandler<TLoginForm> = async (data) => {
    const res = await loginUser(data);
    if (res?.data?.data) {
      toast.success("Login Successful!", { id: "login" });
      navigate("/");
    } else {
      toast.error("Login Failed! Please try again.", { id: "login" });
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 text-slate-800 items-center justify-center px-4">
      <div className="w-full max-w-md shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="example@mail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="*****"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
