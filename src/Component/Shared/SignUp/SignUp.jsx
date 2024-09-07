import { toast } from "react-toastify";
import "./SignUp.css"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { AuthContext } from "../AuthProvider/AuthProvider";

const SignUp = () => {


    const { createUser, updateUserProfile } = useContext(AuthContext)
    const notify = () => toast("user created successfully")

    const axiosPublic = useAxiosPublic()

    const navigate = useNavigate()
    const [errorRegister, setErrorRegister] = useState('');
    const [passcode, setPasscode] = useState('');






    const handleForm = e => {

        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        console.log(email, password, name);
        setErrorRegister('')
        setPasscode('');


        if (password.length < 6) {
            setErrorRegister('password should be at least 8 character or more');
            return;
        }
        else if (!/[a-zA-Z0-9]/.test(password)) {
            setErrorRegister('Please complete the requirement');
            return;
        }


        createUser(email, password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(name)
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email,
                           
                        };

                        axiosPublic.post("/users", userInfo)
                            .then(response => {
                                if (response.data.insertedId) {
                                    console.log('user profile info updated')
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "user created successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate("/")
                                }


                            })
                            .catch(error => {
                                console.error("Error sending user information to MongoDB:", error);
                            });

                    }).catch((error) => {
                        if (error.code === 'auth/email-already-in-use') {
                            setErrorRegister('The email address is already in use. Please log in instead.');
                        } else {
                            console.error("Signup error:", error);
                        }
                    });

            })
    }





    return (
      <div className="w-full bg-white h-full py-20 ">
          <div className="max-w-md space-y-6 rounded-lg border bg-white p-10 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 mx-auto ">
            <div className="flex flex-col space-y-1">
                <h3 className="text-3xl font-bold tracking-tight text-center">Sign Up</h3>
                
            </div>
            <div>
                <form className="space-y-6" onSubmit={handleForm}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 text-sm">
                            <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="first_name">
                                Name
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                                id="first_name"
                                placeholder="Enter first name"
                                name="name"
                                type="text"
                            />
                        </div>
                       
                    </div>
                    <div className="space-y-2 text-sm">
                        <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                            id="email"
                            placeholder="Enter your email"
                            name="email"
                            type="email"
                        />
                    </div>
                    <div className="space-y-2 text-sm">
                        <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="password_">
                            Password
                        </label>
                        <input 
                            className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                            id="password_"
                            placeholder="password"
                            name="password"
                            type="password"
                        />
                    </div>
                    <button className="rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700"  onClick={notify}>Sign Up</button>
                    <div>
                    {name.charAt(0).toUpperCase()}
                    </div>
                </form>
            </div>
            {
                        errorRegister && <p className="mt-6 text-red-600 text-3xl">{errorRegister}</p>
                    }
                    {
                        passcode && <p className="text-green-500">{passcode}</p>
                    }
        </div>
      </div>
    );
};

export default SignUp;