import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (apiBody) => {
    try {
      const { data } = await axios.post(
        "https://assignment.stage.crafto.app/login",
        apiBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = data.token;
      localStorage.setItem("authToken", token);
      toast("Login successful!");
      navigate("/quotes");
    } catch (error) {
      let msg = error?.response?.data || "Login failed!";
      toast(msg);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-900 from-blue-400 to-indigo-600">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            {...register("username", { required: "Username is required" })}
            placeholder="Enter username"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">OTP</label>
          <input
            {...register("otp", {
              required: "OTP is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "OTP must contain only numbers",
              },
              minLength: {
                value: 4,
                message: "OTP must be at least 4 digits",
              },
            })}
            placeholder="Enter 4-digit otp"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.otp && (
            <p className="text-red-500 text-sm">{errors.otp.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
