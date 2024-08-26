import { createContext, useRef, useState } from "react";


export const AuthContext = createContext(null)



const AuthProvider = ({children}) => {
 
const [user, setuser] = useState(null)

const targetRef = useRef(null)







const authInfo = {
    user,
    targetRef
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


