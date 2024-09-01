import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect,  useState } from "react";

import { GoogleAuthProvider } from "firebase/auth/web-extension";
import auth from "../../../../Firebase/Firebase.config";




export const AuthContext = createContext(null)



const AuthProvider = ({children}) => {
 
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)
const googleProvider = new GoogleAuthProvider()



const createUser = (email, password,firstName,lastName) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password,firstName,lastName)
   
}
const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password,)
}




const logOut = () => {
    return signOut(auth)
}

 const googleSignIn = () =>{
    setLoading(true)
    signInWithPopup(auth, googleProvider)

 }




useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) =>{
     setUser(currentUser)
     if(currentUser){
        const userInfo = {email: currentUser.email}
        setLoading(false)
        return userInfo;
     }   else {
     
        setLoading(false); 
    }
    console.log('observing current user', currentUser);

    })
    return unsubscribe()
},[])





const authInfo = {
    user,
    loading,
    createUser,
    logOut,
    signInUser,
    googleSignIn,
    // updateUserProfile
  
}





return(
    <AuthContext.Provider value={authInfo}>    
         {children}
    </AuthContext.Provider>
)

};

export default AuthProvider;


