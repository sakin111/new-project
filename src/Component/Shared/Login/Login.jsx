import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useAuth from "../../Hook/useAuth";
import auth from "../../../../Firebase/Firebase.config";

const Login = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [feedback, setFeedback] = useState({ type: "", message: "" });
    const navigate = useNavigate();

    // Function to handle email/password login
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
           

            // Save user to the backend
            const userInfo = { email: result.user?.email, name: result.user?.displayName };
            await axiosPublic.post("/users", userInfo);

            setFeedback({ type: "success", message: "User login successful" });
            e.target.reset();
            navigate("/");
        } catch (error) {
            console.error("Login Error:", error.message);
            setFeedback({ type: "error", message: "Failed to login. Please check your credentials." });
        }
    };

    // Function to handle Google sign-in
    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();
            console.log(result.user);

            // Save user to the backend
            const userInfo = { email: result.user?.email, name: result.user?.displayName };
            await axiosPublic.post("/users", userInfo);

            navigate("/");
        } catch (error) {
            console.error("Google Sign-In Error:", error.message);
            setFeedback({ type: "error", message: "Google Sign-In failed. Please try again." });
        }
    };

    return (
        <div className="w-full bg-white h-full py-32">
            <div className="max-w-3xl bg-white shadow-md sm:px-8 sm:py-10 dark:bg-zinc-900 mx-auto">
                <div className="flex flex-col justify-between space-x-0 sm:flex-row sm:space-x-12">
                    <div className="mb-8 w-full sm:mb-0 sm:w-1/2">
                        <h2 className="mb-6 text-3xl font-semibold tracking-tight">Sign In</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4 flex flex-col space-y-4">
                                <input
                                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none dark:border-zinc-700 focus:ring-1"
                                    placeholder="Email"
                                    type="text"
                                    name="email"
                                />
                                <input
                                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none dark:border-zinc-700 focus:ring-1"
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                />
                            </div>
                            <div className="mb-6 flex items-center space-x-2 accent-sky-600">
                                <input type="checkbox" id="keep_signed_in" />
                                <label className="select-none text-sm font-medium" htmlFor="keep_signed_in">
                                    Keep me signed in
                                </label>
                            </div>
                            <button
                                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-zinc-600 px-4 py-2 text-sm font-medium uppercase text-white hover:bg-zinc-700"
                            >
                                Submit
                            </button>
                        </form>
                        <p className="mt-6 flex gap-1 text-sm">
                            Did you
                            <Link className="text-sky-500 underline" to="/forgot-password">
                                forget your password?
                            </Link>
                        </p>
                    </div>

                    <div className="w-full sm:w-1/2">
                        <p className="mb-6 text-sm">
                            If you don&apos;t already have an account click the button below to create your account.
                        </p>
                        <Link to="/signup">
                            <button
                                className="mb-2 inline-flex h-10 w-full items-center justify-center rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium uppercase text-white hover:bg-zinc-700"
                            >
                                Create Account
                            </button>
                        </Link>
                        <p className="my-4 text-center">OR</p>
                        <button
                            className="flex h-10 w-full items-center justify-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="size-6 text-white"
                            >
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                            SIGN IN WITH FACEBOOK
                        </button>
                        <button
                            className="flex h-10 w-full items-center justify-center gap-1 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white"
                            onClick={handleGoogleSignIn}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="size-6 fill-current"
                            >
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
                            </svg>
                            SIGN IN WITH GOOGLE
                        </button>
                    </div>
                </div>
            </div>
            {feedback.message && (
                <p
                    className={`mt-6 text-xl font-custom rancho text-center ${
                        feedback.type === "error" ? "text-red-600" : "text-green-500"
                    }`}
                >
                    {feedback.message}
                </p>
            )}
        </div>
    );
};

export default Login;
