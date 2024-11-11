import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect,  useState } from "react";

import { GoogleAuthProvider } from "firebase/auth/web-extension";
import auth from "../../../../Firebase/Firebase.config";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import PropTypes from "prop-types";





export const AuthContext = createContext(null)



const AuthProvider = ({children}) => {
 
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)
const googleProvider = new GoogleAuthProvider()
const {axiosSecure} = useAxiosSecure()



const createUser = (email, password,name) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password,name)
   
}
const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password,)
}

const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photoURL
    });
}



const logOut = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

 const googleSignIn = () =>{
    setLoading(true)
    signInWithPopup(auth, googleProvider)

 }




 useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
            const userInfo = { email: currentUser.email };
            try {
                const res = await axiosSecure.post('/jwt', userInfo);
                if (res.data.token) {
                    localStorage.setItem('access-token', res.data.token);
                }
            } catch (error) {
                console.error('Error generating JWT token:', error);
            }
        } else {
            localStorage.removeItem('access-token');
        }
        setLoading(false); // Only set loading to false after complete
        console.log('observing current user', currentUser);
    });
    return () => unSubscribe();
}, [axiosSecure]);









const authInfo = {
    user,
    loading,
    createUser,
    logOut,
    signInUser,
    googleSignIn,
    updateUserProfile,
 
  
}




return(
    <AuthContext.Provider value={authInfo}>    
         {children}
    </AuthContext.Provider>
)

};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node,  
   
  };

