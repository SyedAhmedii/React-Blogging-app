import React, { useEffect, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, getData, updateDocument } from '../config/FirebaseMethod';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userProfile = await getData("users", uid);
        setProfile(userProfile);
        console.log(userProfile);
      } else {
        console.log("Error: No user found.");
      }
    });

    return () => unsubscribe();
  }, []);

  const editProfile = async (field, oldValue) => {
    const newVal = prompt(`Enter new ${field}:`, oldValue);
    if (newVal && newVal !== oldValue) {
      const updatedVal = { [field]: newVal };
      const uid = auth.currentUser.uid;
      console.log("Updating document with:", updatedVal);

      try {
        await updateDocument(updatedVal, uid, 'users');
        setProfile([{ ...profile[0], ...updatedVal }]);
      } catch (error) {
        console.log("Error updating document:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully.");
      navigate('/');
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <>
      <header className="bg-gray-200 p-1">
        <div className='text-black h-20 flex justify-between items-center px-5'>
          <h1 className='text-3xl font-bold text-center'>Profile</h1>
          <button
            onClick={handleLogout}
            className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'>
            Logout
          </button>
        </div>
      </header>

      {profile.length > 0 ? profile.map((item) => (
        <div key={item.uid} className='min-h-[350px] lg:min-h-[400px] flex flex-col justify-start pt-10 items-center bg-white mt-10 mx-5 sm:mx-36 md:mx-44 lg:mx-72 xl:mx-96 2xl:mx-[500px] rounded-md'>
          <div className='w-[200px] h-[200px] md:w-[250px] md:h-[250px]'>
            <img className='rounded-md shadow-lg shadow-black w-full h-full' src={item.imageUrl} alt="Profile" />
          </div>
          <div className='mt-5'>
            <h1 className='text-center text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold flex justify-center items-center gap-2'>
              {item.username}
              <span
                onClick={() => editProfile('username', item.username)}
                className='text-indigo-700 hover:bg-indigo-700 hover:text-white rounded-full p-1 btn-ghost cursor-pointer'>
                <MdEdit />
              </span>
            </h1>
            <h1 className='text-center text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold flex justify-center items-center gap-2 pb-3'>
              {item.email}
              <span
                onClick={() => editProfile('email', item.email)}
                className='text-indigo-700 hover:bg-indigo-700 hover:text-white rounded-full p-1 btn-ghost cursor-pointer'>
                <MdEdit />
              </span>
            </h1>
          </div>
        </div>
      )) :
        <div className='flex justify-center items-center'>
          <h1 className='text-3xl font-bold'>No User Found!</h1>
        </div>}
    </>
  );
};

export default Profile;
