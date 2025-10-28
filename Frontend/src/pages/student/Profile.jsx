import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/common/Button";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow space-y-4">
      <h1 className="text-2xl font-semibold">My Profile</h1>
      <div>
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Role:</strong> {user?.role}
        </p>
      </div>
      <Button>Edit Profile</Button>
    </div>
  );
};

export default Profile;
