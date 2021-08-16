import React, { useState, useContext, useEffect, createContext } from "react";
import { auth } from "../Firebase/Firebase";
import { db } from "../Firebase/Firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");

  function signup(email, password) {
    auth.createUserWithEmailAndPassword(email, password).then((response) => {
      db.collection("Todos").doc(response.user.uid).set({
        email: response.user.email,
      });
    });
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    auth.signOut();
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ signup, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthProvider() {
  return useContext(AuthContext);
}
