import React, { useState, useContext, useEffect, createContext } from "react";
import { useHistory } from "react-router";
import { auth } from "../Firebase/Firebase";
import { db } from "../Firebase/Firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const history = useHistory();

  function signup(data) {
    auth
      .createUserWithEmailAndPassword(data.Email, data.Password)
      .then((response) => {
        const tempData  = {...data, Password:""};
        localStorage.setItem("user", JSON.stringify(response.user.uid));
        db.collection("Todos").doc(response.user.uid).set(tempData);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  }
  function login(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.user.uid));
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  }
  function logout() {
    auth.signOut();
    localStorage.removeItem("user");
    history.push("/login");
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
