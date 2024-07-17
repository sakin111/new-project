import { createContext, useState } from "react";


const AuthContext = createContext(null)



const AuthProvider = ({children}) => {
 
const [user, setuser] = useState(null)









const authInfo = {
    user,
    // loading,
    // createUser,
    // logOut,
    // signInUser,
    // googleSignIn,
    // updateUserProfile
  
}





return(
    <AuthContext.Provider value={authInfo}>
         {children}
    </AuthContext.Provider>
)

};

export default AuthProvider;


