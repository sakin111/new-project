import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";


import auth from "../../../Firebase/Firebase.config";
import useAxiosPublic from "./useAxiosPublic";

export const useAuthHandler = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const axiosPublic = useAxiosPublic();

    const handleLogin = async ({ email, password, keepSignedIn }) => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const { user } = result;

            if (keepSignedIn) {
                localStorage.setItem("sessionID", user.uid);
            }

            // Save user info to the server
            await axiosPublic.post("/users", { email: user.email });
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            setErrorMessage("Login failed. Please check your credentials.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            // Add Google Sign-In logic here
        } catch (error) {
            console.error("Google Sign-In failed:", error);
            setErrorMessage("Google Sign-In failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return { handleLogin, handleGoogleSignIn, isLoading, errorMessage };
};
