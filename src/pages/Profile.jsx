import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
import '../styles/features.scss'

const Profile = () => {
  const { loading, user, isAuthenticated } = useContext(Context);
  console.log(user)
  return loading ? (
    <div className="loader-container">
      <Loader />
    </div>
  ) : (
    <div className="profile-container">
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;