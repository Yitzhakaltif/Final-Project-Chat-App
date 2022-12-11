import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../contexts/auth";
import { useHistory as useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    navigate.replace("/login");
  };
  return (
    <nav>
      <h3>
        <Link to="/">Chats</Link>
      </h3>
      <h3>
        <Link to="/profile">Profile</Link>
      </h3>
      <div>
        {user ? (
          <>
            <button className="btn" onClick={handleSignout}>
              LogOut
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">LogIn</Link>
          </>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;
