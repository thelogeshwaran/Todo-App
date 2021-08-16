import React,{ useState, useContext, useEffect, createContext} from 'react';
import { auth } from "../Firebase/Firebase"

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState("");
    
    function signup(email, password){
       return  auth.createUserWithEmailAndPassword(email,password)
    }
    function login( email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout(){
        auth.signOut();
      }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])
    
    return (
        <AuthContext.Provider value={{ signup, currentUser, login, logout }}>
            { children}
        </AuthContext.Provider>
    )
}

export function useAuthProvider(){
    return useContext(AuthContext)
}


