import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllData } from '../config/FirebaseMethod';

const UserData = () => {
    const { userId } = useParams();
    const [userBlogs, setUserBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState("");

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                const blogsData = await getAllData("blogs");
                const usersData = await getAllData("users");

                const userBlogsData = blogsData.filter(blog => blog.userId === userId);
                const user = usersData.find(user => user.uid === userId);

                setUserBlogs(userBlogsData);
                setUsername(user ? user.username : "Unknown User");
                setProfilePicture(user ? user.imageUrl : "");
            } catch (error) {
                console.error("Error fetching user blogs:", error);
            }
        };

        fetchUserBlogs();
    }, [userId]);

    return (
        <>
            <header className="bg-gray-200 p-5">
                <h1 className="text-5xl font-bold">Blogs by {username}</h1>
            </header>
            <div className="flex flex-col mt-10 gap-5 mb-5">
                {userBlogs.length > 0 ? (
                    userBlogs.map((blog) => (
                        <div key={blog.id} className="flex flex-col w-[900px] min-h-[150px] rounded-2xl bg-gray-200 shadow-md shadow-black mx-20 px-10 py-5">
                            <div className="flex items-center">
                                {profilePicture ? (
                                    <img src={profilePicture} alt="Profile" className="w-10 h-10 rounded-full mr-3" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-400 mr-3" />
                                )}
                                <div>
                                    <h2 className="text-2xl font-bold">{blog.title}</h2>
                                    <p className="text-sm font-medium text-gray-600">By: {username}</p>
                                </div>
                            </div>
                            <p className="mt-3 text-lg">{blog.paragraph}</p>
                        </div>
                    ))
                ) : (
                    <p className="ml-5 text-lg">This user has no blogs.</p>
                )}
            </div>
        </>
    );
};

export default UserData;
